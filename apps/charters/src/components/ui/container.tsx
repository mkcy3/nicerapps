import React from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}
export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
