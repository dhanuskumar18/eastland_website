"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

import { PageData } from '@/types/page'

interface ServicesPageContentProps {
  pageData?: PageData
}

export default function ServicesPageContent({ pageData }: ServicesPageContentProps) {
  const firstContentRef = useRef<HTMLDivElement>(null)
  const middleContentRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)
  const lastContentRef = useRef<HTMLDivElement>(null)

  // Extract content from API sections
  const ourServicesSection = pageData?.sections?.find(s => s.type === 'our_services')
  const kitchenInstallationsSection = pageData?.sections?.find(s => s.type === 'kitchen_installations')
  const aboutOurServicesSection = pageData?.sections?.find(s => s.type === 'about_our_services')
  const bannerSection = pageData?.sections?.find(s => s.type === 'our_services_banner' || s.type === 'services_banner' || s.type === 'banner')

  // Get content from sections (with fallback to empty object)
  const ourServicesContent = ourServicesSection?.content || {}
  const kitchenInstallationsContent = kitchenInstallationsSection?.content || {}
  const aboutOurServicesContent = aboutOurServicesSection?.content || {}
  const bannerContent = bannerSection?.content || {}

  // Extract arrays
  const services = (kitchenInstallationsContent.services as Array<any>) || []
  const cards = (kitchenInstallationsContent.cards as Array<{
    image?: string
    title?: string
    subTitle?: string
    description?: string
  }>) || []
  
  // Default fallback cards
  const defaultCards = [
    {
      image: "/images/Services/Rectangle 35.png",
      title: "SERVICES",
      subTitle: "Food Service Equipment High-performance",
      description: "commercial appliances and machinery built to handle large-scale cooking, preparation."
    },
    {
      image: "/images/Services/Rectangle 35 (1).png",
      title: "SERVICES",
      subTitle: "Kitchen Hood Equipments Professional ventilation",
      description: "systems and hood equipment for safe and efficient kitchen operations."
    },
    {
      image: "/images/Services/Rectangle 35 (2).png",
      title: "SERVICES",
      subTitle: "Smallwares High-performance",
      description: "commercial appliances and machinery built to handle large-scale cooking, preparation."
    },
    {
      image: "/images/Services/Rectangle 35 (3).png",
      title: "SERVICES",
      subTitle: "Hand Sanitization Equipment Professional sanitization",
      description: "solutions and equipment for maintaining hygiene standards."
    }
  ]
  
  // Use API cards if available, otherwise use defaults
  const displayCards = cards.length > 0 ? cards : defaultCards

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Mark as animated to prevent re-triggering
            entry.target.setAttribute('data-animated', 'true')
            
            // Remove opacity-0 class
            entry.target.classList.remove('opacity-0')

            if (entry.target === firstContentRef.current) {
              // First content - slide up with bounce
              console.log('Animating first content')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === middleContentRef.current) {
              // Middle content - slide up with bounce
              console.log('Animating middle content')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === card1Ref.current) {
              // Card 1 - slide up with bounce
              console.log('Animating card 1')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === card2Ref.current) {
              // Card 2 - slide up with bounce
              console.log('Animating card 2')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === card3Ref.current) {
              // Card 3 - slide up with bounce
              console.log('Animating card 3')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === card4Ref.current) {
              // Card 4 - slide up with bounce
              console.log('Animating card 4')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === lastContentRef.current) {
              // Last content - slide up with bounce
              console.log('Animating last content')
              entry.target.classList.add('animate-slide-up-bounce')
            }

            // Stop observing this element to prevent re-triggering
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // Observe content
    if (firstContentRef.current) observer.observe(firstContentRef.current)
    if (middleContentRef.current) observer.observe(middleContentRef.current)
    if (card1Ref.current) observer.observe(card1Ref.current)
    if (card2Ref.current) observer.observe(card2Ref.current)
    if (card3Ref.current) observer.observe(card3Ref.current)
    if (card4Ref.current) observer.observe(card4Ref.current)
    if (lastContentRef.current) observer.observe(lastContentRef.current)

    return () => {
      if (firstContentRef.current) observer.unobserve(firstContentRef.current)
      if (middleContentRef.current) observer.unobserve(middleContentRef.current)
      if (card1Ref.current) observer.unobserve(card1Ref.current)
      if (card2Ref.current) observer.unobserve(card2Ref.current)
      if (card3Ref.current) observer.unobserve(card3Ref.current)
      if (card4Ref.current) observer.unobserve(card4Ref.current)
      if (lastContentRef.current) observer.unobserve(lastContentRef.current)
    }
  }, [])
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={bannerContent.image || "/images/Services/Rectangle 52 (4).png"}
            alt="Our Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              {bannerContent.title || "Our Services"}
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              {bannerContent.subTitle || "Comprehensive Solutions for Your Business Needs"}
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div ref={firstContentRef} className="grid items-center gap-16 md:grid-cols-2 opacity-0">
            {/* Left Side - Image with custom border radius */}
            <div className="relative w-full max-w-[543px]">
              <div 
                className="relative shadow-lg"
                style={{
                  width: '543px',
                  height: '502px',
                  border: '1px solid black',
                  borderTopLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                  borderTopRightRadius: '231px',
                  borderBottomLeftRadius: '87px',
                  padding: '20px'
                }}
              >
                <div 
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderTopLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    borderTopRightRadius: '211px',
                    borderBottomLeftRadius: '67px'
                  }}
                >
                  <Image 
                    src={ourServicesContent.image || "/images/Services/1 (9).png"} 
                    alt="Modern Restaurant Interior" 
                    fill 
                    className="object-cover" 
                    style={{ transform: 'scaleX(-1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">Our Services</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {ourServicesContent.title ? (
                  <>
                    {ourServicesContent.title}
                    {ourServicesContent.subTitle && (
                      <> <span className="text-emerald-700">{ourServicesContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    Expert Kitchen Services with <span className="text-emerald-700">Equipment</span> and <span className="text-emerald-700">Sanitization Product Support</span>
                  </>
                )}
              </h2>
              {ourServicesContent.description ? (
                (ourServicesContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                  <p key={index} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Expert Kitchen Services with Essential Equipment and Sanitization Product Support We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
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

      {/* Services Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div ref={middleContentRef} className="text-center mb-16 opacity-0">
            <p className="text-sm font-semibold text-slate-500">Services</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {kitchenInstallationsContent.title ? (
                <>
                  {kitchenInstallationsContent.title}
                  {kitchenInstallationsContent.subTitle && (
                    <> <span className="text-emerald-700">{kitchenInstallationsContent.subTitle}</span></>
                  )}
                </>
              ) : (
                <>
                  Professional Kitchen Installation, Repair and <span className="text-emerald-700">Deep Cleaning Solutions</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex justify-center" style={{ gap: '35px' }}>
              {/* Card 1 */}
              <div ref={card1Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src={displayCards[0]?.image || defaultCards[0].image}
                  alt={displayCards[0]?.subTitle || defaultCards[0].subTitle}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{displayCards[0]?.subTitle || defaultCards[0].subTitle}</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">{displayCards[0]?.title || defaultCards[0].title}</p>
                  <h3 className="text-white font-bold text-xl mb-4">{displayCards[0]?.subTitle || defaultCards[0].subTitle}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    {displayCards[0]?.description || defaultCards[0].description}
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 2 */}
              <div ref={card2Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src={displayCards[1]?.image || defaultCards[1].image}
                  alt={displayCards[1]?.subTitle || defaultCards[1].subTitle}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{displayCards[1]?.subTitle || defaultCards[1].subTitle}</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">{displayCards[1]?.title || defaultCards[1].title}</p>
                  <h3 className="text-white font-bold text-xl mb-4">{displayCards[1]?.subTitle || defaultCards[1].subTitle}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    {displayCards[1]?.description || defaultCards[1].description}
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 3 */}
              <div ref={card3Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src={displayCards[2]?.image || defaultCards[2].image}
                  alt={displayCards[2]?.subTitle || defaultCards[2].subTitle}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{displayCards[2]?.subTitle || defaultCards[2].subTitle}</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">{displayCards[2]?.title || defaultCards[2].title}</p>
                  <h3 className="text-white font-bold text-xl mb-4">{displayCards[2]?.subTitle || defaultCards[2].subTitle}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    {displayCards[2]?.description || defaultCards[2].description}
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 4 */}
              <div ref={card4Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src={displayCards[3]?.image || defaultCards[3].image}
                  alt={displayCards[3]?.subTitle || defaultCards[3].subTitle}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{displayCards[3]?.subTitle || defaultCards[3].subTitle}</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">{displayCards[3]?.title || defaultCards[3].title}</p>
                  <h3 className="text-white font-bold text-xl mb-4">{displayCards[3]?.subTitle || defaultCards[3].subTitle}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    {displayCards[3]?.description || defaultCards[3].description}
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div ref={lastContentRef} className="grid items-center gap-16 md:grid-cols-2 opacity-0">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px]  bg-white p-3  ">
                <div className="relative overflow-hidden rounded-[18px] h-[442px] w-[450px] p-3 border-2 border-gray-400">
                  <Image 
                    src={aboutOurServicesContent.image1 || "/images/Services/1 (9).png"} 
                    alt="Elegant Dining Area" 
                     height={350}
                     width={350}
                    className="object-cover h-full w-full" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-6 -left-32 rounded-2xl shadow-2xl">
                <div className="relative  overflow-hidden rounded-2xl h-[400px] w-[280px] p-3 border-2 border-gray-400 ">
                  <Image 
                    src={aboutOurServicesContent.image2 || "/images/Services/1 (8).png"} 
                    alt="Modern Cafe Setting" 
                    height={300}
                    width={300}
                    className="object-cover h-full w-full rounded-2xl" 
                  />
                </div>  
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">About Our Services</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {aboutOurServicesContent.title ? (
                  <>
                    {aboutOurServicesContent.title}
                    {aboutOurServicesContent.subTitle && (
                      <> <span className="text-emerald-700">{aboutOurServicesContent.subTitle}</span></>
                    )}
                  </>
                ) : (
                  <>
                    High-Quality Products Supporting <span className="text-emerald-700">Safe, Efficient, and Modern Kitchen</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {aboutOurServicesContent.description ? (
                  (aboutOurServicesContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                    <span key={index}>
                      {part.trim()}
                      {index < (aboutOurServicesContent.description as string).split('\n').filter((p: string) => p.trim()).length - 1 && <><br /><br /></>}
                    </span>
                  ))
                ) : (
                  "Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation."
                )}
              </p>

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
