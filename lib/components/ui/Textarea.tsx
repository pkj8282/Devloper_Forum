'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  fullWidth?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ 
    className, 
    label,
    error,
    helpText,
    resize = 'vertical',
    fullWidth = false,
    ...props 
  }, ref) => {
    const baseStyles = 'px-3 py-2 text-[var(--text-base)] bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[var(--radius-default)] transition-colors duration-150 placeholder:text-[var(--text-tertiary)] focus:border-[var(--interactive-focus)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px]'
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    const textareaStyles = cn(
      baseStyles,
      resizeStyles[resize],
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
        <textarea
          className={textareaStyles}
          ref={ref}
          {...props}
        />
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

Textarea.displayName = 'Textarea'

export default Textarea