import OurPortfolioLayout from "@/app/layouts/OurPortfolioLayout"
import { fetchPageBySlug } from "@/lib/api"

export const revalidate = 0

export default async function OurPortfolioPage() {
  const pageData = await fetchPageBySlug('portfolio')
  return <OurPortfolioLayout pageData={pageData || undefined} />
}
