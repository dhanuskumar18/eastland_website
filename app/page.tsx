import { fetchPageBySlug } from '@/lib/api'
import HomeLayout from '../components/layouts/HomeLayout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

const PAGE_SLUG = 'home'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(PAGE_SLUG, {
    title: 'Home',
    description: 'Welcome to Eastland Website',
  })
}

export default async function HomePage() {
  const pageData = await fetchPageBySlug(PAGE_SLUG)

  if (!pageData) {
    notFound()
  }

  return <HomeLayout pageData={pageData} />
}
