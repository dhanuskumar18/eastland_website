// API functions for fetching page data

import { PageData, ApiPageResponse, PageLayout, PageSection } from '@/types/page'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/'

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
export async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const url = `${API_BASE_URL}pages/slug/${slug}`
    
    // Use no-store in development, or short revalidate in production
    // This ensures admin changes appear immediately
    const cacheOption = process.env.NODE_ENV === 'production' 
      ? { next: { revalidate: 60 } } // Revalidate every minute in production
      : { cache: 'no-store' as const } // No cache in development
    
    const response = await fetch(url, {
      ...cacheOption,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`API returned ${response.status} for slug: ${slug}`)
      return null
    }

    const apiData: ApiPageResponse = await response.json()
    return transformApiResponse(apiData)
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
