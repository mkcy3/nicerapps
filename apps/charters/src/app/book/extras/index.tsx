'use client'
import { Switch } from '@headlessui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export default function Extras() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [enabled, setEnabled] = useState(searchParams.get('sleep') === 'true')

  //USESVR: refactor when out of alpha
  function handleChange() {
    //FIX: next.js/issues/49245

    const params = new URLSearchParams(searchParams.toString())
    const toggle = !enabled
    setEnabled(toggle)
    params.set('sleep', toggle.toString())
    //@ts-expect-error see fix above
    router.push(pathname + '?' + params.toString())
  }

  return (
    <div>
      <h2 className="mb-4 border-b text-lg font-medium text-gray-900">
        Extras
      </h2>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={cn(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3 flex flex-1 space-x-1 text-sm">
          <span className="font-medium text-gray-900">Sleep Aboard</span>{' '}
          <span className="text-gray-500">
            Arrive the night before to settle in, by 8pm.
          </span>
          <span className="self-end">$200</span>
        </Switch.Label>
      </Switch.Group>
    </div>
  )
}
