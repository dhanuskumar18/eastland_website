// Page types for dynamic slug system

export type PageLayout = 'home' | 'about' | 'products' | 'services' | 'contact' | 'landing' | 'qsrdesigns' | 'ourportfolio' | 'default'

export interface SectionTranslation {
  id: number
  sectionId: number
  locale: string
  content: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ApiSection {
  id: number
  name: string
  pageId: number
  createdAt: string
  updatedAt: string
  translations: SectionTranslation[]
}

export interface PageSection {
  id: string
  type: string
  content: Record<string, any>
  order: number
}

// API Response structure
export interface ApiPageResponse {
  id: number
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  sections: {
    data: ApiSection[]
    meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
  layout?: PageLayout
}

// Transformed page data for components
export interface PageData {
  id: string
  slug: string
  title: string
  description?: string
  layout: PageLayout
  sections: PageSection[]
  meta?: {
    title?: string
    description?: string
    image?: string
  }
  hero?: {
    image?: string
    title?: string
    subtitle?: string
    backgroundImage?: string
  }
}

