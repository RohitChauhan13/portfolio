import { getPersonalInfo, getEducation, getExperience, getProjects, getSkills } from '@/lib/api';
import { FALLBACK_PERSONAL, FALLBACK_EXPERIENCE, FALLBACK_EDUCATION, FALLBACK_PROJECTS, FALLBACK_SKILLS } from '@/lib/fallbackData';
import Contact from '@/components/sections/Contact';
import TerminalUI from '@/components/sections/TerminalUI';
import SceneWrapper from '@/components/three/SceneWrapper';
import { Suspense } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Code2, 
  ExternalLink, 
  GraduationCap, 
  Layers, 
  MapPin, 
  Smartphone, 
  Server, 
  Database, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

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

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <>
      <Suspense fallback={null}>
        <SceneWrapper skills={skills} projects={projects} />
      </Suspense>
      
      <main style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section 
          id="hero"
          aria-label="Professional Introduction"
          style={{ 
            minHeight: '80vh', 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '8rem 2rem 4rem 2rem',
            textAlign: 'center'
          }}
        >
          <div style={{ maxWidth: '1000px', width: '100%', position: 'relative' }}>
            
            {/* System Badge */}
            <div className="mono-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.25rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 12px var(--accent-color)' }}></span>
              Available for full-time engineering roles &amp; high-impact projects
            </div>

            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: '1.05' }}>
              <span>Rohit </span>
              <span className="gradient-text">Chouhan</span>
            </h1>
            
            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.85rem)', color: 'var(--text-secondary)', fontWeight: 500, maxWidth: '850px', margin: '0 auto 1.5rem auto', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Software Engineer &amp; React Native Developer
            </h2>

            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto 2.5rem auto', lineHeight: 1.75, opacity: 0.95 }}>
              {personal.bio || 'Rohit Chouhan (also searched as Rohit Chauhan) is a Software Engineer based in Sangli, Maharashtra, India. He engineers production enterprise mobile applications at GTT Data Solutions, specializing in React Native, Android systems, offline-first SQLite architectures, and full-stack backend development with Node.js and Express.'}
            </p>

            {/* Quick Action CTAs */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="#projects" 
                style={{ 
                  padding: '0.85rem 2rem', 
                  borderRadius: '10px', 
                  background: 'var(--accent-color)', 
                  color: '#fff', 
                  fontWeight: 600, 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  boxShadow: '0 4px 20px var(--accent-glow)' 
                }}
              >
                Explore Projects <ArrowRight size={18} />
              </a>
              <a 
                href="#experience" 
                className="mono-text"
                style={{ 
                  padding: '0.85rem 1.75rem', 
                  borderRadius: '10px', 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)', 
                  fontWeight: 500, 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}
              >
                Work Experience
              </a>
              <a 
                href="https://github.com/RohitChauhan13" 
                target="_blank"
                rel="noreferrer"
                className="mono-text"
                style={{ 
                  padding: '0.85rem 1.75rem', 
                  borderRadius: '10px', 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)', 
                  fontWeight: 500, 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}
              >
                <GithubIcon size={18} /> GitHub @RohitChauhan13
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================
            INTERACTIVE TERMINAL CLI SHOWCASE
            ======================================================== */}
        <section 
          id="terminal" 
          aria-label="Interactive Terminal Interface"
          style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem 4rem 2rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--accent-color)' }}>
              &gt; SYSTEM_INTERFACE
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Interactive developer console — click tabs to query datasets
            </p>
          </div>
          <TerminalUI experience={experience} education={education} skills={skills} projects={projects} />
        </section>

        {/* ========================================================
            ABOUT & ENTITY IDENTITY SECTION
            ======================================================== */}
        <section 
          id="about" 
          aria-label="About Rohit Chouhan"
          style={{ width: '100%', maxWidth: '1200px', padding: '4rem 2rem' }}
        >
          <div className="glass-panel" style={{ padding: '3.5rem 2.5rem', borderRadius: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '1rem' }} className="mono-text">
              <Sparkles size={16} /> ABOUT THE ENGINEER
            </div>
            
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Building Production Mobile &amp; Full Stack Architectures
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '2.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              <div>
                <p style={{ marginBottom: '1.25rem' }}>
                  <strong>Rohit Chouhan</strong> (frequently searched and recognized on developer profiles as <strong>Rohit Chauhan</strong>) is a Software Engineer at <strong>GTT Data Solutions</strong> in Sangli, Maharashtra, India. He builds and ships robust, enterprise-grade mobile applications with React Native, Android native modules, and scalable Node.js/Express backends.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  At GTT Data Solutions, Rohit played an instrumental role in conducting Android architectural audits and successfully migrating <strong>6+ production APKs</strong> to comply with Google&apos;s mandatory <strong>16KB memory page-size policy</strong>, auditing third-party native libraries and ensuring seamless OS compatibility.
                </p>
                <p>
                  He specializes in <strong>offline-first mobile architectures</strong>, combining SQLite local persistence with Redux Toolkit and automatic offline-to-online network synchronization to deliver resilient mobile user experiences in low-connectivity environments.
                </p>
              </div>

              <div>
                <p style={{ marginBottom: '1.25rem' }}>
                  Beyond mobile, Rohit develops custom backend architectures in Node.js, Express.js, MySQL, and PostgreSQL, implementing indexing, query optimization, rate limiting, and transactional workflows. He has independently deployed full-stack products on <strong>Microsoft Azure Windows VMs</strong> configured with DuckDNS dynamic routing and Caddy reverse proxies.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  Rohit graduated with a <strong>Bachelor of Computer Applications (BCA)</strong> from the Institute of Management and Rural Development Administration (IMRDA), Sangli — affiliated with Bharati Vidyapeeth University — achieving an outstanding <strong>9.0 / 10 CGPA</strong> and ranking in the <strong>Top 1% of the batch</strong>.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <MapPin size={22} color="var(--accent-color)" />
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Based in Sangli, Maharashtra, India &bull; Regional roots in Gwalior, Madhya Pradesh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            WORK EXPERIENCE SECTION
            ======================================================== */}
        <section 
          id="experience" 
          aria-label="Work Experience"
          style={{ width: '100%', maxWidth: '1200px', padding: '4rem 2rem' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }} className="mono-text">
              <Briefcase size={16} /> CAREER TRAJECTORY
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Work Experience
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map((item) => {
              const techArray = Array.isArray(item.tech_stack) 
                ? item.tech_stack 
                : (typeof item.tech_stack === 'string' ? item.tech_stack.split(',') : []);

              return (
                <article 
                  key={item.id || item.company}
                  className="glass-panel"
                  style={{ padding: '2.5rem', borderRadius: '20px' }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {item.role}
                      </h3>
                      <div style={{ fontSize: '1.1rem', color: 'var(--accent-color)', fontWeight: 500 }}>
                        {item.company}
                      </div>
                    </div>

                    <div className="mono-text" style={{ padding: '0.4rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {item.is_current ? 'May 2025 – Present' : `${item.start_date} – ${item.end_date}`}
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {techArray.map((tech) => (
                      <span 
                        key={tech} 
                        className="mono-text skill-pill"
                        style={{ padding: '0.4rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}
                      >
                        {typeof tech === 'string' ? tech.trim() : tech}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            FEATURED PROJECTS SECTION
            ======================================================== */}
        <section 
          id="projects" 
          aria-label="Verified Engineering Projects"
          style={{ width: '100%', maxWidth: '1200px', padding: '4rem 2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }} className="mono-text">
                <Layers size={16} /> PORTFOLIO OF WORK
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Verified Engineering Projects
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '420px', margin: 0 }}>
              Live commercial platforms, enterprise client apps, and open-source systems engineered by Rohit Chouhan.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}>
            {projects.map((project) => {
              let techArray = [];
              try {
                techArray = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []);
              } catch {
                if (typeof project.tech_stack === 'string') techArray = project.tech_stack.split(',');
              }

              return (
                <article 
                  key={project.slug || project.id}
                  className="glass-panel"
                  style={{ padding: '2rem', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {project.title}
                      </h3>
                      {project.is_featured ? (
                        <span className="mono-text" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'var(--accent-glow)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                          FEATURED
                        </span>
                      ) : null}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                      {project.short_description || project.full_description?.slice(0, 160)}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {techArray.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="mono-text"
                          style={{ padding: '0.25rem 0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                        >
                          {typeof tech === 'string' ? tech.trim() : tech}
                        </span>
                      ))}
                      {techArray.length > 4 && (
                        <span className="mono-text" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          +{techArray.length - 4} more
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <Link 
                        href={`/projects/${project.slug || project.id}`}
                        className="mono-text"
                        style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        View Architecture &rarr;
                      </Link>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" title="Source Code on GitHub" style={{ color: 'var(--text-secondary)' }}>
                            <GithubIcon size={18} />
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" title="Launch Live App" style={{ color: 'var(--text-secondary)' }}>
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            TECHNICAL SKILLS SECTION
            ======================================================== */}
        <section 
          id="skills" 
          aria-label="Technical Skills and Proficiencies"
          style={{ width: '100%', maxWidth: '1200px', padding: '4rem 2rem' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }} className="mono-text">
              <Code2 size={16} /> ENGINEERING STACK
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Technical Skills &amp; Proficiencies
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            {/* Mobile Development */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Smartphone size={22} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Mobile Engineering</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['React Native', 'Android Development', 'Android 16KB Page Migration', 'Redux Toolkit', 'SQLite (Local DB)', 'Offline-First Sync', 'FCM Push Notifications', 'Google Maps SDK'].map((s) => (
                  <span key={s} className="skill-pill mono-text" style={{ padding: '0.45rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & Cloud */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Server size={22} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Backend &amp; APIs</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Node.js', 'Express.js', 'REST API Architecture', 'Rate Limiting', 'Authentication & Sessions', 'Brevo Email API', 'Caddy Reverse Proxy', 'Azure Windows VM'].map((s) => (
                  <span key={s} className="skill-pill mono-text" style={{ padding: '0.45rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases & Storage */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Database size={22} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Databases &amp; Storage</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['SQLite', 'MySQL', 'PostgreSQL', 'Firebase Database', 'Indexing & Optimization', 'Database Schemas', 'Query Pooling'].map((s) => (
                  <span key={s} className="skill-pill mono-text" style={{ padding: '0.45rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages & Workflow */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Wrench size={22} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Languages &amp; Tooling</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Git & GitHub', 'Google Play Console', 'Postman', 'JMeter', 'Cursor / Claude Code'].map((s) => (
                  <span key={s} className="skill-pill mono-text" style={{ padding: '0.45rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            EDUCATION & QUALIFICATIONS SECTION
            ======================================================== */}
        <section 
          id="education" 
          aria-label="Education & Qualifications"
          style={{ width: '100%', maxWidth: '1200px', padding: '4rem 2rem' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }} className="mono-text">
              <GraduationCap size={16} /> ACADEMIC CREDENTIALS
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Education &amp; Qualifications
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
            {education.map((item) => (
              <article 
                key={item.id || item.degree}
                className="glass-panel"
                style={{ padding: '2rem', borderRadius: '16px' }}
              >
                <div className="mono-text" style={{ color: 'var(--accent-color)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {item.start_year} – {item.end_year}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.degree}
                </h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {item.institution}
                </div>
                {item.grade && (
                  <div className="mono-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.75rem', background: 'var(--accent-glow)', color: 'var(--accent-color)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <CheckCircle2 size={14} /> {item.grade}
                  </div>
                )}
                {item.description && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================
            DEDICATED CONTACT SECTION
            ======================================================== */}
        <section 
          id="contact" 
          aria-label="Contact Rohit Chouhan"
          style={{ width: '100%', maxWidth: '1400px', padding: '4rem 2rem 6rem 2rem' }}
        >
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <Contact personal={personal} />
          </div>
        </section>

      </main>
    </>
  );
}
