'use client'

import { Listbox, Transition } from '@headlessui/react'
import { ArrowUp, Bed, BedReady, Check, Group, SeaWaves } from 'iconoir-react'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'

const people = [
  { id: 0, name: 'Passengers', icon: Group },
  { id: 1, name: '1', icon: BedReady },
  { id: 2, name: '2', icon: BedReady },
  { id: 3, name: '3', icon: BedReady },
  { id: 4, name: '4 with two berths', icon: BedReady },
  { id: 5, name: '5', icon: Bed },
  { id: 6, name: '6 convert saloon bed', icon: Bed },
  { id: 7, name: '7', icon: SeaWaves },
  { id: 8, name: '8', icon: SeaWaves },
]
type PassengerMenuProps = {
  selectedIndex: number
  setSelectedIndex: (value: number) => void
}
export default function PassengerMenu({
  selectedIndex,
  setSelectedIndex,
}: PassengerMenuProps) {
  const selected = people[selectedIndex]
  function setSelected(value: { id: number }) {
    setSelectedIndex(value.id)
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="flex w-2/3 flex-col py-1 sm:py-5 xl:w-1/2">
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <Group
                  aria-label="group"
                  className={cn(
                    'inline-block h-5 w-5 flex-shrink-0 rounded-full'
                  )}
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ArrowUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute bottom-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map(({ id, name, icon: Icon }) => (
                  <Listbox.Option
                    key={id}
                    className={({ active }) =>
                      cn(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={{ id, name }}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Icon
                            className={cn(
                              'inline-block h-5 w-5 flex-shrink-0 rounded-full'
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={cn(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
