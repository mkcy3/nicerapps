'use client'
import { Disclosure } from '@headlessui/react'
import { Minus, Plus } from 'iconoir-react'

const faqs = [
  {
    question: 'Cancellation',
    answer:
      'Head charter should inform us immediately. Within 24 hours of booking, only processing fees are withheld. Check charter terms for specifics.',
  },
  {
    question: 'Changes to charter',
    answer:
      'Please contact us for any changes or rescheduling, additional chargers may occur.',
  },
  {
    question: 'How long is a Day Sail?',
    answer: '9 AM to 6 PM',
  },
  {
    question: 'Can we re-schedule a charter?',
    answer:
      'Charters can be rescheduled within the same year or the following season for no additional charge.',
  },
  {
    question: 'Will we learn how to sail?',
    answer:
      'Yes, every charter is whatever you make it. From aspiring cruisers wishing to learn every detail of vessel operation, to parties just wanting to have a blast on the water.',
  },
  {
    question: 'What to pack?',
    answer:
      'Bringing one set of clothes for a rainy, windy day is a good idea.',
  },
  {
    question: 'How much food to bring?',
    answer:
      'For longer charters, I would strongly suggest to plan out each meal.',
  },
]

export default function FaqPage() {
  return (
    <>
      {faqs.map((faq) => (
        <Disclosure as="div" key={faq.question} className="pt-6">
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <Minus className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Plus className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                <p className="text-base leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  )
}
