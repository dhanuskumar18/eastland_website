"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Star } from "lucide-react"
import { fetchPageBySlug } from '@/lib/api'
import Banner from '@/components/sections/Banner'
import { Skeleton } from '@/components/ui/Skeleton'
import LazyImage from "@/components/ui/LazyImage"

interface Testimonial {
  id: number
  clientName: string
  profession: string
  review: string
  imageUrl: string
  rating?: number
}

export default function AllTestimonialsPage() {
  const searchParams = useSearchParams()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // Page data and banner
  const [pageData, setPageData] = useState<any>(null)
  const [bannerContent, setBannerContent] = useState<any>(null)
  
  // Filter and search states - initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  // Testimonial detail modal states
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch page data for banner
  useEffect(() => {
    async function fetchPageData() {
      try {
        // Try slugs based on admin panel: testimonials/all, testimonials, client-testimonials
        const slugs = ['testimonials/all', 'testimonials', 'client-testimonials', 'clienttestimonials', 'all-testimonials']
        let page = null
        
        for (const slug of slugs) {
          try {
            page = await fetchPageBySlug(slug)
            if (page) {
              console.log(`Found page with slug: ${slug}`)
              break
            }
          } catch (err) {
            // Continue to next slug if this one fails
            console.log(`Slug ${slug} not found, trying next...`)
            continue
          }
        }
        
        if (page) {
          setPageData(page)
          // Find banner section - check for banner in section name or type
          // Also check for see_more sections that have banner-like content (title, subTitle, image)
          const bannerSection = page.sections?.find((s: any) => {
            const type = (s.type || s.name || '').toLowerCase()
            const hasBannerName = type.includes('banner') || type === 'testimonials_banner' || type === 'testimonial_banner'
            
            // Check if it's a see_more section with banner content
            const isSeeMore = type.includes('see_more') || type.includes('see more')
            const content = s.content || {}
            const hasBannerContent = content.title || content.subTitle || content.image
            
            return hasBannerName || (isSeeMore && hasBannerContent)
          })
          if (bannerSection) {
            console.log('Found banner section:', bannerSection)
            setBannerContent(bannerSection.content)
          } else {
            console.log('No banner section found. Available sections:', page.sections?.map((s: any) => s.type || s.name))
          }
        } else {
          console.log('No page found for testimonials. Will use default banner.')
        }
      } catch (err) {
        console.error('Error fetching page data:', err)
        // Silently fail - will use default banner
      }
    }
    
    fetchPageData()
  }, [])

  useEffect(() => {
    // Debounce search to reduce API calls
    const timeoutId = setTimeout(() => {
      async function fetchAllTestimonials() {
        try {
          setLoading(true)
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
          
          // Build query parameters
          const params = new URLSearchParams()
          if (searchQuery) params.append('search', searchQuery)
          
          const queryString = params.toString()
          const url = `${API_BASE_URL}testimonials${queryString ? `?${queryString}` : ''}`
          
          const response = await fetch(url, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          
          // Handle different response structures
          let allTestimonials: Testimonial[] = []
          if (Array.isArray(data)) {
            allTestimonials = data
          } else if (data.data && Array.isArray(data.data)) {
            allTestimonials = data.data
          } else if (data.items && Array.isArray(data.items)) {
            allTestimonials = data.items
          } else if (Array.isArray(data.testimonials)) {
            allTestimonials = data.testimonials
          }
          
          setTestimonials(allTestimonials)
          setInitialLoading(false)
        } catch (err) {
          console.error('Error fetching testimonials:', err)
          setError(err instanceof Error ? err.message : 'Failed to load testimonials')
          setInitialLoading(false)
        } finally {
          setLoading(false)
        }
      }

      fetchAllTestimonials()
    }, 500) // 500ms debounce for search

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Testimonials are already filtered by backend
  const filteredTestimonials = testimonials

  // Update URL when filters change (without page reload)
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
    
    // Use window.history.replaceState to update URL without page reload
    window.history.replaceState({}, '', newUrl)
  }, [searchQuery])

  const clearFilters = () => {
    setSearchQuery('')
  }

  const hasActiveFilters = searchQuery

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTestimonial(null)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!gridRef.current || filteredTestimonials.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true')
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-up-bounce')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const cards = gridRef.current.querySelectorAll('.testimonial-card')
    cards.forEach((card) => {
      card.removeAttribute('data-animated')
      card.classList.add('opacity-0')
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredTestimonials])

  // Skeleton UI for initial load
  if (initialLoading) {
    return (
      <main className="flex min-h-dvh flex-col">
        {/* Skeleton Banner */}
        <section className="relative h-[50vh] min-h-[320px] bg-slate-200 animate-pulse">
          <div className="absolute inset-0 bg-slate-300/40" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full">
              <Skeleton className="h-10 w-2/3 max-w-xl mb-4" />
              <Skeleton className="h-4 w-1/2 max-w-md" />
            </div>
          </div>
        </section>

        {/* Skeleton Grid Section */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
            {/* Skeleton search */}
            <div className="mb-8">
              <Skeleton className="h-12 w-full max-w-md rounded-lg" />
            </div>

            {/* Skeleton testimonial cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
                >
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-20 w-full rounded-md" />
                  <div className="flex items-center gap-4 mt-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link href="/" className="mt-4 inline-block text-emerald-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Dynamic Banner Section */}
      <Banner 
        content={bannerContent}
        defaultTitle="Client Testimonials"
        defaultSubTitle="What our valued clients say about us"
        defaultImage="/images/default-banner.jpg"
      />

      {/* Testimonials Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          {/* Search Section - Always show search */}
          <div className="mb-6 sm:mb-8">
                <div className="relative max-w-md w-full">
                  <input
                    type="text"
                    placeholder="Search testimonials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

            {/* Content Area with Loading Overlay */}
            <div className="relative">
              {/* Loading Indicator for Filter Changes */}
              {loading && !initialLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading testimonials...</p>
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-slate-600">
                  Showing {filteredTestimonials.length} {filteredTestimonials.length === 1 ? 'testimonial' : 'testimonials'}
                </p>
              </div>

              {/* Testimonials Grid */}
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-12 sm:py-16 md:py-20">
                {hasActiveFilters ? (
                  <>
                    <p className="text-slate-600 text-base sm:text-lg">No testimonials match your search.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-block text-emerald-700 hover:underline text-sm sm:text-base"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-slate-600 text-base sm:text-lg">No testimonials available at the moment.</p>
                    <Link href="/" className="mt-4 inline-block text-emerald-700 hover:underline text-sm sm:text-base">
                      Back to Home
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div ref={gridRef} className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    onClick={() => handleTestimonialClick(testimonial)}
                    className="testimonial-card relative opacity-0 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer hover:border-emerald-500"
                  >
                    <div className="p-4 sm:p-6">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <LazyImage
                          src="/images/quote1.svg"
                          alt="Quote"
                          width={40}
                          height={40}
                          className="text-slate-300"
                          imageType="other"
                        />
                      </div>

                      {/* Rating Stars */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-3 sm:mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={16} className="sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}

                      {/* Review Text */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 sm:mb-6 line-clamp-4">
                        {testimonial.review}
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <LazyImage
                            src={testimonial.imageUrl || '/images/1.png'}
                            alt={testimonial.clientName}
                            fill
                            className="object-cover"
                            imageType="other"
                          />
                          </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                            {testimonial.clientName}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 truncate">
                            {testimonial.profession}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      {isModalOpen && selectedTestimonial && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden animate-in zoom-in-95 duration-300"
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

            <div className="p-4 sm:p-6 md:p-8 overflow-x-hidden">
              {/* Client Image and Info Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-emerald-100 shadow-lg">
                  <LazyImage
                    src={selectedTestimonial.imageUrl || '/images/1.png'}
                    alt={selectedTestimonial.clientName}
                    fill
                    className="object-cover"
                    imageType="other"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {selectedTestimonial.clientName}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mb-3 sm:mb-4">
                    {selectedTestimonial.profession}
                  </p>
                  {selectedTestimonial.rating && (
                    <div className="flex gap-1 justify-center md:justify-start">
                      {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                        <Star key={i} size={20} className="sm:w-7 sm:h-7 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quote Icons */}
              <div className="flex justify-between items-start mb-6">
                <LazyImage
                  src="/images/quote1.svg"
                  alt="Quote left"
                  width={60}
                  height={60}
                  className="text-slate-300"
                  imageType="other"
                />
                <LazyImage
                  src="/images/quote2.svg"
                  alt="Quote right"
                  width={60}
                  height={60}
                  className="text-slate-300"
                  imageType="other"
                />
              </div>

              {/* Full Review Text */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                  Testimonial
                </h3>
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere word-break-break-word whitespace-pre-wrap">
                    {selectedTestimonial.review}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                  Client Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-500">Client Name:</span>
                    <p className="text-slate-900 font-semibold mt-1">{selectedTestimonial.clientName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Profession:</span>
                    <p className="text-slate-900 font-semibold mt-1">{selectedTestimonial.profession}</p>
                  </div>
                  {selectedTestimonial.rating && (
                    <div>
                      <span className="text-sm font-medium text-slate-500">Rating:</span>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-slate-700">{selectedTestimonial.rating} / 5</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

