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
  const now = new Date();

  const projectUrls = effectiveProjects
    .filter((project) => project?.slug || project?.id)
    .map((project) => {
      let lastMod = now;
      if (project.updated_at) {
        lastMod = new Date(project.updated_at);
      } else if (project.created_at) {
        lastMod = new Date(project.created_at);
      }
      return {
        url: `${baseUrl}/projects/${project.slug || project.id}`,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.9,
      };
    });

  const routes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(now.getFullYear(), now.getMonth(), 1),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(now.getFullYear(), now.getMonth(), 1),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...routes, ...projectUrls];
}
