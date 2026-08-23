import { getProjects } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rohitchouhan.com';
  
  // Get all dynamic projects
  const projects = await getProjects();
  const projectUrls = (projects || []).map((project) => ({
    url: `${baseUrl}/projects/${project.slug || project.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Static routes
  const routes = ['', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...projectUrls];
}
