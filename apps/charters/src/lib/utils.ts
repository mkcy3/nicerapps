import { ClassValue, clsx } from 'clsx'
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
