"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function ServicesPage() {
  const firstContentRef = useRef<HTMLDivElement>(null)
  const middleContentRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)
  const lastContentRef = useRef<HTMLDivElement>(null)

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
            src="/images/Services/Rectangle 52 (4).png"
            alt="Our Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Comprehensive Solutions for Your Business Needs
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    src="/images/Services/1 (9).png" 
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
                Expert Kitchen Services with <span className="text-emerald-700">Equipment</span> and <span className="text-emerald-700">Sanitization Product Support</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Expert Kitchen Services with Essential Equipment and Sanitization Product Support We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
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

      {/* Services Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={middleContentRef} className="text-center mb-16 opacity-0">
            <p className="text-sm font-semibold text-slate-500">Services</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Professional Kitchen Installation, Repair and <span className="text-emerald-700">Deep Cleaning Solutions</span>
            </h2>
          </div>

          <div className="flex justify-center" style={{ gap: '35px' }}>
              {/* Card 1: Food Service Equipment */}
              <div ref={card1Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src="/images/Services/Rectangle 35.png"
                  alt="Food Service Equipment"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">Food Service Equipment</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">SERVICES</p>
                  <h3 className="text-white font-bold text-xl mb-4">Food Service Equipment</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    High-performance commercial appliances and machinery built to handle large-scale cooking, preparation.
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 2: Kitchen Hood Equipments */}
              <div ref={card2Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src="/images/Services/Rectangle 35 (1).png"
                  alt="Kitchen Hood Equipments"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">Kitchen Hood Equipments</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">SERVICES</p>
                  <h3 className="text-white font-bold text-xl mb-4">Kitchen Hood Equipments</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Professional ventilation systems and hood equipment for safe and efficient kitchen operations.
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 3: Smallwares */}
              <div ref={card3Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src="/images/Services/Rectangle 35 (2).png"
                  alt="Smallwares"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">Smallwares</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">SERVICES</p>
                  <h3 className="text-white font-bold text-xl mb-4">Smallwares</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    High-performance commercial appliances and machinery built to handle large-scale cooking, preparation.
                  </p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 w-fit">
                  Enquiry Now
                </button>
              </div>
            </div>

              {/* Card 4: Hand Sanitization Equipment */}
              <div ref={card4Ref} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer opacity-0" style={{ width: '270px', height: '410px' }}>
              <div className="relative h-full">
                <Image
                  src="/images/Services/Rectangle 35 (3).png"
                  alt="Hand Sanitization Equipment"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-600/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">Hand Sanitization Equipment</h3>
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-emerald-600/80 p-6 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-2">SERVICES</p>
                  <h3 className="text-white font-bold text-xl mb-4">Hand Sanitization Equipment</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Professional sanitization solutions and equipment for maintaining hygiene standards.
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={lastContentRef} className="grid items-center gap-16 md:grid-cols-2 opacity-0">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px]  bg-white p-3  ">
                <div className="relative overflow-hidden rounded-[18px] h-[442px] w-[450px] p-3 border-2 border-gray-400">
                  <Image 
                    src="/images/Services/1 (9).png" 
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
                    src="/images/Services/1 (8).png" 
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
