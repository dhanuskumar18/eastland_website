'use client'

// import { TestimonialCard } from "@/components/testimonial-card"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"

// Array of 4 testimonials with content and images
const testimonialsData = [
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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextIndex, setNextIndex] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

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
    <section className="mx-auto w-[80%] px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 md:grid-cols-2">
        {/* Left Section - Introduction */}
        <div>
          <p className="text-sm font-semibold text-slate-500">Client Testimonial</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            What Our Valued Clients Say About Us
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Discover what our valued clients have to say about their experience with us. Each testimonial reflects our dedication to quality, trust, and long-lasting.
          </p>
          <button className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
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
          </button>
        </div>

        {/* Right Section - Carousel */}
        <div className="relative">
          {/* Static Card Container */}
          <div className="relative w-full max-w-4xl mx-auto ">
            {/* Decorative quote marks background */}
            {/* <div className="absolute inset-0 pointer-events-none opacity-5 text-6xl font-serif text-gray-400">
              <div className="absolute top-0 left-0">"</div>
              <div className="absolute bottom-0 right-0">"</div>
            </div> */}

            {/* Main card container - stays in place */}
            <div className="relative flex gap-8 items-stretch bg-[#F4F4F4] rounded-3xl border border-gray-200 shadow-sm max-w-full ">
              {/* Empty div at top left corner */}
              <div className="absolute -top-5 -left-5 h-[200px] w-[200px] border border-slate-500 rounded-lg"></div>
              
              {/* Empty div at bottom right corner */}
              <div className="absolute -bottom-5 -right-5 h-[200px] w-[200px] border border-slate-500 -z-10 rounded-lg"></div>
              {/* Left side - Profile image with overlay slide effect */}
              <div className="flex-shrink-0">
                <div className="relative w-[350px] h-full overflow-hidden rounded-2xl" style={{ clipPath: 'polygon(0% 0%, 85% 0%, 75% 100%, 0% 100%)' }}>
                  {/* Base image - always visible */}
                  <div className="absolute inset-0">
                    <Image 
                      src={testimonialsData[currentIndex].image} 
                      alt={testimonialsData[currentIndex].name} 
                      fill 
                      className="object-cover" 
                      priority={true}
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
                        <Image 
                          src={testimonialsData[nextIndex].image} 
                          alt={testimonialsData[nextIndex].name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Testimonial content with sliding text */}
              <div className="flex-1 flex flex-col min-w-0 max-w-full ">
                {/* Quote mark icon */}
                <div className="text-gray-300 text-5xl my-4"><Image src="/images/quote1.svg" alt="Quote left" width={50} height={50} /></div>

                {/* Sliding content container */}
                <div className="relative flex-1 min-w-0 max-w-full overflow-hidden">
                  <div 
                    className=" flex transition-transform duration-500 ease-in-out py-2 "
                    style={{
                      transform: `translateX(-${(isTransitioning ? nextIndex : currentIndex) * (100 / testimonialsData.length)}%)`,
                      width: `${testimonialsData.length * 100}%`
                    }}
                  >
                    {testimonialsData.map((testimonial, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 flex flex-col px-4 min-w-0"
                        style={{ width: `${100 / testimonialsData.length}%` }}
                      >
                        {/* Quote text */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word">{testimonial.quote}</p>

                        {/* Rating stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Author info */}
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word">{testimonial.name}</h3>
                          <p className="text-gray-600 break-words hyphens-auto overflow-wrap-anywhere word-break-break-word">{testimonial.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right quote mark */}
              <div className="absolute bottom-8 right-8 text-gray-300 text-5xl"><Image src="/images/quote2.svg" alt="Quote right" width={50} height={50} /></div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Previous/Next Buttons */}
            <div className="flex gap-2">
              <button
                onClick={goToPrev}
                disabled={isTransitioning}
                className={`p-2 rounded-full border transition-all duration-200 ${
                  isTransitioning
                    ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                    : 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white'
                }`}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className={`p-2 rounded-full border transition-all duration-200 ${
                  isTransitioning
                    ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                    : 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white'
                }`}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-emerald-700'
                      : 'bg-gray-300 hover:bg-emerald-500'
                  } ${
                    isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Counter */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {testimonialsData.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
