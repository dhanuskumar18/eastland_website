"use client"

import Image, { ImageProps } from 'next/image'
import { useShouldLazyLoad, useIntersectionObserver } from '@/hooks/useLazyLoading'
import { useRef, useEffect, useState } from 'react'

interface LazyImageProps extends Omit<ImageProps, 'loading'> {
  imageType: 'page' | 'product' | 'gallery' | 'other'
  sectionId?: number | string
  className?: string
}

/**
 * LazyImage component that applies lazy loading based on API settings
 * Supports both native lazy loading and Intersection Observer for custom thresholds
 */
export default function LazyImage({
  imageType,
  sectionId,
  className,
  ...imageProps
}: LazyImageProps) {
  const { shouldLazyLoad, loadingAttribute, threshold } = useShouldLazyLoad(
    imageType,
    sectionId
  )

  const [shouldLoad, setShouldLoad] = useState(!shouldLazyLoad)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use Intersection Observer for custom thresholds when native lazy loading is not sufficient
  // We use IO when we need a custom threshold that's different from browser default
  const needsCustomObserver = shouldLazyLoad && threshold !== 200 // 200px is roughly browser default
  const { ref: observerRef, isIntersecting } = useIntersectionObserver(
    threshold,
    needsCustomObserver
  )

  // Combine refs
  useEffect(() => {
    if (containerRef.current && needsCustomObserver) {
      observerRef(containerRef.current)
    }
  }, [observerRef, needsCustomObserver])

  // Update shouldLoad when intersection changes (for custom observer)
  useEffect(() => {
    if (needsCustomObserver && isIntersecting) {
      setShouldLoad(true)
    }
  }, [isIntersecting, needsCustomObserver])

  // Determine loading attribute
  const loading: 'lazy' | 'eager' | undefined = 
    shouldLazyLoad && !needsCustomObserver
      ? (loadingAttribute || 'lazy')
      : shouldLazyLoad && needsCustomObserver && !shouldLoad
      ? 'eager' // Will be controlled by Intersection Observer
      : 'eager'

  // If using custom observer and not yet intersecting, show placeholder
  if (needsCustomObserver && !shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={`${className} bg-gray-200 animate-pulse`}
        style={{
          width: imageProps.fill ? '100%' : imageProps.width || '100%',
          height: imageProps.fill ? '100%' : imageProps.height || '100%',
        }}
        aria-label={imageProps.alt || 'Loading image'}
      />
    )
  }

  // Render the image
  return (
    <div ref={containerRef} className={imageProps.fill ? className : undefined}>
      <Image
        {...imageProps}
        loading={loading}
        className={imageProps.fill ? undefined : className}
      />
    </div>
  )
}

