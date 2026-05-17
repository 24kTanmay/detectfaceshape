export default function sitemap() {
  return [
    {
      url: 'https://detectfaceshape.shop',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://detectfaceshape.shop/results',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
