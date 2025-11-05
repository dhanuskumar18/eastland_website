import '../styles/globals.css'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eastland Website',
  description: 'Basic Next.js + Tailwind starter',
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
