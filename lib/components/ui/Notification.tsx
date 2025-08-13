'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import Icon from './Icon'
import Button from './Button'

export interface INotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
  actions?: Array<{
    label: string
    variant?: 'primary' | 'secondary' | 'outline'
    onClick: () => void
  }>
  icon?: React.ReactNode
  avatar?: React.ReactNode
}

const Notification = React.forwardRef<HTMLDivElement, INotificationProps>(
  ({ 
    className,
    type = 'info',
    title,
    message,
    dismissible = true,
    onDismiss,
    actions,
    icon,
    avatar,
    ...props 
  }, ref) => {
    const typeStyles = {
      info: {
        container: 'bg-[var(--bg-secondary)] border-[var(--status-info)]',
        icon: 'info',
        iconColor: 'text-[var(--status-info)]'
      },
      success: {
        container: 'bg-[var(--bg-secondary)] border-[var(--status-success)]',
        icon: 'success',
        iconColor: 'text-[var(--status-success)]'
      },
      warning: {
        container: 'bg-[var(--bg-secondary)] border-[var(--status-warning)]',
        icon: 'warning',
        iconColor: 'text-[var(--status-warning)]'
      },
      error: {
        container: 'bg-[var(--bg-secondary)] border-[var(--status-error)]',
        icon: 'error',
        iconColor: 'text-[var(--status-error)]'
      }
    }

    const currentType = typeStyles[type]

    return (
      <div
        ref={ref}
        className={cn(
          'relative p-4 rounded-[var(--radius-lg)] border-l-4 shadow-[var(--shadow-sm)]',
          currentType.container,
          className
        )}
        {...props}
      >
        <div className="flex items-start">
          {/* 아바타 또는 아이콘 */}
          <div className="flex-shrink-0 mr-3">
            {avatar ? (
              avatar
            ) : icon ? (
              icon
            ) : (
              <Icon 
                name={currentType.icon} 
                size="md" 
                className={currentType.iconColor}
              />
            )}
          </div>

          {/* 콘텐츠 */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                {title}
              </h4>
            )}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {message}
            </p>
            
            {/* 액션 버튼들 */}
            {actions && actions.length > 0 && (
              <div className="flex items-center space-x-2 mt-3">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    size="sm"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* 닫기 버튼 */}
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 ml-3 p-1 rounded hover:bg-[var(--bg-surface)] transition-colors duration-150"
            >
              <Icon name="close" size="sm" className="text-[var(--text-tertiary)]" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

Notification.displayName = 'Notification'

export default Notification