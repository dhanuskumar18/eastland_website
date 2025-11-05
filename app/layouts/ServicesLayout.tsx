"use client"

import { PageData } from '@/types/page'
import ServicesPageContent from '../components/pages/ServicesPageContent'

interface ServicesLayoutProps {
  pageData: PageData
}

export default function ServicesLayout({ pageData }: ServicesLayoutProps) {
  return <ServicesPageContent pageData={pageData} />
}

