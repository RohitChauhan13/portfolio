'use client';

import { useState } from 'react';

export default function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', background: 'var(--card-bg)' }}>
      
      {/* Main Image */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', aspectRatio: '16/9', maxHeight: '450px' }}>
        <img 
          src={images[currentIndex]} 
          alt={`${title} screenshot ${currentIndex + 1}`} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            onClick={next}
            style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '1rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 2 }}>
          {images.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentIndex ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'background 0.2s' }}
            />
          ))}
        </div>
      )}

    </div>
  );
}
