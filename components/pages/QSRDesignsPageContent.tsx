"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import LazyImage from "@/components/ui/LazyImage"
import { PageData } from '@/types/page'

interface QSRDesignsPageContentProps {
  pageData?: PageData
}

export default function QSRDesignsPageContent({ pageData }: QSRDesignsPageContentProps) {
  const firstSectionRef = useRef<HTMLElement>(null)
  const middleSectionRef = useRef<HTMLElement>(null)
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)
  const lastSectionRef = useRef<HTMLElement>(null)

  // Extract content from API sections
  const bannerSection = pageData?.sections?.find(s => s.type === 'qsr_designs_banner' || s.type === 'qsr_banner' || s.type === 'banner')
  const qsrDesignsSection = pageData?.sections?.find(s => s.type === 'qsr_designs')
  const gallerySection = pageData?.sections?.find(s => s.type === 'qsr_gallery' || s.type === 'gallery')
  const aboutQSRSection = pageData?.sections?.find(s => s.type === 'about_qsr_designs')

  // Get content from sections (with fallback to empty object)
  const bannerContent = bannerSection?.content || {}
  const qsrDesignsContent = qsrDesignsSection?.content || {}
  const galleryContent = gallerySection?.content || {}
  const aboutQSRContent = aboutQSRSection?.content || {}

  // Extract arrays from gallery content
  const galleryItems = (galleryContent.items as Array<any>) || []
  const galleryImages = (galleryContent.images as string[]) || []
  const featuredItems = (galleryContent.featured as Array<{ image?: string; title?: string }>) || []
  
  // Default fallback images
  const defaultFeatured = [
    { image: "/images/Products/Rectangle 66.png", title: "Deli and Cafe Design" },
    { image: "/images/Products/Rectangle 68.png", title: "Setup and Installation" }
  ]
  const defaultImages = [
    "/images/Products/Rectangle 67.png",
    "/images/Products/Rectangle 69.png",
    "/images/Products/Rectangle 70.png",
    "/images/Products/Rectangle 71.png"
  ]
  
  // Use API data if available, otherwise use defaults
  const featured = featuredItems.length > 0 ? featuredItems : defaultFeatured
  const images = galleryImages.length > 0 ? galleryImages : defaultImages

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true')
            entry.target.classList.remove('opacity-0')

            if (entry.target === firstSectionRef.current) {
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === middleSectionRef.current) {
              // no-op
            } else if (entry.target === firstRowRef.current) {
              entry.target.classList.add('animate-slide-left')
            } else if (entry.target === secondRowRef.current) {
              entry.target.classList.add('animate-slide-right')
            } else if (entry.target === lastSectionRef.current) {
              entry.target.classList.add('animate-slide-up-bounce')
            }

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (firstSectionRef.current) observer.observe(firstSectionRef.current)
    if (middleSectionRef.current) observer.observe(middleSectionRef.current)
    if (firstRowRef.current) observer.observe(firstRowRef.current)
    if (secondRowRef.current) observer.observe(secondRowRef.current)
    if (lastSectionRef.current) observer.observe(lastSectionRef.current)

    return () => {
      if (firstSectionRef.current) observer.unobserve(firstSectionRef.current)
      if (middleSectionRef.current) observer.unobserve(middleSectionRef.current)
      if (firstRowRef.current) observer.unobserve(firstRowRef.current)
      if (secondRowRef.current) observer.unobserve(secondRowRef.current)
      if (lastSectionRef.current) observer.unobserve(lastSectionRef.current)
    }
  }, [])

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px] ">
        <div className="absolute inset-0">
          <LazyImage
            src={bannerContent.image || "/images/Products/Rectangle 52 (3).png"}
            alt={bannerContent.title || "QSR Designs"}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            imageType="page"
            sectionId={bannerSection?.id}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              {bannerContent.title || "QSR Designs"}
            </h1>
            {bannerContent.subTitle && (
              <p className="mt-4 text-lg sm:text-xl">
                {bannerContent.subTitle}
              </p>
            )}
            {!bannerContent.subTitle && (
              <p className="mt-4 text-lg sm:text-xl">
                Quick Service Restaurant Design Solutions
              </p>
            )}
          </div>
        </div>
      </section>

      {/* QSR Designs Section */}
      <section ref={firstSectionRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[400px] h-[500px]  ">
              {/* Main Image */}
              <div className=" bg-white  ">
                <div className="relative aspect-[519/650] overflow-hidden rounded-[50px] ">
                  <LazyImage 
                    src={qsrDesignsContent.image1 || qsrDesignsContent.image || "/images/Products/Rectangle 78.png"} 
                    alt={qsrDesignsContent.imageAlt || "Modern Cafe Interior"} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="page"
                    sectionId={qsrDesignsSection?.id}
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-0 right-8 w-[300px] h-[300px] ">
                <div className="relative aspect-[365/315] overflow-hidden rounded-[50px] left-44 p-[2px]  bg-white w-[350px]">
                  <LazyImage 
                    src={qsrDesignsContent.image2 || "/images/Products/Rectangle 79.png"} 
                    alt={qsrDesignsContent.image2Alt || "Refined Dining Space"} 
                     width={350}
                     height={350}
                    className="object transition-transform duration-300 hover:scale-110 " 
                    imageType="page"
                    sectionId={qsrDesignsSection?.id}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">{qsrDesignsContent.label || "QSR Designs"}</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {qsrDesignsContent.title ? (
                  <>
                    {qsrDesignsContent.title}
                    {qsrDesignsContent.subTitle && (
                      <> <span className="text-emerald-700">{qsrDesignsContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    Innovative Fast-Food Spaces Crafted for <span className="text-emerald-700">Modern Experiences</span>
                  </>
                )}
              </h2>
              {qsrDesignsContent.description ? (
                (qsrDesignsContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                  <p key={index} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Expert Kitchen Services with Essential Equipment and Sanitization Product Support
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services. Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
                  </p>
                </>
              )}

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section ref={middleSectionRef} className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {galleryContent.title ? (
                <>
                  {galleryContent.title}
                  {galleryContent.subTitle && (
                    <> <span className="text-emerald-700">{galleryContent.subTitle}</span></>
                  )}
                </>
              ) : (
                <>
                  Future-Ready Quick Service Installations With Efficient Workflow
                </>
              )}
            </h2>
          </div>
          
          {/* First Row - Complete row slides from left */}
          <div ref={firstRowRef} className="opacity-0">
            <div className="grid grid-cols-4 gap-4 h-[300px] mb-4">
              {/* First Row - First 2 columns: 1 large image */}
              <div className="col-span-2 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group">
                  <LazyImage 
                    src={featured[0]?.image || defaultFeatured[0].image} 
                    alt={featured[0]?.title || defaultFeatured[0].title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 overflow-hidden">
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-full">{featured[0]?.title || defaultFeatured[0].title}</h3>
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0">{featured[0]?.title || defaultFeatured[0].title}</h3>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-emerald-700 group-hover:scale-110">
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
              </div>

              {/* First Row - Next 2 columns: 2 separate images */}
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <LazyImage 
                    src={images[0] || defaultImages[0]} 
                    alt="Gallery image 1" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                </div>
              </div>
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <LazyImage 
                    src={images[1] || defaultImages[1]} 
                    alt="Gallery image 2" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Complete row slides from right */}
          <div ref={secondRowRef} className="opacity-0">
            <div className="grid grid-cols-4 gap-4 h-[300px]">
              {/* Second Row - First 2 columns: 2 separate images */}
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <LazyImage 
                    src={images[2] || defaultImages[2]} 
                    alt="Gallery image 3" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                </div>
              </div>
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <LazyImage 
                    src={images[3] || defaultImages[3]} 
                    alt="Gallery image 4" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                </div>
              </div>

              {/* Second Row - Next 2 columns: 1 large image */}
              <div className="col-span-2 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group">
                  <LazyImage 
                    src={featured[1]?.image || defaultFeatured[1].image} 
                    alt={featured[1]?.title || defaultFeatured[1].title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                    imageType="gallery"
                    sectionId={gallerySection?.id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 overflow-hidden">
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-full">{featured[1]?.title || defaultFeatured[1].title}</h3>
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0">{featured[1]?.title || defaultFeatured[1].title}</h3>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-emerald-700 group-hover:scale-110">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About QSR Designs Section */}
      <section ref={lastSectionRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Image with custom border radius */}
            <div className="relative w-full max-w-[596px]">
              <div 
                className="relative shadow-lg"
                style={{
                  width: '520px',
                  height: '442px',
                  border: '1px solid black',
                  borderTopLeftRadius: '168px',
                  borderBottomRightRadius: '168px',
                  borderTopRightRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  padding: '20px'
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[148px] rounded-br-[148px] rounded-tr-none rounded-bl-none">
                  <LazyImage 
                    src={aboutQSRContent.image || "/images/Products/Rectangle 76.png"} 
                    alt={aboutQSRContent.imageAlt || "Modern Restaurant Interior"} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                    imageType="page"
                    sectionId={aboutQSRSection?.id}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">{aboutQSRContent.label || "About QSR Designs"}</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {aboutQSRContent.title ? (
                  <>
                    {aboutQSRContent.title}
                    {aboutQSRContent.subTitle && (
                      <> <span className="text-emerald-700">{aboutQSRContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    Transforming Quick-Service Restaurants with <span className="text-emerald-700">Creative Design Solutions</span>
                  </>
                )}
              </h2>
              {aboutQSRContent.description ? (
                (aboutQSRContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                  <p key={index} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    QSR Designs specializes in designing and installing high-performance spaces for quick-service restaurants, cafés, and delis. We offer full-scale solutions from layout planning to end-to-end installation, ensuring your space is optimized for efficiency, customer experience, and operational success.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Our team combines creative vision with practical expertise to deliver spaces that not only look stunning but also function seamlessly for your business needs. From concept to completion, we handle every aspect of your project with precision and care.
                  </p>
                </>
              )}

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


