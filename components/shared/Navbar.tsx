"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useState, useEffect, useRef } from "react"

type NavChild = { href: string; label: string }
type NavItem = { href: string; label: string; children?: NavChild[] }
type NavbarContent = {
  logo?: string
  brandName?: string
  buttonName?: string
  menu?: NavItem[]
}

export default function Navbar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  
  const defaultMenu: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/products", label: "Products", children: [ { href: "/products", label: "Our Products" }, { href: "/qsrdesigns", label: "QSR Designs" } ] },
    { href: "/services", label: "Services", children: [ { href: "/services", label: "Our Services" }, { href: "/portfolio", label: "Our Portfolio" } ] },
    { href: "/contact", label: "Contact Us" },
  ]
  
  const [navData, setNavData] = useState<NavbarContent>({
    brandName: "eastland",
    buttonName: "Enquire Now",
    logo: "/images/logo.png",
    menu: defaultMenu
  })

  // Normalize contact page hrefs to /contact
  const normalizeMenuHrefs = (menu: NavItem[]): NavItem[] => {
    return menu.map(item => {
      const normalizedHref = item.href?.toLowerCase() === '/contact-us' || item.href?.toLowerCase() === '/contactus'
        ? '/contact'
        : item.href
      
      const normalizedItem: NavItem = {
        ...item,
        href: normalizedHref
      }
      
      // Also normalize children if they exist
      if (item.children && Array.isArray(item.children)) {
        normalizedItem.children = item.children.map(child => ({
          ...child,
          href: child.href?.toLowerCase() === '/contact-us' || child.href?.toLowerCase() === '/contactus'
            ? '/contact'
            : child.href
        }))
      }
      
      return normalizedItem
    })
  }

  // Fetch Navbar global
  useEffect(() => {
    const controller = new AbortController()
    async function loadNavbar() {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        const res = await fetch(`${base}globals/name/Navbar`, { signal: controller.signal })
        if (!res.ok) return
        const data = await res.json() as {
          id: number
          name: string
          translations?: Array<{ locale: string; content: NavbarContent }>
        }
        const translations = data.translations || []
        const en = translations.find(t => t.locale === 'en') || translations[0]
        if (en?.content) {
          const c = en.content
          const menu = Array.isArray(c.menu) && c.menu.length ? c.menu : navData.menu
          setNavData({
            brandName: c.brandName || navData.brandName,
            buttonName: c.buttonName || navData.buttonName,
            logo: c.logo || navData.logo,
            menu: normalizeMenuHrefs(menu || []),
          })
        }
      } catch (e) {
        // ignore fetch errors
      }
    }
    loadNavbar()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100) // Change background after 100px scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8" ref={navRef}>
        <nav className={`mt-6 flex items-center justify-between rounded-full border border-white/20 px-4 py-2 backdrop-blur transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/40 border-black/20' 
            : 'bg-white/10 border-white/20'
        }`}>
          <Link href="/" >
            <img src={navData.logo || "/images/logo.png"} alt={(navData.brandName || "Eastland") + " Logo"} className="h-14 w-42" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white drop-shadow-sm">
            {navData.menu?.map((item, idx) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0
              if (!hasChildren) {
                return (
                  <Link key={`${item.href}-${idx}`} href={item.href} className="hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                )
              }
              const isOpen = openDropdownIndex === idx
              return (
                <div className="relative" key={`${item.href}-${idx}`}>
                  <button
                    onClick={() => setOpenDropdownIndex(isOpen ? null : idx)}
                    className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className={`absolute top-full left-0 mt-7 w-56 rounded-lg shadow-lg py-2 backdrop-blur-md transition-all duration-300 ${
                      isScrolled 
                        ? 'bg-black/40 border border-black/20' 
                        : 'bg-white/20 border border-white/30'
                    }`}>
                      {item.children!.map((child, cidx) => (
                        <Link 
                          key={`${child.href}-${cidx}`}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white hover:text-emerald-400 transition-colors"
                          onClick={() => setOpenDropdownIndex(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="ml-4">
            <Link 
              href="/contact" 
              className="relative rounded-full bg-white p-3 text-black font-medium overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{navData.buttonName || 'Enquire Now'}</span>
              <div className="absolute inset-0 bg-yellow-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
