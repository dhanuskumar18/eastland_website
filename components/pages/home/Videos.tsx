'use client'
 
import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useScroll } from '@/hooks/useScroll'
import { fetchYouTubeVideoById } from '@/lib/api'
import LazyImage from '@/components/ui/LazyImage'
  
interface VideosProps {
  content?: {
    title?: string
    subTitle1?: string
    subTitle2?: string
    description?: string
    videos?: Array<{
      tags?: string
      title?: string
      video?: string
      category?: string
      brand?: string | { name?: string }
      brandName?: string
      description?: string
      youtubeVideoId?: number
    }>
  }
  sectionId?: number | string
}

// Helper function to extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string | null {
  if (!url) return null
  
  // Handle youtu.be short URLs (e.g., https://youtu.be/lvCZk3k4-34?si=...)
  const youtuBeMatch = url.match(/youtu\.be\/([^&\n?#]+)/)
  if (youtuBeMatch && youtuBeMatch[1]) {
    return youtuBeMatch[1]
  }
  
  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&\n?#]+)/)
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1]
  }
  
  // Handle youtube.com/embed/ format
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/)
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1]
  }
  
  // Handle other youtube.com URLs with v parameter
  const vParamMatch = url.match(/[?&]v=([^&\n?#]+)/)
  if (vParamMatch && vParamMatch[1]) {
    return vParamMatch[1]
  }
  
  return null
}

// Helper function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Helper function to get YouTube embed URL
function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

export default function Videos({ content, sectionId }: VideosProps = {}) {
  const { ref, isInView } = useScroll()
  const featuredTextRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videoBrands, setVideoBrands] = useState<Record<number, string>>({})

  // Fetch brand information for videos that have youtubeVideoId but no brand
  useEffect(() => {
    if (!content?.videos || content.videos.length === 0) return

    const fetchBrands = async () => {
      try {
        const brandPromises = content.videos!
          .filter(video => {
            // Only fetch if we have youtubeVideoId and no brand information
            if (!video.youtubeVideoId) return false
            
            // Check if brand already exists in the video data
            const hasBrand = (typeof video.brand === 'string' && video.brand.trim()) ||
                            (video.brand && typeof video.brand === 'object' && video.brand.name) ||
                            (video.brandName && video.brandName.trim())
            
            console.log(`Video ${video.youtubeVideoId} - hasBrand:`, hasBrand, {
              brand: video.brand,
              brandType: typeof video.brand,
              brandName: video.brandName
            })
            
            return !hasBrand
          })
          .map(async (video) => {
            if (!video.youtubeVideoId) return null
            try {
              console.log(`Fetching brand for video ID: ${video.youtubeVideoId}`)
              const videoData = await fetchYouTubeVideoById(video.youtubeVideoId)
              console.log(`Fetched video data for ID ${video.youtubeVideoId}:`, videoData)
              if (videoData?.brandName) {
                console.log(`Found brand "${videoData.brandName}" for video ${video.youtubeVideoId}`)
                return { id: video.youtubeVideoId, brand: videoData.brandName }
              } else {
                console.warn(`No brand found for video ${video.youtubeVideoId}`, videoData)
              }
            } catch (error) {
              console.error(`Error fetching brand for video ${video.youtubeVideoId}:`, error)
            }
            return null
          })

        const results = await Promise.all(brandPromises)
        const brandsMap: Record<number, string> = {}
        results.forEach(result => {
          if (result) {
            brandsMap[result.id] = result.brand
          }
        })
        
        if (Object.keys(brandsMap).length > 0) {
          setVideoBrands(brandsMap)
        }
      } catch (error) {
        console.error('Error fetching video brands:', error)
      }
    }

    fetchBrands()
  }, [content?.videos])

  // Process videos from API - useMemo to recompute when videoBrands changes
  const videos = useMemo(() => {
    if (!content?.videos || content.videos.length === 0) return []
    
    return content.videos.map(video => {
      const videoId = video.video ? extractYouTubeId(video.video) : null
      // Handle brand field - could be string, object with name property, or brandName
      let brandValue = ""
      
      // Debug: Log the raw video data
      console.log('Processing video:', {
        youtubeVideoId: video.youtubeVideoId,
        brand: video.brand,
        brandType: typeof video.brand,
        brandName: video.brandName,
      })
      
      // Extract brand - check all possible sources
      if (typeof video.brand === 'string' && video.brand.trim().length > 0) {
        brandValue = video.brand.trim()
        console.log('Using brand (string):', brandValue)
      } else if (video.brand && typeof video.brand === 'object' && video.brand.name) {
        brandValue = String(video.brand.name).trim()
        console.log('Using brand (object.name):', brandValue)
      } else if (video.brandName && String(video.brandName).trim().length > 0) {
        brandValue = String(video.brandName).trim()
        console.log('Using brandName:', brandValue)
      } else if (video.youtubeVideoId && videoBrands[video.youtubeVideoId]) {
        // Use fetched brand if available
        brandValue = String(videoBrands[video.youtubeVideoId]).trim()
        console.log('Using fetched brand:', brandValue)
      } else {
        console.log('No brand found for video:', video.youtubeVideoId, {
          brand: video.brand,
          brandName: video.brandName,
          brandType: typeof video.brand
        })
      }
      
      // Ensure brandValue is always a string (even if empty)
      const finalBrand = brandValue ? String(brandValue).trim() : ''
      
      const processedVideo = {
        id: video.youtubeVideoId || video.video,
        title: video.title || "Untitled Video",
        description: video.description || "",
        category: video.category || "",
        brand: finalBrand,
        tags: video.tags || "",
        videoUrl: video.video || "",
        videoId: videoId,
        thumbnail: videoId ? getYouTubeThumbnail(videoId) : "/images/Rectangle 36.png",
        embedUrl: videoId ? getYouTubeEmbedUrl(videoId) : null,
      }
      
      console.log('Processed video:', {
        id: processedVideo.id,
        title: processedVideo.title,
        brand: processedVideo.brand,
        brandType: typeof processedVideo.brand,
        brandLength: processedVideo.brand?.length,
        hasBrand: !!processedVideo.brand && processedVideo.brand.length > 0
      })
      
      return processedVideo
    })
  }, [content?.videos, videoBrands])

  // Fallback cards if no videos from API
  const fallbackCards: Array<{ title: string; image?: string; description?: string }> = [
    { title: "Rapid Installation", image: "/images/Rectangle 36.png", description: "Witness complete transformations as we convert" },
    { title: "Design Walkthrough", image: "/images/Rectangle 39.png", description: "Witness complete transformations as we convert" },
    { title: "Seating Arrangement", image: "/images/Rectangle 42.png", description: "Witness complete transformations as we convert" },
    { title: "Space Transformation", image: "/images/Rectangle 45.png", description: "Witness complete transformations as we convert" },
  ]

  const allDisplayItems = videos.length > 0 
    ? videos 
    : fallbackCards.map((card, idx) => ({
        id: `fallback-${idx}`,
        title: card.title,
        description: card.description || "",
        category: "",
        brand: "",
        tags: "",
        videoUrl: "",
        videoId: null,
        thumbnail: card.image || "/images/Rectangle 36.png",
        embedUrl: null,
      }))
  
  // Limit to only 4 videos for display on home page
  const displayItems = allDisplayItems.slice(0, 4)
  
  // Check if there are more than 4 videos to show "See More" button
  const hasMoreVideos = allDisplayItems.length > 4

  // Set initial styles to prevent flash
  useEffect(() => {
    gsap.set([featuredTextRef.current, titleRef.current, descriptionRef.current], {  
      opacity: 0,
      y: 50
    })
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 50
      })
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline()

      // Animate elements in sequence
      tl.to(featuredTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      if (buttonRef.current && hasMoreVideos) {
        tl.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2")
      }
    }
  }, [isInView, hasMoreVideos])

  function PlayButton() {
    return (
      <span
        className={[
          "inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white",
          "shadow-md",
        ].join(" ")}
        aria-hidden
      >
        <span
          className={[
            "ml-0.5 inline-block h-0 w-0 border-y-6 border-l-[10px] sm:border-y-8 sm:border-l-[14px] border-y-transparent",
            "border-l-emerald-600",
          ].join(" ")}
        />
      </span>
    )
  }

  const handleVideoClick = (video: typeof displayItems[0]) => {
    if (video.embedUrl) {
      setSelectedVideo(video.embedUrl)
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank')
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null)
      }
    }

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  // Build title with subTitle1 and subTitle2
  const buildTitle = () => {
    if (content?.title && content?.subTitle1 && content?.subTitle2) {
      return (
        <>
          {content.title}
          <span className="text-emerald-700"> {content.subTitle1}</span>
          <br /> {content.subTitle2}
        </>
      )
    }
    if (content?.title) {
      return content.title
    }
    return (
      <>
        Watch How We Transform <span className="text-emerald-700">Empty Spaces</span>
        <br /> Into Full-Scale Restaurants
      </>
    )
  }

  return (
    <>
      <section ref={ref} className="mx-auto max-w-[90%] sm:max-w-[80%] px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
        <p ref={featuredTextRef} className="text-xs sm:text-sm font-semibold text-slate-500">
          {content?.subTitle1 || "Featured Videos"}
        </p>

        <div className="mt-2 grid items-start gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
          <h2 ref={titleRef} className="text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            {buildTitle()}
          </h2>
          <p ref={descriptionRef} className="text-xs sm:text-sm leading-relaxed text-slate-600 md:mt-1">
            {content?.description || "Witness complete transformations as we convert blank layouts into fully functional, customer-ready restaurants with precision planning, rapid execution, and flawless finishing."}
          </p>
        </div>

        <div ref={cardsRef} className="mt-8 sm:mt-10 md:mt-12 grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((item) => {
            // Build badges array from brand, category, and tags
            const badges: string[] = []
            
            // Add brand first (highest priority)
            // Check brand more explicitly - handle string, number, or any truthy value
            if (item.brand !== undefined && item.brand !== null && item.brand !== '') {
              const brandStr = String(item.brand).trim()
              if (brandStr.length > 0 && !badges.includes(brandStr)) {
                badges.push(brandStr)
                console.log('Brand added to badges:', brandStr)
              }
            } else {
              console.log('Brand not found in item:', { brand: item.brand, itemId: item.id })
            }
            
            // Add category if available and not already in badges
            if (item.category && item.category.trim()) {
              const categoryTrimmed = item.category.trim()
              if (!badges.includes(categoryTrimmed)) {
                badges.push(categoryTrimmed)
              }
            }
            
            // Parse tags if it's a string and add them
            if (typeof item.tags === 'string' && item.tags.trim()) {
              const parsedTags = item.tags.split(',').map(t => t.trim()).filter(Boolean)
              parsedTags.forEach(tag => {
                if (tag && !badges.includes(tag)) {
                  badges.push(tag)
                }
              })
            }
            
            // Debug logging in development
            console.log('Video item for display:', {
              id: item.id,
              title: item.title,
              brand: item.brand,
              brandLength: item.brand?.length,
              brandTrimmed: item.brand?.trim(),
              category: item.category,
              tags: item.tags,
              badges: badges,
              badgesCount: badges.length
            })
            
            // Fallback badges if nothing available
            if (badges.length === 0) {
              badges.push('Cafe', 'Restaurant')
            }

            return (
              <article
                key={item.id}
                onClick={() => handleVideoClick(item)}
                className={[
                  "group relative rounded-2xl sm:rounded-[28px] cursor-pointer text-slate-900",
                  "bg-[#F3F0E9] transition-colors duration-300 hover:bg-emerald-700 hover:text-white",
                  "shadow-sm ring-1 ring-slate-100 hover:ring-emerald-700",
                ].join(" ")}
              >
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] flex-wrap">
                    {badges.slice(0, 3).map((badge, idx) => (
                      <span 
                        key={idx}
                        className="rounded-full bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 transition-colors duration-300 group-hover:text-white/80">
                    {item.description || "Witness complete transformations as we convert"}
                  </p>
                </div>
                <div className="mt-5 overflow-hidden rounded-b-2xl">
                  <div className="relative aspect-[16/12] w-full overflow-hidden rounded-b-2xl">
                    <LazyImage
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      imageType="gallery"
                      sectionId={sectionId}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0 w-0 rounded-xl sm:rounded-2xl bg-black/30 transition-all duration-[1000ms] ease-out group-hover:h-full group-hover:w-full" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <PlayButton />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* See More Button - Only show if there are more than 4 videos */}
        {hasMoreVideos ? (
          <div ref={buttonRef} className="mt-8 sm:mt-10 md:mt-12 text-center">
            <Link
              href="/videos/all"
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
        ) : (
          <div ref={buttonRef} className="mt-8 sm:mt-10 md:mt-12"></div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-emerald-400 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                className="sm:w-8 sm:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <iframe
              src={`${selectedVideo}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        </div>
      )}
    </>
  )
}


