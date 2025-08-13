'use client'

import React from 'react'
import Modal, { IModalProps } from './Modal'
import Button from './Button'
import { cn } from '@/lib/utils/cn'

export interface IDialogProps extends Omit<IModalProps, 'children'> {
  type?: 'info' | 'warning' | 'error' | 'success' | 'confirm'
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
}

const Dialog: React.FC<IDialogProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  loading = false,
  size = 'sm',
  ...props
}) => {
  const typeConfig = {
    info: {
      icon: '💡',
      confirmVariant: 'primary' as const
    },
    warning: {
      icon: '⚠️',
      confirmVariant: 'warning' as const
    },
    error: {
      icon: '❌',
      confirmVariant: 'danger' as const
    },
    success: {
      icon: '✅',
      confirmVariant: 'primary' as const
    },
    confirm: {
      icon: '❓',
      confirmVariant: 'primary' as const
    }
  }

  const config = typeConfig[type]

  const handleConfirm = () => {
    onConfirm?.()
    if (!loading) {
      onClose()
    }
  }

  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{config.icon}</div>
          <div className="flex-1">
            <p className="text-[var(--text-primary)] leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-2 px-6 py-4 border-t border-[var(--border-default)]">
        {(onCancel || type === 'confirm') && (
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant={config.confirmVariant}
          onClick={handleConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}

export default Dialog