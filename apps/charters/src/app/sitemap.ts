import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/login',
    '/trip',
    '/rates',
    '/itinerary',
    '/privacy',
    '/terms-of-use',
  ]

  const routesMap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routesMap]
}
