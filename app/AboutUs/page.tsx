"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  id: string
  name: string
  title: string
  description: string
  image: string
}

export default function AboutUsPage() {
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Company background section animations
      if (sectionRef.current && imageRef.current && contentRef.current) {
        gsap.fromTo(imageRef.current, 
          { 
            opacity: 0, 
            y: 100, 
            scale: 0.8 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )

        gsap.fromTo(contentRef.current,
          { 
            opacity: 0, 
            y: 100, 
            x: 50 
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Mission section animation
      if (missionRef.current) {
        gsap.fromTo(missionRef.current,
          { 
            opacity: 0, 
            x: -100 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Vision section animation
      if (visionRef.current) {
        gsap.fromTo(visionRef.current,
          { 
            opacity: 0, 
            x: 100 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image 
            src="/images/aboutUs/Rectangle 52.png" 
            alt="About Us - Modern Interior Design" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">About Us</h1>
          </div>
        </div>
      </section>

      {/* Company Background Section */}
      <section ref={sectionRef} className="company-background-section py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Image on the left */}
            <div ref={imageRef} className="relative w-full max-w-[520px]">
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image src="/images/aboutUs/1 (3).png" alt="Company Background" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Content on the right */}
            <div ref={contentRef}>
              <p className="text-sm font-semibold text-slate-500">Company Background</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                The Story Behind Our Passion For Building <span className="text-emerald-700">Efficient</span> Food Spaces
              </h2>
              <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation.
              </p>
              <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                With a team of experienced designers, engineers, and fabricators, we ensure every project is delivered with precision, speed, and long-term durability.
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
                    className="transition-transform duration-300 rotate-45 group-hover:rotate-0"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/aboutUs/Frame 26080088.png"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mission Part */}
          <div ref={missionRef} className="mb-20 grid items-center gap-16 md:grid-cols-[60%_40%]">
            {/* Text on the left */}
            <div className="md:col-span-1">
              <p className="mb-2 text-sm font-semibold text-white/80">Mission</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                Delivering efficient, high-quality restaurant setups with precision and speed.
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                Our mission is to deliver end-to-end design and installation solutions that turn empty spaces into fully functional, high-performance food service environments. By integrating intelligent layouts, durable materials, and precise execution, we enable brands to operate efficiently, serve customers faster, and achieve consistent quality, ensuring long-term success and a competitive edge in the industry.
              </p>
            </div>
            {/* Image on the right */}
            <div className="relative w-full max-w-[520px] justify-self-end md:col-span-1">
              <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                <Image
                  src="/images/aboutUs/Rectangle 54.png"
                  alt="Modern Restaurant Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision Part */}
          <div ref={visionRef} className="grid items-center gap-16 md:grid-cols-[40%_60%]">
            {/* Image on the left */}
            <div className="relative w-full max-w-[520px] md:col-span-1">
              <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                <Image
                  src="/images/aboutUs/Rectangle 55.png"
                  alt="Elegant Dining Area"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Text on the right */}
            <div className="md:col-span-1">
              <p className="mb-2 text-sm font-semibold text-white/80">Vision</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                Empowering food businesses with smarter, faster, future-ready restaurant spaces.
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                We strive to be the global benchmark for quick service restaurant and café design, creating spaces that seamlessly combine efficiency, innovation, and visual appeal. Our vision is to empower every food brand with future-ready environments that enhance operational performance, delight customers, and support sustainable growth while setting new industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </main>
  )
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Maddy",
    title: "Senior Designer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/aboutUs/Property 1=Default.png",
  },
  {
    id: "2",
    name: "Rhossan",
    title: "Senior Designer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/aboutUs/Property 1=Variant2.png",
  },
  {
    id: "3",
    name: "Jonathan",
    title: "Senior Designer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/aboutUs/Property 1=Variant4.png",
  },
  {
    id: "4",
    name: "dk",
    title: "Senior Designer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/2 (1).png",
  },
  {
    id: "5",
    name: "Sarah",
    title: "Project Manager",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/1.png",
  },
  {
    id: "6",
    name: "Alex",
    title: "Lead Engineer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/2.png",
  },
]

function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const featuredImageRef = useRef<HTMLDivElement>(null)
  const backgroundNameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Set initial carousel position
    if (carouselRef.current) {
      gsap.set(carouselRef.current, { x: 0 })
    }

    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)

        // Animate the featured image
        if (featuredImageRef.current) {
          gsap.to(featuredImageRef.current, {
            scale: 0.8,
            y: 50,
            opacity: 0.9,
            duration: 0.3,
            ease: "power2.inOut"
          })
        }

        // Animate the background name
        if (backgroundNameRef.current) {
          gsap.to(backgroundNameRef.current, {
            opacity: 0.1,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.inOut"
          })
        }

        // Move carousel to next position
        if (carouselRef.current) {
          gsap.to(carouselRef.current, {
            x: `-=${100 / 3}%`,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % teamMembers.length

                // Reset carousel position for seamless loop
                if (carouselRef.current) {
                  gsap.set(carouselRef.current, { x: 0 })
                }

                // Animate back to normal state
                const resetTl = gsap.timeline()

                if (featuredImageRef.current) {
                  resetTl.to(featuredImageRef.current, {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                  })
                }

                if (backgroundNameRef.current) {
                  resetTl.to(backgroundNameRef.current, {
                    opacity: 0.15,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                  })
                }

                setIsAnimating(false)
                return nextIndex
              })
            }
          })
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating])

  // Get the current member from the original array
  const currentMember = teamMembers[currentIndex]

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Our <span className="text-green-600">Team</span>
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full mx-auto" style={{ maxWidth: '1800px' }}>
        {/* Large Background Name with Gradient */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h2
            ref={backgroundNameRef}
            className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold text-center whitespace-nowrap"
            style={{
              background: 'linear-gradient(180deg, #017850 39.72%, #BEFFE9 80.93%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'absolute',
              left: '50%',
              top: '25%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            {currentMember.name}
          </h2>
        </div>

        {/* Featured Image - Large Center Display */}
        <div className="relative mb-16 z-10" style={{ height: '500px' }}>
          <div
            ref={featuredImageRef}
            className="absolute rounded-3xl overflow-hidden shadow-2xl w-80 h-96 sm:w-96 sm:h-[28rem]"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center center',
              zIndex: 10,
            }}
          >
            <Image
              src={currentMember.image || "/placeholder.svg"}
              alt={currentMember.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Team Cards Container - Shows 3 at a time */}
        <div className="max-w-[70%] mx-auto overflow-hidden">
          <div className="relative z-20 w-1/2" style={{ minHeight: '380px' }}>
            <div
              ref={carouselRef}
              className="flex carousel-container justify-center"
              style={{
                width: `${teamMembers.length * (100 / 3)}%`,
                transform: 'translateX(0%)'
              }}
            >
              {/* Render all team members - carousel will show 3 at a time */}
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / 3}%` }}
                >
                  <div
                    className={`bg-white rounded-3xl p-6 shadow-lg border transition-all duration-300 cursor-pointer h-full ${
                      index === currentIndex
                        ? 'ring-2 ring-green-500 ring-opacity-50 transform scale-105 shadow-2xl border-green-500'
                        : 'border-gray-200 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-sm text-green-600 font-medium">{member.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Timeline Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentIndex) {
                  setIsAnimating(true)

                  // Animate the featured image
                  if (featuredImageRef.current) {
                    gsap.to(featuredImageRef.current, {
                      scale: 0.8,
                      y: 50,
                      opacity: 0.9,
                      duration: 0.3,
                      ease: "power2.inOut"
                    })
                  }

                  // Animate the background name
                  if (backgroundNameRef.current) {
                    gsap.to(backgroundNameRef.current, {
                      opacity: 0.1,
                      scale: 0.8,
                      duration: 0.3,
                      ease: "power2.inOut"
                    })
                  }

                  // Move carousel to selected position
                  if (carouselRef.current) {
                    gsap.to(carouselRef.current, {
                      x: `-${index * (100 / 3)}%`,
                      duration: 0.5,
                      ease: "power2.inOut",
                      onComplete: () => {
                        // Reset carousel position for seamless loop
                        if (carouselRef.current) {
                          gsap.set(carouselRef.current, { x: 0 })
                        }

                        // Animate back to normal state
                        const resetTl = gsap.timeline()

                        if (featuredImageRef.current) {
                          resetTl.to(featuredImageRef.current, {
                            scale: 1,
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "back.out(1.7)"
                          })
                        }

                        if (backgroundNameRef.current) {
                          resetTl.to(backgroundNameRef.current, {
                            opacity: 0.15,
                            scale: 1,
                            duration: 0.5,
                            ease: "power2.out"
                          })
                        }

                        setCurrentIndex(index)
                        setIsAnimating(false)
                      }
                    })
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-green-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12 relative z-20">
        <button className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
          See More
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
