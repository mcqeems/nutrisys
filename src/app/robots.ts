import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrisys.my.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/analyze', '/chatbot', '/journal', '/notifications', '/target', '/user', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
