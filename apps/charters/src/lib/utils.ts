import { ClassValue, clsx } from 'clsx'
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isBefore,
  isSameDay,
} from 'date-fns'
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

export function buildCalendar(bookedDates: Date[]) {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), 4, 1, 0, 0, 0) // May is month 4 in JavaScript's Date object
  const endOfMonth = new Date(today.getFullYear(), 9, 31, 0, 0, 0) // October is month 9 in JavaScript's Date object
  const months = eachMonthOfInterval({ start: startOfMonth, end: endOfMonth })
  const monthObjects = months.map((month) => {
    const daysInMonth = eachDayOfInterval({
      start: month,
      end: new Date(month.getFullYear(), month.getMonth() + 1, 0),
    })

    const dayDates = daysInMonth.map((day, idx) => {
      const [localDay, monthDay, dateISO, month] = format(
        day,
        'e, d, yyyy-MM-dd, L'
      ).split(', ')

      const dateObj = {
        localDay: Number(localDay),
        monthDay: Number(monthDay),
        dateISO,
        date: day,
        isBooked: false,
        isDisabled: false,
      }

      if (isSameDay(day, bookedDates[0])) {
        dateObj.isBooked = true
        bookedDates.shift()
      }

      if (
        isBefore(day, today) ||
        (month === '5' && idx < 24) ||
        (month === '10' && idx > 8)
      ) {
        dateObj.isDisabled = true
      }

      return dateObj
    })

    return {
      name: format(month, 'MMMM'),
      year: month.getFullYear(),
      days: dayDates,
    }
  })
  return monthObjects
}
