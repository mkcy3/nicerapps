import { fns, isSameDay } from '@/lib/date-fns'
import { cn } from '@/lib/utils'

export type DateRange = {
  end: Date | null
  start: Date | null
}
export type CalendarDay = {
  date: string
  isBooked: boolean
  isDisabled: boolean
  localDay: number
  monthDay: number
}

interface DayButtonProps extends React.ComponentProps<'button'> {
  bookingRange: Date[] | []
  dateRange: DateRange
  day: CalendarDay
  idx: number
}

export default function DayButton({
  day,
  idx,
  dateRange,
  onClick,
  bookingRange,
}: DayButtonProps) {
  const dayISO = fns.parseISO(day.date)
  const isDisabled = day.isDisabled || day.isBooked

  const isSelected =
    isSameDay(dateRange?.start, dayISO) || isSameDay(dateRange?.end, dayISO)

  const isRange = bookingRange.some((r) => isSameDay(r, dayISO))

  return (
    <button
      type="button"
      disabled={isDisabled}
      value={day.date}
      onClick={onClick}
      className={cn(
        'py-1.5 hover:bg-gray-100 focus:z-10',
        'bg-white text-gray-900',
        isDisabled && 'bg-gray-50 text-gray-400',
        isRange && 'bg-red-400',
        isSelected && 'bg-red-900 hover:bg-red-900',

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
