import Link from 'next/link'

import Logo from '@/components/logo'
import Container from '@/components/ui/container'
import { navbarNavigation } from '@/lib/cms'

import DropMenu from './drop-menu'
import MobileMenu from './mobile-menu'
import UserButton from './user-button'

export default function Navbar() {
  return (
    <header className="text-charcoal border-b bg-white px-6 py-4">
      <Container>
        <nav
          className="flex items-center justify-between gap-x-6"
          aria-label="Global"
        >
          <div className="hidden md:flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <div className="flex items-center">
                <span className="sr-only">Nicer Charters</span>
                <Logo />
                <span className="text-charcoal hidden md:inline-block">
                  Nicer Charters
                </span>
              </div>
            </Link>
          </div>

          <div className="flex gap-x-6">
            {navbarNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-block px-2 text-sm font-semibold hover:text-slate-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <div className="hidden md:block">
              <DropMenu>
                {/* @ts-expect-error even with 5.1 and using workspace version this errors... */}
                <UserButton />
              </DropMenu>
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
