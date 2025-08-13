'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IRadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export interface IRadioGroupProps {
  name: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: IRadioOption[]
  label?: string
  error?: string
  direction?: 'vertical' | 'horizontal'
  className?: string
}

const Radio = React.forwardRef<HTMLInputElement, IRadioProps>(
  ({ 
    className, 
    label,
    description,
    error,
    ...props 
  }, ref) => {
    const baseStyles = 'h-4 w-4 text-[var(--brand-primary)] bg-[var(--bg-surface)] border border-[var(--border-light)] focus:ring-2 focus:ring-[var(--interactive-focus)] focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150'

    return (
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            className={cn(
              baseStyles,
              error && 'border-[var(--status-error)]',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label className="text-sm font-medium text-[var(--text-primary)] cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-[var(--text-tertiary)] mt-1">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-[var(--status-error)] mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

const RadioGroup: React.FC<IRadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  options,
  label,
  error,
  direction = 'vertical',
  className
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '')

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleChange = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className={cn(
        'space-y-3',
        direction === 'horizontal' && 'flex space-x-6 space-y-0'
      )}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleChange(option.value)}
                disabled={option.disabled}
                className={cn(
                  'h-4 w-4 text-[var(--brand-primary)] bg-[var(--bg-surface)] border border-[var(--border-light)] focus:ring-2 focus:ring-[var(--interactive-focus)] focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150',
                  error && 'border-[var(--status-error)]'
                )}
              />
            </div>
            <div className="flex-1">
              <label 
                className="text-sm font-medium text-[var(--text-primary)] cursor-pointer"
                onClick={() => !option.disabled && handleChange(option.value)}
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-[var(--status-error)]">{error}</p>
      )}
    </div>
  )
}

Radio.displayName = 'Radio'
RadioGroup.displayName = 'RadioGroup'

export { Radio, RadioGroup }
export default Radio