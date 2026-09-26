import { getProjectBySlug, getProjects } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';
import { PROJECT_DETAILS } from '@/lib/projectDetailsData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectTerminal from '@/components/sections/ProjectTerminal';
import ProjectMediaTabs from '@/components/sections/ProjectMediaTabs';
import { ArrowLeft, ExternalLink, Layers, CheckCircle2, Cpu, ShieldCheck, Zap, HelpCircle, BarChart3 } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const revalidate = 300;

export async function generateStaticParams() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (err) {
    // Fall back to static project list
  }
  const effectiveProjects = (projects && projects.length > 0) ? projects : FALLBACK_PROJECTS;
  return effectiveProjects
    .filter((p) => p.slug || p.id)
    .map((p) => ({
      slug: p.slug || String(p.id),
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = (await getProjectBySlug(slug)) || FALLBACK_PROJECTS.find(p => p.slug === slug || String(p.id) === slug);
  if (!project) return { title: 'Project Not Found | Rohit Chouhan' };

  const details = PROJECT_DETAILS[project.slug || slug] || {};
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');
  
  const title = details.metaTitle || `${project.title} Case Study & Architecture | Rohit Chouhan`;
  const description = details.metaDescription || project.short_description || project.full_description?.slice(0, 160) || `Learn about ${project.title}, an engineering project by Software Engineer Rohit Chouhan (Rohit Chauhan).`;
  const ogImage = project.thumbnail_url || project.image_url || `${baseUrl}/og-image.png`;
  const url = `${baseUrl}/projects/${project.slug || slug}`;
  
  let techArray = [];
  try {
    techArray = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []);
  } catch {
    if (typeof project.tech_stack === 'string') techArray = project.tech_stack.split(',');
  }

  const keywords = [
    project.title,
    `${project.title} case study`,
    `${project.title} architecture`,
    `${project.title} Rohit Chouhan`,
    `${project.title} Rohit Chauhan`,
    'Software Engineering Project',
    'React Native Project',
    'Android Project',
    'Full Stack Development',
    'Software Engineer Sangli',
    'Mobile Application Architecture',
    ...techArray,
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Rohit Chouhan Portfolio',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — Case Study by Rohit Chouhan` }],
      type: 'article',
      publishedTime: project.created_at || '2026-08-31T10:16:20.000Z',
      authors: ['Rohit Chouhan (Rohit Chauhan)'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@RohitChauhan13',
    }
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = (await getProjectBySlug(slug)) || FALLBACK_PROJECTS.find(p => p.slug === slug || String(p.id) === slug);
  
  if (!project) {
    notFound();
  }

  const details = PROJECT_DETAILS[project.slug || slug] || {};
  const allProjects = FALLBACK_PROJECTS;
  const relatedProjects = allProjects.filter(p => (p.slug || String(p.id)) !== (project.slug || slug)).slice(0, 3);
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');

  let techStack = [];
  try { 
    techStack = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []); 
  } catch(e) {
    if (typeof project.tech_stack === 'string') techStack = project.tech_stack.split(',');
  }
  
  let images = [];
  try { 
    images = typeof project.images === 'string' ? JSON.parse(project.images) : (project.images || []); 
  } catch(e) {}

  const liveUrl = project.live_url || details.liveUrl;
  const githubUrl = project.github_url || details.githubUrl;

  const faqs = details.faqs || [
    {
      question: `What is ${project.title}?`,
      answer: `${project.title} is an engineering project developed by Rohit Chouhan (Rohit Chauhan). ${project.full_description || project.short_description}`
    },
    {
      question: `Who engineered ${project.title}?`,
      answer: `This project was engineered by Rohit Chouhan, Software Engineer and React Native Developer at GTT Data Solutions in Sangli, Maharashtra, India.`
    }
  ];

  // Comprehensive JSON-LD Structured Data Schema (@graph)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Projects',
            'item': `${baseUrl}/#terminal`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': project.title,
            'item': `${baseUrl}/projects/${project.slug || slug}`
          }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${baseUrl}/projects/${project.slug || slug}#software`,
        'name': project.title,
        'headline': `${project.title} — Software Engineering Case Study`,
        'description': project.full_description || project.short_description,
        'operatingSystem': details.platform || 'Android, iOS, Web',
        'applicationCategory': 'DeveloperApplication',
        'url': `${baseUrl}/projects/${project.slug || slug}`,
        ...(githubUrl ? { 'codeRepository': githubUrl } : {}),
        ...(liveUrl ? { 'installUrl': liveUrl } : {}),
        'author': {
          '@type': 'Person',
          'name': 'Rohit Chouhan',
          'alternateName': 'Rohit Chauhan',
          'url': baseUrl
        }
      },
      {
        '@type': 'TechArticle',
        '@id': `${baseUrl}/projects/${project.slug || slug}#article`,
        'headline': `${project.title} System Architecture & Technical Case Study`,
        'description': details.metaDescription || project.short_description,
        'url': `${baseUrl}/projects/${project.slug || slug}`,
        'datePublished': project.created_at || '2026-08-31T10:16:20.000Z',
        'dateModified': new Date().toISOString(),
        'inLanguage': 'en-US',
        'mainEntityOfPage': `${baseUrl}/projects/${project.slug || slug}`,
        'author': {
          '@type': 'Person',
          'name': 'Rohit Chouhan',
          'alternateName': 'Rohit Chauhan',
          'jobTitle': 'Software Engineer & React Native Developer',
          'url': baseUrl
        },
        'publisher': {
          '@type': 'Person',
          'name': 'Rohit Chouhan',
          'url': baseUrl
        },
        'proficiencyLevel': 'Expert',
        'dependencies': techStack.join(', ')
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/projects/${project.slug || slug}#faq`,
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main style={{ padding: '8rem 1.5rem 5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
        <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }} className="mono-text">
          <li>
            <Link href="/" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              Home
            </Link>
          </li>
          <li style={{ color: 'var(--text-secondary)' }}>/</li>
          <li>
            <Link href="/#terminal" style={{ color: 'var(--text-secondary)' }}>
              Projects
            </Link>
          </li>
          <li style={{ color: 'var(--text-secondary)' }}>/</li>
          <li style={{ color: 'var(--accent-color)' }} aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* Case Study Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }} className="mono-text">
          <Layers size={14} color="var(--accent-color)" />
          Engineering Case Study by Rohit Chouhan (Rohit Chauhan)
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {project.title}
        </h1>

        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px', marginBottom: '1.75rem' }}>
          {details.subtitle || project.short_description}
        </p>

        {/* Metadata Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="mono-text">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
            Role: {details.role || 'Lead Mobile & Full Stack Engineer'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="mono-text">
            <CheckCircle2 size={16} color="var(--accent-color)" />
            {details.status || 'Verified Production Architecture'}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="mono-text" 
              style={{ 
                padding: '0.45rem 1rem', 
                background: 'var(--card-bg)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                fontSize: '0.85rem', 
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary" 
              style={{ 
                padding: '0.85rem 2rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'var(--accent-color)', 
                color: '#fff', 
                border: 'none',
                boxShadow: '0 4px 16px var(--accent-glow)'
              }}
            >
              Launch Live App <ExternalLink size={18} />
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline" 
              style={{ 
                padding: '0.85rem 2rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'var(--card-bg)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)' 
              }}
            >
              <GithubIcon size={18} /> View Source Code
            </a>
          )}
          <Link
            href="/"
            className="mono-text"
            style={{
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              border: '1px solid transparent'
            }}
          >
            <ArrowLeft size={16} /> Back to All Projects
          </Link>
        </div>
      </header>

      {/* Interactive System Architecture Terminal (Front and Center CLI View) */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="var(--accent-color)" />
            System Architecture CLI View
          </h2>
          <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            interactive console
          </span>
        </div>
        <ProjectTerminal project={project} techStack={techStack} />
      </section>

      {/* Deep-Dive Case Study: Architecture & Engineering Breakdown */}
      <section style={{ marginBottom: '3.5rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '0.75rem' }} className="mono-text">
          <ShieldCheck size={16} />
          Executive Architecture Overview
        </div>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
          Engineering Breakdown: How {project.title} Was Architected
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.25rem' }}>
            {details.overview || project.full_description || project.short_description}
          </p>
          <p>
            Engineered and delivered by <strong>Rohit Chouhan (Rohit Chauhan)</strong>, this solution demonstrates enterprise-level mobile architecture, resilient state synchronization, and scalable data models tailored for modern mobile and cloud ecosystems.
          </p>
        </div>
      </section>

      {/* Key Architectural Highlights */}
      {details.architectureHighlights && details.architectureHighlights.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Key Architectural Innovations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {details.architectureHighlights.map((item, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.badge}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenges & Engineering Solutions */}
      {details.challenges && details.challenges.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Technical Challenges &amp; Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {details.challenges.map((c, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div>
                  <span className="mono-text" style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
                    Challenge #{idx + 1}
                  </span>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 }}>
                    {c.challenge}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
                    Engineered Solution
                  </span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    {c.solution}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>
                    <Zap size={14} color="var(--accent-color)" />
                    Impact: {c.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Impact & Key Metrics */}
      {details.metrics && details.metrics.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={20} color="var(--accent-color)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Production Impact &amp; Metrics
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {details.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '1.75rem', textAlign: 'center' }}
              >
                <div className="gradient-text mono-text" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {m.value}
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>
                  {m.label}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {m.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visual Demonstrations & Media Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Visual Demonstrations &amp; Media
        </h2>
        <ProjectMediaTabs project={project} images={images} />
      </section>

      {/* Technical FAQ Section (Critical for AI Search Citations & Google FAQ Rich Snippets) */}
      <section style={{ marginBottom: '4rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <HelpCircle size={20} color="var(--accent-color)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Frequently Asked Questions: {project.title}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqs.map((faq, idx) => (
            <article 
              key={idx} 
              style={{ borderBottom: idx < faqs.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx < faqs.length - 1 ? '1.5rem' : 0 }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {faq.question}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Author & Verification Card */}
      <div 
        className="glass-panel" 
        style={{ padding: '2rem', marginBottom: '3.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
      >
        <div>
          <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>
            ENGINEERING CREDENTIALS
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Case Study Authored by Rohit Chouhan
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Software Engineer &amp; React Native Developer at GTT Data Solutions (Sangli, Maharashtra, India)
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link 
            href="/#connect" 
            className="btn btn-primary"
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              background: 'var(--accent-color)', 
              color: '#fff', 
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            Contact Rohit
          </Link>
          <a 
            href="https://github.com/RohitChauhan13" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline"
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <GithubIcon size={16} /> GitHub Profile
          </a>
        </div>
      </div>

      {/* Related Projects Section for Deep Internal Linking */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Explore More Engineering Case Studies
          </h2>
          <Link href="/#terminal" className="mono-text" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            View All in Terminal &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {relatedProjects.map((rel) => (
            <article 
              key={rel.slug || rel.id}
              className="glass-panel"
              style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {rel.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {rel.short_description?.slice(0, 130)}...
                </p>
              </div>
              <Link 
                href={`/projects/${rel.slug || rel.id}`}
                className="mono-text"
                style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                Read Case Study &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
      
    </main>
  );
}
