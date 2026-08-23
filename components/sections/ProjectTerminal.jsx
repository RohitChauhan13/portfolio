'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function ProjectTerminal({ project, techStack }) {
  const [printedText, setPrintedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const contentInnerRef = useRef(null);

  // --- Resize state ---
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
      
      const innerHeight = contentInnerRef.current ? contentInnerRef.current.clientHeight : 800;
      const padding = 48; // 1.5rem (24px) top + bottom
      const dynamicMax = Math.min(800, innerHeight + padding);
      
      setTermHeight(Math.max(120, Math.min(dynamicMax, startH + dy)));
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

  // --- Typing animation ---
  useEffect(() => {
    let text = `rohit@portfolio:~$ fetch --project ${project.slug}\n`;
    text += `> Locating project files...\n`;
    text += `> [SUCCESS] Found ${project.slug}.sys\n\n`;
    text += `const projectData = {\n`;
    text += `  title: "${project.title || ''}",\n`;
    if (project.start_date) text += `  deployment_year: ${new Date(project.start_date).getFullYear()},\n`;
    if (techStack && techStack.length > 0) {
      text += `  tech_stack: [${techStack.map(t => `"${typeof t === 'string' ? t.trim() : t}"`).join(', ')}],\n`;
    }
    const cleanDesc = (project.full_description || project.description || project.short_description || '').replace(/"/g, '\\"').replace(/\n/g, ' ');
    text += `  architecture_overview: "${cleanDesc}"\n`;
    text += `};\n\n`;
    text += `> End of stream.\n`;
    text += `> Initializing attached visual payload sequence...\n`;
    text += `rohit@portfolio:~$ `;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrintedText('');
    setIsTyping(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setPrintedText(prev => prev + text.substring(currentIndex, currentIndex + 4));
        currentIndex += 4;
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 5);
    return () => clearInterval(interval);
  }, [project, techStack]);

  const renderLine = (line, i) => {
    const s = line || '';
    if (!s.trim()) return <div key={i} style={{ height: '1.5rem' }}></div>;
    if (s.startsWith('rohit@portfolio:~$')) return (
      <div key={i}>
        <span style={{ color: '#eab308', fontWeight: 600 }}>rohit@portfolio:~$</span>{' '}
        <span style={{ color: '#a1a1aa' }}>{s.replace('rohit@portfolio:~$', '')}</span>
        {i === printedText.split('\n').length - 1 && <span style={{ color: '#eab308' }}>{'\u2588'}</span>}
      </div>
    );
    if (s.startsWith('>')) return <div key={i} style={{ color: s.includes('[SUCCESS]') ? '#22c55e' : '#3b82f6' }}>{s}</div>;
    if (s.includes('const ') && s.includes('= {')) return (
      <div key={i}>
        <span style={{ color: '#c678dd' }}>const</span>
        <span style={{ color: '#61afef' }}>{s.replace('const', '').replace('= {', '')}</span>
        <span style={{ color: '#abb2bf' }}>{' = {'}</span>
      </div>
    );
    if (s.includes('};')) return <div key={i} style={{ color: '#abb2bf' }}>{'};'}</div>;
    if (s.includes('[[')) {
      const [before, rest] = s.split('[[');
      const [linkPart, after] = rest.split(']]');
      const [url, linkText] = linkPart.split('|');
      const ci = before.indexOf(':');
      if (ci > -1) return (
        <div key={i}>
          <span style={{ color: '#e06c75' }}>{before.substring(0, ci + 1)}</span>
          <span style={{ color: '#98c379' }}>{before.substring(ci + 1)}</span>
          <a href={url} target="_blank" rel="noreferrer" style={{ color: '#61afef', textDecoration: 'underline', fontWeight: 600, pointerEvents: isTyping ? 'none' : 'auto' }}>{linkText}</a>
          <span style={{ color: '#98c379' }}>{after}</span>
        </div>
      );
    }
    const ci = s.indexOf(':');
    if (ci > -1 && s.trim().match(/^[a-z]/i)) return (
      <div key={i}>
        <span style={{ color: '#e06c75' }}>{s.substring(0, ci + 1)}</span>
        <span style={{ color: '#98c379' }}>{s.substring(ci + 1)}</span>
      </div>
    );
    return <div key={i} style={{ color: '#abb2bf' }}>{s}</div>;
  };

  const accentActive = isDragging ? '#10b981' : '#3f3f46';
  const handleStyle = { background: isDragging ? 'rgba(16,185,129,0.12)' : 'transparent', transition: 'background 0.15s' };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '2rem',
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
            rohit@portfolio:~ — project_viewer — 80x24
          </div>
          <div style={{ fontSize: '0.7rem', color: isDragging ? '#10b981' : '#52525b', fontFamily: 'monospace', transition: 'color 0.2s', minWidth: '50px', textAlign: 'right' }}>
            {Math.round(termHeight)}px
          </div>
        </div>

        {/* Scrollable content */}
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
            {printedText.split('\n').map((line, i) => renderLine(line, i))}
          </div>
        </div>

        {/* Bottom resize handle (height) */}
        <div
          onMouseDown={(e) => startDrag(e)}
          onTouchStart={(e) => startDrag(e)}
          title="Drag to resize height"
          style={{
            ...handleStyle,
            height: '10px',
            borderTop: `2px solid ${isDragging ? '#10b981' : '#27272a'}`,
            cursor: 'row-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          {[0,1,2,3].map(i => <div key={i} style={{ width: '20px', height: '1.5px', borderRadius: '1px', background: accentActive }} />)}
        </div>
      </div>
    </div>
  );
}
