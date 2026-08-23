'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

export default function ResizableTerminal({ children, defaultHeight = 400, minHeight = 180, maxHeight = 800 }) {
  const [height, setHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(defaultHeight);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    startY.current = e.clientY;
    startHeight.current = height;
    setIsDragging(true);
  }, [height]);

  const onTouchStart = useCallback((e) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
    setIsDragging(true);
  }, [height]);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      const delta = e.clientY - startY.current;
      const newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight.current + delta));
      setHeight(newHeight);
    };

    const onTouchMove = (e) => {
      const delta = e.touches[0].clientY - startY.current;
      const newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight.current + delta));
      setHeight(newHeight);
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, minHeight, maxHeight]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Pass height down via a wrapper that controls the inner scroll area */}
      <div data-terminal-height={height}>
        {children}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        title="Drag to resize terminal"
        style={{
          width: '100%',
          height: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'row-resize',
          userSelect: 'none',
          background: isDragging ? 'rgba(16,185,129,0.08)' : 'transparent',
          transition: 'background 0.2s',
          borderRadius: '0 0 12px 12px',
          marginTop: '-12px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{
          width: '40px',
          height: '4px',
          borderRadius: '2px',
          background: isDragging ? 'var(--accent-color)' : '#3f3f46',
          transition: 'background 0.2s, width 0.2s',
        }} />
      </div>
    </div>
  );
}
