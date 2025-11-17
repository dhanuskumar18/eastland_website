import { notFound } from 'next/navigation'
import { fetchPageBySlug } from '@/lib/api'
import { PageData } from '@/types/page'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Import layout components
import HomeLayout from '@/components/layouts/HomeLayout'
import AboutLayout from '@/components/layouts/AboutLayout'
import ProductsLayout from '@/components/layouts/ProductsLayout'
import ServicesLayout from '@/components/layouts/ServicesLayout'
import ContactLayout from '@/components/layouts/ContactLayout'
import LandingLayout from '@/components/layouts/LandingLayout'
import QSRDesignsLayout from '@/components/layouts/QSRDesignsLayout'
import OurPortfolioLayout from '@/components/layouts/OurPortfolioLayout'
import DefaultLayout from '@/components/layouts/DefaultLayout'

// Layout component mapping
const layouts = {
  home: HomeLayout,
  about: AboutLayout,
  products: ProductsLayout,
  services: ServicesLayout,
  contact: ContactLayout,
  landing: LandingLayout,
  qsrdesigns: QSRDesignsLayout,
  ourportfolio: OurPortfolioLayout,
  default: DefaultLayout,
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const pageData = await fetchPageBySlug(slug)

  if (!pageData) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: pageData.meta?.title || pageData.title,
    description: pageData.meta?.description || pageData.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  
  // Debug: Log slug being fetched
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching page with slug:', slug)
  }
  
  const pageData = await fetchPageBySlug(slug)
  
  // Debug: Log fetched page data
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetched Page Data:', pageData)
    if (pageData?.sections) {
      console.log('Page Sections:', pageData.sections.map(s => ({ type: s.type, hasContent: !!s.content, contentKeys: Object.keys(s.content || {}) })))
    }
  }

  // For contact page, allow rendering even if API returns 404
  // This handles cases where the page might not exist in the CMS yet
  if (!pageData) {
    // Special handling for contact page variations - render with empty data
    const slugLower = slug.toLowerCase()
    if (slugLower === 'contact' || slugLower === 'contact-us' || slugLower === 'contactus') {
      return <ContactLayout />
    }
    notFound()
  }

  // Get layout component based on page data layout type
  const LayoutComponent = layouts[pageData.layout] || layouts.default

  return <LayoutComponent pageData={pageData} />
}

