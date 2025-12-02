"use client"

import { useState } from 'react'
import { useScroll } from '../../../hooks/useScroll'
import LazyImage from '@/components/ui/LazyImage'

interface FeaturesProps {
  content?: {
    title?: string
    subTitle?: string
    cards?: Array<{
      image?: string
      title?: string
      description?: string
      productId?: number
    }>
  }
  sectionId?: number | string
}

export default function Features({ content, sectionId }: FeaturesProps = {}) {
  const { ref, isInView } = useScroll()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  // Static fallback items
  const defaultItems: Array<{ title: string; image: string; description: string }> = [
    {
      title: "Cafe Design",
      image: "/images/2 (1).png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Kitchen Setup",
      image: "/images/Rectangle 36.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Workflow Solutions",
      image: "/images/1.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Deli Counters",
      image: "/images/Rectangle 39.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
  ]

  // Use API cards if available, otherwise use default
  const items = content?.cards && content.cards.length > 0 
    ? content.cards.map(card => ({
        title: card.title || "Untitled",
        image: card.image || "/images/2 (1).png",
        description: card.description || "No description available"
      }))
    : defaultItems

  // Calculate visible items based on current index
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = currentIndex * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const visibleItems = items.slice(startIndex, endIndex)

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Only show navigation if there are more than 4 items
  const showNavigation = items.length > itemsPerPage

  return (
    <section ref={ref} className="mx-auto max-w-[100%] px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8 bg-green-50/50">
      <div className="max-w-[90%] sm:max-w-[80%] mx-auto">
      <h2 className={`text-center text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl transition-opacity duration-300 ${isInView ? 'opacity-100 animate-slide-up-bounce' : 'opacity-0'}`}>
        {content?.title || (
          <>
            Future-Ready Quick Service <span className="text-emerald-700">Installations</span>
            <br /> <span className="text-emerald-700">With Efficient Workflow</span>
          </>
        )}
      </h2>

      <div className="mt-8 sm:mt-10 md:mt-14 grid gap-6 sm:gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map(({ title, image, description }, idx) => (
          <div key={`${title}-${startIndex + idx}`} className={["relative", idx % 2 === 0 ? "lg:mt-6" : "lg:mt-32"].join(" ") }>
            <div className="absolute -left-6 top-0 hidden h-full w-px bg-slate-400 opacity-50                                                            lg:block" aria-hidden />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
              <div className="relative aspect-[4/3] w-full">
                <LazyImage
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  imageType="gallery"
                  sectionId={sectionId}
                />
              </div>
            </div>
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-slate-600">{description}</p>
            <div className="mt-4 sm:mt-6">
              <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  className="sm:w-4 sm:h-4"
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
        ))}
      </div>

      {/* Green Navigation Buttons - Only show if there are more than 4 items */}
      {showNavigation && (
        <div className={`mt-8 sm:mt-10 md:mt-12 flex justify-center gap-3 sm:gap-4 transition-opacity duration-300 ${isInView ? 'opacity-100 animate-slide-up-bounce-delayed' : 'opacity-0'}`}>
          <button 
            onClick={goToPrev}
            className="bg-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:scale-110 active:scale-95"
            aria-label="Previous items"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNext}
            className="bg-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:scale-110 active:scale-95"
            aria-label="Next items"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      </div>
    </section>
  )
}


