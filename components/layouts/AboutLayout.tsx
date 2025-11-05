"use client"

import { PageData } from '@/types/page'
import AboutUsPageContent from '@/components/pages/AboutUsPageContent'

interface AboutLayoutProps {
  pageData: PageData
}

export default function AboutLayout({ pageData }: AboutLayoutProps) {
  return <AboutUsPageContent pageData={pageData} />
}

