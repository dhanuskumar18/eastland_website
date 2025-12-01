import AllTeamPage from '@/components/pages/AllTeamPage'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SLUG = 'team'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(PAGE_SLUG, {
    title: 'Our Team',
    description: 'Meet the people behind our company.',
  })
}

export default function AllTeam() {
  return <AllTeamPage />
}

