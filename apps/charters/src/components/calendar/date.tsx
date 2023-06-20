import { Calendar } from 'iconoir-react'

import { cn } from '@/lib/utils'

type DateInputProps = {
  date: string
  handleClear: () => void
  placeholder: string
}

function DateInput({ date, placeholder, handleClear }: DateInputProps) {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        id="start-date"
        readOnly={true}
        className={cn(
          'text-charcoal block w-full rounded-md border-0 py-1.5 pl-10 text-left ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
        )}
        onClick={handleClear}
        value={date ?? ''}
        placeholder={placeholder}
      />

      {date && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex  items-center pr-3"
        >
          <span className="z-10 text-gray-400">Clear</span>
        </button>
      )}
    </div>
  )
}

export default DateInput
