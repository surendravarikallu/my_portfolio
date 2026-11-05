import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'PerplexityBot', 'ChatGPT-User', 'Applebot'],
        allow: '/',
      },
    ],
    sitemap: 'https://surendravarikallu.dev/sitemap.xml',
    host: 'https://surendravarikallu.dev',
  };
}

