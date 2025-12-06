"use client"

import LazyImage from "@/components/ui/LazyImage"
import { useScroll } from "@/hooks/useScroll"
import Link from "next/link"

interface WhyChooseProps {
  content?: {
    title?: string
    description?: string
    descSubTitle?: string
    subTitle?: string
    images?: string[]
  }
  sectionId?: number | string
}

export default function WhyChoose({ content, sectionId }: WhyChooseProps = {}) {
  const { ref, isInView } = useScroll()

  // Default fallback images
  const defaultCollage = [
    "/images/Why1.png",
    "/images/Why2.png",
    "/images/Why3.png",
    "/images/Why4.png",
  ]

  // Process images: filter out empty strings and ensure we always have 4 images
  const apiImages = content?.images?.filter(img => img && img.trim() !== '') || []
  const collage = defaultCollage.map((defaultImg, index) => {
    // Use API image if available and valid, otherwise use default
    return (apiImages[index] && apiImages[index].trim() !== '') 
      ? apiImages[index] 
      : defaultImg
  })


  return (
    <section ref={ref} className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 py-12 sm:py-16 md:py-24 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
      <div className="grid items-center gap-8 sm:gap-12 md:gap-16 md:grid-cols-2" style={{ overflow: 'visible' }}>
        {/* Collage */}
        <div className={`mx-auto grid w-full max-w-xl grid-cols-2 items-start transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`} style={{ overflow: 'visible' }}>
          {/* Image 1 - Top Left */}
          <div className="rounded-[12px] border border-slate-400 p-2 shadow-sm relative w-3/4 h-5/6 bg-transparent" style={{ overflow: 'visible' }}>
            <div className="absolute -right-7 top-5 z-10" style={{ width: '230px', height: '230px' }}>
              <LazyImage 
                src={collage[0]} 
                alt="Why choose image 1" 
               fill
                className="w-full h-full object-cover rounded-lg" 
                imageType="page"
                sectionId={sectionId}
              />
            </div>
          </div>
          {/* Image 2 - Top Right */}
          <div style={{ overflow: 'visible' }}>
            <LazyImage 
              src={collage[1]} 
              alt="Why choose image 2" 
              width={530} 
              height={540} 
              className="w-full h-auto object-cover rounded-lg relative right-7" 
              imageType="page"
              sectionId={sectionId}
            />
          </div>
          {/* Image 3 - Bottom Left */}
          <div className="mt-6" style={{ overflow: 'visible' }}>
            <LazyImage 
              src={collage[2]} 
              alt="Why choose image 3" 
              width={287} 
              height={265} 
              className="w-full h-auto object-cover rounded-lg" 
              imageType="page"
              sectionId={sectionId}
            />
          </div>
          {/* Image 4 - Bottom Right */}
          <div className="mt-6 ml-10 rounded-[12px] border border-slate-400 p-2 shadow-sm relative w-[200px] h-5/6 bg-transparent" style={{ overflow: 'visible' }}>
            <div className="absolute -left-3 -top-4 z-10" style={{ width: '200px', height: '230px' }}>
              <LazyImage 
                src={collage[3]} 
                fill
                className="w-full h-full object-cover rounded-lg " 
                imageType="page"
                sectionId={sectionId}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`mt-6 md:mt-0 transition-all duration-1000 delay-200 ${isInView ? 'animate-slide-up-shake' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">{content?.title || "Why Choose Us"}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            {content?.descSubTitle ? (
              <>
                {content.descSubTitle}
                {content.subTitle && (
                  <>
                    <br /> <span className="text-emerald-700">{content.subTitle}</span>
                  </>
                )}
              </>
            ) : (
              <>
                Excellence, Efficiency, &
                <br /> <span className="text-emerald-700">Innovation In Every Project</span>
              </>
            )}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
            {content?.description || "We specialize in designing, setting up, and installing high-performance quick service restaurants, cafés, and delis. Our team combines innovative layouts, efficient workflows, and future-ready installations to ensure your business runs smoothly from day one. We create efficient, visually stunning, and future-ready quick service restaurant spaces with precision and expertise."}
          </p>

          <div className="mt-6 sm:mt-8">
            <Link
              href="/aboutus"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-700 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
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
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


