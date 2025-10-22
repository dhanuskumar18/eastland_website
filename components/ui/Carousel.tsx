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
  const descriptionRefs = useRef<HTMLDivElement[]>([])
  const buttonRefs = useRef<HTMLDivElement[]>([])
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

  // Add description to refs array
  const addDescriptionToRefs = (el: HTMLDivElement | null) => {
    if (el && !descriptionRefs.current.includes(el)) {
      descriptionRefs.current.push(el)
    }
  }

  // Add button to refs array
  const addButtonToRefs = (el: HTMLDivElement | null) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current.push(el)
    }
  }

  // Fade-in animation for description and button
  const animateDescriptionAndButton = (index: number) => {
    const description = descriptionRefs.current[index]
    const button = buttonRefs.current[index]

    if (description) {
      gsap.set(description, { opacity: 0, x: 100 })
      gsap.to(description, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3
      })
    }

    if (button) {
      gsap.set(button, { opacity: 0, x: 100 })
      gsap.to(button, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.6
      })
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
      // Set current content to lower z-index
      gsap.set(fromContent, {
        zIndex: 1
      })
      
      // Set new content to higher z-index and off-screen position
      gsap.set(toContent, {
        x: direction === 'next' ? '100%' : '-100%',
        opacity: 1,
        zIndex: 20 // Higher z-index to appear on top of everything
      })
    }

    // Set initial positions for description and button of incoming slide
    const incomingDescription = descriptionRefs.current[toIndex]
    const incomingButton = buttonRefs.current[toIndex]
    
    if (incomingDescription) {
      gsap.set(incomingDescription, { 
        opacity: 0, 
        x: direction === 'next' ? 100 : -100 // Start from the same direction as the slide
      })
    }
    if (incomingButton) {
      gsap.set(incomingButton, { 
        opacity: 0, 
        x: direction === 'next' ? 100 : -100 // Start from the same direction as the slide
      })
    }

    // Animate both slides and content
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset z-index after animation
        gsap.set(fromSlide, { zIndex: 1 })
        gsap.set(toSlide, { zIndex: 1 })
        if (fromContent && toContent) {
          // Hide the previous content completely
          gsap.set(fromContent, { 
            zIndex: 1,
            opacity: 0,
            x: '0%'
          })
          // Keep the new content visible
          gsap.set(toContent, { 
            zIndex: 1,
            opacity: 1,
            x: '0%'
          })
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

    // Animate description and button fade-in after 3 seconds from slide transition
    const description = descriptionRefs.current[toIndex]
    const button = buttonRefs.current[toIndex]

    if (description) {
      tl.to(description, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, 3) // Start 3 seconds into the slide transition
    }

    if (button) {
      tl.to(button, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, 3.3) // Start 3.3 seconds into the slide transition (0.3s after description)
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

    // Initialize description and button animations for the first slide
    if (descriptionRefs.current.length > 0 && buttonRefs.current.length > 0) {
      // Set initial state for first slide elements
      const firstDescription = descriptionRefs.current[0]
      const firstButton = buttonRefs.current[0]
      
      if (firstDescription) {
        gsap.set(firstDescription, { opacity: 0, x: 100 })
      }
      if (firstButton) {
        gsap.set(firstButton, { opacity: 0, x: 100 })
      }
      
      // Animate the first slide's description and button on mount
      setTimeout(() => {
        animateDescriptionAndButton(0)
      }, 500)
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
          className={`absolute inset-0 flex max-w-full flex-row justify-around items-end px-4 py-24 sm:px-6 lg:px-16 min-h-screen ${
            index === currentIndex ? 'z-20' : 'z-10'
          }`}
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
              <p 
                ref={addDescriptionToRefs}
                className="text-lg text-white/80 leading-relaxed sm:text-xl"
              >
                {slideContent.description}
              </p>
            )}
            {slideContent.buttonText && slideContent.buttonLink && (
              <div 
                ref={addButtonToRefs}
                className="mt-8"
              >
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
