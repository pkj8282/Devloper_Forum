'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  selected?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onRemove?: () => void
}

const Tag = React.forwardRef<HTMLSpanElement, ITagProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    interactive = false,
    selected = false,
    disabled = false,
    icon,
    onRemove,
    children,
    onClick,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-[var(--radius-default)] transition-all duration-150'
    
    const variantStyles = {
      default: selected 
        ? 'bg-[var(--brand-primary)] text-white' 
        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)]',
      primary: selected 
        ? 'bg-[var(--brand-primary)] text-white' 
        : 'bg-blue-50 text-[var(--brand-primary)] border border-blue-200',
      success: selected 
        ? 'bg-[var(--status-success)] text-white' 
        : 'bg-green-50 text-[var(--status-success)] border border-green-200',
      warning: selected 
        ? 'bg-[var(--status-warning)] text-[var(--text-inverse)]' 
        : 'bg-yellow-50 text-[var(--status-warning)] border border-yellow-200',
      danger: selected 
        ? 'bg-[var(--status-error)] text-white' 
        : 'bg-red-50 text-[var(--status-error)] border border-red-200',
      info: selected 
        ? 'bg-[var(--status-info)] text-white' 
        : 'bg-blue-50 text-[var(--status-info)] border border-blue-200'
    }

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base'
    }

    const interactiveStyles = interactive && !disabled
      ? 'cursor-pointer hover:opacity-80 active:scale-95'
      : disabled
      ? 'opacity-50 cursor-not-allowed'
      : ''

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled) return
      onClick?.(e)
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          interactiveStyles,
          className
        )}
        onClick={handleClick}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {onRemove && (
          <button
            type="button"
            className="ml-1 p-0.5 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors duration-150 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            disabled={disabled}
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

Tag.displayName = 'Tag'

export default Tag