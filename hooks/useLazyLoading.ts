"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import type {
  LazyLoadingSettings,
  LazyLoadingSectionConfig,
  LazyLoadingWhereToApply,
} from '@/lib/seo'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Simple in-memory cache so we only call the API once on the client
let cachedSettings: LazyLoadingSettings | null = null
let cachedSectionConfigs: LazyLoadingSectionConfig[] | null = null
let settingsFetchPromise: Promise<void> | null = null

/**
 * Parse threshold string (e.g., "20%", "300px") to pixels
 */
function parseThreshold(threshold: string, defaultPixels: number = 200): number {
  if (!threshold) return defaultPixels

  const trimmed = threshold.trim()
  
  // Percentage threshold
  if (trimmed.endsWith('%')) {
    const percent = parseFloat(trimmed.slice(0, -1))
    if (!isNaN(percent)) {
      // Convert percentage to pixels based on viewport height
      // Use a default viewport height for SSR, will be recalculated on client
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
      return (viewportHeight * percent) / 100
    }
  }
  
  // Pixel threshold
  if (trimmed.endsWith('px')) {
    const pixels = parseFloat(trimmed.slice(0, -2))
    if (!isNaN(pixels)) {
      return pixels
    }
  }
  
  // Try parsing as number (assumes pixels)
  const num = parseFloat(trimmed)
  if (!isNaN(num)) {
    return num
  }
  
  return defaultPixels
}

/**
 * Hook to fetch and manage lazy loading settings
 */
export function useLazyLoading() {
  const [settings, setSettings] = useState<LazyLoadingSettings | null>(null)
  const [sectionConfigs, setSectionConfigs] = useState<LazyLoadingSectionConfig[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If we already have cached values, use them immediately and skip network
    if (cachedSettings) {
      setSettings(cachedSettings)
      setSectionConfigs(cachedSectionConfigs)
      setLoading(false)
      return
    }

    // Ensure only one actual network request is in-flight
    if (!settingsFetchPromise) {
      settingsFetchPromise = (async () => {
        try {
          const res = await fetch(`${API_URL}api/seo/lazy-loading`, {
            cache: 'no-store',
          })

          if (res.ok) {
            const json = await res.json()
            const data = json?.data as LazyLoadingSettings | undefined

            if (data) {
              cachedSettings = data

              // Only fetch section configs when lazy loading is enabled AND using custom sections
              if (data.enabled === 'enable' && data.whereToApply === 'custom') {
                try {
                  const sectionsRes = await fetch(`${API_URL}api/seo/lazy-loading/sections`, {
                    cache: 'no-store',
                  })

                  if (sectionsRes.ok) {
                    const sectionsJson = await sectionsRes.json()
                    cachedSectionConfigs = sectionsJson?.data || []
                  }
                } catch (error) {
                  console.error('Error fetching lazy loading sections:', error)
                }
              }
            }
          }
        } catch (error) {
          console.error('Error fetching lazy loading settings:', error)
        }
      })()
    }

    // Subscribe to the shared fetch promise
    settingsFetchPromise
      ?.then(() => {
        setSettings(cachedSettings)
        setSectionConfigs(cachedSectionConfigs)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { settings, sectionConfigs, loading }
}

/**
 * Hook to determine if an image should be lazy loaded based on settings
 */
export function useShouldLazyLoad(
  imageType: 'page' | 'product' | 'gallery' | 'other',
  sectionId?: number | string
): {
  shouldLazyLoad: boolean
  loadingAttribute: 'lazy' | 'eager' | undefined
  threshold: number
} {
  const { settings, sectionConfigs } = useLazyLoading()

  // Default: don't lazy load
  const defaultResult = {
    shouldLazyLoad: false,
    loadingAttribute: undefined as 'lazy' | 'eager' | undefined,
    threshold: 200,
  }

  if (!settings || settings.enabled !== 'enable') {
    return defaultResult
  }

  const whereToApply = settings.whereToApply

  // Check if this image type should be lazy loaded
  let shouldLazyLoad = false

  switch (whereToApply) {
    case 'all-images':
      shouldLazyLoad = true
      break
    case 'page-images':
      shouldLazyLoad = imageType === 'page'
      break
    case 'product-images':
      shouldLazyLoad = imageType === 'product'
      break
    case 'gallery-images':
      shouldLazyLoad = imageType === 'gallery'
      break
    case 'custom':
      // Check if sectionId is in the custom configs
      if (sectionId !== undefined && sectionConfigs) {
        const sectionConfig = sectionConfigs.find(
          (config) => config.sectionId === Number(sectionId)
        )
        shouldLazyLoad = sectionConfig?.enabled ?? false
      } else {
        shouldLazyLoad = false
      }
      break
    default:
      shouldLazyLoad = false
  }

  if (!shouldLazyLoad) {
    return defaultResult
  }

  // Determine threshold and loading attribute
  let threshold = parseThreshold(settings.preloadThreshold)
  let loadingAttribute: 'lazy' | 'eager' | undefined = 
    settings.loadingAttribute === 'lazy' ? 'lazy' : undefined

  // For custom sections, use section-specific config
  if (whereToApply === 'custom' && sectionId !== undefined && sectionConfigs) {
    const sectionConfig = sectionConfigs.find(
      (config) => config.sectionId === Number(sectionId)
    )
    if (sectionConfig) {
      threshold = parseThreshold(sectionConfig.preloadThreshold)
      loadingAttribute = sectionConfig.loadingAttribute === 'lazy' ? 'lazy' : undefined
    }
  }

  return {
    shouldLazyLoad,
    loadingAttribute,
    threshold,
  }
}

/**
 * Hook to use Intersection Observer for custom lazy loading
 */
export function useIntersectionObserver(
  threshold: number,
  enabled: boolean
): {
  ref: React.RefCallback<HTMLElement | null>
  isIntersecting: boolean
} {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback((element: HTMLElement | null) => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    elementRef.current = element

    if (!element || !enabled) {
      setIsIntersecting(false)
      return
    }

    // Create new observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0,
      }
    )

    observer.observe(element)
    observerRef.current = observer
  }, [threshold, enabled])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { ref, isIntersecting }
}

