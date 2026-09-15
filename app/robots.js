export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohitchouhan.com').replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
