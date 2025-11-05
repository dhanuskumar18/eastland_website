import { fetchPageBySlug } from '@/lib/api'
import HomeLayout from '../components/layouts/HomeLayout'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const pageData = await fetchPageBySlug('home')

  if (!pageData) {
    return {
      title: 'Home',
    }
  }

  return {
    title: pageData.meta?.title || pageData.title,
    description: pageData.meta?.description || pageData.description,
  }
}

export default async function HomePage() {
  const pageData = await fetchPageBySlug('home')

  if (!pageData) {
    notFound()
  }

  return <HomeLayout pageData={pageData} />
}
