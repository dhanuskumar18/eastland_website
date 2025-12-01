import '../styles/globals.css'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { fetchGlobalSEO } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const globalSEO = await fetchGlobalSEO()

  return {
    title: globalSEO?.defaultTitle ?? 'Eastland Website',
    description: globalSEO?.defaultDescription ?? 'Basic Next.js + Tailwind starter',
    keywords: globalSEO?.defaultKeywords || undefined,
    other: {
      'google-site-verification': globalSEO?.googleSiteVerification || '',
      'msvalidate.01': globalSEO?.bingSiteVerification || '',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
