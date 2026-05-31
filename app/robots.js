export default function robots() {
  const base = 'https://zoomagazin.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
