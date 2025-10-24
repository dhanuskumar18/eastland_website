"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function QSRDesignsPage() {
  const firstSectionRef = useRef<HTMLElement>(null)
  const middleSectionRef = useRef<HTMLElement>(null)
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)
  const lastSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Mark as animated to prevent re-triggering
            entry.target.setAttribute('data-animated', 'true')
            
            // Remove opacity-0 class
            entry.target.classList.remove('opacity-0')

            if (entry.target === firstSectionRef.current) {
              // First section - slide up with bounce
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === middleSectionRef.current) {
              // Middle section - no animation, let individual rows animate
              // entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === firstRowRef.current) {
              // First row - slide from left with bounce
              entry.target.classList.add('animate-slide-left')
            } else if (entry.target === secondRowRef.current) {
              // Second row - slide from right with bounce
              entry.target.classList.add('animate-slide-right')
            } else if (entry.target === lastSectionRef.current) {
              // Last section - slide up with bounce
              entry.target.classList.add('animate-slide-up-bounce')
            }

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

    // Observe sections
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
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Products/Rectangle 52 (3).png"
            alt="QSR Designs"
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              QSR Designs
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Quick Service Restaurant Design Solutions
            </p>
          </div>
        </div>
      </section>

      {/* QSR Designs Section */}
      <section ref={firstSectionRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image 
                    src="/images/Products/Rectangle 78.png" 
                    alt="Modern Cafe Interior" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 right-8 w-[300px] rounded-2xl shadow-2xl">
                <div className="relative aspect-[365/252] overflow-hidden rounded-2xl">
                  <Image 
                    src="/images/Products/Rectangle 79.png" 
                    alt="Refined Dining Space" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">QSR Designs</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Innovative Fast-Food Spaces Crafted for <span className="text-emerald-700">Modern Experiences</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Expert Kitchen Services with Essential Equipment and Sanitization Product Support
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services. Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
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

      {/* Gallery Grid Section */}
      <section ref={middleSectionRef} className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Future-Ready Quick Service Installations With Efficient Workflow
            </h2>
          </div>
          
          {/* First Row - Complete row slides from left */}
          <div ref={firstRowRef} className="opacity-0">
            <div className="grid grid-cols-4 gap-4 h-[300px] mb-4">
              {/* First Row - First 2 columns: 1 large image */}
              <div className="col-span-2 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src="/images/Products/Rectangle 66.png" 
                    alt="Deli and Cafe Design" 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 overflow-hidden">
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-full">Deli and Cafe Design</h3>
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0">Deli and Cafe Design</h3>
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
                  <Image 
                    src="/images/Products/Rectangle 67.png" 
                    alt="Coffee Bar Counter" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src="/images/Products/Rectangle 69.png" 
                    alt="Restaurant Interior" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
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
                  <Image 
                    src="/images/Products/Rectangle 70.png" 
                    alt="Modern Dining Space" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>
              <div className="col-span-1 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src="/images/Products/Rectangle 71.png" 
                    alt="Ambient Restaurant" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>

              {/* Second Row - Next 2 columns: 1 large image */}
              <div className="col-span-2 row-span-1">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src="/images/Products/Rectangle 68.png" 
                    alt="Setup and Installation" 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 overflow-hidden">
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-full">Setup and Installation</h3>
                    <h3 className="font-semibold text-white drop-shadow-lg transition-transform duration-300 translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0">Setup and Installation</h3>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <Image 
                    src="/images/Products/Rectangle 76.png" 
                    alt="Modern Restaurant Interior" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">About QSR Designs</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Transforming Quick-Service Restaurants with <span className="text-emerald-700">Creative Design Solutions</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                QSR Designs specializes in designing and installing high-performance spaces for quick-service restaurants, cafés, and delis. We offer full-scale solutions from layout planning to end-to-end installation, ensuring your space is optimized for efficiency, customer experience, and operational success.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Our team combines creative vision with practical expertise to deliver spaces that not only look stunning but also function seamlessly for your business needs. From concept to completion, we handle every aspect of your project with precision and care.
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
