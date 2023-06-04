import Link from 'next/link'

import { publicRoutes } from '@/lib/cms'

export default function SitePage() {
  return (
    <div className="prose">
      <h1> Sitemap</h1>
      <ul>
        {publicRoutes.map((route) => (
          <li key={route}>
            <Link href="route">{route}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
