'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, IBadgeProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    rounded = false,
    removable = false,
    onRemove,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150'
    
    const variantStyles = {
      default: 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)]',
      primary: 'bg-[var(--brand-primary)] text-white',
      success: 'bg-[var(--status-success)] text-white',
      warning: 'bg-[var(--status-warning)] text-[var(--text-inverse)]',
      danger: 'bg-[var(--status-error)] text-white',
      info: 'bg-[var(--status-info)] text-white',
      outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-heavy)]'
    }

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs min-h-[1.25rem]',
      md: 'px-2.5 py-1 text-sm min-h-[1.5rem]',
      lg: 'px-3 py-1.5 text-base min-h-[1.75rem]'
    }

    const radiusStyles = rounded ? 'rounded-full' : 'rounded-[var(--radius-default)]'

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          radiusStyles,
          className
        )}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            type="button"
            className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors duration-150"
            onClick={onRemove}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge