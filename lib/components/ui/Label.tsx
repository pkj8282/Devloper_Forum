'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'muted' | 'accent'
}

const Label = React.forwardRef<HTMLLabelElement, ILabelProps>(
  ({ 
    className, 
    required = false,
    size = 'md',
    variant = 'default',
    children,
    ...props 
  }, ref) => {
    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }

    const variantStyles = {
      default: 'text-[var(--text-primary)]',
      muted: 'text-[var(--text-tertiary)]',
      accent: 'text-[var(--brand-primary)]'
    }

    return (
      <label
        ref={ref}
        className={cn(
          'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[var(--status-error)] ml-1">*</span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label