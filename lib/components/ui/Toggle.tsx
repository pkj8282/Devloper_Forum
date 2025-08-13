'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const Toggle = React.forwardRef<HTMLInputElement, IToggleProps>(
  ({ 
    className, 
    label,
    description,
    size = 'md',
    variant = 'default',
    checked,
    disabled,
    ...props 
  }, ref) => {
    const sizeStyles = {
      sm: {
        switch: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4'
      },
      md: {
        switch: 'w-10 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-5'
      },
      lg: {
        switch: 'w-12 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-6'
      }
    }

    const variantStyles = {
      default: checked ? 'bg-[var(--brand-primary)]' : 'bg-[var(--bg-surface)]',
      success: checked ? 'bg-[var(--status-success)]' : 'bg-[var(--bg-surface)]',
      warning: checked ? 'bg-[var(--status-warning)]' : 'bg-[var(--bg-surface)]',
      danger: checked ? 'bg-[var(--status-error)]' : 'bg-[var(--bg-surface)]'
    }

    return (
      <div className="flex items-start space-x-3">
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only"
              checked={checked}
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                'relative rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-[var(--interactive-focus)] focus-within:ring-offset-2',
                sizeStyles[size].switch,
                variantStyles[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                className
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
                  sizeStyles[size].thumb,
                  checked ? sizeStyles[size].translate : 'translate-x-0'
                )}
              />
            </div>
          </label>
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
          </div>
        )}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

export default Toggle