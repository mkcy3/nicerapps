'use client'
//USESVR: move all client components to leaves when server actions out of alpha
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useImmer } from 'use-immer'

import DayButton, {
  CalendarDay,
  SelectedDates,
} from '@/components/calendar/day-button'
import { Button, buttonVariantStyles } from '@/components/ui/button'
import { format, isBefore, isSameDay } from '@/lib/day-of-year'
import { cn } from '@/lib/utils'

import DateInput from './date'
import PassengerMenu from './passenger-menu'

type Month = {
  days: CalendarDay[]
  name: string
  year: number
}
interface LinkWrapperProps extends React.ComponentProps<'button'> {
  end: number
  passengers: number
  start: number
}

//TODO: make reusable w/generics and forwardRef
function LinkWrapper({
  start,
  end,
  passengers,
  ...props
}: LinkWrapperProps): JSX.Element {
  const sharedStyle = 'py-1 sm:my-3 sm:px-6 sm:py-3 lg:w-40'
  const { text, classNames }: { classNames: string; text: string } = (() => {
    if (start === 0) {
      return { text: 'Check in?', classNames: 'bg-red-500 hover:bg-red-400' }
    }
    if (end === 0) {
      return {
        text: 'Check out?',
        classNames: 'bg-yellow-500 hover:bg-yellow-400',
      }
    }

    if (passengers === 0) {
      return {
        text: 'Passengers?',
        classNames: 'bg-orange-500 hover:bg-orange-400',
      }
    }

    return { text: 'Next', classNames: 'w-1/4' }
  })()

  if (start > 0 && end > 0 && passengers > 0)
    return (
      <Link
        className={cn(buttonVariantStyles.primary, sharedStyle, classNames)}
        href={{
          pathname: '/book',
          query: { start: start, end: end, passengers: passengers },
        }}
      >
        {text}
      </Link>
    )

  return (
    <Button
      {...props}
      variant="primary"
      className={cn(sharedStyle, classNames)}
    >
      {text}
    </Button>
  )
}

export default function Calendar({ calendar }: { calendar: Month[] }) {
  const [selectedDates, setSelectedDates] = useImmer<SelectedDates>({
    end: 0,
    start: 0,
  })

  const [passengers, setPassengers] = useState(0)

  const { start, end } = selectedDates
  const displayDateStart = format(start, 'MMM dd')
  const displayDateEnd = format(end, 'MMM dd')

  function handleSelectDate(e: React.MouseEvent<HTMLButtonElement>) {
    const [year, month, day] = e.currentTarget.value.split('-').map(Number)
    const selectedDate = calendar[month - 5].days[day - 1]
    const selectedDayOfYear = selectedDate.dayOfYear

    if (start === 0) {
      return setSelectedDates((draft) => {
        draft.start = selectedDayOfYear
      })
    }

    if (isBefore(selectedDayOfYear, start)) {
      return setSelectedDates((draft) => {
        draft.start = selectedDayOfYear
        draft.end = 0
      })
    }
    if (
      isSameDay(selectedDayOfYear, start) ||
      isSameDay(selectedDayOfYear, start + 1)
    ) {
      return setSelectedDates((draft) => {
        draft.end = selectedDayOfYear
      })
    }
    const flatCalendar = calendar.flatMap((month) => month.days)
    const firstIndex = start - flatCalendar[0].dayOfYear
    const lastIndex = selectedDayOfYear - flatCalendar[0].dayOfYear

    if (
      flatCalendar.slice(firstIndex, lastIndex + 1).some((day) => day.isBooked)
    ) {
      setSelectedDates((draft) => {
        draft.end = 0
      })
      console.log('Error: cannot book that range')
      return
    }
    setSelectedDates((draft) => {
      draft.end = selectedDayOfYear
    })
  }

  function handleClear() {
    setSelectedDates({ start: 0, end: 0 })
  }

  return (
    <>
      <h1 className="sr-only">Booking</h1>
      <div className="pb-6 sm:pb-16">
        <div className="sticky top-0 z-50 border-b bg-white pt-3 xl:hidden">
          <div className="flex flex-row items-center">
            <div className="flex w-full flex-col gap-y-1 sm:w-2/3 sm:flex-row sm:gap-x-1 sm:py-5">
              <DateInput
                date={displayDateStart}
                placeholder={'Check in'}
                handleClear={handleClear}
              />
              <span className="mx-auto text-gray-400 sm:self-center">to</span>
              <DateInput
                date={displayDateEnd}
                placeholder={'Check out'}
                handleClear={handleClear}
              />
            </div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px text-center text-sm sm:hidden">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 pt-8 md:grid-cols-2 md:gap-y-16 xl:mx-0 xl:grid-cols-3">
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
                    selectedDates={selectedDates}
                    onClick={handleSelectDate}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 z-50 flex justify-between border bg-white px-1 py-3 sm:px-6 xl:space-x-5 xl:rounded-lg">
        <div className="hidden xl:flex xl:flex-row xl:gap-x-1 xl:gap-y-1 xl:py-5">
          <DateInput
            date={displayDateStart}
            placeholder={'Check in'}
            handleClear={handleClear}
          />
          <span className="mx-auto text-gray-400 sm:self-center">to</span>
          <DateInput
            date={displayDateEnd}
            placeholder={'Check out'}
            handleClear={handleClear}
          />
        </div>

        <PassengerMenu
          selectedIndex={passengers}
          setSelectedIndex={setPassengers}
        />

        <LinkWrapper passengers={passengers} start={start} end={end} />
      </div>
    </>
  )
}
