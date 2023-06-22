import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
})

const endpointSecret = process.env.STRIPE_WH_SECRET_KEY ?? ''

export async function POST(req: NextRequest) {
  const request = await req.text()

  let event

  const signature = req.headers.get('stripe-signature') as string
  try {
    event = stripe.webhooks.constructEvent(request, signature, endpointSecret)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ status: 400 })
    }
  }

  switch (event?.type) {
    case 'payment_intent.succeeded':
      break
    case 'payment_method.attached':
      break
    default:
  }

  return NextResponse.json(
    { message: 'successfully received' },
    { status: 200 }
  )
}
