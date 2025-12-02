"use client"

import { useLazyLoading, useIntersectionObserver } from '@/hooks/useLazyLoading'
import { ReactNode, useState, useEffect } from 'react'

interface LazySectionProps {
  sectionId: number | string
  children: ReactNode
  className?: string
}

/**
 * LazySection component that lazy loads entire sections when whereToApply is 'custom'
 * Only renders the section content when it comes into view based on custom threshold settings
 */
export default function LazySection({ sectionId, children, className }: LazySectionProps) {
  const { settings, sectionConfigs } = useLazyLoading()
  const [shouldRender, setShouldRender] = useState(false)

  // Check if custom lazy loading is enabled for this section
  const isCustomLazyLoading = settings?.whereToApply === 'custom'
  const sectionConfig = sectionConfigs?.find(
    (config) => config.sectionId === Number(sectionId)
  )
  const isEnabled = sectionConfig?.enabled ?? false

  // Parse threshold
  const parseThreshold = (threshold: string, defaultPixels: number = 200): number => {
    if (!threshold) return defaultPixels
    const trimmed = threshold.trim()
    
    if (trimmed.endsWith('%')) {
      const percent = parseFloat(trimmed.slice(0, -1))
      if (!isNaN(percent)) {
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
        return (viewportHeight * percent) / 100
      }
    }
    
    if (trimmed.endsWith('px')) {
      const pixels = parseFloat(trimmed.slice(0, -2))
      if (!isNaN(pixels)) return pixels
    }
    
    const num = parseFloat(trimmed)
    if (!isNaN(num)) return num
    
    return defaultPixels
  }

  const threshold = sectionConfig 
    ? parseThreshold(sectionConfig.preloadThreshold)
    : 200

  // Use Intersection Observer to detect when section should be loaded
  const { ref, isIntersecting } = useIntersectionObserver(
    threshold,
    isCustomLazyLoading && isEnabled
  )

  // Update shouldRender when intersection changes
  useEffect(() => {
    if (isCustomLazyLoading && isEnabled) {
      if (isIntersecting) {
        setShouldRender(true)
      }
    } else {
      // If not custom lazy loading or not enabled, render immediately
      setShouldRender(true)
    }
  }, [isIntersecting, isCustomLazyLoading, isEnabled])

  // If lazy loading is not enabled or should render, show content
  if (shouldRender) {
    return (
      <div ref={ref as any} className={className}>
        {children}
      </div>
    )
  }

  // Show placeholder while waiting to load
  return (
    <div
      ref={ref as any}
      className={`${className} min-h-[400px] bg-gray-100 animate-pulse`}
      aria-label="Loading section"
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400 text-sm">Loading section...</div>
      </div>
    </div>
  )
}

