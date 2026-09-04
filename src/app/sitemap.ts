import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://afaq-inv.com';
  const locales = ['ar', 'en'];

  const routes = ['', '/properties', '/services', '/security', '/about', '/contact'].flatMap((route) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    }));
  });

  return routes;
}
