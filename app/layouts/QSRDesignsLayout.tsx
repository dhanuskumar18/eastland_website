"use client"

import QSRDesignsPageContent from "@/app/components/pages/QSRDesignsPageContent"
import { PageData } from "@/types/page"

interface QSRDesignsLayoutProps {
  pageData?: PageData
}

export default function QSRDesignsLayout({ pageData }: QSRDesignsLayoutProps) {
  // pageData reserved for future dynamic data integration
  return <QSRDesignsPageContent />
}


