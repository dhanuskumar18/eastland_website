// API functions for fetching page data

import { PageData, ApiPageResponse, PageLayout, PageSection } from '@/types/page'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'

/**
 * Determine layout from page name or slug
 */
function getLayoutFromName(name: string, slug: string): PageLayout {
  const nameLower = name.toLowerCase()
  const slugLower = slug.toLowerCase()
  
  // First try to determine from page name
  if (nameLower === 'home' || nameLower.includes('home')) return 'home'
  if (nameLower === 'about' || nameLower.includes('about')) return 'about'
  if (nameLower === 'products' || nameLower.includes('product')) return 'products'
  if (nameLower === 'services' || nameLower.includes('service')) return 'services'
  if (nameLower === 'contact' || nameLower.includes('contact')) return 'contact'
  if (nameLower.includes('qsr')) return 'qsrdesigns'
  if (nameLower.includes('portfolio')) return 'ourportfolio' as PageLayout
  
  // Fallback to slug if name doesn't match
  if (slugLower.includes('home') || slugLower === '') return 'home'
  if (slugLower.includes('about')) return 'about'
  if (slugLower.includes('product')) return 'products'
  if (slugLower.includes('service')) return 'services'
  if (slugLower.includes('contact')) return 'contact'
  if (slugLower.includes('qsr')) return 'qsrdesigns'
  if (slugLower.includes('portfolio')) return 'ourportfolio' as PageLayout
  
  return 'default'
}

/**
 * Transform API response to PageData format
 */
function transformApiResponse(apiData: ApiPageResponse): PageData {
  // Use page name to determine layout (name takes priority over slug)
  const layout = apiData.layout || getLayoutFromName(apiData.name, apiData.slug)
  
  // Transform API sections to PageSection format
  // Get the English translation (or first available) for each section
  const transformedSections: PageSection[] = (apiData.sections.data || []).map((apiSection, index) => {
    // Get English translation or first available translation
    const translation = apiSection.translations?.find(t => t.locale === 'en') || apiSection.translations?.[0]
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Section ${index}:`, {
        id: apiSection.id,
        name: apiSection.name,
        hasTranslation: !!translation,
        locale: translation?.locale,
        contentKeys: translation?.content ? Object.keys(translation.content) : [],
      })
    }
    
    return {
      id: String(apiSection.id),
      type: apiSection.name,
      content: translation?.content || {},
      order: index,
    }
  })
  
  return {
    id: String(apiData.id),
    slug: apiData.slug,
    title: apiData.name,
    layout,
    sections: transformedSections,
  }
}

/**
 * Fetch page data by slug from CMS/Backend
 * Calls GET /pages/slug/{slug}
 */
export async function fetchPageBySlug(slug: string, retries: number = 2): Promise<PageData | null> {
  try {
    // Normalize contact page slugs to 'contact' (backend uses 'contact')
    const normalizedSlug = slug.toLowerCase() === 'contact-us' || slug.toLowerCase() === 'contactus' 
      ? 'contact' 
      : slug
    
    // URL encode the slug to handle special characters like forward slashes
    // For slugs with forward slashes (e.g., "videos/all"), we need to encode the entire slug
    // This will convert "/" to "%2F" which NestJS will decode back to "/"
    const encodedSlug = encodeURIComponent(normalizedSlug)
    
    const url = `${API_BASE_URL}pages/slug/${encodedSlug}`
    
    // Retry logic for rate limiting
    let lastError: Error | null = null
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          // Wait before retrying (exponential backoff)
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })
        
        if (response.status === 429) {
          // Rate limited - retry
          lastError = new Error(`Rate limited (429) for slug: ${normalizedSlug}`)
          if (attempt < retries) {
            console.log(`Rate limited, retrying in ${Math.min(1000 * Math.pow(2, attempt), 5000)}ms...`)
            continue
          }
        }
        
        if (!response.ok) {
          console.error(`API returned ${response.status} for slug: ${normalizedSlug} (original: ${slug})`)
          return null
        }
        
        // Success - break out of retry loop
        lastError = null
        const apiData: ApiPageResponse = await response.json()
        
        // Debug: Log raw API response in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Raw API Response for slug:', slug, apiData)
          console.log('Sections data:', apiData?.sections?.data)
          if (apiData?.sections?.data) {
            apiData.sections.data.forEach((section, idx) => {
              console.log(`Section ${idx}:`, {
                id: section.id,
                name: section.name,
                translations: section.translations?.map(t => ({
                  locale: t.locale,
                  contentKeys: Object.keys(t.content || {}),
                  hasCustomFields: !!(t.content as any)?.customFields,
                })),
              })
            })
          }
        }
        
        // Validate API response structure before transforming
        if (!apiData || !apiData.sections || !apiData.sections.data) {
          console.error('Invalid API response structure for slug:', slug)
          return null
        }
        
        const transformed = transformApiResponse(apiData)
        
        // Debug: Log transformed data
        if (process.env.NODE_ENV === 'development') {
          console.log('Transformed Page Data:', transformed)
          const contactFormSection = transformed.sections?.find(s => 
            s.type?.toLowerCase().includes('contact_form') || s.type?.toLowerCase().includes('contact form')
          )
          console.log('Contact Form Section in Transformed Data:', contactFormSection)
          console.log('Contact Form Content Keys:', contactFormSection?.content ? Object.keys(contactFormSection.content) : 'N/A')
        }
        
        return transformed
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        if (attempt < retries) {
          continue
        }
      }
    }
    
    // All retries failed
    if (lastError) {
      console.error('Error fetching page after retries:', lastError)
    }
    return null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

/**
 * Get all page slugs for static generation (optional)
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/slugs`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.slugs || []
  } catch (error) {
    console.error('Error fetching page slugs:', error)
    return []
  }
}

/**
 * Fetch YouTube video by ID to get brand information
 * Example: GET /youtube-videos/{id}
 * Note: This function is designed to be called from client components
 */
export async function fetchYouTubeVideoById(id: number): Promise<{
  id: number
  brand?: { id: number; name: string } | null
  brandId?: number
  brandName?: string
} | null> {
  try {
    const url = `${API_BASE_URL}youtube-videos/${id}`

    // Use standard fetch for client-side calls (no Next.js cache options)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Client-side fetch doesn't support Next.js cache options
      cache: 'default',
    })

    if (!response.ok) {
      return null
    }

    const result = await response.json()
    const video = result?.data || result
    
    // Debug: Log the video object to see its structure
    if (process.env.NODE_ENV === 'development') {
      console.log('YouTube Video API Response:', video)
      console.log('Brand object:', video.brand)
      console.log('BrandId:', video.brandId)
    }
    
    // Extract brand information - brand can be an object with name property
    let brandName = ""
    if (video.brand && typeof video.brand === 'object' && video.brand.name) {
      brandName = video.brand.name
    } else if (typeof video.brand === 'string') {
      brandName = video.brand
    } else if (video.brandName) {
      brandName = video.brandName
    }
    
    // Debug: Log extracted brand name
    if (process.env.NODE_ENV === 'development') {
      console.log('Extracted brandName:', brandName)
    }
    
    return {
      id: video.id,
      brand: video.brand,
      brandId: video.brandId,
      brandName: brandName,
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error)
    return null
  }
}

/**
 * Fetch a global by name (e.g., Footer)
 * Example: GET /globals/name/Footer
 */
export async function fetchGlobalByName<T = any>(name: string): Promise<{
  id: number
  name: string
  content: T | null
} | null> {
  try {
    const url = `${API_BASE_URL}globals/name/${encodeURIComponent(name)}`

    const cacheOption = process.env.NODE_ENV === 'production'
      ? { next: { revalidate: 120 } }
      : { cache: 'no-store' as const }

    const response = await fetch(url, {
      ...cacheOption,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch global ${name}: ${response.status}`)
      return null
    }

    const data = await response.json() as {
      id: number
      name: string
      translations?: Array<{
        id: number
        globalsId: number
        locale: string
        content: any
      }>
    }

    const translations = data.translations || []
    const en = translations.find(t => t.locale === 'en') || translations[0]

    return {
      id: data.id,
      name: data.name,
      content: en ? en.content : null,
    }
  } catch (error) {
    console.error('Error fetching global by name:', error)
    return null
  }
}

/**
 * Submit contact form
 * Example: POST /contact-submissions
 */
export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  customFields?: Record<string, any>
}): Promise<{
  status: boolean
  code: number
  message: string
  data?: any
} | null> {
  try {
    const url = `${API_BASE_URL}contact-submissions`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to submit contact form')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}
