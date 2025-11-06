"use client"

import QSRDesignsPageContent from "@/components/pages/QSRDesignsPageContent"
import { PageData } from "@/types/page"

interface QSRDesignsLayoutProps {
  pageData?: PageData
}

export default function QSRDesignsLayout({ pageData }: QSRDesignsLayoutProps) {
  return <QSRDesignsPageContent pageData={pageData} />
}


