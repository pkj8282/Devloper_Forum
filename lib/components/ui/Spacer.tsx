'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  direction?: 'horizontal' | 'vertical' | 'both'
  flexible?: boolean
}

const Spacer = React.forwardRef<HTMLDivElement, ISpacerProps>(
  ({ 
    className,
    size = 'md',
    direction = 'vertical',
    flexible = false,
    ...props 
  }, ref) => {
    const sizeMap = {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '3rem',   // 48px
      '3xl': '4rem'    // 64px
    }

    const getStyles = () => {
      const space = sizeMap[size]
      
      if (flexible) {
        return direction === 'horizontal' ? 'flex-1' : 'flex-1'
      }

      switch (direction) {
        case 'horizontal':
          return { width: space }
        case 'vertical':
          return { height: space }
        case 'both':
          return { width: space, height: space }
        default:
          return { height: space }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex-shrink-0',
          flexible && 'flex-1',
          className
        )}
        style={!flexible ? getStyles() : undefined}
        {...props}
      />
    )
  }
)

Spacer.displayName = 'Spacer'

export default Spacer