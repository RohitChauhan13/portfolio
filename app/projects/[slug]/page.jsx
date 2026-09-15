import { getProjectBySlug, getProjects } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectTerminal from '@/components/sections/ProjectTerminal';
import ProjectMediaTabs from '@/components/sections/ProjectMediaTabs';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | Rohit Chouhan' };

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohitchouhan.com').replace(/\/$/, '');
  const title = `${project.title} | Software Engineering Project`;
  const description = project.short_description || `Learn about ${project.title}, a technical project by Software Engineer Rohit Chouhan.`;
  const ogImage = project.image_url || `${baseUrl}/og-image.jpg`;
  const url = `${baseUrl}/projects/${slug}`;
  const keywords = [
    project.title,
    'Software Engineering Project',
    'Rohit Chouhan',
    'React Project',
    'Next.js Project',
    'Full Stack Development',
    ...(Array.isArray(project.tech_stack) ? project.tech_stack : []),
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
      images: [{ url: ogImage, alt: project.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  let techStack = [];
  try { techStack = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : project.tech_stack; } catch(e) {
    if (typeof project.tech_stack === 'string') techStack = project.tech_stack.split(',');
  }
  
  let images = [];
  try { images = typeof project.images === 'string' ? JSON.parse(project.images) : project.images; } catch(e) {}

  return (
    <main style={{ padding: '8rem 1rem 5rem 1rem', maxWidth: '1200px', margin: '0 auto', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
      
      <Link href="/?tab=projects#terminal" className="mono-text" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.9rem', transition: 'color 0.2s' }}>
        <span style={{ fontSize: '1.2rem' }}>←</span> SYSTEM.RETURN
      </Link>

      <ProjectTerminal project={project} techStack={techStack} />

      {/* Action Buttons */}
      {(project.live_url || project.github_url) && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-color)', color: '#fff', border: 'none' }}>
              Launch Live App
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View Source Code
            </a>
          )}
        </div>
      )}

      {/* Tabs for Media */}
      <ProjectMediaTabs project={project} images={images} />
      
    </main>
  );
}
