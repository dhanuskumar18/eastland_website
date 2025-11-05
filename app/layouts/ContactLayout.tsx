import { PageData } from '@/types/page'
import ContactPageContent from '../components/pages/ContactPageContent'

interface ContactLayoutProps {
  pageData: PageData
}

export default function ContactLayout({ pageData }: ContactLayoutProps) {
  return <ContactPageContent pageData={pageData} />
}

