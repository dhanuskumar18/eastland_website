"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { fetchPageBySlug } from '@/lib/api'
import Banner from '@/components/sections/Banner'

interface TeamMember {
  id: string
  name: string
  title: string
  description: string
  image: string
}

export default function AllTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // Page data and banner
  const [pageData, setPageData] = useState<any>(null)
  const [bannerContent, setBannerContent] = useState<any>(null)
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('')
  
  // Team member detail modal states
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch page data for banner
  useEffect(() => {
    async function fetchPageData() {
      try {
        // Add a small delay to avoid rate limiting when multiple requests happen
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Try slugs based on admin panel: team/all, team, about-team
        const slugs = ['team/all', 'team', 'about-team', 'aboutteam', 'all-team']
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
            const hasBannerName = type.includes('banner') || type === 'team_banner' || type === 'about_banner'
            
            // Check if it's a see_more section with banner content
            const isSeeMore = type.includes('see_more') || type.includes('see more')
            const content = s.content || {}
            const hasBannerContent = content.title || content.subTitle || content.image
            
            return hasBannerName || (isSeeMore && hasBannerContent)
          })
          if (bannerSection) {
            console.log('Found banner section:', bannerSection)
            setBannerContent(bannerSection.content)
          } else {
            console.log('No banner section found. Available sections:', page.sections?.map((s: any) => s.type || s.name))
          }
        } else {
          console.log('No page found for team. Will use default banner.')
        }
      } catch (err) {
        console.error('Error fetching page data:', err)
        // Silently fail - will use default banner
      }
    }
    
    fetchPageData()
  }, [])

  useEffect(() => {
    async function fetchAllTeamMembers() {
      try {
        // Add a delay to avoid rate limiting when banner request is also happening
        await new Promise(resolve => setTimeout(resolve, 300))
        
        let allMembers: TeamMember[] = []
        
        // Fetch the About Us page using fetchPageBySlug which has retry logic
        const slug = 'aboutus' // Correct slug based on API response
        const pageData = await fetchPageBySlug(slug)
        
        if (!pageData) {
          throw new Error('Failed to load team members. Please try again later.')
        }
        
        console.log('About Us Page Data:', pageData)
        
        // Extract team section from page data
        // pageData.sections is already an array of PageSection objects
        const sections = pageData.sections || []
        console.log('Extracted sections:', sections)
        
        const teamSection = sections.find((s: any) => {
          const sectionName = (s.type || s.name || '').toLowerCase()
          return sectionName === 'team'
        })
        console.log('Found team section:', teamSection)
        
        // Extract members from section content
        if (teamSection && teamSection.content) {
          const content = teamSection.content
          
          if (content.members && Array.isArray(content.members)) {
            const members: TeamMember[] = content.members.map((member: any, index: number) => ({
              id: member.id || String(index + 1),
              name: member.name || `Team Member ${index + 1}`,
              title: member.profession || member.title || "Team Member",
              description: member.about || member.description || "Team member description.",
              image: member.image || "/images/aboutUs/Property 1=Default.png",
            }))
            allMembers = members
            console.log('Extracted team members:', allMembers.length)
          } else {
            console.warn('No members found in team section content')
            allMembers = []
          }
        } else {
          console.warn('No team section found in page data')
          allMembers = []
        }
        
        console.log('Processed team members:', allMembers.length)
        setTeamMembers(allMembers)
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError(err instanceof Error ? err.message : 'Failed to load team members')
      } finally {
        setLoading(false)
      }
    }

    fetchAllTeamMembers()
  }, [])

  // Filter team members based on search
  const filteredMembers = teamMembers.filter(member => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    const name = (member.name || '').toLowerCase()
    const title = (member.title || '').toLowerCase()
    const description = (member.description || '').toLowerCase()
    
    return name.includes(searchLower) || 
           title.includes(searchLower) || 
           description.includes(searchLower)
  })

  const clearFilters = () => {
    setSearchQuery('')
  }

  const hasActiveFilters = searchQuery

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!gridRef.current || filteredMembers.length === 0) return

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

    const cards = gridRef.current.querySelectorAll('.team-card')
    cards.forEach((card) => {
      card.removeAttribute('data-animated')
      card.classList.add('opacity-0')
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredMembers])

  if (loading) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-700 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading team members...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link href="/about-us" className="mt-4 inline-block text-emerald-700 hover:underline">
            Back to About Us
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
        defaultTitle="Our Team"
        defaultSubTitle="Meet the talented individuals who make it all possible"
        defaultImage="/images/default-banner.jpg"
      />

      {/* Team Members Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          {teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No team members available at the moment.</p>
              <Link href="/about-us" className="mt-4 inline-block text-emerald-700 hover:underline">
                Back to About Us
              </Link>
            </div>
          ) : (
            <>
              {/* Search Section */}
              <div className="mb-8">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search team members..."
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
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-slate-600">
                  {hasActiveFilters ? (
                    <>
                      Showing {filteredMembers.length} of {teamMembers.length} {teamMembers.length === 1 ? 'team member' : 'team members'}
                    </>
                  ) : (
                    <>
                      Showing {teamMembers.length} {teamMembers.length === 1 ? 'team member' : 'team members'}
                    </>
                  )}
                </p>
              </div>

              {/* Team Members Grid */}
              {filteredMembers.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-600 text-lg">No team members match your search.</p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-block text-emerald-700 hover:underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleMemberClick(member)}
                      className="team-card relative opacity-0 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden hover:border-emerald-500 cursor-pointer"
                    >
                      <div className="p-6">
                        {/* Member Image */}
                        <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={member.image || '/images/aboutUs/Property 1=Default.png'}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Member Info - Only Name and Role */}
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm font-medium text-emerald-700">
                            {member.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Team Member Detail Modal */}
      {isModalOpen && selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
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

            <div className="p-6 md:p-8 overflow-x-hidden">
              {/* Member Image and Info Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-emerald-100 shadow-lg">
                  <Image
                    src={selectedMember.image || '/images/aboutUs/Property 1=Default.png'}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-lg text-emerald-700 font-semibold mb-4">
                    {selectedMember.title}
                  </p>
                </div>
              </div>

              {/* Full Description */}
              {selectedMember.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                    About
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <p className="text-slate-700 leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere word-break-break-word whitespace-pre-wrap">
                      {selectedMember.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
                  Member Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-500">Name:</span>
                    <p className="text-slate-900 font-semibold mt-1">{selectedMember.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Role/Profession:</span>
                    <p className="text-slate-900 font-semibold mt-1">{selectedMember.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

