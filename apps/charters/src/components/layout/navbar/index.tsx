import Link from 'next/link'

import MobileMenu from './mobile-menu'

const menu = [
  { name: 'Destinations', href: '#' },
  { name: 'Itinerary', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Rates', href: '#' },
]

export default function Navbar() {
  return (
    <header>
      <nav
        className="flex items-center justify-between gap-x-6 pt-6"
        aria-label="Global"
      >
        <div className="flex md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="hidden md:flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="hidden md:flex md:gap-x-6 lg:gap-x-12">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="inline-block text-sm font-semibold text-white hover:text-slate-500"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link
            href="/trip"
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white shadow-sm"
          >
            Check Dates
          </Link>
        </div>
      </nav>
    </header>
  )
}
