import AllTestimonialsPage from '@/components/pages/AllTestimonialsPage'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SLUG = 'testimonials'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(PAGE_SLUG, {
    title: 'Testimonials',
    description: 'Read what our customers say about us.',
  })
}

export default function AllTestimonials() {
  return <AllTestimonialsPage />
}

