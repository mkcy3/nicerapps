import Link from 'next/link'

import { buttonVariantStyles } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { navbarNavigation } from '@/lib/cms'
import { cn } from '@/lib/utils'

import MobileMenu from './mobile-menu'
import UserButton from './user-button'
import UserMenu from './user-menu'

export default function Navbar() {
  return (
    <header className="bg-white px-6 py-4 text-black">
      <Container>
        <nav
          className="flex items-center justify-between gap-x-6"
          aria-label="Global"
        >
          <div className="hidden md:flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Nicer Charters</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>
          <div className="flex space-x-6 md:hidden">
            {navbarNavigation.map(
              (item) =>
                !item.href.startsWith('#') && (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-block  text-sm  font-semibold hover:text-slate-500"
                  >
                    {item.name}
                  </Link>
                )
            )}
          </div>

          <div className="hidden md:flex md:gap-x-6 lg:gap-x-12">
            {navbarNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-block text-sm font-semibold  hover:text-slate-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <div className="hidden md:block">
              <UserMenu>
                {/* @ts-expect-error even with 5.1 and using workspace version this errors... */}
                <UserButton />
              </UserMenu>
            </div>
            <div className="block md:hidden">
              <MobileMenu menu={navbarNavigation}>
                {/* @ts-expect-error even with 5.1 and using workspace version this errors... */}
                <UserButton />
              </MobileMenu>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
