import { getProjects } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');

  let projects = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.error('Error fetching sitemap projects:', err);
  }

  const effectiveProjects = (projects && projects.length > 0) ? projects : FALLBACK_PROJECTS;
  const projectUrls = effectiveProjects
    .filter((project) => project?.slug || project?.id)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug || project.id}`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date('2026-09-15'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  return [...routes, ...projectUrls];
}

