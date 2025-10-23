"use client"

import Link from "next/link"
import { Button } from "../ui/Button"
import { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
        <nav className="mt-6 flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/10">
          <Link href="/" >
            <img src="/images/logo.png" alt="Eastland Logo" className="h-14 w-42" />
          </Link>

          <div className="hidden md:flex items-center  gap-10 text-sm font-medium text-white drop-shadow-sm">
            <Link href="/" className="hover:text-emerald-200 transition-colors">Home</Link>
            <Link href="/AboutUs" className="hover:text-emerald-200 transition-colors">About Us</Link>
            
            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center gap-1 hover:text-emerald-200 transition-colors"
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 rounded-lg shadow-lg border border-white/30 py-2">
                  <Link 
                    href="/Products" 
                    className="block px-4 py-2 text-sm text-white  hover:text-emerald-200  transition-colors"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    Our Products
                  </Link>
                  <Link 
                    href="/Products/QSRDesigns" 
                    className="block px-4 py-2 text-sm text-white hover:text-emerald-200   transition-colors"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    QSR Designs
                  </Link>
                </div>
              )}
            </div>
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 hover:text-emerald-200 transition-colors"
              >
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 rounded-lg shadow-lg border border-white/30 py-2">
                  <Link 
                    href="/Services" 
                    className="block px-4 py-2 text-sm text-white hover:text-emerald-200  transition-colors"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    Our Services
                  </Link>
                  <Link 
                    href="/Services/OurPortfolio" 
                    className="block px-4 py-2 text-sm text-white hover:text-emerald-200  transition-colors"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    Our Portfolio
                  </Link>
                </div>
              )}
            </div>
            <Link href="/Contact" className="hover:text-emerald-200 transition-colors">Contact Us</Link>
          </div>

          <div className="ml-4">
            <Button href="/Contact" variant="light" className="rounded-full">Enquire Now</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
