"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import LazyImage from "@/components/ui/LazyImage"
import { PageData } from "@/types/page"

interface OurPortfolioPageContentProps {
  pageData?: PageData
}

interface PortfolioItem {
  image?: string
  title?: string
}

export default function OurPortfolioPageContent({ pageData }: OurPortfolioPageContentProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  // Extract content from API sections
  const bannerSection = pageData?.sections?.find(s => s.type === 'portfolio_banner' || s.type === 'banner')
  const gallerySection = pageData?.sections?.find(s => s.type === 'portfolio_gallery')
  
  const bannerContent = bannerSection?.content || {}
  const galleryContent = gallerySection?.content || {}
  const items = (galleryContent.items as Array<{ image?: string; title?: string }>) || []
  
  // Default fallback images for gallery
  const defaultGalleryImages = [
    "/images/Services/portfolio/p1.png",
    "/images/Services/portfolio/p2.png",
    "/images/Services/portfolio/p3.png",
    "/images/Services/portfolio/p4.png",
    "/images/Services/portfolio/p5.png",
    "/images/Services/portfolio/p6.png",
    "/images/Services/portfolio/p7.png",
    "/images/Services/portfolio/p8.png",
    "/images/Services/portfolio/p9.png",
    "/images/Services/portfolio/p10.png",
    "/images/Services/portfolio/p11.png",
    "/images/Services/portfolio/p12.png",
    "/images/Services/portfolio/p13.png",
    "/images/Services/portfolio/p14.png",
    "/images/Services/portfolio/p15.png"
  ]
  
  // Use API items if available, otherwise create items from default images
  const displayItems = items.length > 0 
    ? items.filter(item => item.image) // Only include items with images
    : defaultGalleryImages.map((img, idx) => ({ image: img, title: `Project ${idx + 1}` }))

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        closeModal()
      }
    }

    if (selectedItem) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedItem])

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] sm:h-[50vh] sm:min-h-[400px] md:h-[60vh] md:min-h-[500px]">
        <div className="absolute inset-0">
          <LazyImage
            src={bannerContent.image || "/images/Services/Rectangle 52 (5).png"}
            alt={bannerContent.title || "Our Portfolio"}
            fill
            className="object-cover"
            imageType="page"
            sectionId={bannerSection?.id}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              {bannerContent.title || "Our Portfolio"}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl">
              {bannerContent.subTitle || "Showcasing Our Best Work"}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 md:text-4xl">
              {galleryContent.title || 'Our Gallery'}
            </h2>
            {galleryContent.subTitle && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600">
                {galleryContent.subTitle}
              </p>
            )}
            {!galleryContent.subTitle && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600">
                Showcasing Exceptional Designs Through Visual Project Highlights
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((it, idx) => {
              const imageSrc = it.image || defaultGalleryImages[idx % defaultGalleryImages.length]
              const imageAlt = it.title || `Project ${idx + 1}`
              
              return (
                <div 
                  key={it.image || `portfolio-${idx}`} 
                  onClick={() => handleItemClick(it)}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <LazyImage
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 transform-gpu will-change-transform group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                    <span className="text-white font-semibold text-sm sm:text-base md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {it.title || 'View'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Image Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-emerald-400 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/10 z-10"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                className="sm:w-8 sm:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="relative w-full max-w-full max-h-[90vh] flex items-center justify-center">
                <img
                  src={selectedItem.image || defaultGalleryImages[0]}
                  alt={selectedItem.title || "Portfolio Image"}
                  className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                  style={{ display: 'block' }}
                />
                {selectedItem.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 sm:p-6 pointer-events-none">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                      {selectedItem.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}


