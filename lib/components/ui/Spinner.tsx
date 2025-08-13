'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'white'
  speed?: 'slow' | 'normal' | 'fast'
}

const Spinner = React.forwardRef<HTMLDivElement, ISpinnerProps>(
  ({ 
    className,
    size = 'md',
    variant = 'default',
    speed = 'normal',
    ...props 
  }, ref) => {
    const sizeStyles = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    }

    const variantStyles = {
      default: 'text-[var(--text-tertiary)]',
      primary: 'text-[var(--brand-primary)]',
      white: 'text-white'
    }

    const speedStyles = {
      slow: 'animate-spin-slow',
      normal: 'animate-spin',
      fast: 'animate-spin-fast'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-block animate-spin',
          sizeStyles[size],
          variantStyles[variant],
          speedStyles[speed],
          className
        )}
        {...props}
      >
        <svg 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

export default Spinner