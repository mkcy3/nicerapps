import { Calendar, Search } from 'iconoir-react'
import Image from 'next/image'

import Banner from '@/components/layout/banner'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'

const faqs = [
  {
    id: 1,
    question: 'What happens if the weather is bad?',
    answer: 'If the weather is hazardous, ',
  },
  {
    id: 2,
    question: 'What is your cancellation and refund policy?',
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 3,
    question: 'How long is a Day Sail?',
    answer: '9 AM to 8 PM',
  },
  {
    id: 4,
    question: 'Can we re-schedule a charter?',
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 5,
    question: 'Will we learn to sail and sail the boat?',
    answer: 'Absolutely',
  },
]

export default function HomePage() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <Banner />
      <Container>
        <Navbar />
        <main className="space-y-24 pt-24 sm:space-y-32 lg:space-y-40">
          <section id="hero">
            <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
              Georgian Bay Sailing Yacht Cruises
            </h1>
            <p className="mt-6 max-w-2xl text-lg tracking-tight text-slate-200">
              Blah blah
            </p>
            <div className="mt-6 flex gap-x-4 rounded-full bg-white p-2">
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
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
          </section>
          <section id="faq" className="divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                    {faq.question}
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  )
}
