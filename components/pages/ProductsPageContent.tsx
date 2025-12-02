"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import LazyImage from "@/components/ui/LazyImage"

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

  // Product detail modal states
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productDetails, setProductDetails] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [allProducts, setAllProducts] = useState<any[]>([])

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

  // Fetch all products to match with cards
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        const response = await fetch(`${API_BASE_URL}products`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          const productsList = Array.isArray(data) ? data : (data.data || [])
          setAllProducts(productsList)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
      }
    }

    fetchAllProducts()
  }, [])

  // Function to find product by card title or productId
  const findProductByCard = (card: any) => {
    // First try to find by productId if it exists
    if (card.productId) {
      return allProducts.find((p: any) => p.id === card.productId || p.id === Number(card.productId))
    }
    
    // Otherwise, try to match by title
    if (card.title) {
      return allProducts.find((product: any) => {
        const translation = product.translations?.find((t: any) => t.locale === 'en') || product.translations?.[0]
        const productName = translation?.name || product.name || ''
        return productName.toLowerCase().trim() === card.title.toLowerCase().trim()
      })
    }
    
    return null
  }

  // Fetch product details when a product is selected
  useEffect(() => {
    async function fetchProductDetails() {
      if (!selectedProductId) {
        // If productDetails is already set (from card data), don't fetch
        if (productDetails && !selectedProductId) {
          setLoadingDetails(false)
          return
        }
        return
      }

      setLoadingDetails(true)
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        const response = await fetch(`${API_BASE_URL}products/${selectedProductId}`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch product details')
        }

        const data = await response.json()
        const details = data.data || data
        setProductDetails(details)
      } catch (err) {
        console.error('Error fetching product details:', err)
        setProductDetails(null)
      } finally {
        setLoadingDetails(false)
      }
    }

    if (selectedProductId && isModalOpen) {
      fetchProductDetails()
    }
  }, [selectedProductId, isModalOpen])

  const handleProductClick = (card: any) => {
    const product = findProductByCard(card)
    if (product) {
      setSelectedProductId(product.id)
      setIsModalOpen(true)
    } else {
      // If no product found, show card details in modal
      setProductDetails({
        title: card.title,
        description: card.description,
        image: card.image,
        images: card.image ? [{ url: card.image }] : []
      })
      setIsModalOpen(true)
      setSelectedProductId(null)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProductId(null)
    setProductDetails(null)
  }

  const getProductName = (product: any) => {
    if (product?.title) return product.title
    const translation = product?.translations?.find((t: any) => t.locale === 'en') || product?.translations?.[0]
    return translation?.name || product?.name || 'Product'
  }

  const getProductDescription = (product: any) => {
    if (product?.description) return product.description
    const translation = product?.translations?.find((t: any) => t.locale === 'en') || product?.translations?.[0]
    return translation?.description || product?.description || "No description available"
  }

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
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row2Ref.current) {
              // Column 2, Row 1 - slide from bottom
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row3Ref.current) {
              // Column 3, Row 1 - slide from top
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row4Ref.current) {
              // Column 4, Row 1 - slide from bottom
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row5Ref.current) {
              // Column 1, Row 2 - slide from top
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row6Ref.current) {
              // Column 2, Row 2 - slide from bottom
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row7Ref.current) {
              // Column 3, Row 2 - slide from top
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row8Ref.current) {
              // Column 4, Row 2 - slide from bottom
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
      <section className="relative h-[40vh] min-h-[300px] sm:h-[50vh] sm:min-h-[400px] md:h-[60vh] md:min-h-[500px]">
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
          <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
              {bannerContent.title || "Our Products"}
            </h1>
            {bannerContent.subTitle && (
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white">{bannerContent.subTitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section ref={productsSectionRef} className="py-12 sm:py-16 md:py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-12 md:gap-16 md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative w-full max-w-[520px]">
              <div className="rounded-tl-[250px] rounded-bl-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-tl-[250px] rounded-bl-[18px]">
                  <LazyImage 
                    src={ourProductsContent.image || "/images/Products/1 (4).png"} 
                    alt="Modern Kitchen Interior" 
                    fill 
                    className="object-cover" 
                    imageType="page"
                    sectionId={ourProductsSection?.id}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="mt-6 md:mt-0">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">Our Products</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
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
                  <p key={index} className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    Expert Kitchen Services with Essential Equipment and Sanitization Product Support
                  </p>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                    We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services. Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
                  </p>
                </>
              )}

              <div className="mt-6 sm:mt-8 md:mt-10">
                <Link href="/contact" className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-700 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section ref={gridSectionRef} className="bg-slate-50 py-12 sm:py-16 md:py-20 opacity-0">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
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

          <div className="mt-8 sm:mt-12 md:mt-14 relative">
            {/* Continuous vertical lines for each column */}
            <div className="absolute left-1/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-3/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            
            <div className="grid gap-6 sm:gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
              {displayCards.map((card: any, index: number) => {
                // Determine row ref based on index (only assign refs for first 8 items)
                const rowRef = index < 8 ? rowRefs[index] || null : null
                // Determine margin-top class based on column position (alternating pattern)
                // Columns: 0,2,4,6 = mt-6 (top), 1,3,5,7 = mt-24 (bottom)
                const marginClass = index % 2 === 0 ? 'lg:mt-6' : 'lg:mt-24'

                return (
                  <div key={index} ref={rowRef} className={`relative ${marginClass} opacity-0`}>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{card.title || "Untitled"}</h3>
                    <div className="mt-3 sm:mt-4 overflow-hidden rounded-lg sm:rounded-xl ring-1 ring-slate-200">
                      <div
                        className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                        style={{ backgroundImage: `url("${encodeURI(card.image || '/images/Products/2 (7).png')}")` }}
                      />
                    </div>
                    <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {card.description || "No description available"}
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <button
                        onClick={() => handleProductClick(card)}
                        className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer"
                        aria-label="View product details"
                      >
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
                      </button>
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
        <section className="py-8 sm:py-10 md:py-12 bg-slate-50">
          <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <Link 
                href="/products/all"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
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
      <section ref={aboutProductsRef} className="py-12 sm:py-16 md:py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-12 md:gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px] mx-auto md:mx-0">
              {/* Main Image */}
              <div className="rounded-[18px] sm:rounded-[20px] md:rounded-[22px] bg-white p-2 sm:p-3">
                <div className="relative overflow-hidden rounded-[14px] sm:rounded-[16px] md:rounded-[18px] h-[280px] sm:h-[350px] md:h-[442px] w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] mx-auto md:mx-0 p-2 sm:p-3 border-2 border-gray-400">
                  <Image 
                    src={aboutOurProductsContent.image1 || "/images/Products/1 (5).png"} 
                    alt="Elegant Dining Area" 
                    fill
                    className="object-cover rounded-[12px] sm:rounded-[14px] md:rounded-[16px]" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-6 md:-bottom-6 md:-right-12 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] p-2 sm:p-3 border-2 border-gray-400">
                  <Image 
                    src={aboutOurProductsContent.image2 || "/images/Products/1 (6).png"} 
                    alt="Modern Cafe Setting" 
                    fill
                    className="object-cover rounded-lg sm:rounded-xl md:rounded-2xl" 
                  />
                </div>  
              </div>
            </div>
            {/* Right Side - Content */}
            <div className="mt-6 md:mt-0">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">About Our Products</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
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
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                {aboutOurProductsContent.description || "Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation."}
              </p>

              <div className="mt-6 sm:mt-8 md:mt-10">
                <Link href="/contact" className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-700 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 hover:scale-110 border border-slate-200"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {loadingDetails ? (
              <div className="flex items-center justify-center py-16 sm:py-24 md:py-32">
                <div className="text-center">
                  <div className="inline-block h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent mb-4"></div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">Loading product details...</p>
                </div>
              </div>
            ) : productDetails ? (
              <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
                {/* Left Side - Images */}
                <div className="lg:w-1/2 bg-slate-50 p-4 sm:p-6 lg:p-8">
                  {productDetails.images && productDetails.images.length > 0 ? (
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg bg-white">
                        <LazyImage
                          src={productDetails.images[0].url}
                          alt={getProductName(productDetails)}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          imageType="product"
                        />
                      </div>
                      {/* Thumbnail Grid */}
                      {productDetails.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                          {productDetails.images.slice(1, 5).map((image: any, index: number) => (
                            <div 
                              key={index + 1} 
                              className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-emerald-500 transition-all duration-200 hover:shadow-md"
                            >
                              <LazyImage
                                src={image.url}
                                alt={`${getProductName(productDetails)} - Image ${index + 2}`}
                                fill
                                className="object-cover"
                                imageType="product"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right Side - Details */}
                <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  {/* Product Name */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                    {getProductName(productDetails)}
                  </h2>

                  {/* Brand */}
                  {productDetails.brand && (
                    <div className="mb-6 pb-6 border-b border-slate-200">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                        <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm font-semibold text-emerald-700">{productDetails.brand.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {getProductDescription(productDetails) && getProductDescription(productDetails) !== "No description available" && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Description
                      </h3>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                        {getProductDescription(productDetails)}
                      </p>
                    </div>
                  )}

                  {/* Categories */}
                  {productDetails.categories && productDetails.categories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {productDetails.categories.map((category: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {productDetails.tags && productDetails.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {productDetails.tags.map((tag: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-colors duration-200"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-lg mb-6">Failed to load product details.</p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}