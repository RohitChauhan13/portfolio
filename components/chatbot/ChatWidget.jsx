'use client';

import { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getChatStatus } from '@/lib/api';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: "Hi! I'm Rohit's AI assistant. Ask me anything about his experience, projects, or skills!", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(null);
  const messagesEndRef = useRef(null);
  
  const [sessionId, setSessionId] = useState('');
  const widgetRef = useRef(null);

  useEffect(() => {
    let sessionData = JSON.parse(localStorage.getItem('chat_session_data') || '{}');
    const today = new Date().toISOString().split('T')[0];
    if (sessionData.date !== today) {
      sessionData = { id: uuidv4(), date: today };
      localStorage.setItem('chat_session_data', JSON.stringify(sessionData));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(sessionData.id);

    // Fetch limits and history from backend
    getChatStatus(sessionData.id).then(status => {
      if (status) {
        setRemainingMessages(status.remainingMessages);
        
        if (status.activeSessionId && status.activeSessionId !== sessionData.id) {
          sessionData.id = status.activeSessionId;
          localStorage.setItem('chat_session_data', JSON.stringify(sessionData));
          setSessionId(status.activeSessionId);
        }

        if (status.history && status.history.length > 0) {
          const formattedHistory = status.history.map(msg => ({
            id: uuidv4(),
            role: msg.role,
            content: msg.content,
            sources: (() => {
              if (!msg.sources) return null;
              if (typeof msg.sources !== 'string') return msg.sources;
              try { return JSON.parse(msg.sources); } catch (e) { return null; }
            })(),
            timestamp: msg.created_at
          }));
          // Overwrite default welcome msg with full history
          setMessages(formattedHistory);
        }
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: uuidv4(), role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Format chat history for the API (last 10 messages)
      const chatHistory = messages
        .slice(-10)
        .map(msg => ({ role: msg.role, content: msg.content }));
        
      const data = await sendChatMessage(userMsg.content, sessionId, chatHistory);
      
      if (data.remainingMessages !== undefined) {
        setRemainingMessages(data.remainingMessages);
      }
      
      const responseData = data.data || data; 
      
      if (responseData && responseData.answer) {
        setMessages(prev => [
          ...prev, 
          { id: uuidv4(), role: 'assistant', content: responseData.answer, sources: responseData.sources, timestamp: new Date().toISOString() }
        ]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      const isLimitError = err.message && err.message.toLowerCase().includes('limit');
      setMessages(prev => [
        ...prev, 
        { id: uuidv4(), role: 'assistant', content: isLimitError ? err.message : "Sorry, I couldn't connect to my knowledge base right now. Please check if the API is online.", timestamp: new Date().toISOString() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={widgetRef} className="chat-container">
      
      {!isOpen && (
        <div style={{ position: 'relative' }}>
          {/* Tooltip Bubble */}
          <div className="chat-tooltip mono-text" style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--bg-color)',
            border: '1px solid var(--accent-color)',
            padding: '0.6rem 1.2rem',
            borderRadius: '12px',
            whiteSpace: 'nowrap',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'floatTooltip 3s ease-in-out infinite'
          }}>
            <span style={{ color: 'var(--accent-color)', marginRight: '6px' }}>&gt;</span>Ask AI Assistant
            <div style={{
              position: 'absolute',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'var(--bg-color)',
              borderRight: '1px solid var(--accent-color)',
              borderTop: '1px solid var(--accent-color)',
            }}></div>
          </div>

          {/* Pulsing Ring Animation */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--accent-color)',
            borderRadius: '50%',
            animation: 'pingRing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            zIndex: -1
          }}></div>

          <button 
            onClick={() => setIsOpen(true)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 24px var(--accent-glow)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, background 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'var(--accent-color)';
              e.currentTarget.style.color = 'white';
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
              <path d="M9 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              <path d="M15 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="glass-panel chat-panel">
          {/* Header */}
          <div style={{
            padding: '1.5rem 1rem',
            background: 'var(--accent-color)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <Bot size={20} /> AI Assistant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {remainingMessages !== null && (
                <div style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
                  {remainingMessages} msgs left today
                </div>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'var(--bg-color)'
          }}>
            {messages.map(msg => {
              const timeString = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <div 
                  key={msg.id} 
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.role === 'user' ? 'var(--accent-color)' : 'var(--card-bg)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                    padding: '0.75rem 1rem 0.5rem 1rem',
                    borderRadius: '12px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                    borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    overflowWrap: 'break-word',
                    position: 'relative',
                    minWidth: '100px'
                  }}
                >
                  {msg.role === 'assistant' ? (
                    <div className="markdown-chat">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                  {timeString && (
                    <div style={{ 
                      fontSize: '0.65rem', 
                      opacity: 0.6, 
                      textAlign: 'right', 
                      marginTop: '0.25rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}>
                      {timeString}
                    </div>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--card-bg)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', borderBottomLeftRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '1rem',
            background: 'var(--card-bg)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={remainingMessages === 0 ? "Daily limit reached." : "Ask me something..."}
              disabled={isLoading || remainingMessages === 0}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                outline: 'none',
                opacity: remainingMessages === 0 ? 0.6 : 1
              }}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim() || remainingMessages === 0}
              style={{
                background: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: (isLoading || !input.trim() || remainingMessages === 0) ? 'not-allowed' : 'pointer',
                opacity: (isLoading || !input.trim() || remainingMessages === 0) ? 0.5 : 1
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      
      <style jsx global>{`
        .markdown-chat p {
          margin: 0 0 0.5rem 0;
        }
        .markdown-chat p:last-child {
          margin: 0;
        }
        .markdown-chat ul, .markdown-chat ol {
          margin: 0.5rem 0;
          padding-left: 1.25rem;
        }
        .markdown-chat li {
          margin-bottom: 0.25rem;
        }
        .markdown-chat pre {
          background: rgba(0,0,0,0.2);
          padding: 0.5rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 0.5rem 0;
        }
        .markdown-chat code {
          font-family: var(--font-mono);
          font-size: 0.85em;
          background: rgba(0,0,0,0.1);
          padding: 0.1rem 0.25rem;
          border-radius: 4px;
        }
        .markdown-chat pre code {
          background: transparent;
          padding: 0;
        }
      `}</style>
      <style jsx>{`
        .chat-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 100;
          pointer-events: auto;
        }
        .chat-panel {
          width: 420px;
          height: 400px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: typingBlink 1.4s infinite ease-in-out both;
        }
        @keyframes typingBlink {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatTooltip {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-5px); }
        }
        @keyframes pingRing {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}


