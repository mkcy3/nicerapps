'use client'
import { isSameDay, parseISO } from 'date-fns'

import { cn } from '@/lib/utils'

type Day = {
  date: string
  isBooked: boolean
  isDisabled: boolean
  localDay: number
  monthDay: number
}
interface DayProps extends React.ComponentProps<'button'> {
  dateRange: { end: Date | null; range: Date[] | []; start: Date | null }
  day: Day
  idx: number
}

export default function Day({ day, idx, dateRange }: DayProps) {
  const dayISO = parseISO(day.date)
  const isDisabled = day.isDisabled || day.isBooked
  const disabledStyle = !isDisabled ?? 'bg-gray-50 text-gray-400'

  const selectedStyle = dateRange?.start
    ? !isSameDay(dateRange?.start || dateRange?.end, dayISO) ??
      'bg-red-900 hover:bg-red-900'
    : null

  const rangeStyle = dateRange.range.some((r) => isSameDay(r, dayISO))
    ? 'bg-red-400'
    : null
  return (
    <button
      type="button"
      disabled={isDisabled}
      value={day.date}
      className={cn(
        'py-1.5 hover:bg-gray-100 focus:z-10',
        disabledStyle,
        'bg-white text-gray-900',
        selectedStyle,
        rangeStyle,
        idx === 0 && day.localDay === 1 && 'rounded-tl-lg',
        idx <= 6 && day.localDay === 7 && 'rounded-tr-lg',
        idx >= 23 && day.localDay === 1 && 'rounded-bl-lg',
        idx >= 29 && day.localDay === 7 && 'rounded-br-lg'
      )}
    >
      <time
        dateTime={day.date}
        className={cn(
          'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
        )}
      >
        {day.monthDay}
      </time>
    </button>
  )
}
