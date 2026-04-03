export default function sitemap() {
  const baseUrl = 'https://nara.build';

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/agents', priority: 0.9, changeFrequency: 'daily' },
    { path: '/docs', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/aapps', priority: 0.8, changeFrequency: 'daily' },
    { path: '/learn', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tokenomics', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/press', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/llms.txt', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
