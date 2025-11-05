"use client"

import { PageData } from '@/types/page'
import ProductsPageContent from '../components/pages/ProductsPageContent'

interface ProductsLayoutProps {
  pageData: PageData
}

export default function ProductsLayout({ pageData }: ProductsLayoutProps) {
  return <ProductsPageContent pageData={pageData} />
}

