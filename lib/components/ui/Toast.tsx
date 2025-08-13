'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import Icon from './Icon'

export interface IToast {
  id: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface IToastProps extends IToast {
  onDismiss: (id: string) => void
}

const Toast: React.FC<IToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  persistent = false,
  action,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // 진입 애니메이션
    setIsVisible(true)

    // 자동 제거
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, persistent])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onDismiss(id)
    }, 300)
  }

  const typeStyles = {
    success: {
      container: 'bg-[var(--status-success)] border-green-600',
      icon: 'success',
      iconColor: 'text-white'
    },
    error: {
      container: 'bg-[var(--status-error)] border-red-600',
      icon: 'error',
      iconColor: 'text-white'
    },
    warning: {
      container: 'bg-[var(--status-warning)] border-yellow-600',
      icon: 'warning',
      iconColor: 'text-[var(--text-inverse)]'
    },
    info: {
      container: 'bg-[var(--status-info)] border-blue-600',
      icon: 'info',
      iconColor: 'text-white'
    }
  }

  const currentType = typeStyles[type]

  return (
    <div
      className={cn(
        'relative flex items-start p-4 rounded-[var(--radius-lg)] border shadow-[var(--shadow-lg)] min-w-[300px] max-w-[500px] transition-all duration-300 ease-in-out',
        currentType.container,
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0 mr-3">
        <Icon 
          name={currentType.icon} 
          size="md" 
          className={currentType.iconColor}
        />
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-semibold text-white mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm text-white opacity-90">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium text-white underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 ml-2 p-1 rounded hover:bg-black hover:bg-opacity-20 transition-colors duration-150"
      >
        <Icon name="close" size="sm" className="text-white" />
      </button>

      {/* 진행 바 */}
      {!persistent && duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-b-[var(--radius-lg)] overflow-hidden">
          <div 
            className="h-full bg-white bg-opacity-60 animate-[shrink_5s_linear_forwards]"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

export default Toast