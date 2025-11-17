import { notFound } from 'next/navigation'
import { fetchPageBySlug } from '@/lib/api'
import { PageData } from '@/types/page'

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
  const pageData = await fetchPageBySlug(slug)

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

