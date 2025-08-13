'use client'

import React from 'react'
import NextImage from 'next/image'
import { cn } from '@/lib/utils/cn'

export interface IImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fallback?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  loading?: 'lazy' | 'eager'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  overlay?: boolean
  overlayContent?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, IImageProps>(
  ({ 
    className,
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    quality = 75,
    placeholder,
    blurDataURL,
    fallback,
    rounded = 'none',
    loading = 'lazy',
    objectFit = 'cover',
    overlay = false,
    overlayContent,
    ...props 
  }, ref) => {
    const [error, setError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const roundedStyles = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    }

    const objectFitStyles = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down'
    }

    const handleError = () => {
      setError(true)
      setIsLoading(false)
    }

    const handleLoad = () => {
      setIsLoading(false)
    }

    if (error && fallback) {
      return (
        <div className={cn(
          'flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-tertiary)]',
          roundedStyles[rounded],
          className
        )}>
          <NextImage
            src={fallback}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            className={cn(
              objectFitStyles[objectFit],
              roundedStyles[rounded]
            )}
            onLoad={handleLoad}
          />
        </div>
      )
    }

    if (error) {
      return (
        <div 
          className={cn(
            'flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-tertiary)] text-sm',
            roundedStyles[rounded],
            !fill && width && height && `w-[${width}px] h-[${height}px]`,
            className
          )}
        >
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>이미지를 불러올 수 없습니다</span>
          </div>
        </div>
      )
    }

    return (
      <div className={cn('relative', fill && 'w-full h-full', className)}>
        {isLoading && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)] animate-pulse',
            roundedStyles[rounded]
          )}>
            <svg className="w-8 h-8 text-[var(--text-tertiary)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        <NextImage
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={cn(
            objectFitStyles[objectFit],
            roundedStyles[rounded],
            isLoading && 'opacity-0',
            'transition-opacity duration-300'
          )}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />

        {overlay && overlayContent && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300',
            roundedStyles[rounded]
          )}>
            {overlayContent}
          </div>
        )}
      </div>
    )
  }
)

Image.displayName = 'Image'

export default Image