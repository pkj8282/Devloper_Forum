'use client'

import React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils/cn'

export interface ILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'default' | 'primary' | 'muted' | 'danger' | 'unstyled'
  size?: 'sm' | 'md' | 'lg'
  underline?: 'none' | 'hover' | 'always'
  external?: boolean
  disabled?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>(
  ({ 
    className, 
    href,
    variant = 'default',
    size = 'md',
    underline = 'hover',
    external = false,
    disabled = false,
    children,
    ...props 
  }, ref) => {
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const variantStyles = {
      default: 'text-[var(--text-primary)] hover:text-[var(--interactive-hover)]',
      primary: 'text-[var(--brand-primary)] hover:text-[#0091e6]',
      muted: 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
      danger: 'text-[var(--status-error)] hover:text-[#c82333]',
      unstyled: 'text-inherit'
    }

    const underlineStyles = {
      none: 'no-underline',
      hover: 'no-underline hover:underline',
      always: 'underline'
    }

    const baseStyles = 'transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--interactive-focus)] focus-visible:ring-offset-2 rounded-sm'

    const linkStyles = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      underlineStyles[underline],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    )

    // 외부 링크인 경우
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          ref={ref}
          href={href}
          className={linkStyles}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          {external && variant !== 'unstyled' && (
            <svg 
              className="inline w-3 h-3 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          )}
        </a>
      )
    }

    // 내부 링크인 경우 (Next.js Link 사용)
    return (
      <NextLink
        ref={ref}
        href={href}
        className={linkStyles}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export default Link