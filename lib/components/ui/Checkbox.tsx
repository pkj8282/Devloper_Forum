'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ 
    className, 
    label,
    description,
    error,
    indeterminate = false,
    checked,
    ...props 
  }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null)
    
    React.useImperativeHandle(ref, () => checkboxRef.current!, [])
    
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    const baseStyles = 'h-4 w-4 text-[var(--brand-primary)] bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--interactive-focus)] focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150'

    return (
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            ref={checkboxRef}
            type="checkbox"
            className={cn(
              baseStyles,
              error && 'border-[var(--status-error)]',
              className
            )}
            checked={checked}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label className="text-sm font-medium text-[var(--text-primary)] cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-[var(--text-tertiary)] mt-1">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-[var(--status-error)] mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox