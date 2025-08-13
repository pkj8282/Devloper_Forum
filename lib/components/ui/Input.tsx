'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helpText,
    startIcon,
    endIcon,
    fullWidth = false,
    ...props 
  }, ref) => {
    const baseStyles = 'px-3 py-2 text-[var(--text-base)] bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[var(--radius-default)] transition-colors duration-150 placeholder:text-[var(--text-tertiary)] focus:border-[var(--interactive-focus)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    
    const inputStyles = cn(
      baseStyles,
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      error && 'border-[var(--status-error)] focus:border-[var(--status-error)]',
      fullWidth ? 'w-full' : 'w-auto',
      className
    )

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-[var(--text-tertiary)] text-sm">{startIcon}</span>
            </div>
          )}
          <input
            type={type}
            className={inputStyles}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[var(--text-tertiary)] text-sm">{endIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-[var(--status-error)]">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">{helpText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input