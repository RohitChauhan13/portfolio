import { getPersonalInfo, getEducation, getExperience, getProjects, getSkills } from '@/lib/api';
import Contact from '@/components/sections/Contact';
import TerminalUI from '@/components/sections/TerminalUI';
import SceneWrapper from '@/components/three/SceneWrapper';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const [personal, projects, skills, education, experience] = await Promise.all([
    getPersonalInfo(),
    getProjects(false),
    getSkills(),
    getEducation(),
    getExperience(),
  ]);

  return (
    <>
      <SceneWrapper skills={skills || []} projects={projects || []} />
      
      <main style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* ULTRA-PREMIUM HERO SECTION */}
        <section style={{ 
          minHeight: '50vh', 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '8rem 2rem 0 2rem' 
        }}>
          <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', position: 'relative' }}>
            
            {/* Minimalist System Badge */}
            <div className="mono-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '3rem', backdropFilter: 'blur(12px)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 12px var(--accent-color)' }}></span>
              Available for new opportunities
            </div>

            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1' }}>
              <span style={{ display: 'block' }}>{personal?.full_name?.split(' ')[0]} {personal?.full_name?.split(' ')[1]}</span>
              <span className="gradient-text">{personal?.full_name?.split(' ')[2]}</span>
            </h1>
            
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--text-secondary)', fontWeight: 400, maxWidth: '800px', margin: '0 auto 3rem auto', letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              {personal?.tagline}
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '2rem auto 0 auto', lineHeight: 1.7, opacity: 0.8 }}>
              {personal?.short_bio}
            </p>
          </div>
        </section>

        {/* MASTER TERMINAL UI */}
        <TerminalUI experience={experience} education={education} skills={skills} projects={projects} />

        {/* DEDICATED CONTACT SECTION */}
        <section id="connect" style={{ width: '100%', maxWidth: '1400px', padding: '2rem 2rem 4rem 2rem' }}>
          <div id="contact" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <Contact personal={personal} />
          </div>
        </section>

      </main>
    </>
  );
}
