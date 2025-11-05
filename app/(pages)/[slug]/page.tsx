import { notFound } from 'next/navigation'
import { fetchPageBySlug } from '@/lib/api'
import { PageData } from '@/types/page'

// Import layout components
import HomeLayout from '@/app/layouts/HomeLayout'
import AboutLayout from '@/app/layouts/AboutLayout'
import ProductsLayout from '@/app/layouts/ProductsLayout'
import ServicesLayout from '@/app/layouts/ServicesLayout'
import ContactLayout from '@/app/layouts/ContactLayout'
import LandingLayout from '@/app/layouts/LandingLayout'
import QSRDesignsLayout from '@/app/layouts/QSRDesignsLayout'
import OurPortfolioLayout from '@/app/layouts/OurPortfolioLayout'
import DefaultLayout from '@/app/layouts/DefaultLayout'

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

  if (!pageData) {
    notFound()
  }

  // Get layout component based on page data layout type
  const LayoutComponent = layouts[pageData.layout] || layouts.default

  return <LayoutComponent pageData={pageData} />
}

