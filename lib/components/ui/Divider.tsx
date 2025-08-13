'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  thickness?: 'thin' | 'medium' | 'thick'
  color?: 'default' | 'light' | 'dark'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  children?: React.ReactNode
}

const Divider = React.forwardRef<HTMLDivElement, IDividerProps>(
  ({ 
    className,
    orientation = 'horizontal',
    variant = 'solid',
    thickness = 'thin',
    color = 'default',
    spacing = 'md',
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'flex items-center'
    
    const orientationStyles = {
      horizontal: 'w-full',
      vertical: 'h-full flex-col'
    }

    const variantStyles = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted'
    }

    const thicknessStyles = {
      thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
      medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
      thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4'
    }

    const colorStyles = {
      default: 'border-[var(--border-default)]',
      light: 'border-[var(--border-light)]',
      dark: 'border-[var(--border-heavy)]'
    }

    const spacingStyles = {
      none: '',
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
      xl: orientation === 'horizontal' ? 'my-8' : 'mx-8'
    }

    // 텍스트가 있는 경우
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            baseStyles,
            orientationStyles[orientation],
            spacingStyles[spacing],
            className
          )}
          {...props}
        >
          <div className={cn(
            'flex-1',
            thicknessStyles[thickness],
            variantStyles[variant],
            colorStyles[color]
          )} />
          <div className={cn(
            'px-3 text-sm text-[var(--text-tertiary)] bg-[var(--bg-primary)]',
            orientation === 'vertical' && 'py-3 px-0'
          )}>
            {children}
          </div>
          <div className={cn(
            'flex-1',
            thicknessStyles[thickness],
            variantStyles[variant],
            colorStyles[color]
          )} />
        </div>
      )
    }

    // 일반 구분선
    return (
      <div
        ref={ref}
        className={cn(
          orientationStyles[orientation],
          thicknessStyles[thickness],
          variantStyles[variant],
          colorStyles[color],
          spacingStyles[spacing],
          orientation === 'vertical' && 'min-h-[1rem]',
          className
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export default Divider