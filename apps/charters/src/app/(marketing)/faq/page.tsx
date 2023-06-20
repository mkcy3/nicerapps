const faqs = [
  {
    id: 1,
    question: 'What happens if the weather is bad?',
    answer: 'If the weather is dangerous we wont go. ',
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
    answer: '9 AM to 6 PM',
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
  {
    id: 6,
    question: 'What to bring?',
    answer: 'This and that',
  },
  {
    id: 7,
    question: 'How much food to bring?',
    answer: 'a lot of food',
  },
]
export default function FaqPage() {
  return (
    <div id="faq" className="divide-y divide-gray-900/10 py-24 sm:py-32">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Frequently asked questions
      </h2>
      <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
        {faqs.map((faq) => (
          <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
              {faq.question}
            </dt>
            <dd className="mt-4 lg:col-span-7 lg:mt-0">
              <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
