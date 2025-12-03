'use client'

// import { TestimonialCard } from "@/components/testimonial-card"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"
import LazyImage from "@/components/ui/LazyImage"

interface TestimonialsProps {
  content?: Record<string, any>
  sectionId?: number | string
}

// Array of 4 testimonials with content and images (fallback)
const defaultTestimonialsData = [
  {
    image: "/images/1.png",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.",
    name: "Thomas Raj",
    title: "Cafe Owner",
    rating: 5
  },
  {
    image: "/images/1.png",
    quote: "Exceptional service and quality work! The team delivered exactly what we needed for our restaurant. Their attention to detail and professionalism is unmatched.",
    name: "Sarah Johnson",
    title: "Restaurant Manager",
    rating: 5
  },
  {
    image: "/images/2 (1).png",
    quote: "Working with this team was a game-changer for our business. They understood our vision and brought it to life perfectly. Highly recommended!",
    name: "Michael Chen",
    title: "Business Owner",
    rating: 5
  },
  {
    image: "/images/1.png",
    quote: "Outstanding results and excellent customer service. The project was completed on time and exceeded our expectations. Will definitely work with them again.",
    name: "Emily Rodriguez",
    title: "Marketing Director",
    rating: 5
  }
]

export default function Testimonials({ content, sectionId }: TestimonialsProps = {}) {
  // Transform API data to component format
  const transformTestimonials = (reviews: any[]) => {
    if (!Array.isArray(reviews)) return []
    return reviews.map((review) => ({
      image: review.image || review.imageUrl || '/images/1.png',
      quote: review.review || review.quote || '',
      name: review.name || review.clientName || 'Anonymous',
      title: review.profession || review.title || '',
      rating: review.rating || 5
    }))
  }

  // Get testimonials from content.reviews (API format) or content.testimonials (fallback)
  const rawReviews = content?.reviews || content?.testimonials || []
  const transformedTestimonials = transformTestimonials(rawReviews)

  // Use transformed data if available, otherwise use default
  const allTestimonials = transformedTestimonials.length > 0
    ? transformedTestimonials
    : defaultTestimonialsData

  // Limit to only 4 testimonials for display on home page
  const testimonialsData = allTestimonials.slice(0, 4)

  // Always show "See More" button - it will fetch all testimonials from API
  const hasMoreTestimonials = true

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextIndex, setNextIndex] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Update current index when testimonials data changes
  useEffect(() => {
    if (testimonialsData.length > 0 && currentIndex >= testimonialsData.length) {
      setCurrentIndex(0)
    }
  }, [testimonialsData.length, currentIndex])

  // Reset carousel when content changes
  useEffect(() => {
    setCurrentIndex(0)
    setNextIndex(1)
    setIsTransitioning(false)
  }, [rawReviews])

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNext()
    }, 5000) // Change slide every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentIndex])

  // Intersection observer for card animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Mark as animated to prevent re-triggering
            entry.target.setAttribute('data-animated', 'true')

            // Remove opacity-0 class and add slide animation
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-right')

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

    // Observe the card
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    const newNextIndex = (currentIndex + 1) % testimonialsData.length
    setNextIndex(newNextIndex)
    console.log('Moving to next slide:', newNextIndex, 'Total slides:', testimonialsData.length)

    // Update current index after animation completes
    setTimeout(() => {
      setCurrentIndex(newNextIndex)
      setIsTransitioning(false)
    }, 500)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    const newNextIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length
    setNextIndex(newNextIndex)

    // Update current index after animation completes
    setTimeout(() => {
      setCurrentIndex(newNextIndex)
      setIsTransitioning(false)
    }, 500)
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return
    setIsTransitioning(true)
    setNextIndex(index)

    // Update current index after animation completes
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <section className="mx-auto w-[90%] sm:w-[80%] px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8 overflow-hidden">
      <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-2">
        {/* Left Section - Introduction */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">Client Testimonial</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            What Our Valued Clients Say About Us
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
            Discover what our valued clients have to say about their experience with us. Each testimonial reflects our dedication to quality, trust, and long-lasting.
          </p>
          {/* See More Button - Only show if there are more than 4 testimonials */}
          {hasMoreTestimonials && (
            <Link
              href="/testimonials/all"
              className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-700 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
            >
              See More
              <svg
                width="14"
                height="14"
                className="sm:w-4 sm:h-4 transition-transform duration-300 rotate-0 group-hover:rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          )}
        </div>

        {/* Right Section - Carousel */}
        <div className="relative mt-6 md:mt-0 overflow-hidden md:overflow-visible">
          {/* Static Card Container */}
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden md:overflow-visible">
            {/* Fixed decorative rectangles - outside of sliding content - hidden on mobile to prevent overflow */}
            <div className="hidden sm:block absolute -top-5 -left-5 h-[150px] w-[150px] md:h-[200px] md:w-[200px] border border-slate-500 rounded-lg"></div>
            <div className="hidden sm:block absolute -bottom-5 -right-5 h-[150px] w-[150px] md:h-[200px] md:w-[200px] border border-slate-500 -z-10 rounded-lg"></div>

            {/* Main card container - slides from right when visible */}
            <div
              ref={cardRef}
              className="relative flex flex-col sm:flex-row gap-4 sm:gap-0 md:gap-0 items-center sm:items-stretch bg-[#F4F4F4] rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm w-full max-w-full sm:max-h-[350px] md:max-h-[400px] opacity-0 p-4 sm:p-0 overflow-hidden"
            >
              {/* Left side - Profile image with overlay slide effect */}
              <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                <div className="relative w-[100px] h-[100px] sm:w-[200px] md:w-[250px] sm:h-full overflow-hidden rounded-full sm:rounded-xl md:rounded-2xl mx-auto sm:mx-0" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                  {/* Base image - always visible */}
                  <div className="absolute inset-0 ">
                    <LazyImage
                      src={testimonialsData[currentIndex].image}
                      alt={testimonialsData[currentIndex].name}
                      fill
                      className="object-cover"
                      imageType="gallery"
                      sectionId={sectionId}
                    />
                  </div>

                  {/* Overlay image - slides in from right */}
                  {isTransitioning && (
                    <div className="absolute inset-0">
                      <div
                        className="h-full transition-transform duration-500 ease-in-out"
                        style={{
                          transform: 'translateX(0%)',
                          animation: 'slideInFromRight 0.5s ease-in-out forwards'
                        }}
                      >
                        <LazyImage
                          src={testimonialsData[nextIndex].image}
                          alt={testimonialsData[nextIndex].name}
                          fill
                          className="object-cover"
                          imageType="gallery"
                          sectionId={sectionId}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Testimonial content with sliding text */}
              <div className="flex-1 flex flex-col min-w-0 w-full sm:w-auto overflow-hidden sm:p-4 md:p-6">
                {/* Quote mark icon */}
                <div className="text-gray-300 text-5xl my-1 sm:my-2">
                  <LazyImage
                    src="/images/quote1.svg"
                    alt="Quote left"
                    width={30}
                    height={30}
                    className="inline-block w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                    imageType="other"
                  />
                </div>

                {/* Sliding content container */}
                <div className="relative flex-1 min-w-0 w-full overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out py-2"
                    style={{
                      transform: `translateX(-${(isTransitioning ? nextIndex : currentIndex) * (100 / testimonialsData.length)}%)`,
                      width: `${testimonialsData.length * 100}%`
                    }}
                  >
                    {testimonialsData.map((testimonial: typeof defaultTestimonialsData[0], index: number) => (
                      <div
                        key={index}
                        className="flex-shrink-0 flex flex-col px-2 sm:px-4 min-w-0 w-full"
                        style={{ width: `${100 / testimonialsData.length}%` }}
                      >
                        {/* Quote text */}
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-2 sm:mb-3 md:mb-4 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word text-center sm:text-left">{testimonial.quote}</p>

                        {/* Rating stars */}
                        <div className="flex gap-1 mb-1 sm:mb-2 md:mb-3 justify-center sm:justify-start">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Author info */}
                        <div className="min-w-0 text-center sm:text-left">
                          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word">{testimonial.name}</h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word">{testimonial.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right quote mark */}
              <div className="absolute bottom-2 right-2 sm:bottom-8 sm:right-8 text-gray-300 text-5xl">
                <LazyImage
                  src="/images/quote2.svg"
                  alt="Quote right"
                  width={30}
                  height={30}
                  className="inline-block w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                  imageType="other"
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-2 sm:gap-0">
            {/* Previous/Next Buttons */}
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={goToPrev}
                disabled={isTransitioning}
                className={`p-1.5 sm:p-2 rounded-full border transition-all duration-200 ${isTransitioning
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white'
                  }`}
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className={`p-1.5 sm:p-2 rounded-full border transition-all duration-200 ${isTransitioning
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white'
                  }`}
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonialsData.map((_: typeof defaultTestimonialsData[0], index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentIndex
                    ? 'bg-emerald-700'
                    : 'bg-gray-300 hover:bg-emerald-500'
                    } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Counter */}
          <div className="mt-3 sm:mt-4 text-center">
            <span className="text-xs sm:text-sm text-gray-500">
              {currentIndex + 1} of {testimonialsData.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
