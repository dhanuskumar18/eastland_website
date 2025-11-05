"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

import { PageData } from '@/types/page'

interface TeamMember {
  id: string
  name: string
  title: string
  description: string
  image: string
}

interface AboutUsPageContentProps {
  pageData?: PageData
}

export default function AboutUsPageContent({ pageData }: AboutUsPageContentProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  // Extract content from API sections
  const bannerSection = pageData?.sections?.find(s => s.type === 'about_banner')
  const companyBgSection = pageData?.sections?.find(s => s.type === 'company_background')
  const missionSection = pageData?.sections?.find(s => s.type === 'mission')
  const visionSection = pageData?.sections?.find(s => s.type === 'vision')
  const teamSection = pageData?.sections?.find(s => s.type === 'team')

  // Get content from sections (with fallback to empty object)
  const bannerContent = bannerSection?.content || {}
  const companyBgContent = companyBgSection?.content || {}
  const missionContent = missionSection?.content || {}
  const visionContent = visionSection?.content || {}
  const teamContent = teamSection?.content || {}

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
            src={bannerContent.image || "/images/aboutUs/Rectangle 52.png"} 
            alt="About Us - Modern Interior Design" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              {bannerContent.title || "About Us"}
            </h1>
            {bannerContent.subTitle && bannerContent.subTitle !== ".." && (
              <p className="mt-4 text-xl text-white">{bannerContent.subTitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Company Background Section */}
      <section ref={sectionRef} className="company-background-section py-20 bg-white">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Image on the left */}
            <div ref={imageRef} className="relative w-full max-w-[520px]">
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image 
                    src={companyBgContent.image || "/images/aboutUs/1 (3).png"} 
                    alt="Company Background" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Content on the right */}
            <div ref={contentRef}>
              <p className="text-sm font-semibold text-slate-500">Company Background</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {companyBgContent.title ? (
                  companyBgContent.subTitle && companyBgContent.title.includes(companyBgContent.subTitle) ? (
                    <>
                      {companyBgContent.title.split(companyBgContent.subTitle)[0]}
                      <span className="text-emerald-700"> {companyBgContent.subTitle}</span>
                      {companyBgContent.title.split(companyBgContent.subTitle)[1]}
                    </>
                  ) : (
                    <>
                      {companyBgContent.title}
                      {companyBgContent.subTitle && (
                        <> <span className="text-emerald-700">{companyBgContent.subTitle}</span></>
                      )}
                    </>
                  )
                ) : (
                  <>
                    The Story Behind Our Passion For Building <span className="text-emerald-700">Efficient</span> Food Spaces
                  </>
                )}
              </h2>
              {companyBgContent.description ? (
                (companyBgContent.description as string).split('\n').filter((part: string) => part.trim()).map((part: string, index: number) => (
                  <p key={index} className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                    {part.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                    Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation.
                  </p>
                  <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                    With a team of experienced designers, engineers, and fabricators, we ensure every project is delivered with precision, speed, and long-term durability.
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
        
        <div className="relative z-10 mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          {/* Mission Part */}
          <div ref={missionRef} className="mb-20 grid items-center gap-16 md:grid-cols-[60%_40%]">
            {/* Text on the left */}
            <div className="md:col-span-1">
              <p className="mb-2 text-sm font-semibold text-white/80">Mission</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                {missionContent.title || "Delivering efficient, high-quality restaurant setups with precision and speed."}
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                {missionContent.description || "Our mission is to deliver end-to-end design and installation solutions that turn empty spaces into fully functional, high-performance food service environments. By integrating intelligent layouts, durable materials, and precise execution, we enable brands to operate efficiently, serve customers faster, and achieve consistent quality, ensuring long-term success and a competitive edge in the industry."}
              </p>
            </div>
            {/* Image on the right */}
            <div className="relative w-full max-w-[520px] justify-self-end md:col-span-1">
              <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                <Image
                  src={missionContent.image || "/images/aboutUs/Rectangle 54.png"}
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
                  src={visionContent.image || "/images/aboutUs/Rectangle 55.png"}
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
                {visionContent.title || "Empowering food businesses with smarter, faster, future-ready restaurant spaces."}
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                {visionContent.description || "We strive to be the global benchmark for quick service restaurant and café design, creating spaces that seamlessly combine efficiency, innovation, and visual appeal. Our vision is to empower every food brand with future-ready environments that enhance operational performance, delight customers, and support sustainable growth while setting new industry standards."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection teamContent={teamContent} />
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
    image: "/images/aboutUs/Property 1=Default.png",
  },
  {
    id: "5",
    name: "Sarah",
    title: "Project Manager",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/aboutUs/Property 1=Variant2.png",
  },
  {
    id: "6",
    name: "Alex",
    title: "Lead Engineer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/aboutUs/Property 1=Variant4.png",
  },
]

interface TeamSectionProps {
  teamContent?: {
    title?: string
    members?: Array<{
      id?: string
      name?: string
      title?: string
      description?: string
      image?: string
    }>
  }
}

function TeamSection({ teamContent }: TeamSectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = useState<any>(null)
  const [previousMember, setPreviousMember] = useState<TeamMember | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Use dynamic team members if available, otherwise fall back to static
  const dynamicMembers: TeamMember[] = teamContent?.members?.map((member, index) => ({
    id: member.id || String(index + 1),
    name: member.name || `Team Member ${index + 1}`,
    title: member.title || "Team Member",
    description: member.description || "Team member description.",
    image: member.image || "/images/aboutUs/Property 1=Default.png",
  })) || []
  
  const membersToUse = dynamicMembers.length > 0 ? dynamicMembers : teamMembers

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrentIndex(api.selectedScrollSnap())

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap()
      const newMiddleIndex = (newIndex + 1) % membersToUse.length
      const newMember = membersToUse[newMiddleIndex]
      
      // Get current member before updating
      const currentMiddleIndex = (currentIndex + 1) % membersToUse.length
      const currentMember = membersToUse[currentMiddleIndex]
      
      if (currentMember.name !== newMember.name) {
        setPreviousMember(currentMember)
        setIsTransitioning(true)
        setCurrentIndex(newIndex)
        
        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false)
          setPreviousMember(null)
        }, 3000)
      } else {
        setCurrentIndex(newIndex)
      }
    })
  }, [api, currentIndex, membersToUse])

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  // Add CSS keyframes for slide-up animation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideUpIn {
        0% {
          transform: translate(-50%, -20%);
          opacity: 0;
        }
        100% {
          transform: translate(-50%, -50%);
          opacity: 0.3;
        }
      }
      
      @keyframes slideUpInStatic {
        0% {
          transform: translate(-50%, -20%);
          opacity: 0;
        }
        100% {
          transform: translate(-50%, -50%);
          opacity: 0.3;
        }
      }
      
      @keyframes slideUpOut {
        0% {
          transform: translate(-50%, -50%);
          opacity: 0.3;
        }
        100% {
          transform: translate(-50%, -80%);
          opacity: 0;
        }
      }
      
      .name-enter {
        animation: slideUpIn 2000ms ease-in-out 1000ms forwards;
        opacity: 0;
      }
      
      .name-exit {
        animation: slideUpOut 2000ms ease-in-out forwards;
      }
      
      .name-static {
        opacity: 0.3;
      }
      
      @keyframes imageSlideDownOut {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
        }
      }
      
      @keyframes imageSlideUpIn {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
      
      .image-exit {
        animation: imageSlideDownOut 2000ms ease-in-out forwards;
        transform-origin: bottom center;
      }
      
      .image-enter {
        animation: imageSlideUpIn 2000ms ease-in-out 1000ms forwards;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transform-origin: bottom center;
      }
      
      .image-static {
        opacity: 1;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Get the middle member from the current visible carousel items
  // Since we show 3 items at a time, the middle item is always currentIndex + 1
  const middleIndex = (currentIndex + 1) % membersToUse.length
  const currentMember = membersToUse[middleIndex]

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">
          {teamContent?.title ? (
            teamContent.title.includes('Team') ? (
              <>
                {teamContent.title.split('Team')[0]}
                <span className="text-[#003B27]">Team</span>
                {teamContent.title.split('Team')[1]}
              </>
            ) : (
              teamContent.title
            )
          ) : (
            <>
              Our <span className="text-[#003B27]">Team</span>
            </>
          )}
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full mx-auto" style={{ maxWidth: '1800px' }}>
        {/* Large Background Name with Gradient */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Previous name (exiting) */}
          {isTransitioning && previousMember && (
            <h2
              className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold text-center whitespace-nowrap name-exit"
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
                opacity: 0.3,
              }}
            >
              {previousMember.name}
            </h2>
          )}
          
          {/* Current name (entering) */}
          <h2
            className={`text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold text-center whitespace-nowrap ${isTransitioning ? 'name-enter' : 'name-static'}`}
            style={{
              background: 'linear-gradient(180deg, #017850 39.72%, #BEFFE9 80.93%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'absolute',
              left: '50%',
              top: '25%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            {currentMember.name}
          </h2>
        </div>

        {/* Featured Image - Large Center Display */}
        <div className="relative mb-16 z-10" style={{ height: '600px' }}>
          {/* Previous image (exiting) */}
          {isTransitioning && previousMember && (
            <div
              className="absolute rounded-3xl overflow-hidden w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] image-exit"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'bottom center',
                zIndex: 4,
              }}
            >
              <Image
                src={previousMember.image || "/placeholder.svg"}
                alt={previousMember.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Current image (entering) */}
          <div
            className={`absolute rounded-3xl overflow-hidden w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] ${isTransitioning ? 'image-enter' : 'image-static'}`}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'bottom center',
              zIndex: 5,
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

        {/* Team Cards Container - Shows 3 at a time - Overlay on featured image */}
        <div className="max-w-[80%] mx-auto relative z-20 -mt-32">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              duration: 60,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {membersToUse.map((member, index) => (
                <CarouselItem key={member.id} className="pl-4 basis-1/3">
                  <div
                    className={`bg-white rounded-3xl p-6  border transition-all duration-300 cursor-pointer h-full relative`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="absolute -top-2 w-20 h-20 flex-shrink-0 rounded-lg ">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-sm text-[#003B27] font-medium">{member.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Timeline Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {membersToUse.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-[#003B27] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12 relative z-20">
        <button className="px-8 py-3 bg-white text-[#003B27] border border-[#003B27] rounded-full font-semibold hover:bg-[#003B27] hover:text-white hover:border-[#003B27] hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
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
            <path d="M7 17L17 7M17 7H7M17 7V17" className="group-hover:hidden"/>
            <path d="M5 12H19M19 12L12 5M19 12L12 19" className="hidden group-hover:block"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
