"use client"

import OurPortfolioPageContent from "@/components/pages/OurPortfolioPageContent"
import { PageData } from "@/types/page"

interface OurPortfolioLayoutProps {
  pageData?: PageData
}

export default function OurPortfolioLayout({ pageData }: OurPortfolioLayoutProps) {
  return <OurPortfolioPageContent pageData={pageData} />
}


