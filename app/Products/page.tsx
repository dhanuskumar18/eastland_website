"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function ProductsPage() {
  const productsSectionRef = useRef<HTMLElement>(null)
  const gridSectionRef = useRef<HTMLElement>(null)
  const aboutProductsRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const row4Ref = useRef<HTMLDivElement>(null)
  const row5Ref = useRef<HTMLDivElement>(null)
  const row6Ref = useRef<HTMLDivElement>(null)
  const row7Ref = useRef<HTMLDivElement>(null)
  const row8Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Mark as animated to prevent re-triggering
            entry.target.setAttribute('data-animated', 'true')
            
            // Remove opacity-0 class
            entry.target.classList.remove('opacity-0')

            if (entry.target === productsSectionRef.current) {
              // First section - slide up with bounce
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === gridSectionRef.current) {
              // Grid section - no animation, let individual rows animate
              // entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === aboutProductsRef.current) {
              // Last section - slide up with bounce (same as first section)
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row1Ref.current) {
              // Column 1, Row 1 - slide from top
              console.log('Animating row1')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row2Ref.current) {
              // Column 2, Row 1 - slide from bottom
              console.log('Animating row2')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row3Ref.current) {
              // Column 3, Row 1 - slide from top
              console.log('Animating row3')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row4Ref.current) {
              // Column 4, Row 1 - slide from bottom
              console.log('Animating row4')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row5Ref.current) {
              // Column 1, Row 2 - slide from top
              console.log('Animating row5')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row6Ref.current) {
              // Column 2, Row 2 - slide from bottom
              console.log('Animating row6')
              entry.target.classList.add('animate-slide-up-bounce')
            } else if (entry.target === row7Ref.current) {
              // Column 3, Row 2 - slide from top
              console.log('Animating row7')
              entry.target.classList.add('animate-slide-down')
            } else if (entry.target === row8Ref.current) {
              // Column 4, Row 2 - slide from bottom
              console.log('Animating row8')
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

    // Observe all sections and rows
    if (productsSectionRef.current) observer.observe(productsSectionRef.current)
    if (gridSectionRef.current) observer.observe(gridSectionRef.current)
    if (aboutProductsRef.current) observer.observe(aboutProductsRef.current)
    if (row1Ref.current) observer.observe(row1Ref.current)
    if (row2Ref.current) observer.observe(row2Ref.current)
    if (row3Ref.current) observer.observe(row3Ref.current)
    if (row4Ref.current) observer.observe(row4Ref.current)
    if (row5Ref.current) observer.observe(row5Ref.current)
    if (row6Ref.current) observer.observe(row6Ref.current)
    if (row7Ref.current) observer.observe(row7Ref.current)
    if (row8Ref.current) observer.observe(row8Ref.current)

    return () => {
      if (productsSectionRef.current) observer.unobserve(productsSectionRef.current)
      if (gridSectionRef.current) observer.unobserve(gridSectionRef.current)
      if (aboutProductsRef.current) observer.unobserve(aboutProductsRef.current)
      if (row1Ref.current) observer.unobserve(row1Ref.current)
      if (row2Ref.current) observer.unobserve(row2Ref.current)
      if (row3Ref.current) observer.unobserve(row3Ref.current)
      if (row4Ref.current) observer.unobserve(row4Ref.current)
      if (row5Ref.current) observer.unobserve(row5Ref.current)
      if (row6Ref.current) observer.unobserve(row6Ref.current)
      if (row7Ref.current) observer.unobserve(row7Ref.current)
      if (row8Ref.current) observer.unobserve(row8Ref.current)
    }
  }, [])
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Products/Rectangle 52 (2).png"
            alt="Products - Restaurant Interior Design"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">Our Products</h1>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section ref={productsSectionRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative w-full max-w-[520px]">
              <div className="rounded-tl-[250px] rounded-bl-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-tl-[250px] rounded-bl-[18px]">
                  <Image 
                    src="/images/Products/1 (4).png" 
                    alt="Modern Kitchen Interior" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Expert Kitchen Services with <span className="text-emerald-700">Equipment and Sanitization Product Support</span>
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

      {/* Products Grid Section */}
      <section ref={gridSectionRef} className="bg-slate-50 py-20 opacity-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Future-Ready Quick Service <span className="text-emerald-700">Installations</span>
            <br /> <span className="text-emerald-700">With Efficient Workflow</span>
          </h2>

          <div className="mt-14 relative">
            {/* Continuous vertical lines for each column */}
            <div className="absolute left-1/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-3/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Row 1 - Quick Installations */}
              <div ref={row1Ref} className="relative lg:mt-6 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Cafe Design</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (7).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

                {/* Row 2 - Restaurant Interiors */}
                <div ref={row2Ref} className="relative lg:mt-24 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Kitchen Setup</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (8).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

                {/* Row 3 - Equipment Integration */}
                <div ref={row3Ref} className="relative lg:mt-6 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Workflow Solutions</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (9).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

                {/* Row 4 - Space Optimization */}
                <div ref={row4Ref} className="relative lg:mt-24 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Deli Counters</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (10).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

              {/* Row 5 - Quick Installations - Second Row */}
              <div ref={row5Ref} className="relative lg:mt-6 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Quick Installations</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (11).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

              {/* Row 6 - Restaurant Interiors - Second Row */}
              <div ref={row6Ref} className="relative lg:mt-24 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Restaurant Interiors</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (12).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

              {/* Row 7 - Equipment Integration - Second Row */}
              <div ref={row7Ref} className="relative lg:mt-6 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Equipment Integration</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (13).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>

              {/* Row 8 - Space Optimization - Second Row */}
              <div ref={row8Ref} className="relative lg:mt-24 opacity-0">
                <h3 className="text-lg font-semibold text-slate-900">Space Optimization</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("/images/Products/2 (14).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Products Section */}
      <section ref={aboutProductsRef} className="py-20 bg-white opacity-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px]  bg-white p-3  ">
                <div className="relative overflow-hidden rounded-[18px] h-[442px] w-[400px] p-3 border-2 border-gray-400">
                  <Image 
                    src="/images/Products/1 (5).png" 
                    alt="Elegant Dining Area" 
                     height={350}
                     width={350}
                    className="object-cover h-full w-full" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-6 -right-12 rounded-2xl shadow-2xl">
                <div className="relative  overflow-hidden rounded-2xl h-[400px] w-[250px] p-3 border-2 border-gray-400 ">
                  <Image 
                    src="/images/Products/1 (6).png" 
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
              <p className="text-sm font-semibold text-slate-500">About Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                High-Quality Products Supporting <span className="text-emerald-700">Safe, Efficient, and Modern Kitchen</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation.
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