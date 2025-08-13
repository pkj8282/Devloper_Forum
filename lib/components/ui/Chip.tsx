'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined' | 'light'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  avatar?: React.ReactNode
  icon?: React.ReactNode
  closable?: boolean
  onClose?: () => void
  disabled?: boolean
}

const Chip = React.forwardRef<HTMLDivElement, IChipProps>(
  ({ 
    className,
    variant = 'filled',
    color = 'default',
    size = 'md',
    avatar,
    icon,
    closable = false,
    onClose,
    disabled = false,
    children,
    onClick,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 rounded-full font-medium transition-all duration-150'
    
    const getColorStyles = () => {
      const colorMap = {
        default: {
          filled: 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)]',
          outlined: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-heavy)]',
          light: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
        },
        primary: {
          filled: 'bg-[var(--brand-primary)] text-white',
          outlined: 'bg-transparent text-[var(--brand-primary)] border border-[var(--brand-primary)]',
          light: 'bg-blue-50 text-[var(--brand-primary)]'
        },
        success: {
          filled: 'bg-[var(--status-success)] text-white',
          outlined: 'bg-transparent text-[var(--status-success)] border border-[var(--status-success)]',
          light: 'bg-green-50 text-[var(--status-success)]'
        },
        warning: {
          filled: 'bg-[var(--status-warning)] text-[var(--text-inverse)]',
          outlined: 'bg-transparent text-[var(--status-warning)] border border-[var(--status-warning)]',
          light: 'bg-yellow-50 text-[var(--status-warning)]'
        },
        danger: {
          filled: 'bg-[var(--status-error)] text-white',
          outlined: 'bg-transparent text-[var(--status-error)] border border-[var(--status-error)]',
          light: 'bg-red-50 text-[var(--status-error)]'
        },
        info: {
          filled: 'bg-[var(--status-info)] text-white',
          outlined: 'bg-transparent text-[var(--status-info)] border border-[var(--status-info)]',
          light: 'bg-blue-50 text-[var(--status-info)]'
        }
      }
      return colorMap[color][variant]
    }

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs h-6',
      md: 'px-3 py-1.5 text-sm h-8',
      lg: 'px-4 py-2 text-base h-10'
    }

    const avatarSizeStyles = {
      sm: 'w-4 h-4 -ml-1',
      md: 'w-5 h-5 -ml-1.5',
      lg: 'w-6 h-6 -ml-2'
    }

    const iconSizeStyles = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    const interactiveStyles = onClick && !disabled
      ? 'cursor-pointer hover:opacity-80 active:scale-95'
      : disabled
      ? 'opacity-50 cursor-not-allowed'
      : ''

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
    }

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation()
      onClose?.()
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          getColorStyles(),
          sizeStyles[size],
          interactiveStyles,
          className
        )}
        onClick={handleClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        {...props}
      >
        {avatar && (
          <div className={cn('rounded-full overflow-hidden flex-shrink-0', avatarSizeStyles[size])}>
            {avatar}
          </div>
        )}
        {icon && !avatar && (
          <span className={cn('flex-shrink-0', iconSizeStyles[size])}>
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {closable && (
          <button
            type="button"
            className={cn(
              'ml-1 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors duration-150 flex-shrink-0',
              size === 'sm' ? 'p-0.5' : 'p-1'
            )}
            onClick={handleClose}
            disabled={disabled}
          >
            <svg 
              className={cn(iconSizeStyles[size])} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Chip.displayName = 'Chip'

export default Chip