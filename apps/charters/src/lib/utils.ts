import { ClassValue, clsx } from 'clsx'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  return Intl.NumberFormat(['en-CA'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  }).format(amount / 100)
}

/* eslint-disable */
export function stripeErrorHandling(err: unknown) {
  if (err instanceof Stripe.errors.StripeError) {
    switch (err.type) {
      case 'StripeCardError':
        // A declined card error
        err.message // => e.g. "Your card's expiration year is invalid."
        break
      case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        console.log(err)
        break
      case 'StripeAPIError':
        // An error occurred internally with Stripe's API
        console.log(err)
        break
      case 'StripeConnectionError':
        // Some kind of error occurred during the HTTPS communication
        console.log(err)
        break
      case 'StripeAuthenticationError':
        // You probably used an incorrect API key
        console.log(err)
        break
      case 'StripeRateLimitError':
        // Too many requests hit the API too quickly
        console.log(err)
        break
      case 'StripePermissionError':
        // Access to a resource is not allowed
        console.log(err)
        break
      case 'StripeIdempotencyError':
        // An idempotency key was used improperly
        console.log(err)
        break
      case 'StripeInvalidGrantError':
        // InvalidGrantError is raised when a specified code doesn't exist, is
        // expired, has been used, or doesn't belong to you; a refresh token doesn't
        // exist, or doesn't belong to you; or if an API key's mode (live or test)
        // doesn't match the mode of a code or refresh token.
        console.log(err)
        break
    }
  } else {
    // Handle any other type of unexpected error
    throw new Error(err as string)
  }
}
