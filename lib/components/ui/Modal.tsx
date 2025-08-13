'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

export interface IModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface IModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface IModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  closeOnOverlayClick = true,
  showCloseButton = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm" />
      
      {/* Modal */}
      <div className={cn(
        'relative w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[var(--radius-lg)] shadow-[var(--shadow-2xl)] max-h-[90vh] overflow-hidden flex flex-col',
        sizeStyles[size]
      )}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 pb-0">
            {title && (
              <h2 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-[var(--radius-default)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

const ModalHeader = React.forwardRef<HTMLDivElement, IModalHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-b border-[var(--border-default)]', className)}
      {...props}
    >
      {children}
    </div>
  )
)

const ModalContent = React.forwardRef<HTMLDivElement, IModalContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)

const ModalFooter = React.forwardRef<HTMLDivElement, IModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end space-x-2 px-6 py-4 border-t border-[var(--border-default)]', className)}
      {...props}
    >
      {children}
    </div>
  )
)

ModalHeader.displayName = 'ModalHeader'
ModalContent.displayName = 'ModalContent'
ModalFooter.displayName = 'ModalFooter'

export { Modal, ModalHeader, ModalContent, ModalFooter }
export default Modal