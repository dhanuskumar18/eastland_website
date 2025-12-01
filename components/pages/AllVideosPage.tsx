"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { fetchPageBySlug } from '@/lib/api'
import Banner from '@/components/sections/Banner'
import { Skeleton } from '@/components/ui/Skeleton'

interface Video {
  id: number
  videoUrl?: string
  youtubeLink?: string
  embedUrl?: string
  brand?: {
    name: string
  } | string
  images?: Array<{
    url: string
    position: number
  }>
  translations?: Array<{
    locale: string
    name: string
    description?: string
  }>
  categories?: Array<{
    name: string
  }>
  tags?: Array<{
    name: string
  }>
  imageUrl?: string
}

// Helper function to extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string | null {
  if (!url) return null
  
  const youtuBeMatch = url.match(/youtu\.be\/([^&\n?#]+)/)
  if (youtuBeMatch && youtuBeMatch[1]) {
    return youtuBeMatch[1]
  }
  
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&\n?#]+)/)
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1]
  }
  
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/)
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1]
  }
  
  const vParamMatch = url.match(/[?&]v=([^&\n?#]+)/)
  if (vParamMatch && vParamMatch[1]) {
    return vParamMatch[1]
  }
  
  return null
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

export default function AllVideosPage() {
  const searchParams = useSearchParams()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // Page data and banner
  const [pageData, setPageData] = useState<any>(null)
  const [bannerContent, setBannerContent] = useState<any>(null)
  
  // Filter and search states - initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
  const [selectedTag, setSelectedTag] = useState<string>(searchParams.get('tag') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '')
  
  // Video modal states
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedVideoDetails, setSelectedVideoDetails] = useState<Video | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Fetch page data for banner
  useEffect(() => {
    async function fetchPageData() {
      try {
        // Try slugs based on admin panel: videos/all, videos, all-videos
        const slugs = ['videos/all', 'videos', 'all-videos']
        let page = null
        
        for (const slug of slugs) {
          try {
            page = await fetchPageBySlug(slug)
            if (page) {
              console.log(`Found page with slug: ${slug}`)
              break
            }
          } catch (err) {
            // Continue to next slug if this one fails
            console.log(`Slug ${slug} not found, trying next...`)
            continue
          }
        }
        
        if (page) {
          setPageData(page)
          // Find banner section - check for banner in section name or type
          // Also check for see_more sections that have banner-like content (title, subTitle, image)
          const bannerSection = page.sections?.find((s: any) => {
            const type = (s.type || s.name || '').toLowerCase()
            const hasBannerName = type.includes('banner') || type === 'videos_banner' || type === 'video_banner'
            
            // Check if it's a see_more section with banner content
            const isSeeMore = type.includes('see_more') || type.includes('see more')
            const content = s.content || {}
            const hasBannerContent = content.title || content.subTitle || content.image
            
            return hasBannerName || (isSeeMore && hasBannerContent)
          })
          if (bannerSection) {
            console.log('Found banner section:', bannerSection)
            console.log('Banner content:', bannerSection.content)
            console.log('Setting bannerContent state with:', {
              title: bannerSection.content?.title,
              subTitle: bannerSection.content?.subTitle,
              image: bannerSection.content?.image
            })
            setBannerContent(bannerSection.content)
          } else {
            console.log('No banner section found. Available sections:', page.sections?.map((s: any) => ({
              type: s.type || s.name,
              hasContent: !!s.content,
              contentKeys: s.content ? Object.keys(s.content) : []
            })))
          }
        } else {
          console.log('No page found for videos. Will use default banner.')
        }
      } catch (err) {
        console.error('Error fetching page data:', err)
        // Silently fail - will use default banner
      }
    }
    
    fetchPageData()
  }, [])

  // Debug: Log when bannerContent changes
  useEffect(() => {
    if (bannerContent) {
      console.log('bannerContent state updated:', bannerContent)
    }
  }, [bannerContent])

  useEffect(() => {
    // Debounce filter changes to reduce API calls
    const timeoutId = setTimeout(() => {
      async function fetchAllVideos() {
        try {
          setLoading(true)
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
          
          // Build query parameters
          const params = new URLSearchParams()
          if (searchQuery) params.append('search', searchQuery)
          if (selectedCategory) params.append('category', selectedCategory)
          if (selectedTag) params.append('tag', selectedTag)
          if (selectedBrand) params.append('brand', selectedBrand)
          
          const queryString = params.toString()
          const url = `${API_BASE_URL}youtube-videos${queryString ? `?${queryString}` : ''}`
          
          const response = await fetch(url, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          
          // Handle different response structures
          let allVideos: Video[] = []
          if (Array.isArray(data)) {
            allVideos = data
          } else if (data.data) {
            if (Array.isArray(data.data)) {
              allVideos = data.data
            } else if (data.data.items && Array.isArray(data.data.items)) {
              allVideos = data.data.items
            }
          } else if (data.items && Array.isArray(data.items)) {
            allVideos = data.items
          } else if (Array.isArray(data.videos)) {
            allVideos = data.videos
          }
          
          setVideos(allVideos)
          setInitialLoading(false)
        } catch (err) {
          console.error('Error fetching videos:', err)
          setError(err instanceof Error ? err.message : 'Failed to load videos')
          setInitialLoading(false)
        } finally {
          setLoading(false)
        }
      }

      fetchAllVideos()
    }, searchQuery ? 500 : 300) // Longer debounce for search, shorter for filters

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory, selectedTag, selectedBrand])

  // Helper functions
  const getVideoName = (video: Video) => {
    const translation = video.translations?.find(t => t.locale === 'en') || video.translations?.[0]
    return translation?.name || `Video ${video.id}`
  }

  const getVideoDescription = (video: Video) => {
    const translation = video.translations?.find(t => t.locale === 'en') || video.translations?.[0]
    return translation?.description || "No description available"
  }

  const getVideoThumbnail = (video: Video) => {
    if (video.imageUrl) {
      return video.imageUrl
    }
    if (video.images && video.images.length > 0) {
      return video.images[0].url
    }
    // Try to get thumbnail from youtubeLink or videoUrl
    const videoUrl = video.youtubeLink || video.videoUrl || video.embedUrl
    if (videoUrl) {
      const videoId = extractYouTubeId(videoUrl)
      if (videoId) {
        return getYouTubeThumbnail(videoId)
      }
    }
    return "/images/Rectangle 36.png"
  }

  const getVideoEmbedUrl = (video: Video) => {
    // Try youtubeLink first (from API), then videoUrl, then embedUrl
    const videoUrl = video.youtubeLink || video.videoUrl || video.embedUrl
    if (videoUrl) {
      const videoId = extractYouTubeId(videoUrl)
      if (videoId) {
        return getYouTubeEmbedUrl(videoId)
      }
    }
    return null
  }

  const getVideoUrl = (video: Video) => {
    return video.youtubeLink || video.videoUrl || video.embedUrl || null
  }

  const getBrandName = (video: Video) => {
    if (typeof video.brand === 'string') {
      return video.brand
    }
    if (video.brand && typeof video.brand === 'object' && 'name' in video.brand) {
      return video.brand.name
    }
    return null
  }

  // Fetch filter options from backend - only once
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[]
    tags: string[]
    brands: string[]
  }>({ categories: [], tags: [], brands: [] })
  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false)

  useEffect(() => {
    // Only fetch filter options once
    if (filterOptionsLoaded) return

    async function fetchFilterOptions() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        
        // Fetch all videos without filters to get unique filter options
        const response = await fetch(`${API_BASE_URL}youtube-videos`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) return

        const data = await response.json()
        const allVideos: Video[] = Array.isArray(data)
          ? data
          : data.data && Array.isArray(data.data)
            ? data.data
            : data.items && Array.isArray(data.items)
              ? data.items
              : []

        // Extract unique filter options
        const categories = new Set<string>()
        const tags = new Set<string>()
        const brands = new Set<string>()

        allVideos.forEach(video => {
          video.categories?.forEach(cat => {
            if (cat.name) categories.add(cat.name)
          })
          video.tags?.forEach(tag => {
            if (tag.name) tags.add(tag.name)
          })
          const brandName = getBrandName(video)
          if (brandName) brands.add(brandName)
        })

        setFilterOptions({
          categories: Array.from(categories).sort(),
          tags: Array.from(tags).sort(),
          brands: Array.from(brands).sort(),
        })
        setFilterOptionsLoaded(true)
      } catch (err) {
        console.error('Error fetching filter options:', err)
      }
    }

    fetchFilterOptions()
  }, [filterOptionsLoaded])

  // Videos are already filtered by backend
  const filteredVideos = videos

  // Update URL when filters change (without page reload)
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)
    if (selectedBrand) params.set('brand', selectedBrand)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
    
    // Use window.history.replaceState to update URL without page reload
    window.history.replaceState({}, '', newUrl)
  }, [searchQuery, selectedCategory, selectedTag, selectedBrand])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setSelectedBrand('')
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag || selectedBrand

  useEffect(() => {
    if (!gridRef.current || filteredVideos.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true')
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-up-bounce')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const cards = gridRef.current.querySelectorAll('.video-card')
    cards.forEach((card) => {
      card.removeAttribute('data-animated')
      card.classList.add('opacity-0')
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredVideos])

  const handleVideoClick = (video: Video) => {
    setSelectedVideoDetails(video)
    setIsDetailModalOpen(true)
    // Get embed URL for auto-play
    const embedUrl = getVideoEmbedUrl(video)
    if (embedUrl) {
      setSelectedVideo(embedUrl)
    } else {
      setSelectedVideo(null)
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedVideoDetails(null)
    setSelectedVideo(null)
  }

  const handlePlayVideo = (video: Video) => {
    const embedUrl = getVideoEmbedUrl(video)
    if (embedUrl) {
      setSelectedVideo(embedUrl)
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank')
    }
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
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  // Skeleton UI for initial load
  if (initialLoading) {
    return (
      <main className="flex min-h-dvh flex-col">
        {/* Skeleton Banner */}
        <section className="relative h-[50vh] min-h-[320px] bg-slate-200 animate-pulse">
          <div className="absolute inset-0 bg-slate-300/40" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full">
              <Skeleton className="h-10 w-2/3 max-w-xl mb-4" />
              <Skeleton className="h-4 w-1/2 max-w-md" />
            </div>
          </div>
        </section>

        {/* Skeleton Grid Section */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
            {/* Skeleton filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-10 w-40 rounded-lg" />
                <Skeleton className="h-10 w-40 rounded-lg" />
                <Skeleton className="h-10 w-40 rounded-lg" />
              </div>
            </div>

            {/* Skeleton video cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
                >
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link href="/" className="mt-4 inline-block text-emerald-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Dynamic Banner Section */}
      <Banner 
        content={bannerContent}
        defaultTitle="All Videos"
        defaultSubTitle="Explore our complete collection of videos"
        defaultImage="/images/default-banner.jpg"
      />

      {/* Videos Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          {/* Search and Filters Section - Always show filters */}
          <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 items-end">
                  {/* Category Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Categories</option>
                      {filterOptions.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tag
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Tags</option>
                      {filterOptions.tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent bg-white"
                    >
                      <option value="">All Brands</option>
                      {filterOptions.brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

            {/* Content Area with Loading Overlay */}
            <div className="relative">
              {/* Loading Indicator for Filter Changes */}
              {loading && !initialLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent"></div>
                    <p className="mt-4 text-slate-600">Loading videos...</p>
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-slate-600">
                  {hasActiveFilters ? (
                    <>
                      Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                      {filterOptionsLoaded && filterOptions.categories.length > 0 && (
                        <> (filtered from available videos)</>
                      )}
                    </>
                  ) : (
                    <>
                      Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                    </>
                  )}
                </p>
              </div>

              {/* Videos Grid */}
            {filteredVideos.length === 0 ? (
              <div className="text-center py-20">
                {hasActiveFilters ? (
                  <>
                    <p className="text-slate-600 text-lg">No videos match your filters.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-block text-emerald-700 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-slate-600 text-lg">No videos available at the moment.</p>
                    <Link href="/" className="mt-4 inline-block text-emerald-700 hover:underline">
                      Back to Home
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredVideos.map((video) => {
                  const videoName = getVideoName(video)
                  const videoDescription = getVideoDescription(video)
                  const videoThumbnail = getVideoThumbnail(video)
                  const brandName = getBrandName(video)

                  return (
                    <article
                      key={video.id}
                      onClick={() => handleVideoClick(video)}
                      className="video-card relative opacity-0 group rounded-[28px] cursor-pointer text-slate-900 bg-[#F3F0E9] transition-colors duration-300 hover:bg-emerald-700 hover:text-white shadow-sm ring-1 ring-slate-100 hover:ring-emerald-700"
                    >
                      <div className="p-5">
                        {(brandName || video.categories?.length || video.tags?.length) && (
                          <div className="flex items-center gap-2 text-[11px] flex-wrap mb-4">
                            {brandName && (
                              <span className="rounded-full bg-white px-2 py-1 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                                {brandName}
                              </span>
                            )}
                            {video.categories?.slice(0, 2).map((category, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white px-2 py-1 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">
                          {videoName}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 group-hover:text-white/80 line-clamp-2">
                          {videoDescription}
                        </p>
                      </div>
                      <div className="mt-5 overflow-hidden rounded-b-2xl">
                        <div className="relative aspect-[16/12] w-full overflow-hidden rounded-b-2xl">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundImage: `url("${encodeURI(videoThumbnail)}")` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-0 w-0 rounded-2xl bg-black/30 transition-all duration-[1000ms] ease-out group-hover:h-full group-hover:w-full" />
                          </div>
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                              <span className="ml-0.5 inline-block h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-emerald-600" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
            </div>
        </div>
      </section>

      {/* Video Detail Modal */}
      {isDetailModalOpen && selectedVideoDetails && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeDetailModal}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeDetailModal}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 hover:scale-110 border border-slate-200"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
              {/* Left Side - Video Player */}
              <div className="lg:w-1/2 bg-slate-900 p-6 lg:p-8 flex items-center justify-center">
                {selectedVideo ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={`${selectedVideo}?autoplay=1`}
                      className="w-full h-full rounded-lg shadow-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-24 h-24 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-slate-400">Video not available</p>
                      {getVideoUrl(selectedVideoDetails) && (
                        <button
                          onClick={() => {
                            const videoUrl = getVideoUrl(selectedVideoDetails)
                            if (videoUrl) {
                              window.open(videoUrl, '_blank')
                            }
                          }}
                          className="mt-4 px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
                        >
                          Open Video Link
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                {/* Video Name */}
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                  {getVideoName(selectedVideoDetails)}
                </h2>

                {/* Brand */}
                {getBrandName(selectedVideoDetails) && (
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                      <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm font-semibold text-emerald-700">{getBrandName(selectedVideoDetails)}</span>
                    </div>
                  </div>
                )}

                {/* Description */}
                {getVideoDescription(selectedVideoDetails) && getVideoDescription(selectedVideoDetails) !== "No description available" && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                      Description
                    </h3>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                      {getVideoDescription(selectedVideoDetails)}
                    </p>
                  </div>
                )}

                {/* Categories */}
                {selectedVideoDetails.categories && selectedVideoDetails.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedVideoDetails.categories.map((category: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedVideoDetails.tags && selectedVideoDetails.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedVideoDetails.tags.map((tag: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-colors duration-200"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Play Button */}
                {!selectedVideo && getVideoUrl(selectedVideoDetails) && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        const embedUrl = getVideoEmbedUrl(selectedVideoDetails)
                        if (embedUrl) {
                          setSelectedVideo(embedUrl)
                        } else {
                          const videoUrl = getVideoUrl(selectedVideoDetails)
                          if (videoUrl) {
                            window.open(videoUrl, '_blank')
                          }
                        }
                      }}
                      className="w-full px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play Video
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal (for when playing video from detail modal) */}
      {selectedVideo && !isDetailModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <svg
                width="32"
                height="32"
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
              className="w-full h-full rounded-lg shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        </div>
      )}
    </main>
  )
}

