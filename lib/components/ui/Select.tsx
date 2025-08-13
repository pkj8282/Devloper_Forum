'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helpText?: string
  options: ISelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ 
    className, 
    label,
    error,
    helpText,
    options,
    placeholder,
    fullWidth = false,
    ...props 
  }, ref) => {
    const baseStyles = 'px-3 py-2 text-[var(--text-base)] bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[var(--radius-default)] transition-colors duration-150 focus:border-[var(--interactive-focus)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer'
    
    const selectStyles = cn(
      baseStyles,
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
          <select
            className={selectStyles}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
                className="bg-[var(--bg-surface)] text-[var(--text-primary)]"
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* 화살표 아이콘 */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select'

export default Select