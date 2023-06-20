import { isSameDay, isWithinInterval } from 'date-fns'

import { cn } from '@/lib/utils'

export type SelectedDates = {
  endDate: Date | null
  startDate: Date | null
}
export type CalendarDay = {
  date: Date
  dateISO: string
  isBooked: boolean
  isDisabled: boolean
  localDay: number
  monthDay: number
}

interface DayButtonProps extends React.ComponentProps<'button'> {
  day: CalendarDay
  idx: number
  selectedDates: SelectedDates
}

export default function DayButton({
  day,
  idx,
  selectedDates,
  onClick,
}: DayButtonProps) {
  const { startDate, endDate } = selectedDates

  const isDisabled = day.isDisabled || day.isBooked

  const isSelected =
    (startDate && isSameDay(startDate, day.date)) ||
    (endDate && isSameDay(endDate, day.date))

  const isRange =
    startDate &&
    endDate &&
    isWithinInterval(day.date, { start: startDate, end: endDate })

  return (
    <button
      type="button"
      disabled={isDisabled}
      value={day.dateISO}
      onClick={onClick}
      className={cn(
        'py-1.5 hover:bg-gray-100 focus:z-10',
        'text-charcoal bg-white',
        isDisabled && 'bg-gray-50 text-gray-400 hover:bg-gray-50',
        isRange && 'bg-indigo-400 text-white hover:bg-indigo-600',
        isSelected && 'bg-indigo-600 text-white hover:bg-indigo-500',
        idx === 0 && day.localDay === 1 && 'rounded-tl-lg',
        idx <= 6 && day.localDay === 7 && 'rounded-tr-lg',
        idx >= 23 && day.localDay === 1 && 'rounded-bl-lg',
        idx >= 29 && day.localDay === 7 && 'rounded-br-lg'
      )}
    >
      <time
        dateTime={day.dateISO}
        className={cn(
          'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
        )}
      >
        {day.monthDay}
      </time>
    </button>
  )
}
