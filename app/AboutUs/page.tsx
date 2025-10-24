"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === missionRef.current) {
              // Mission section - slide from left
              entry.target.classList.add('animate-slide-left')
            } else if (entry.target === visionRef.current) {
              // Vision section - slide from right
              entry.target.classList.add('animate-slide-right')
            } else if (entry.target === sectionRef.current) {
              // Company background section - slide up with bounce
              if (imageRef.current) {
                imageRef.current.classList.add('animate-slide-up-bounce')
              }
              if (contentRef.current) {
                contentRef.current.classList.add('animate-slide-up-bounce-delayed')
              }
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15, // Trigger when 15% of section is visible
        rootMargin: '0px 0px -30px 0px' // Trigger slightly before section fully enters
      }
    )

    // Observe all sections
    if (sectionRef.current) observer.observe(sectionRef.current)
    if (missionRef.current) observer.observe(missionRef.current)
    if (visionRef.current) observer.observe(visionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
      if (missionRef.current) observer.unobserve(missionRef.current)
      if (visionRef.current) observer.unobserve(visionRef.current)
    }
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
            <div ref={imageRef} className="relative w-full max-w-[520px] opacity-0">
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image src="/images/aboutUs/1 (3).png" alt="Company Background" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Content on the right */}
            <div ref={contentRef} className="opacity-0">
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
          <div ref={missionRef} className="mb-20 grid items-center gap-16 md:grid-cols-[60%_40%] opacity-0">
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
          <div ref={visionRef} className="grid items-center gap-16 md:grid-cols-[40%_60%] opacity-0">
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
]

function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(1) // Start with center card (Rhossan)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

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
      <div className="relative w-full mx-auto" style={{ maxWidth: '1600px' }}>
        {/* Large Background Name with Gradient */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h2
            className={`text-8xl sm:text-9xl md:text-[12rem] font-bold text-center whitespace-nowrap transition-all duration-500 ${
              isAnimating ? 'opacity-5 scale-50' : 'opacity-20 scale-100'
            }`}
            style={{
              background: 'linear-gradient(180deg, #017850 39.72%, #BEFFE9 80.93%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'absolute',
              left: '50%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            {currentMember.name}
          </h2>
        </div>

        {/* Featured Image - Above Center Card */}
        <div className="relative mb-8 z-10" style={{ height: '380px' }}>
          <div
            className={`absolute transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-2xl ${
              isAnimating ? 'w-20 h-20 opacity-70 scale-75' : 'w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 opacity-100 scale-100'
            }`}
            style={{
              top: isAnimating ? '300px' : '40px',
              left: '50%',
              transform: isAnimating ? 'translate(-50%, -50%) scale(0.4)' : 'translate(-50%, -50%) scale(1)',
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

        {/* Three Cards Carousel Container - All Visible */}
        <div className="relative z-20 w-full overflow-visible" style={{ minHeight: '200px', width: '100%' }}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 33.333}%)`,
              width: `${teamMembers.length * 33.333}%`
            }}
          >
            {/* All Three Cards in Carousel - All Visible */}
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex-shrink-0"
                style={{ width: '33.333%', flexBasis: '33.333%' }}
              >
                <div
                  className={`bg-white rounded-2xl p-4 shadow-lg border-2 transition-all duration-300 cursor-pointer h-full ${
                    currentIndex === index
                      ? 'ring-2 ring-green-500 ring-opacity-50 transform scale-105 shadow-2xl border-green-500'
                      : 'border-gray-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:border-gray-400'
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
                    <div>
                      <h3 className="font-semibold text-base text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-600">{member.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-16 relative z-20">
        <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white hover:border-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
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
            className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
