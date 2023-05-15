import { Calendar, Search } from 'iconoir-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'

export default function HomePage() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <Container className="p-20">
        {/* Hero */}
        <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
          Georgian Bay Sailing Yacht Cruises
        </h1>
        <p className="mt-6 max-w-2xl text-lg tracking-tight text-slate-200">
          Blah blah
        </p>
        <div className="mt-6 flex gap-x-4 rounded-full bg-white p-2">
          <div className="relative rounded-full shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-full border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
          <select
            id="location"
            name="location"
            className=" block rounded-full border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Add Guests"
          >
            <option>Add Guests</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>

          <Button variant="primary" className="py-1.5">
            {' '}
            <Search
              className="h-5 w-5 font-bold text-white"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            Search
          </Button>
        </div>
      </Container>
    </>
  )
}
