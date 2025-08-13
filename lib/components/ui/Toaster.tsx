'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Toast, { IToast } from './Toast'

interface IToasterContext {
  addToast: (toast: Omit<IToast, 'id'>) => void
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToasterContext = createContext<IToasterContext | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToasterContext)
  if (!context) {
    throw new Error('useToast must be used within a ToasterProvider')
  }
  return context
}

interface IToasterProviderProps {
  children: React.ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
}

export const ToasterProvider: React.FC<IToasterProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5
}) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = useCallback((toast: Omit<IToast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: IToast = { ...toast, id }

    setToasts(prev => {
      const newToasts = [newToast, ...prev]
      // 최대 개수 제한
      return newToasts.slice(0, maxToasts)
    })
  }, [maxToasts])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  return (
    <ToasterContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <div
            className={`fixed z-50 flex flex-col space-y-2 ${positionStyles[position]}`}
            style={{ pointerEvents: 'none' }}
          >
            {toasts.map(toast => (
              <div key={toast.id} style={{ pointerEvents: 'auto' }}>
                <Toast {...toast} onDismiss={removeToast} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToasterContext.Provider>
  )
}

// 편의 함수들
export const toast = {
  success: (message: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'message'>>) => {
    const context = ToasterContext
    // 이 함수는 컴포넌트 외부에서 사용하기 위한 헬퍼입니다
    // 실제로는 useToast 훅을 사용해야 합니다
  },
  error: (message: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'message'>>) => {
    // 같은 방식으로 구현
  },
  warning: (message: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'message'>>) => {
    // 같은 방식으로 구현
  },
  info: (message: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'message'>>) => {
    // 같은 방식으로 구현
  }
}

export default ToasterProvider