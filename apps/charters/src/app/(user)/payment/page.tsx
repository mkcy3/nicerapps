import { redirect } from 'next/navigation'

import Container from '@/components/ui/container'

const info = [
  { label: 'What to bring', href: '#' },
  { label: 'What to do', href: '#' },
]

export default function IntentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    searchParams

  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    redirect('/account')
  }

  if (redirect_status !== 'succeeded') {
    return (
      <Container className="prose min-h-screen pt-16">
        <h1>Payment Failed</h1>
        <p>
          Thank you so much for trying to book, something failed during
          processing, you will be contact via email shortly.
        </p>
      </Container>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-8 sm:px-6 sm:pt-16 lg:px-8">
      <Container>
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-charcoal text-2xl font-bold tracking-tight sm:text-3xl">
              Charter Confirmed!
            </h1>
          </div>
          <p className="text-sm text-gray-600"></p>
        </div>

        {/* Products */}
        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Next Steps
          </h2>

          <div className="space-y-8">
            <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
              <div className="px-4 py-6 sm:px-6 lg:p-8">
                <h3 className="text-charcoal text-base font-medium">
                  {' '}
                  Next Steps
                </h3>
                <ul>
                  {info.map((item) => (
                    <li key={item.label} className="mt-4">
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
