import { getPersonalInfo, getEducation, getExperience, getProjects, getSkills } from '@/lib/api';
import { FALLBACK_PERSONAL, FALLBACK_EXPERIENCE, FALLBACK_EDUCATION, FALLBACK_PROJECTS, FALLBACK_SKILLS } from '@/lib/fallbackData';
import Contact from '@/components/sections/Contact';
import TerminalUI from '@/components/sections/TerminalUI';
import SceneWrapper from '@/components/three/SceneWrapper';
import { Suspense } from 'react';

export const revalidate = 300;

export default async function Home() {
  const [personalRes, projectsRes, skillsRes, educationRes, experienceRes] = await Promise.all([
    getPersonalInfo(),
    getProjects(false),
    getSkills(),
    getEducation(),
    getExperience(),
  ]);

  const personal = personalRes || FALLBACK_PERSONAL;
  const experience = (experienceRes && experienceRes.length > 0) ? experienceRes : FALLBACK_EXPERIENCE;
  const education = (educationRes && educationRes.length > 0) ? educationRes : FALLBACK_EDUCATION;
  const projects = (projectsRes && projectsRes.length > 0) ? projectsRes : FALLBACK_PROJECTS;
  const skills = (skillsRes && skillsRes.length > 0) ? skillsRes : FALLBACK_SKILLS;

  return (
    <>
      <Suspense fallback={null}>
        <SceneWrapper skills={skills} projects={projects} />
      </Suspense>
      
      <main style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* SEMANTIC HERO SECTION */}
        <section 
          aria-label="Professional Introduction"
          style={{ 
            minHeight: '48vh', 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '8rem 2rem 0 2rem' 
          }}
        >
          <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', position: 'relative' }}>
            
            {/* Minimalist System Badge */}
            <div className="mono-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', backdropFilter: 'blur(12px)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 12px var(--accent-color)' }}></span>
              Available for new opportunities &amp; engineering roles
            </div>

            <h1 style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: '1.05' }}>
              <span style={{ display: 'block' }}>Rohit</span>
              <span className="gradient-text">Chouhan</span>
            </h1>
            
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', color: 'var(--text-secondary)', fontWeight: 500, maxWidth: '820px', margin: '0 auto 2rem auto', letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              Software Engineer &amp; React Native Developer
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '1.5rem auto 0 auto', lineHeight: 1.75, opacity: 0.9 }}>
              {personal.bio || 'Rohit Chouhan (also searched as Rohit Chauhan) is a Software Engineer based in Sangli, Maharashtra, India. He engineers production enterprise mobile applications at GTT Data Solutions, specializing in React Native, Android systems, offline-first SQLite architectures, and full-stack backend development with Node.js and Express.'}
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
