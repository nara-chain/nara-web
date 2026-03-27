export default function sitemap() {
  const baseUrl = 'https://nara.build';

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/learn', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/docs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/agents', priority: 0.8, changeFrequency: 'daily' },
    { path: '/aapps', priority: 0.8, changeFrequency: 'daily' },
    { path: '/tokenomics', priority: 0.7, changeFrequency: 'monthly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
