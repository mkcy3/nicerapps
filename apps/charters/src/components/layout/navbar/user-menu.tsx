'use client'
import { Menu, Transition } from '@headlessui/react'
import { Menu as IconMenu, User } from 'iconoir-react'
import React, { Fragment } from 'react'

import { buttonVariantStyles } from '@/components/ui/button'
import { userNavigation } from '@/lib/cms'
import { cn } from '@/lib/utils'

export default function UserMenu({ children }: { children: React.ReactNode }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button
          data-testid="user-menu"
          className={cn(
            buttonVariantStyles.secondary,
            'space-x-2 px-2 text-black hover:shadow-md'
          )}
        >
          {children}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={cn(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
