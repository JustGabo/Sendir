import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/account/',
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: 'https://sendir.app/sitemap.xml',
  }
} 