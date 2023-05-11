'use client'
import {
  addDays,
  eachDayOfInterval,
  format,
  isBefore,
  isSameDay,
  subDays,
} from 'date-fns'
import { Calendar } from 'iconoir-react'
import Link from 'next/link'
import React from 'react'
import { useImmer } from 'use-immer'

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
  year: number
}

export default function DatePicker({ calendar }: { calendar: Month[] }) {
  const currentMonth = Number(format(new Date(), 'M'))
  const [dateRange, setDateRange] = useImmer<{
    end: Date | null
    range: Date[] | []
    start: Date | null
  }>({
    start: null,
    end: null,
    range: [],
  })

  if (currentMonth > 10) return null //<EndOfSeason />

  const displayDateStart = dateRange?.start
    ? format(dateRange.start, 'MMM dd')
    : null
  const displayDateEnd = dateRange?.end ? format(dateRange.end, 'MMM dd') : null

  function handleSelectDate(e: React.MouseEvent<HTMLButtonElement>) {
    const [year, month, day] = e.currentTarget.value.split('-').map(Number)

    const selectedDate = calendar[month - 5].days[day - 1]

    if (!dateRange?.start) {
      return setDateRange((draft) => {
        draft.start = selectedDate.day
        draft.range = []
      })
    }
    const firstDate = dateRange.start
    if (isBefore(selectedDate.day, firstDate)) {
      return setDateRange((draft) => {
        draft.start = selectedDate.day
        draft.range = []
        draft.end = null
      })
    }
    if (
      isSameDay(selectedDate.day, firstDate) ||
      isSameDay(addDays(firstDate, 1), selectedDate.day)
    ) {
      return setDateRange((draft) => {
        draft.range = []
        draft.end = selectedDate.day
      })
    }
    const range = eachDayOfInterval({
      start: addDays(firstDate, 1),
      end: subDays(selectedDate.day, 1),
    })

    if (
      calendar
        .flatMap((month) => month.days)
        .some((day) => {
          return range.some((r) => isSameDay(day.day, r) && day.isBooked)
        })
    ) {
      setDateRange((draft) => {
        draft.range = []
        draft.end = null
      })
      console.log('Error: cannot book that range')
      return
    }

    setDateRange((draft) => {
      draft.range = range
      draft.end = selectedDate.day
    })
  }

  function handleClear() {
    setDateRange({ start: null, end: null, range: [] })
  }
  console.log(calendar)
  return (
    <>
      {/*  FIXME: refactor logic out jsx, make components from repeated jsx*/}
      <div className="sticky top-0 z-50 bg-white pt-3 sm:relative">
        <div className="flex flex-row items-center">
          <div className="flex w-full flex-col gap-y-1 sm:w-2/3 sm:flex-row sm:gap-x-1 sm:py-5 md:w-2/5">
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
                    dateRange?.start
                      ? isSameDay(dateRange?.start as Date, day.day) &&
                          'bg-red-900 hover:bg-red-900'
                      : null,
                    dateRange?.end
                      ? isSameDay(dateRange?.end as Date, day.day) &&
                          'bg-red-900 hover:bg-red-900'
                      : null,
                    dateRange.range.some((r) => isSameDay(r, day.day)) &&
                      'bg-red-400',
                    dayIdx === 0 && day.localDay === 1 && 'rounded-tl-lg',
                    dayIdx <= 6 && day.localDay === 7 && 'rounded-tr-lg',

                    dayIdx >= 23 && day.localDay === 1 && 'rounded-bl-lg',
                    dayIdx >= 29 && day.localDay === 7 && 'rounded-br-lg'
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
          className="rounded-full border bg-blue-400 px-6 py-3 text-white "
        >
          Next
        </Link>
      </div>
    </>
  )
}
