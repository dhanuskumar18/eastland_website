"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

import { PageData } from '@/types/page'

interface ProductsPageContentProps {
  pageData?: PageData
}

export default function ProductsPageContent({ pageData }: ProductsPageContentProps) {
  const productsSectionRef = useRef<HTMLElement>(null)
  const gridSectionRef = useRef<HTMLElement>(null)
  const aboutProductsRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const row4Ref = useRef<HTMLDivElement>(null)
  const row5Ref = useRef<HTMLDivElement>(null)
  const row6Ref = useRef<HTMLDivElement>(null)
  const row7Ref = useRef<HTMLDivElement>(null)
  const row8Ref = useRef<HTMLDivElement>(null)

  // Extract content from API sections
  const ourProductsSection = pageData?.sections?.find(s => s.type === 'our_products')
  const quickInstallationsSection = pageData?.sections?.find(s => s.type === 'quick_installations')
  const aboutOurProductsSection = pageData?.sections?.find(s => s.type === 'about_our_products')
  const bannerSection = pageData?.sections?.find(s => s.type === 'products_banner' || s.type === 'banner')

  // Get content from sections (with fallback to empty object)
  const ourProductsContent = ourProductsSection?.content || {}
  const quickInstallationsContent = quickInstallationsSection?.content || {}
  const aboutOurProductsContent = aboutOurProductsSection?.content || {}
  const bannerContent = bannerSection?.content || {}

  // Extract arrays and objects
  const cards = (quickInstallationsContent.cards as Array<any>) || []

  // Default fallback cards if API doesn't provide data
  const defaultCards = [
    { title: "Cafe Design", image: "/images/Products/2 (7).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Kitchen Setup", image: "/images/Products/2 (8).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Workflow Solutions", image: "/images/Products/2 (9).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Deli Counters", image: "/images/Products/2 (10).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Quick Installations", image: "/images/Products/2 (11).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Restaurant Interiors", image: "/images/Products/2 (12).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Equipment Integration", image: "/images/Products/2 (13).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
    { title: "Space Optimization", image: "/images/Products/2 (14).png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been." },
  ]

  // Use API cards if available, otherwise use defaults
  const allCards = cards.length > 0 ? cards.filter((card: any) => card.image && card.image.trim() !== '') : defaultCards
  
  // Limit to only 8 products for display on main page
  const displayCards = allCards.slice(0, 8)
  
  // Check if there are more than 8 products to show "See More" button
  const hasMoreProducts = allCards.length > 8

  // Row refs array for dynamic assignment
  const rowRefs = [row1Ref, row2Ref, row3Ref, row4Ref, row5Ref, row6Ref, row7Ref, row8Ref]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Mark as animated to prevent re-triggering
            entry.target.setAttribute('data-animated', 'true')
            
            // Remove opacity-0 class
            entry.target.classList.remove('opacity-0')

            if (entry.target === productsSectionRef.current) {
              // First section - slide up with bounce
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === gridSectionRef.current) {
              // Grid section - no animation, let individual rows animate
              // entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === aboutProductsRef.current) {
              // Last section - slide up with bounce (same as first section)
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row1Ref.current) {
              // Column 1, Row 1 - slide from top
              console.log('Animating row1')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row2Ref.current) {
              // Column 2, Row 1 - slide from bottom
              console.log('Animating row2')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row3Ref.current) {
              // Column 3, Row 1 - slide from top
              console.log('Animating row3')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row4Ref.current) {
              // Column 4, Row 1 - slide from bottom
              console.log('Animating row4')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row5Ref.current) {
              // Column 1, Row 2 - slide from top
              console.log('Animating row5')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row6Ref.current) {
              // Column 2, Row 2 - slide from bottom
              console.log('Animating row6')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row7Ref.current) {
              // Column 3, Row 2 - slide from top
              console.log('Animating row7')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row8Ref.current) {
              // Column 4, Row 2 - slide from bottom
              console.log('Animating row8')
              entry.target.classList.add('animate-slide-up-bounce')
            }

            // Stop observing this element to prevent re-triggering
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all sections and rows (only observe refs for items that exist)
    if (productsSectionRef.current) observer.observe(productsSectionRef.current)
    if (gridSectionRef.current) observer.observe(gridSectionRef.current)
    if (aboutProductsRef.current) observer.observe(aboutProductsRef.current)
    
    // Only observe row refs for items that actually exist in displayCards (max 8)
    const rowRefsToObserve = rowRefs.slice(0, displayCards.length)
    rowRefsToObserve.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => {
      if (productsSectionRef.current) observer.unobserve(productsSectionRef.current)
      if (gridSectionRef.current) observer.unobserve(gridSectionRef.current)
      if (aboutProductsRef.current) observer.unobserve(aboutProductsRef.current)
      
      rowRefsToObserve.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current)
      })
    }
  }, [])
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={bannerContent.image || "/images/Products/Rectangle 52 (2).png"}
            alt="Products - Restaurant Interior Design"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              {bannerContent.title || "Our Products"}
            </h1>
            {bannerContent.subTitle && (
              <p className="mt-4 text-xl text-white">{bannerContent.subTitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section ref={productsSectionRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative w-full max-w-[520px]">
              <div className="rounded-tl-[250px] rounded-bl-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-tl-[250px] rounded-bl-[18px]">
                  <Image 
                    src={ourProductsContent.image || "/images/Products/1 (4).png"} 
                    alt="Modern Kitchen Interior" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {ourProductsContent.title ? (
                  <>
                    {ourProductsContent.title}
                    {ourProductsContent.subTitle && (
                      <> <span className="text-emerald-700">{ourProductsContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    Expert Kitchen Services with <span className="text-emerald-700">Equipment and Sanitization Product Support</span>
                  </>
                )}
              </h2>
              {ourProductsContent.description ? (
                (ourProductsContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                  <p key={index} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Expert Kitchen Services with Essential Equipment and Sanitization Product Support
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services. Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
                  </p>
                </>
              )}

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
                  Enquiry Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section ref={gridSectionRef} className="bg-slate-50 py-20 opacity-0">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            {quickInstallationsContent.title ? (
              <>
                {quickInstallationsContent.title}
                {quickInstallationsContent.subTitle && (
                  <>
                    <br /> <span className="text-emerald-700">{quickInstallationsContent.subTitle}</span>
                  </>
                )}
              </>
            ) : (
              <>
                Future-Ready Quick Service <span className="text-emerald-700">Installations</span>
                <br /> <span className="text-emerald-700">With Efficient Workflow</span>
              </>
            )}
          </h2>

          <div className="mt-14 relative">
            {/* Continuous vertical lines for each column */}
            <div className="absolute left-1/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-3/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {displayCards.map((card: any, index: number) => {
                // Determine row ref based on index (only assign refs for first 8 items)
                const rowRef = index < 8 ? rowRefs[index] || null : null
                // Determine margin-top class based on column position (alternating pattern)
                // Columns: 0,2,4,6 = mt-6 (top), 1,3,5,7 = mt-24 (bottom)
                const marginClass = index % 2 === 0 ? 'lg:mt-6' : 'lg:mt-24'

                return (
                  <div key={index} ref={rowRef} className={`relative ${marginClass} opacity-0`}>
                    <h3 className="text-lg font-semibold text-slate-900">{card.title || "Untitled"}</h3>
                    <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                      <div
                        className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                        style={{ backgroundImage: `url("${encodeURI(card.image || '/images/Products/2 (7).png')}")` }}
                      />
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-slate-600">
                      {card.description || "No description available"}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* See More Button Section - Only show if there are more than 8 products */}
      {hasMoreProducts && (
        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <Link 
                href="/products/all"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
              >
                See More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Our Products Section */}
      <section ref={aboutProductsRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px]  bg-white p-3  ">
                <div className="relative overflow-hidden rounded-[18px] h-[442px] w-[400px] p-3 border-2 border-gray-400">
                  <Image 
                    src={aboutOurProductsContent.image1 || "/images/Products/1 (5).png"} 
                    alt="Elegant Dining Area" 
                     height={350}
                     width={350}
                    className="object-cover h-full w-full" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-6 -right-12 rounded-2xl shadow-2xl">
                <div className="relative  overflow-hidden rounded-2xl h-[400px] w-[250px] p-3 border-2 border-gray-400 ">
                  <Image 
                    src={aboutOurProductsContent.image2 || "/images/Products/1 (6).png"} 
                    alt="Modern Cafe Setting" 
                    height={300}
                    width={300}
                    className="object-cover h-full w-full rounded-2xl" 
                  />
                </div>  
              </div>
            </div>
            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">About Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {aboutOurProductsContent.title ? (
                  <>
                    {aboutOurProductsContent.title}
                    {aboutOurProductsContent.subTitle && (
                      <> <span className="text-emerald-700">{aboutOurProductsContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    High-Quality Products Supporting <span className="text-emerald-700">Safe, Efficient, and Modern Kitchen</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {aboutOurProductsContent.description || "Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation."}
              </p>

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
                  Enquiry Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}