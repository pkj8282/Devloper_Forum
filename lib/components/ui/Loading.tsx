'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ILoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  text?: string
  fullScreen?: boolean
}

const Loading: React.FC<ILoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  fullScreen = false,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const renderSpinner = () => (
    <svg 
      className={cn('animate-spin', sizeStyles[size])} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-current animate-pulse',
            size === 'sm' ? 'w-1 h-1' :
            size === 'md' ? 'w-1.5 h-1.5' :
            size === 'lg' ? 'w-2 h-2' : 'w-3 h-3'
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className={cn(
      'rounded-full bg-current animate-pulse',
      sizeStyles[size]
    )} />
  )

  const renderSkeleton = () => (
    <div className="space-y-2">
      <div className="h-4 bg-[var(--bg-surface)] rounded animate-pulse" />
      <div className="h-4 bg-[var(--bg-surface)] rounded animate-pulse w-3/4" />
      <div className="h-4 bg-[var(--bg-surface)] rounded animate-pulse w-1/2" />
    </div>
  )

  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'skeleton':
        return renderSkeleton()
      default:
        return renderSpinner()
    }
  }

  const content = (
    <div 
      className={cn(
        'flex flex-col items-center justify-center text-[var(--text-secondary)]',
        fullScreen ? 'min-h-screen' : 'p-8',
        className
      )}
      {...props}
    >
      {variant !== 'skeleton' && renderLoadingIndicator()}
      {variant === 'skeleton' && renderLoadingIndicator()}
      {text && (
        <p className={cn('mt-3 text-center', textSizeStyles[size])}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--bg-overlay)] backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return content
}

export default Loading