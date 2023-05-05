import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/login']

  const routesMap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routesMap]
}