'use client'

import React from 'react'
import Image from './Image'
import { cn } from '@/lib/utils/cn'

export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(
  ({ 
    className,
    src,
    alt,
    name,
    size = 'md',
    variant = 'circle',
    status,
    fallback,
    ...props 
  }, ref) => {
    const sizeStyles = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-20 h-20 text-2xl'
    }

    const statusStyles = {
      online: 'bg-[var(--status-success)]',
      offline: 'bg-[var(--text-muted)]',
      away: 'bg-[var(--status-warning)]',
      busy: 'bg-[var(--status-error)]'
    }

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5'
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    }

    const renderContent = () => {
      if (src) {
        return (
          <Image
            src={src}
            alt={alt || name || 'Avatar'}
            fill
            className="object-cover"
            fallback="/images/default-avatar.png"
          />
        )
      }

      if (fallback) {
        return fallback
      }

      if (name) {
        return (
          <span className="font-semibold text-[var(--text-primary)]">
            {getInitials(name)}
          </span>
        )
      }

      return (
        <svg className="w-2/3 h-2/3 text-[var(--text-tertiary)]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center bg-[var(--bg-surface)] flex-shrink-0 overflow-hidden',
          sizeStyles[size],
          variant === 'circle' ? 'rounded-full' : 'rounded-[var(--radius-lg)]',
          className
        )}
        {...props}
      >
        {renderContent()}
        
        {status && (
          <div className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-[var(--bg-primary)]',
            statusStyles[status],
            statusSizes[size]
          )} />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar