'use client';

import { Terminal, Code, Cpu, FolderGit2, Wrench } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function TerminalUI({ experience, education, skills, projects }) {
  const [activeTab, setActiveTab] = useState('experience');
  const [printedText, setPrintedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const contentInnerRef = useRef(null);

  // --- Resize ---
  const [termHeight, setTermHeight] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const dragData = useRef({ startY: 0, startH: 0 });

  // Handle responsive default height on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTermHeight(300); // mobile/tablet default
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTermHeight(400); // desktop default
      }
    }
  }, []);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragData.current = { startY: clientY, startH: termHeight };
    setIsDragging(true);
  }, [termHeight]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const { startY, startH } = dragData.current;
      const dy = clientY - startY;
      
      const innerHeight = contentInnerRef.current ? contentInnerRef.current.clientHeight : 900;
      const padding = 48; // 1.5rem (24px) top + bottom
      const dynamicMax = Math.min(900, innerHeight + padding);
      
      setTermHeight(Math.max(150, Math.min(dynamicMax, startH + dy)));
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['experience', 'education', 'skills', 'projects'].includes(tab)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(tab);
      }
      
      if (window.location.hash === '#terminal') {
        setTimeout(() => {
          const el = document.getElementById('terminal');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsHydrated(true);
  }, []);

  const formatDate = (dateString, isCurrent) => {
    if (isCurrent) return 'Present';
    if (!dateString) return '';
    if (dateString.length === 4) return dateString;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const generateText = (data, type) => {
    if (!data || data.length === 0) return `rohit@portfolio:~$ fetch --dataset ${type}\n> [ERROR] No records found.\nrohit@portfolio:~$ `;

    let text = `rohit@portfolio:~$ fetch --dataset ${type}\n`;
    text += `> Initializing secure connection...\n`;
    text += `> Fetching ${data.length} records...\n\n`;
    
    text += `const ${type}History = [\n`;
    data.forEach((item, index) => {
      text += `  {\n`;
      if (type === 'experience') {
        text += `    role: "${item.role || ''}",\n`;
        text += `    company: "${item.company || ''}",\n`;
        text += `    duration: "${formatDate(item.start_date)} - ${formatDate(item.end_date, item.is_current)}",\n`;
        if (item.tech_stack) {
           const techArray = Array.isArray(item.tech_stack) ? item.tech_stack : (typeof item.tech_stack === 'string' ? item.tech_stack.split(',') : []);
           text += `    stack: [${techArray.map(t => `"${typeof t === 'string' ? t.trim() : t}"`).join(', ')}],\n`;
        }
        const cleanDesc = (item.description || '').replace(/"/g, '\\"').replace(/\n/g, ' ');
        text += `    description: "${cleanDesc}"\n`;
      } else if (type === 'education') {
        text += `    degree: "${item.degree || ''}",\n`;
        text += `    institution: "${item.institution || ''}",\n`;
        text += `    duration: "${item.start_year || ''} - ${item.end_year || ''}",\n`;
        if (item.grade) text += `    grade: "${item.grade}",\n`;
        const cleanDesc = (item.description || '').replace(/"/g, '\\"').replace(/\n/g, ' ');
        text += `    description: "${cleanDesc}"\n`;
      } else if (type === 'skills') {
        text += `    name: "${item.name || ''}",\n`;
        text += `    category: "${item.category || ''}",\n`;
        if (item.proficiency) text += `    proficiency: ${item.proficiency},\n`;
        if (item.icon_url) text += `    icon: "[[IMG:${item.icon_url}]]",\n`;
      } else if (type === 'projects') {
        text += `    title: "${item.title || ''}",\n`;
        const cleanDesc = (item.short_description || '').replace(/"/g, '\\"').replace(/\n/g, ' ');
        text += `    description: "${cleanDesc}",\n`;
        if (item.tech_stack) {
           const techArray = Array.isArray(item.tech_stack) ? item.tech_stack : (typeof item.tech_stack === 'string' ? item.tech_stack.split(',') : []);
           text += `    stack: [${techArray.map(t => `"${typeof t === 'string' ? t.trim() : t}"`).join(', ')}],\n`;
        }
        text += `    explore: "[[/projects/${item.slug}|View Architecture]]"\n`;
      }
      
      text += `  }${index < data.length - 1 ? ',' : ''}\n`;
    });
    
    text += `];\n\n`;
    text += `> Process exited with code 0 in ${Math.floor(Math.random() * 80 + 10)}ms.\n`;
    text += `rohit@portfolio:~$ `;
    return text;
  };

  useEffect(() => {
    if (!isHydrated) return;

    let data;
    if (activeTab === 'experience') data = experience;
    else if (activeTab === 'education') data = education;
    else if (activeTab === 'skills') data = skills;
    else if (activeTab === 'projects') data = projects;

    const textToType = generateText(data, activeTab);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrintedText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < textToType.length) {
        const charsToadd = textToType.substring(currentIndex, currentIndex + 4);
        setPrintedText(prev => prev + charsToadd);
        currentIndex += 4;
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [activeTab, experience, education, skills, projects, isHydrated]);

  const renderLine = (line, i) => {
    const safeLine = line || '';
    if (!safeLine.trim()) return <div key={i} style={{ height: '1.5rem' }}></div>;

    if (safeLine.startsWith('rohit@portfolio:~$')) {
      return (
        <div key={i}>
          <span style={{ color: '#eab308', fontWeight: 600 }}>rohit@portfolio:~$</span> 
          <span style={{ color: '#a1a1aa' }}>{safeLine.replace('rohit@portfolio:~$', '')}</span>
          {i === printedText.split('\n').length - 1 && !isTyping && <span className="animate-pulse" style={{ color: '#eab308' }}>\u2588</span>}
          {i === printedText.split('\n').length - 1 && isTyping && <span style={{ color: '#eab308' }}>\u2588</span>}
        </div>
      );
    }
    
    if (safeLine.startsWith('>')) {
      const isError = safeLine.includes('[ERROR]');
      return <div key={i} style={{ color: isError ? '#ef4444' : '#3b82f6' }}>{safeLine}</div>;
    }
    
    if (safeLine.includes('const ') && safeLine.includes(' = [')) {
      return (
        <div key={i}>
          <span style={{ color: '#c678dd' }}>const</span>
          <span style={{ color: '#61afef' }}>{safeLine.replace('const', '').replace('= [', '')}</span>
          <span style={{ color: '#abb2bf' }}>= [</span>
        </div>
      );
    }

    if (safeLine.includes('];')) {
      return <div key={i} style={{ color: '#abb2bf' }}>];</div>;
    }

    // Interactive Links and Images parsing
    if (safeLine.includes('[[IMG:') && safeLine.includes(']]')) {
      const parts = safeLine.split('[[IMG:');
      const before = parts[0];
      const afterParts = parts[1].split(']]');
      const url = afterParts[0];
      const after = afterParts[1];
      
      const colonIndex = before.indexOf(':');
      if (colonIndex > -1) {
        const key = before.substring(0, colonIndex + 1);
        const rest = before.substring(colonIndex + 1);
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#e06c75' }}>{key}</span>
            <span style={{ color: '#98c379' }}>{rest}</span>
            <div style={{
              background: '#f8fafc',
              padding: '4px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 4px',
              boxShadow: '0 0 10px rgba(255,255,255,0.1)'
            }}>
              <img src={url} alt="icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            </div>
            <span style={{ color: '#98c379' }}>{after}</span>
          </div>
        );
      }
    } else if (safeLine.includes('[[') && safeLine.includes(']]')) {
      const parts = safeLine.split('[[');
      const before = parts[0];
      const afterParts = parts[1].split(']]');
      const linkParts = afterParts[0].split('|');
      const url = linkParts[0];
      const linkText = linkParts[1];
      const after = afterParts[1];
      
      const colonIndex = before.indexOf(':');
      if (colonIndex > -1) {
        const key = before.substring(0, colonIndex + 1);
        const rest = before.substring(colonIndex + 1);
        return (
          <div key={i}>
            <span style={{ color: '#e06c75' }}>{key}</span>
            <span style={{ color: '#98c379' }}>{rest}</span>
            <Link href={url} style={{ color: '#61afef', textDecoration: 'underline', fontWeight: 600, pointerEvents: isTyping ? 'none' : 'auto' }}>
              {linkText}
            </Link>
            <span style={{ color: '#98c379' }}>{after}</span>
          </div>
        );
      }
    }

    // JS Object Syntax highlighting
    const colonIndex = safeLine.indexOf(':');
    if (colonIndex > -1 && safeLine.trim().match(/^[a-z]/i)) { 
      const key = safeLine.substring(0, colonIndex + 1);
      const value = safeLine.substring(colonIndex + 1);
      return (
        <div key={i}>
          <span style={{ color: '#e06c75' }}>{key}</span>
          <span style={{ color: '#98c379' }}>{value}</span>
        </div>
      );
    }

    return <div key={i} style={{ color: '#abb2bf' }}>{safeLine}</div>;
  };

  return (
    <section id="terminal" style={{ width: '100%', maxWidth: '1200px', padding: '2rem 2rem 2rem 2rem', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => !isTyping && setActiveTab('experience')}
          className="mono-text"
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'experience' ? 'var(--accent-color)' : 'var(--card-bg)', 
            color: activeTab === 'experience' ? 'var(--bg-color)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: isTyping ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'experience' ? '0 0 20px var(--accent-glow)' : 'none'
          }}
        >
          <Code size={18} />
          fetch --experience
        </button>
        <button 
          onClick={() => !isTyping && setActiveTab('education')}
          className="mono-text"
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'education' ? 'var(--accent-color)' : 'var(--card-bg)', 
            color: activeTab === 'education' ? 'var(--bg-color)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: isTyping ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'education' ? '0 0 20px var(--accent-glow)' : 'none'
          }}
        >
          <Cpu size={18} />
          fetch --education
        </button>
        <button 
          onClick={() => !isTyping && setActiveTab('skills')}
          className="mono-text"
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'skills' ? 'var(--accent-color)' : 'var(--card-bg)', 
            color: activeTab === 'skills' ? 'var(--bg-color)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: isTyping ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'skills' ? '0 0 20px var(--accent-glow)' : 'none'
          }}
        >
          <Wrench size={18} />
          fetch --skills
        </button>
        <button 
          onClick={() => !isTyping && setActiveTab('projects')}
          className="mono-text"
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'projects' ? 'var(--accent-color)' : 'var(--card-bg)', 
            color: activeTab === 'projects' ? 'var(--bg-color)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: isTyping ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'projects' ? '0 0 20px var(--accent-glow)' : 'none'
          }}
        >
          <FolderGit2 size={18} />
          fetch --projects
        </button>
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          userSelect: isDragging ? 'none' : 'auto',
          maxWidth: '100%',
        }}
      >
        {/* Terminal box */}
        <div style={{
          background: '#09090b',
          borderRadius: '12px',
          border: '1px solid #27272a',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden',
          width: '100%',
        }}>
          {/* Title Bar */}
          <div style={{ background: '#18181b', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #27272a' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div className="mono-text" style={{ flex: 1, textAlign: 'center', color: '#a1a1aa', fontSize: '0.85rem' }}>
              rohit@portfolio:~ — node — 80x24
            </div>
            <div style={{ fontSize: '0.7rem', color: isDragging ? '#10b981' : '#52525b', fontFamily: 'monospace', transition: 'color 0.2s', minWidth: '50px', textAlign: 'right' }}>
              {Math.round(termHeight)}px
            </div>
          </div>

          {/* Content */}
          <div
            ref={terminalRef}
            className="mono-text"
            style={{
              padding: '1.5rem',
              height: `${termHeight}px`,
              overflowY: 'auto',
              color: '#10b981',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
            }}
          >
            <div ref={contentInnerRef}>
              {((!isHydrated && !printedText) ? generateText(experience, 'experience') : printedText)
                .split('\n')
                .map((line, i) => renderLine(line, i))}
            </div>
          </div>

          {/* Bottom handle (height) */}
          <div
            onMouseDown={(e) => startDrag(e)}
            onTouchStart={(e) => startDrag(e)}
            title="Drag to resize height"
            style={{
              height: '10px',
              background: isDragging ? 'rgba(16,185,129,0.12)' : '#18181b',
              borderTop: `2px solid ${isDragging ? '#10b981' : '#27272a'}`,
              cursor: 'row-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: '20px', height: '1.5px', borderRadius: '1px', background: isDragging ? '#10b981' : '#3f3f46', transition: 'background 0.15s' }} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}


