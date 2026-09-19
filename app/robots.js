export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thank-you'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

