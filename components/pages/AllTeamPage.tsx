"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

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
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('')
  
  // Team member detail modal states
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchAllTeamMembers() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/'
        let allMembers: TeamMember[] = []
        
        // Fetch the About Us page - use correct slug
        let data = null
        let response = null
        const slug = 'aboutus' // Correct slug based on API response
        
        try {
          response = await fetch(`${API_BASE_URL}pages/slug/${slug}`, {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            data = await response.json()
            console.log(`Successfully fetched with slug: ${slug}`, data)
          } else if (response.status === 429) {
            // Rate limited - wait and show user-friendly message
            throw new Error('Too many requests. Please wait a moment and refresh the page.')
          } else {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
          }
        } catch (err) {
          console.error('Error fetching team members:', err)
          if (err instanceof Error && err.message.includes('Too many requests')) {
            throw err
          }
          throw new Error('Failed to load team members. Please try again later.')
        }

        if (!response || !response.ok || !data) {
          if (response?.status === 429) {
            throw new Error('Too many requests. Please wait a moment and refresh the page.')
          }
          throw new Error(`Failed to fetch team members: ${response?.status || 'Unknown'} ${response?.statusText || 'Unknown error'}`)
        }
        
        console.log('About Us Page API Response:', data)
        
        // Extract team section from page data - handle different response structures
        let teamSection = null
        let sections = null
        
        // Handle response structure: data.sections.data (array of sections)
        if (data.sections) {
          if (Array.isArray(data.sections)) {
            sections = data.sections
          } else if (data.sections.data && Array.isArray(data.sections.data)) {
            sections = data.sections.data
          }
        } else if (data.data && data.data.sections) {
          if (Array.isArray(data.data.sections)) {
            sections = data.data.sections
          } else if (data.data.sections.data && Array.isArray(data.data.sections.data)) {
            sections = data.data.sections.data
          }
        }
        
        console.log('Extracted sections:', sections)
        
        if (sections && Array.isArray(sections)) {
          teamSection = sections.find((s: any) => {
            const sectionName = s.name?.toLowerCase() || s.type?.toLowerCase() || ''
            return sectionName === 'team'
          })
          console.log('Found team section:', teamSection)
        }
        
        // Extract members from translations[0].content.members
        if (teamSection && teamSection.translations && Array.isArray(teamSection.translations) && teamSection.translations.length > 0) {
          const translation = teamSection.translations.find((t: any) => t.locale === 'en') || teamSection.translations[0]
          const content = translation?.content || {}
          
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
          console.warn('No team section or translations found in API response')
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
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our <span className="text-emerald-400">Team</span>
            </h1>
            <p className="mt-4 text-xl text-slate-300">
              Meet the talented individuals who make it all possible
            </p>
          </div>
        </div>
      </section>

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

