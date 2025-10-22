import '../styles/globals.css'
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import type { Metadata } from 'next'

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
      <body className="min-h-dvh antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
