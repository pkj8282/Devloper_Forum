'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  hover?: boolean
}

export interface ICardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ICardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ICardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ 
    className, 
    padding = 'md',
    shadow = 'default',
    border = true,
    hover = false,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'bg-[var(--bg-secondary)] rounded-[var(--radius-lg)] transition-all duration-150'
    
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8'
    }
    
    const shadowStyles = {
      none: '',
      sm: 'shadow-[var(--shadow-sm)]',
      default: 'shadow-[var(--shadow-default)]',
      md: 'shadow-[var(--shadow-md)]',
      lg: 'shadow-[var(--shadow-lg)]',
      xl: 'shadow-[var(--shadow-xl)]'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          paddingStyles[padding],
          shadowStyles[shadow],
          border && 'border border-[var(--border-default)]',
          hover && 'hover:shadow-[var(--shadow-md)] hover:border-[var(--border-light)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardHeader = React.forwardRef<HTMLDivElement, ICardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

const CardContent = React.forwardRef<HTMLDivElement, ICardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

const CardFooter = React.forwardRef<HTMLDivElement, ICardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
export default Card