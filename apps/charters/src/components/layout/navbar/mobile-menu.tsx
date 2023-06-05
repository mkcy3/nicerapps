'use client'

import { Dialog } from '@headlessui/react'
import { Cancel } from 'iconoir-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

type MobileMenuProps = {
  children: React.ReactNode
  menu: { href: string; name: string }[]
}
export default function MobileMenu({ menu, children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="secondary"
        className="space-x-2 px-2 text-black hover:shadow-md"
        onClick={() => {
          setIsOpen(true)
        }}
        data-testid="open-mobile-menu"
      >
        {children}
      </Button>

      <Dialog
        as="div"
        className="md:hidden"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <button
              type="button"
              className="-mx-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setIsOpen(false)}
              data-testid="close-mobile-menu"
            >
              <span className="sr-only">Close menu</span>
              <Cancel className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root" data-testid="mobile-menu">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/trip"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
