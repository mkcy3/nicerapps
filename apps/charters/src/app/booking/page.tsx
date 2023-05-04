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
import { useEffect, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

import Container from '@/components/ui/container'

const today = new Date()
const startOfMonth = new Date(2023, 4, 1) // May is month 4 in JavaScript's Date object
const endOfMonth = new Date(2023, 9, 31) // October is month 9 in JavaScript's Date object

const months = eachMonthOfInterval({ start: startOfMonth, end: endOfMonth })

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
const monthObjects = months.map((month) => {
  const daysInMonth = eachDayOfInterval({
    start: month,
    end: new Date(month.getFullYear(), month.getMonth() + 1, 0),
  })

  const dayDates = daysInMonth.map((day, idx) => {
    const [localDay, monthDay, date, month] = format(
      day,
      'e, d, yyyy-MM-dd, L'
    ).split(', ')

    const bookedDates = [
      '2023-06-04',
      '2023-06-05',
      '2023-06-06',
      '2023-06-07',
      '2023-06-08',
      '2023-06-09',
      '2023-06-10',
    ]

    const dateObj = {
      localDay: Number(localDay),
      monthDay: Number(monthDay),
      date: date,
      day,
      isBooked: bookedDates.includes(date),
    }
    if (isBefore(day, today)) {
      return { ...dateObj, isDisabled: true }
    }
    if (month === '5' && idx < 24) {
      return { ...dateObj, isDisabled: true }
    }
    if (month === '10' && idx > 8) {
      return { ...dateObj, isDisabled: true }
    }

    return { ...dateObj, isDisabled: false }
  })

  dayDates.unshift(
    ...new Array(dayDates[0].localDay - 1).fill(dayDates[0].localDay - 1)
  )

  return { name: format(month, 'MMMM'), days: dayDates }
})

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Booking() {
  const [datePicker, setDatePicker] = useImmer([])
  const [range, setRange] = useState([])

  function isBookedInRange(calendar: Day[], startRange, endRange) {
    const firstDay = format(startRange, 'yyyy-MM-dd')
    const lastDay = format(endRange, 'yyyy-MM-dd')

    for (let i = 0, j = calendar.length - 1; i < calendar.length; i++, j--) {
      if (i === j) {
        return false
      }
      if (calendar[i].date === firstDay && calendar[i].isBooked) {
        return true
      }
      if (calendar[j].date === lastDay && calendar[j].isBooked) {
        return true
      }
    }
  }

  function handleSelectDate(e) {
    const [year, month, day] = e.currentTarget.value.split('-').map(Number)

    const offsetIndex = monthObjects[month - 5].days[0]
    const firstDayIndex = Number.isInteger(offsetIndex) ? offsetIndex : 0
    const date = monthObjects[month - 5].days[day + firstDayIndex - 1]

    if (datePicker.length === 0) {
      return setDatePicker([date])
    }

    const firstDate = datePicker[0]
    if (
      isSameDay(date.day, firstDate.day) ||
      isSameDay(addDays(firstDate.day, 1), date.day)
    ) {
      setRange([])
      return setDatePicker((draft) => {
        draft[1] = date
      })
    }

    if (isBefore(date.day, firstDate.day)) {
      return setDatePicker([date]), setRange([])
    }

    const startRange = addDays(firstDate.day, 1)
    const endRange = subDays(date.day, 1)

    if (
      isBookedInRange(
        monthObjects.flatMap((obj) => obj.days),
        startRange,
        endRange
      )
    ) {
      setRange([])
      setDatePicker((draft) => {
        draft.pop()
      })
      console.log('cannot book that range')
      return
    }

    setDatePicker((draft) => {
      draft[1] = date
    })
    setRange(
      eachDayOfInterval({
        start: startRange,
        end: endRange,
      })
    )
  }
  console.log(monthObjects)
  console.log(datePicker)
  console.log(range)

  return (
    <Container>
      <div className="bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8">
          {monthObjects.map((month) => (
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
                  Object(day) === day ? (
                    <button
                      key={day.date}
                      type="button"
                      disabled={day.isDisabled || day.isBooked}
                      onClick={handleSelectDate}
                      value={day.date}
                      className={classNames(
                        day.isDisabled || day.isBooked
                          ? 'bg-gray-50 text-gray-400'
                          : 'bg-white text-gray-900',
                        isSameDay(datePicker[0]?.day, day.day) &&
                          'bg-red-900 hover:bg-red-900',
                        isSameDay(datePicker[1]?.day, day.day) &&
                          'bg-red-900 hover:bg-red-900',
                        range.some((r) => isSameDay(r, day.day)) &&
                          'bg-red-400',
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === month.days.length - 1 && 'rounded-br-lg',
                        'py-1.5 hover:bg-gray-100 focus:z-10'
                      )}
                    >
                      <time
                        dateTime={day.date}
                        className={classNames(
                          'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                        )}
                      >
                        {day.date.split('-').pop().replace(/^0/, '')}
                      </time>
                    </button>
                  ) : (
                    <div
                      key={`${month.name}-disabled-${dayIdx}`}
                      className={classNames(
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                        dayIdx === month.days.length - 1 && 'rounded-br-lg'
                      )}
                    >
                      {' '}
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  )
}
