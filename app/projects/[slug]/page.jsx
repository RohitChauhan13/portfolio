import { getProjectBySlug, getProjects } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectTerminal from '@/components/sections/ProjectTerminal';
import ProjectMediaTabs from '@/components/sections/ProjectMediaTabs';
import { ArrowLeft, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';

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

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');
  const title = `${project.title} | Software Engineering Case Study`;
  const description = project.short_description || project.full_description?.slice(0, 160) || `Learn about ${project.title}, an engineering project by Software Engineer Rohit Chouhan (Rohit Chauhan).`;
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
    'Software Engineering Project',
    'Rohit Chouhan',
    'Rohit Chauhan',
    'React Native Project',
    'Android Project',
    'Full Stack Development',
    'Software Engineer Sangli',
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
      title: `${project.title} | Software Engineering Project`,
      description,
      url,
      siteName: 'Rohit Chouhan Portfolio',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — Case Study by Rohit Chouhan` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Software Engineering Project`,
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
            'item': `${baseUrl}/#projects`
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
        'headline': project.title,
        'description': project.full_description || project.short_description,
        'operatingSystem': 'Android, iOS, Web',
        'applicationCategory': 'DeveloperApplication',
        'url': `${baseUrl}/projects/${project.slug || slug}`,
        ...(project.github_url ? { 'codeRepository': project.github_url } : {}),
        'author': {
          '@type': 'Person',
          'name': 'Rohit Chouhan',
          'alternateName': 'Rohit Chauhan',
          'url': baseUrl
        }
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
            <Link href="/#projects" style={{ color: 'var(--text-secondary)' }}>
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
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '9999px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }} className="mono-text">
          <Layers size={14} color="var(--accent-color)" />
          Engineering Case Study by Rohit Chouhan (Rohit Chauhan)
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {project.title}
        </h1>

        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '850px', marginBottom: '2rem' }}>
          {project.short_description || project.full_description}
        </p>

        {/* Metadata Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="mono-text">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
            Role: Lead Mobile &amp; Full Stack Engineer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="mono-text">
            <CheckCircle2 size={16} color="var(--accent-color)" />
            Verified Production Architecture
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
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
          {project.live_url && (
            <a 
              href={project.live_url} 
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
          {project.github_url && (
            <a 
              href={project.github_url} 
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
            href="/#projects"
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

      {/* Case Study Full Overview */}
      <section style={{ marginBottom: '3.5rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Architecture &amp; Technical Breakdown
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            {project.full_description || project.short_description}
          </p>
          <p>
            Engineered and delivered by <strong>Rohit Chouhan</strong>, this project exemplifies enterprise-level engineering standards, robust error boundaries, optimized state synchronization, and scalable data models tailored for modern mobile and cloud ecosystems.
          </p>
        </div>
      </section>

      {/* Interactive Terminal Showcase */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            System Architecture CLI View
          </h2>
          <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            interactive console
          </span>
        </div>
        <ProjectTerminal project={project} techStack={techStack} />
      </section>

      {/* Tabs for Media */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Visual Demonstrations &amp; Media
        </h2>
        <ProjectMediaTabs project={project} images={images} />
      </section>

      {/* Related Projects Section for Deep Internal Linking */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3.5rem', marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Explore More Projects by Rohit Chouhan
          </h2>
          <Link href="/#projects" className="mono-text" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            View All &rarr;
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
