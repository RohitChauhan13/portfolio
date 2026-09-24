'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Briefcase, FolderGit2, Mail, MessageSquare, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Feedback from '@/components/sections/Feedback';

export default function Navbar() {
  const pathname = usePathname();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const navItems = [
    { name: 'System', href: '/', icon: Home },
    { name: 'Connect', href: '/#connect', icon: Mail },
    { name: 'Feedback', icon: MessageSquare, isButton: true },
  ];

  return (
    <>
      <nav className="main-nav glass-panel">
        <div className="nav-container">
          <Link href="/" className="nav-logo mono-text gradient-text">
            [R]
          </Link>
          <div className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              if (item.isButton) {
                return (
                  <button 
                    key={item.name} 
                    onClick={() => setIsFeedbackOpen(true)}
                    className="nav-item"
                    style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    <Icon size={20} className="nav-icon" />
                    <span className="nav-label">{item.name}</span>
                  </button>
                );
              }

              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* FEEDBACK MODAL OVERLAY */}
      {isFeedbackOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <button 
              onClick={() => setIsFeedbackOpen(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', zIndex: 10
              }}
            >
              <X size={24} />
            </button>
            <Feedback />
          </div>
        </div>
      )}
    </>
  );
}
