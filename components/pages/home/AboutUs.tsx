"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import LazyImage from "@/components/ui/LazyImage"

interface AboutUsProps {
  content?: {
    title?: string
    subTitle1?: string
    subTitle2?: string
    descSubTitle?: string
    description1?: string
    description2?: string
    image1?: string
    image2?: string
  }
  sectionId?: number | string
}

export default function AboutUs({ content, sectionId }: AboutUsProps = {}) {
  const aboutUsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.getAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true')
            
            // Remove opacity-0 class
            entry.target.classList.remove('opacity-0')

            // Add slide up with shake animation
            entry.target.classList.add('animate-slide-up-shake')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (aboutUsRef.current) {
      observer.observe(aboutUsRef.current)
    }

    return () => {
      if (aboutUsRef.current) {
        observer.unobserve(aboutUsRef.current)
      }
    }
  }, [])

  return (
    <section ref={aboutUsRef} className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 pb-12 sm:pb-16 md:pb-28 pt-12 sm:pt-16 md:pt-20 sm:px-6 lg:px-8 opacity-0">
      <div className="grid items-center gap-8 sm:gap-10 md:gap-14 md:grid-cols-2">
        {/* Image collage */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] mx-auto md:mx-0">
          {/* Outer framed image with rounded corners and fixed aspect */}
          <div className="rounded-[20px] border-2 border-slate-200 bg-white p-3 shadow">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
              <LazyImage 
                src={content?.image1 || "/images/1.png"} 
                alt="About primary" 
                fill 
                className="object-cover" 
                imageType="page"
                sectionId={sectionId}
              />
            </div>
          </div>

          {/* Smaller overlapping image (has its own white border in asset) */}
          <div className="absolute -bottom-10 -right-6 sm:-bottom-10 sm:-right-10 md:-right-16 w-[160px] sm:w-[220px] md:w-[260px] rounded-2xl shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <LazyImage 
                src={content?.image2 || "/images/2.png"} 
                alt="About secondary" 
                fill 
                className="object-cover" 
                imageType="page"
                sectionId={sectionId}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 md:mt-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">About Us</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            {content?.title || (
              <>
                Shaping the Future of <span className="text-emerald-700">Quick Service</span>
                <br className="hidden sm:block" /> <span className="text-emerald-700">Restaurant Design</span>
              </>
            )}
          </h2>
          <p className="mt-3 sm:mt-4 max-w-[600px] text-xs sm:text-sm leading-relaxed text-slate-700">
            {content?.descSubTitle || "We redefine modern quick service restaurant design with optimized layouts, advanced equipment integration, and future-ready planning—ensuring faster operations, smoother workflows, and unforgettable customer experiences from day one."}
          </p>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-start gap-2 sm:gap-3">
              <Image src="/images/fi_18280468.png" alt="Experience icon" width={24} height={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">{content?.subTitle1 || "20 Years Of Experience"}</div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">{content?.description1 || "We have been partnered with top property developers in Nilgiris"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Image src="/images/Vector.png" alt="Projects icon" width={24} height={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">{content?.subTitle2 || "100+ Projects"}</div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">{content?.description2 || "We have been partnered with top property developers in Nilgiris"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <a href="#enquiry" className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-700 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
              Enquiry Now
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
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


