'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface SlideContent {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

interface CarouselProps {
  images: string[]
  content?: SlideContent[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function Carousel({ images, content, autoPlay = true, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement[]>([])
  const contentRefs = useRef<HTMLDivElement[]>([])
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Add slide to refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el)
    }
  }

  // Add content to refs array
  const addContentToRefs = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el)
    }
  }

  // GSAP animation for slide transition
  const animateSlide = (fromIndex: number, toIndex: number, direction: 'next' | 'prev') => {
    const fromSlide = slidesRef.current[fromIndex]
    const toSlide = slidesRef.current[toIndex]
    const fromContent = contentRefs.current[fromIndex]
    const toContent = contentRefs.current[toIndex]

    if (!fromSlide || !toSlide) return

    // Set transition state
    setIsTransitioning(true)

    // Set initial positions for slides - next slide starts off-screen
    gsap.set(toSlide, {
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 1,
      zIndex: 10 // Higher z-index to appear on top
    })

    // Set initial positions for content
    if (fromContent && toContent) {
      gsap.set(toContent, {
        x: direction === 'next' ? '100%' : '-100%',
        opacity: 1,
        zIndex: 10 // Higher z-index to appear on top
      })
    }

    // Animate both slides and content
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset z-index after animation
        gsap.set(fromSlide, { zIndex: 1 })
        gsap.set(toSlide, { zIndex: 1 })
        if (fromContent && toContent) {
          gsap.set(fromContent, { zIndex: 1 })
          gsap.set(toContent, { zIndex: 1 })
        }
        setIsTransitioning(false)
      }
    })
    
    // Only animate the incoming slide - current slide stays in place
    tl.to(toSlide, {
      x: '0%',
      duration: 5,
      ease: 'power2.inOut'
    })

    // Animate content if it exists
    if (fromContent && toContent) {
      // Slide in new content - previous content will be covered by the new image
      tl.to(toContent, {
        x: '0%',
        duration: 5,
        ease: 'power2.inOut'
      }, 0) // Start at the same time as slide animation
    }
  }

  // Go to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return
    const nextIndex = (currentIndex + 1) % images.length
    animateSlide(currentIndex, nextIndex, 'next')
    setCurrentIndex(nextIndex)
  }, [currentIndex, images.length, isTransitioning])

  // Go to previous slide
  const goToPrev = () => {
    if (isTransitioning) return
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    animateSlide(currentIndex, prevIndex, 'prev')
    setCurrentIndex(prevIndex)
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return
    
    const direction = index > currentIndex ? 'next' : 'prev'
    animateSlide(currentIndex, index, direction)
    setCurrentIndex(index)
  }

  // Auto play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentIndex, autoPlay, autoPlayInterval, goToNext])

  // Initialize slides and content on mount
  useEffect(() => {
    if (slidesRef.current.length > 0) {
      // Set initial positions for all slides
      slidesRef.current.forEach((slide, index) => {
        gsap.set(slide, {
          x: index === 0 ? '0%' : '100%',
          opacity: index === 0 ? 1 : 0
        })
      })
    }

    if (contentRefs.current.length > 0) {
      // Set initial positions for all content
      contentRefs.current.forEach((content, index) => {
        gsap.set(content, {
          x: index === 0 ? '0%' : '100%',
          opacity: index === 0 ? 1 : 0
        })
      })
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides container */}
      <div ref={carouselRef} className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Navigation arrows - Bottom right corner */}
      <div className="absolute bottom-8 right-32 z-20 flex gap-4">
        <button
          onClick={goToPrev}
          disabled={isTransitioning}
          className={`transition-colors ${
            isTransitioning 
              ? 'text-white/30 cursor-not-allowed' 
              : 'text-white hover:text-white/80 cursor-pointer'
          }`}
          aria-label="Previous slide"
        >
          <svg className="h-24 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className={`transition-colors ${
            isTransitioning 
              ? 'text-white/30 cursor-not-allowed' 
              : 'text-white hover:text-white/80 cursor-pointer'
          }`}
          aria-label="Next slide"
        >
          <svg className="h-24 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content overlay */}
      {content && content.map((slideContent, index) => (
        <div
          key={index}
          ref={addContentToRefs}
          className="absolute inset-0 z-10 flex max-w-full flex-row justify-around items-end px-4 py-24 sm:px-6 lg:px-16 min-h-screen"
        >
          <div className="max-w-4xl">
            {slideContent.title && (
              <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
                {slideContent.title}
              </h1>
            )}
            {slideContent.subtitle && (
              <p className="mt-6 text-2xl font-light text-white/90 sm:text-3xl">
                {slideContent.subtitle}
              </p>
            )}
          </div>

          <div className="max-w-2xl">
            {slideContent.description && (
              <p className="text-lg text-white/80 leading-relaxed sm:text-xl">
                {slideContent.description}
              </p>
            )}
            {slideContent.buttonText && slideContent.buttonLink && (
              <div className="mt-8">
                <a
                  href={slideContent.buttonLink}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 hover:border-white/50"
                >
                  {slideContent.buttonText}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`h-3 w-3 rounded-full border transition-all duration-300 ${
              isTransitioning
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              index === currentIndex
                ? 'bg-white border-white'
                : 'bg-white/20 border-white/50 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
