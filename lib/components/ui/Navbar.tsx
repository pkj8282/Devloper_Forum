'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

export interface INavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode
  fixed?: boolean
  transparent?: boolean
}

export interface INavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string
  active?: boolean
  disabled?: boolean
}

export interface INavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
  disabled?: boolean
}

const Navbar = React.forwardRef<HTMLElement, INavbarProps>(
  ({ className, brand, fixed = false, transparent = false, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'w-full transition-all duration-150',
          fixed ? 'fixed top-0 left-0 right-0 z-40' : 'relative',
          transparent 
            ? 'bg-transparent' 
            : 'bg-[var(--bg-primary)] border-b border-[var(--border-default)]',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {brand && (
              <div className="flex-shrink-0">
                {brand}
              </div>
            )}
            <div className="flex items-center space-x-4">
              {children}
            </div>
          </div>
        </div>
      </nav>
    )
  }
)

const NavItem = React.forwardRef<HTMLLIElement, INavItemProps>(
  ({ className, href, active = false, disabled = false, children, ...props }, ref) => {
    const baseStyles = 'px-3 py-2 rounded-[var(--radius-default)] text-[var(--text-base)] font-medium transition-colors duration-150'
    
    const content = (
      <li
        ref={ref}
        className={cn(
          baseStyles,
          active 
            ? 'bg-[var(--brand-primary)] text-white' 
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
          disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[var(--text-secondary)]',
          className
        )}
        {...props}
      >
        {href && !disabled ? (
          <Link href={href} className="block w-full h-full">
            {children}
          </Link>
        ) : (
          children
        )}
      </li>
    )

    return content
  }
)

const NavLink = React.forwardRef<HTMLAnchorElement, INavLinkProps>(
  ({ className, href, active = false, disabled = false, children, ...props }, ref) => {
    const baseStyles = 'px-3 py-2 rounded-[var(--radius-default)] text-[var(--text-base)] font-medium transition-colors duration-150 inline-block'
    
    if (disabled) {
      return (
        <span
          className={cn(
            baseStyles,
            'opacity-50 cursor-not-allowed text-[var(--text-secondary)]',
            className
          )}
        >
          {children}
        </span>
      )
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          baseStyles,
          active 
            ? 'bg-[var(--brand-primary)] text-white' 
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
          className
        )}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

const NavBrand: React.FC<{ children: React.ReactNode; href?: string; className?: string }> = ({ 
  children, 
  href, 
  className 
}) => {
  const baseStyles = 'text-[var(--text-xl)] font-bold text-[var(--text-primary)] hover:text-[var(--interactive-hover)] transition-colors duration-150'
  
  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, className)}>
        {children}
      </Link>
    )
  }

  return (
    <div className={cn(baseStyles, className)}>
      {children}
    </div>
  )
}

Navbar.displayName = 'Navbar'
NavItem.displayName = 'NavItem'
NavLink.displayName = 'NavLink'
NavBrand.displayName = 'NavBrand'

export { Navbar, NavItem, NavLink, NavBrand }
export default Navbar