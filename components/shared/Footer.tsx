import Image from "next/image"
import Link from "next/link"
import { fetchGlobalByName } from "@/lib/api"

type FooterContent = {
  about?: string
  email?: string
  image?: string
  links?: Array<{ href: string; label: string }>
  phone?: string
  address?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  instagram?: string
}

export default async function Footer() {
  const global = await fetchGlobalByName<FooterContent>('Footer')
  const content = global?.content || {}

  const about = content.about || ""
  const email = content.email || ""
  const phone = content.phone || ""
  const address = content.address || ""
  const links = Array.isArray(content.links) ? content.links : []
  const twitter = content.twitter || ""
  const instagram = content.instagram || ""
  const youtube = content.youtube || ""
  const linkedin = content.linkedin || ""

  return (
    <footer className="bg-[#003B27] text-white rounded-t-[25px] sm:rounded-t-[30px] md:rounded-t-[35px]">
      <div className="mx-auto w-full px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 justify-items-start sm:justify-items-center">
          {/* Company Info Column */}
          <div className="space-y-3 sm:space-y-4 w-full sm:w-auto">
            {/* Logo Section */}
            <div className="flex justify-center sm:justify-start">
              <Link href="/">
                <img src="/images/logo.png" alt="Eastland Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
              </Link>
            </div>
            {about ? (
              <p className="text-xs sm:text-sm leading-relaxed text-gray-300 text-center sm:text-left">{about}</p>
            ) : null}
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3 sm:space-y-4 w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Quick Links:</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {links.length > 0 ? (
                links.map((l, i) => (
                  <li key={`${l.href}-${i}`} className="text-center sm:text-left">
                    <Link href={`/${l.href}`} className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">{l.label}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="text-center sm:text-left"><Link href="/" className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">Home</Link></li>
                  <li className="text-center sm:text-left"><Link href="/AboutUs" className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">About Us</Link></li>
                  <li className="text-center sm:text-left"><Link href="/Products" className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">Products</Link></li>
                  <li className="text-center sm:text-left"><Link href="/Services/OurPortfolio" className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">Gallery</Link></li>
                  <li className="text-center sm:text-left"><Link href="/Contact" className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">Contact Us</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="space-y-3 sm:space-y-4 w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Contact Info:</h3>
            <div className="space-y-2 sm:space-y-3">
              {email ? (
                <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors break-all">{email}</a>
                </div>
              ) : null}
              {phone ? (
                <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${phone}`} className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors">{phone}</a>
                </div>
              ) : null}
              {address ? (
                <div className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-colors cursor-pointer">{address}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Social Media Column */}
          <div className="space-y-3 sm:space-y-4 w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Social Media:</h3>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              {twitter ? (
                <a href={twitter} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              ) : null}
              {instagram ? (
                <a href={instagram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              ) : null}
              {youtube ? (
                <a href={youtube} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="mt-6 sm:mt-8 border-t border-white/20 pt-6 sm:pt-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-300">© 2025. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}