import AllVideosPage from '@/components/pages/AllVideosPage'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SLUG = 'videos'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(PAGE_SLUG, {
    title: 'Videos',
    description: 'Watch our latest videos and content.',
  })
}

export default function AllVideos() {
  return <AllVideosPage />
}

