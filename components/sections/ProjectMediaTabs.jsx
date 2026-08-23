'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ImageCarousel from '../ui/ImageCarousel';

export default function ProjectMediaTabs({ project, images }) {
  const hasPreview = !!project.thumbnail_url;
  const hasVideo = !!project.video_url;
  const hasGallery = images && images.length > 0;

  const availableTabs = [];
  if (hasPreview) availableTabs.push({ id: 'preview', label: 'Preview' });
  if (hasVideo) availableTabs.push({ id: 'video', label: 'Video' });
  if (hasGallery) availableTabs.push({ id: 'gallery', label: 'Gallery' });

  const [activeTab, setActiveTab] = useState(availableTabs.length > 0 ? availableTabs[0].id : null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Compute these once at component level so we can use them in onClick
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const isDriveUrl = hasVideo && project.video_url.includes('drive.google.com');
  // If it's a Google Drive URL on mobile, we show a fallback (no iframe load), so skip the loader
  const shouldShowLoader = !(isDriveUrl && isMobile);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (availableTabs.length === 0) return null;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const modalContent = isModalOpen && hasVideo && mounted ? createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      
      {/* Close Button positioned neatly above the video container */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          onClick={() => setIsModalOpen(false)} 
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'background 0.2s' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', WebkitOverflowScrolling: 'touch' }}>
        
        {isVideoLoading && shouldShowLoader && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)', zIndex: 10, pointerEvents: 'none' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '1px' }}>
              INITIALIZING_MEDIA_STREAM...
            </div>
          </div>
        )}

        {(() => {
          const isYoutube = project.video_url.includes('youtube.com') || project.video_url.includes('youtu.be');
          const isDrive = project.video_url.includes('drive.google.com');

          const embedSrc = isYoutube
            ? project.video_url.includes('watch?v=')
              ? project.video_url.replace('watch?v=', 'embed/')
              : project.video_url
            : isDrive && project.video_url.includes('/view')
              ? project.video_url.replace('/view', '/preview')
              : project.video_url;

          // Google Drive blocks mobile iframe playback at the API level.
          // Detect mobile and show a fallback button instead.
          const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

          if (isDrive && isMobile) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', gap: '1.5rem' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8" fill="var(--accent-color)" stroke="var(--accent-color)"></polygon>
                </svg>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Google Drive restricts embedded video on mobile browsers.
                </p>
                <a
                  href={project.video_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: 'var(--accent-color)', color: '#fff', padding: '0.85rem 2rem', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Watch in Google Drive
                </a>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', opacity: 0.6, textAlign: 'center' }}>
                  Tip: Upload to YouTube for seamless mobile playback.
                </p>
              </div>
            );
          }

          if (isYoutube || isDrive) {
            return (
              <iframe 
                onLoad={() => setIsVideoLoading(false)}
                src={embedSrc}
                style={{ display: 'block', width: '100%', aspectRatio: '16/9', border: 'none', touchAction: 'auto' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                allowFullScreen
              />
            );
          }

          return (
            <video src={project.video_url} controls autoPlay onLoadedData={() => setIsVideoLoading(false)} style={{ width: '100%', display: 'block', maxHeight: '85vh', touchAction: 'auto' }} />
          );
        })()}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '1200px', margin: '2rem auto 2.5rem auto' }}>
        
        {/* Tab Headers */}
        {availableTabs.length > 1 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1.1rem',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab Content */}
        <div style={{ width: '100%' }}>
          
          {/* Preview Tab */}
          {activeTab === 'preview' && hasPreview && (
            <div style={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', background: 'var(--card-bg)', overflow: 'hidden', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <img src={project.thumbnail_url} alt={`${project.title} preview`} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
            </div>
          )}

          {/* Video Tab (Thumbnail to open Modal) */}
          {activeTab === 'video' && hasVideo && (
            <div 
              onClick={() => { setIsModalOpen(true); if (shouldShowLoader) setIsVideoLoading(true); }}
              style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '100%', position: 'relative', background: 'var(--card-bg)', aspectRatio: '16/9', maxHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {project.thumbnail_url ? (
                <img src={project.thumbnail_url} alt={`${project.title} — Software Engineering Project Demo Thumbnail`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, #1f2937, #111827)' }} />
              )}
              
              <div style={{ width: '72px', height: '72px', background: 'var(--accent-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }} className="hover-scale">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && hasGallery && (
            <div style={{ width: '100%' }}>
              <ImageCarousel images={images} title={project.title} />
            </div>
          )}
        </div>
      </div>
      {modalContent}
    </>
  );
}
