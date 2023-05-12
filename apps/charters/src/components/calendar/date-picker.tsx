'use client'

import { Calendar } from 'iconoir-react'
import Link from 'next/link'
import React from 'react'
import { useImmer } from 'use-immer'

import DayButton, {
  CalendarDay,
  DateRange,
} from '@/components/calendar/day-button'
import { buttonVariantStyles } from '@/components/ui/button'
import {
  addDays,
  eachDayOfInterval,
  fns,
  format,
  isBefore,
  isSameDay,
} from '@/lib/date-fns'
import { cn } from '@/lib/utils'

type Month = {
  days: CalendarDay[]
  name: string
  year: number
}

export default function DatePicker({ calendar }: { calendar: Month[] }) {
  const [selectedDateRange, setSelectedDateRange] = useImmer<DateRange>({
    end: null,
    start: null,
  })

  const bookingRange = eachDayOfInterval({
    start: selectedDateRange?.start,
    end: selectedDateRange?.end,
  })

  const displayDateStart = format(selectedDateRange.start, 'MMM dd')
  const displayDateEnd = format(selectedDateRange.end, 'MMM dd')

  function handleSelectDate(e: React.MouseEvent<HTMLButtonElement>) {
    const [year, month, day] = e.currentTarget.value.split('-').map(Number)
    const selectedDate = calendar[month - 5].days[day - 1]
    const selectedDateISO = fns.parseISO(selectedDate.date)

    if (!selectedDateRange?.start) {
      return setSelectedDateRange((draft) => {
        draft.start = selectedDateISO
      })
    }
    const firstDate = selectedDateRange.start
    if (isBefore(selectedDateISO, firstDate)) {
      return setSelectedDateRange((draft) => {
        draft.start = selectedDateISO

        draft.end = null
      })
    }
    if (
      isSameDay(selectedDateISO, firstDate) ||
      isSameDay(addDays(firstDate, 1), selectedDateISO)
    ) {
      return setSelectedDateRange((draft) => {
        draft.end = selectedDateISO
      })
    }
    const range = eachDayOfInterval({
      start: firstDate,
      end: selectedDateISO,
    }) as Date[]

    if (
      calendar
        .flatMap((month) => month.days)
        .some((day) => {
          return range.some(
            (r) => isSameDay(fns.parseISO(day.date), r) && day.isBooked
          )
        })
    ) {
      setSelectedDateRange((draft) => {
        draft.end = null
      })
      console.log('Error: cannot book that range')
      return
    }

    setSelectedDateRange((draft) => {
      draft.end = selectedDateISO
    })
  }

  function handleClear() {
    setSelectedDateRange({ start: null, end: null })
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white pt-3 sm:relative">
        <div className="flex flex-row items-center">
          <div className="flex w-full flex-col gap-y-1 sm:w-2/3 sm:flex-row sm:gap-x-1 sm:py-5 md:w-2/5">
            {/* refactor repeated jsx */}
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                id="start-date"
                readOnly={true}
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onClick={handleClear}
                value={displayDateStart ?? ''}
                placeholder="Embark"
              />

              {displayDateStart && (
                <button
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 flex  items-center pr-3"
                >
                  <span className="z-10 text-gray-400">Clear</span>
                </button>
              )}
            </div>
            <span className="mx-auto text-gray-400 sm:self-center">to</span>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                id="end-date"
                readOnly={true}
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onClick={handleClear}
                value={displayDateEnd ?? ''}
                placeholder="Disembark"
              />

              {displayDateEnd && (
                <button
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 flex  items-center pr-3"
                >
                  <span className="text-gray-400"> Clear </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px border-b text-center text-sm sm:hidden">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 pb-6 pt-8 sm:pt-0 md:grid-cols-2 md:gap-y-16 xl:grid-cols-3">
        {calendar.map((month) => (
          <section key={month.name} className="text-center">
            <h2 className="col-start-2 justify-self-center text-sm font-semibold text-gray-900">
              {month.name} {month.year}
            </h2>

            <div className="mt-6 hidden text-xs leading-6 text-gray-500 sm:grid sm:grid-cols-7">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {month.days[0].localDay !== 1 && (
                <>
                  {Array(month.days[0].localDay - 1)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={`${month.name}-disabled-${i}`}
                        className={i === 0 ? 'rounded-tl-lg' : ''}
                      ></div>
                    ))}
                </>
              )}
              {month.days.map((day, dayIdx) => (
                <DayButton
                  key={day.date}
                  day={day}
                  idx={dayIdx}
                  dateRange={selectedDateRange}
                  bookingRange={bookingRange}
                  onClick={handleSelectDate}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="sticky bottom-0 z-50 flex justify-between border bg-white px-6 py-3 sm:hidden">
        <p className="whitespace-pre-line text-sm">
          Day Sail: 8 Guests {'\n'}Sleeping: 4-6* Guests
        </p>

        <Link
          href="/"
          className={cn(buttonVariantStyles['primary'], 'px-6 py-3')}
        >
          Next
        </Link>
      </div>
    </>
  )
}
