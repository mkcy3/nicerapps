'use client'
//USESVR: move all client components to leaves when server actions out of alpha
import { addDays, format, isBefore, isSameDay, parseISO } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useImmer } from 'use-immer'

import DayButton, {
  CalendarDay,
  SelectedDates,
} from '@/components/calendar/day-button'
import { Button, buttonVariantStyles } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import DateInput from './date'
import PassengerMenu from './passenger-menu'

type Month = {
  days: CalendarDay[]
  name: string
  year: number
}
interface LinkWrapperProps extends React.ComponentProps<'button'> {
  end: Date | null
  passengers: number
  start: Date | null
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
    if (!start) {
      return { text: 'Check in?', classNames: 'bg-red-500 hover:bg-red-400' }
    }
    if (!end) {
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

  if (start && end && passengers > 0)
    return (
      <Link
        className={cn(buttonVariantStyles.primary, sharedStyle, classNames)}
        href={{
          pathname: '/checkout',
          query: {
            start: format(start, 'yyyy-MM-dd'),
            end: format(end, 'yyyy-MM-dd'),
            passengers: passengers,
          },
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
    endDate: null,
    startDate: null,
  })

  const [passengers, setPassengers] = useState(0)

  const { startDate, endDate } = selectedDates
  const displayDateStart = startDate ? format(startDate, 'MMM dd') : ''
  const displayDateEnd = endDate ? format(endDate, 'MMM dd') : ''

  function handleSelectDate(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedDate = parseISO(e.currentTarget.value)

    if (!startDate) {
      return setSelectedDates((draft) => {
        draft.startDate = selectedDate
      })
    }

    if (isBefore(selectedDate, startDate)) {
      return setSelectedDates((draft) => {
        draft.startDate = selectedDate
        draft.endDate = null
      })
    }
    if (
      isSameDay(selectedDate, startDate) ||
      isSameDay(selectedDate, addDays(startDate, 1))
    ) {
      return setSelectedDates((draft) => {
        draft.endDate = selectedDate
      })
    }
    const flatCalendar = calendar.flatMap((month) => month.days)
    const firstIndex =
      Number(format(startDate, 'D', { useAdditionalDayOfYearTokens: true })) -
      Number(
        format(flatCalendar[0].date, 'D', {
          useAdditionalDayOfYearTokens: true,
        })
      )

    const lastIndex =
      Number(
        format(selectedDate, 'D', { useAdditionalDayOfYearTokens: true })
      ) -
      Number(
        format(flatCalendar[0].date, 'D', {
          useAdditionalDayOfYearTokens: true,
        })
      )

    if (
      flatCalendar.slice(firstIndex, lastIndex + 1).some((day) => day.isBooked)
    ) {
      setSelectedDates((draft) => {
        draft.endDate = null
      })

      return
    }
    setSelectedDates((draft) => {
      draft.endDate = selectedDate
    })
  }

  function handleClear() {
    setSelectedDates({ startDate: null, endDate: null })
  }

  return (
    <>
      <h1 className="sr-only">Booking</h1>
      <div className="pb-6 sm:pb-16">
        <div className="sticky top-0 z-10 border-b bg-white pt-3 xl:hidden">
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
              <h2 className="text-charcoal col-start-2 justify-self-center text-sm font-semibold">
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
                    key={day.dateISO}
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

      <div className="sticky bottom-0 z-10 flex justify-between border bg-white px-1 py-3 sm:px-6 xl:space-x-5 xl:rounded-lg">
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

        <LinkWrapper passengers={passengers} start={startDate} end={endDate} />
      </div>
    </>
  )
}
