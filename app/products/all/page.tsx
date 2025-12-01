import AllProductsPage from '@/components/pages/AllProductsPage'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SLUG = 'products'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(PAGE_SLUG, {
    title: 'Products',
    description: 'Explore our full range of products.',
  })
}

export default function AllProducts() {
  return <AllProductsPage />
}

