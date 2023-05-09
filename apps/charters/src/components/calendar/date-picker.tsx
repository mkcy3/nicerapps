'use client'
import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isBefore,
  isSameDay,
  subDays,
} from 'date-fns'
import React from 'react'
import { useImmer } from 'use-immer'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Day = {
  date: string
  day: Date
  isBooked: boolean
  isDisabled: boolean
  localDay: number
  monthDay: number
}
type Month = {
  days: Day[]
  name: string
}
type Calendar = Month[]

export default function DatePicker({ calendar }: { calendar: Calendar }) {
  const [dateRange, setDateRange] = useImmer<{
    end: Date | null
    range: Date[] | []
    start: Date | null
  }>({
    start: null,
    end: null,
    range: [],
  })

  function isBookedInRange(calendar: Day[], startRange: Date, endRange: Date) {
    const firstDay = format(startRange, 'yyyy-MM-dd')
    const lastDay = format(endRange, 'yyyy-MM-dd')

    for (let i = 0, j = calendar.length - 1; i < calendar.length; i++, j--) {
      if (calendar[i].date === firstDay && calendar[i].isBooked) {
        return true
      }
      if (calendar[j].date === lastDay && calendar[j].isBooked) {
        return true
      }
      if (i === j) {
        return false
      }
    }
  }

  function handleSelectDate(e: React.MouseEvent<HTMLButtonElement>) {
    const [year, month, day] = e.currentTarget.value.split('-').map(Number)

    const offsetIndex = calendar[month - 5].days[0]
    const firstDayIndex = typeof offsetIndex === 'number' ? offsetIndex : 0
    const date = calendar[month - 5].days[day + firstDayIndex - 1]

    if (!dateRange?.start) {
      return setDateRange((draft) => {
        draft.range = []
        draft.start = date.day
      })
    }
    const firstDate = dateRange.start
    if (isBefore(date.day, firstDate)) {
      return setDateRange((draft) => {
        draft.range = []
        draft.start = date.day
        draft.end = null
      })
    }
    if (
      isSameDay(date.day, firstDate) ||
      isSameDay(addDays(firstDate, 1), date.day)
    ) {
      return setDateRange((draft) => {
        draft.range = []
        draft.end = date.day
      })
    }

    const startRange = addDays(firstDate, 1)
    const endRange = subDays(date.day, 1)

    if (
      isBookedInRange(
        calendar.flatMap((month) => month.days),
        startRange,
        endRange
      )
    ) {
      setDateRange((draft) => {
        draft.end = null
        draft.range = []
      })
      console.log('Error: cannot book that range')
      return
    }

    setDateRange((draft) => {
      draft.end = date.day
      draft.range = eachDayOfInterval({
        start: startRange,
        end: endRange,
      })
    })
  }

  function handleClear() {
    setDateRange({ start: null, end: null, range: [] })
  }
  return (
    <>
      <div className="my-2">Start Date: {dateRange?.start?.toString()}</div>
      <div className="my-2">End Date: {dateRange?.end?.toString()}</div>
      <Button onClick={handleClear}>Clear</Button>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8">
        {calendar.map((month) => (
          <section key={month.name} className="text-center">
            <h2 className="text-sm font-semibold text-gray-900">
              {month.name}
            </h2>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {month.days.map((day, dayIdx) =>
                day?.date ? (
                  // FIXME: all className logic outside of JSX in refactor

                  <button
                    key={day.date}
                    type="button"
                    disabled={day.isDisabled || day.isBooked}
                    onClick={handleSelectDate}
                    value={day.date}
                    className={cn(
                      'py-1.5 hover:bg-gray-100 focus:z-10',
                      day.isDisabled || day.isBooked
                        ? 'bg-gray-50 text-gray-400'
                        : 'bg-white text-gray-900',
                      isSameDay(dateRange?.start as Date, day.day) &&
                        'bg-red-900 hover:bg-red-900',
                      isSameDay(dateRange?.end as Date, day.day) &&
                        'bg-red-900 hover:bg-red-900',
                      dateRange.range.some((r) => isSameDay(r, day.day)) &&
                        'bg-red-400',
                      dayIdx === 0 && 'rounded-tl-lg',
                      dayIdx === 6 && 'rounded-tr-lg',
                      month.days.length <= 35
                        ? dayIdx === 28 && 'rounded-bl-lg'
                        : dayIdx === 35 && 'rounded-bl-lg',
                      month.days.length === 35 &&
                        dayIdx === month.days.length - 1 &&
                        'rounded-br-lg'
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
                ) : (
                  <div
                    key={`${month.name}-disabled-${dayIdx}`}
                    className={cn(dayIdx === 0 && 'rounded-tl-lg')}
                  >
                    {' '}
                  </div>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
