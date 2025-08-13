'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import Button from './Button'
import Icon from './Icon'

export interface IPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  siblingCount?: number
  boundaryCount?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Pagination = React.forwardRef<HTMLDivElement, IPaginationProps>(
  ({ 
    className,
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    size = 'md',
    ...props 
  }, ref) => {
    const range = (start: number, end: number) => {
      const length = end - start + 1
      return Array.from({ length }, (_, i) => start + i)
    }

    const getPageNumbers = () => {
      const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2
      
      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages)
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 2)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1)

      const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2
      const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = siblingCount * 2 + boundaryCount + 2
        return [
          ...range(1, leftItemCount),
          '...',
          ...range(totalPages - boundaryCount + 1, totalPages)
        ]
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = boundaryCount + 1 + 2 * siblingCount
        return [
          ...range(1, boundaryCount),
          '...',
          ...range(totalPages - rightItemCount + 1, totalPages)
        ]
      }

      return [
        ...range(1, boundaryCount),
        '...',
        ...range(leftSiblingIndex, rightSiblingIndex),
        '...',
        ...range(totalPages - boundaryCount + 1, totalPages)
      ]
    }

    const pageNumbers = getPageNumbers()

    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage && !disabled) {
        onPageChange(page)
      }
    }

    if (totalPages <= 1) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center space-x-1',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* 첫 페이지 버튼 */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={() => handlePageChange(1)}
            disabled={disabled || currentPage === 1}
            className="px-2"
          >
            <Icon name="chevronLeft" size="sm" />
            <Icon name="chevronLeft" size="sm" className="-ml-1" />
          </Button>
        )}

        {/* 이전 페이지 버튼 */}
        {showPrevNext && (
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            className="px-2"
          >
            <Icon name="chevronLeft" size="sm" />
          </Button>
        )}

        {/* 페이지 번호들 */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-[var(--text-tertiary)]"
              >
                ...
              </span>
            )
          }

          const page = pageNumber as number
          const isActive = page === currentPage

          return (
            <Button
              key={page}
              variant={isActive ? 'primary' : 'ghost'}
              size={buttonSize}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              className={cn(
                'min-w-[2.5rem]',
                isActive && 'font-semibold'
              )}
            >
              {page}
            </Button>
          )
        })}

        {/* 다음 페이지 버튼 */}
        {showPrevNext && (
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            className="px-2"
          >
            <Icon name="chevronRight" size="sm" />
          </Button>
        )}

        {/* 마지막 페이지 버튼 */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            className="px-2"
          >
            <Icon name="chevronRight" size="sm" />
            <Icon name="chevronRight" size="sm" className="-ml-1" />
          </Button>
        )}
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'

export default Pagination