import { cn } from '@/lib/utils'

export const variantStyles = {
  primary:
    'group inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-800 active:text-blue-100',
  secondary:
    'group inline-flex items-center justify-center rounded-full px-4 py-2 text-sm text-white ring-1 ring-slate-700 hover:ring-slate-500 focus:outline-none focus-visible:outline-white active:text-slate-400 active:ring-slate-700',
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: keyof typeof variantStyles
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = cn(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  return <button className={className} {...props} />
}
