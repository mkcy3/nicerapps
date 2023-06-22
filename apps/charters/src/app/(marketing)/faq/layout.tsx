import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="faq"
      className="mx-auto max-w-2xl divide-y divide-gray-900/10 py-12 sm:py-24"
    >
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Frequently asked questions
      </h2>
      <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
        {children}
      </dl>
    </div>
  )
}
