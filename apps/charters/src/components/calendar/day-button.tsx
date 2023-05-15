import { isSameDay, isWithinInterval } from '@/lib/date-fns'
import { cn } from '@/lib/utils'

export type SelectedDates = {
  end: number
  start: number
}
export type CalendarDay = {
  date: string
  dayOfYear: number
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
  const { start, end } = selectedDates
  const dayOfYear = day.dayOfYear
  const isDisabled = day.isDisabled || day.isBooked

  const isSelected = isSameDay(start, dayOfYear) || isSameDay(end, dayOfYear)

  const isRange = isWithinInterval(dayOfYear, { start, end })

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
        isRange && 'bg-indigo-400',
        isSelected && 'bg-indigo-500 hover:bg-indigo-500',
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
