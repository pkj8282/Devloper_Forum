'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
  lines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, ISkeletonProps>(
  ({ 
    className,
    variant = 'text',
    width,
    height,
    animation = 'pulse',
    lines = 1,
    ...props 
  }, ref) => {
    const baseStyles = 'bg-[var(--bg-surface)] bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-tertiary)] to-[var(--bg-surface)] bg-[length:200%_100%]'
    
    const variantStyles = {
      text: 'h-4 rounded',
      rectangular: 'rounded-[var(--radius-default)]',
      circular: 'rounded-full',
      rounded: 'rounded-[var(--radius-lg)]'
    }

    const animationStyles = {
      pulse: 'animate-pulse',
      wave: 'animate-[wave_1.5s_ease-in-out_infinite]',
      none: ''
    }

    const getDefaultDimensions = () => {
      switch (variant) {
        case 'circular':
          return { width: '40px', height: '40px' }
        case 'text':
          return { width: '100%', height: '1rem' }
        default:
          return { width: '100%', height: '20px' }
      }
    }

    const defaultDimensions = getDefaultDimensions()
    const finalWidth = width || defaultDimensions.width
    const finalHeight = height || defaultDimensions.height

    const style = {
      width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
      height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight
    }

    // 여러 줄의 텍스트 스켈레톤
    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2" ref={ref} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                baseStyles,
                variantStyles[variant],
                animationStyles[animation],
                index === lines - 1 && 'w-3/4', // 마지막 줄은 조금 짧게
                className
              )}
              style={{ height: finalHeight }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          animationStyles[animation],
          className
        )}
        style={style}
        {...props}
      >
        <style jsx>{`
          @keyframes wave {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

export default Skeleton