import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.ComponentPropsWithRef<'input'>

function Input(
  { type, className, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'block w-full rounded-md border-0 py-1.5 pl-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6',
        className
      )}
      {...props}
    />
  )
}
export default forwardRef(Input)
