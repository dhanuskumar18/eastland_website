"use client"

import { PageSection } from '@/types/page'
import HomeFirstSection from '@/components/pages/home/FirstSection'
import AboutUs from '@/components/pages/home/AboutUs'
import Videos from '@/components/pages/home/Videos'
import Features from '@/components/pages/home/Features'
import WhyChoose from '@/components/pages/home/WhyChoose'
import Gallery from '@/components/pages/home/Gallery'
import Testimonials from '@/components/pages/home/Testimonials'
import SeeMore from '@/components/sections/SeeMore'

interface DynamicSectionRendererProps {
  section: PageSection
}

export default function DynamicSectionRenderer({ section }: DynamicSectionRendererProps) {
  const sectionType = section.type.toLowerCase()
console.log("section 11111111111111111111111111", section.content);

  // Map section types to components with content
  switch (sectionType) {
    case 'banner':
      return <HomeFirstSection content={section.content} />
    
    case 'about':
      return <AboutUs content={section.content} />
        
    case 'why_choose_us':
      return <WhyChoose content={section.content} />
    
    case 'video':
      return <Videos content={section.content} />

      case 'products':
      return <Features content={section.content} />
    
    case 'gallery':
      return <Gallery content={section.content} />
  
    
    case 'testimonial':
      return <Testimonials content={section.content} />
    
    // See More sections - handle all variations
    case 'see_more':
    case 'products_see_more':
    case 'qsr_designs_see_more':
    case 'our_services_see_more':
    case 'portfolio_see_more':
    case 'contact_see_more':
    case 'about_see_more':
    case 'home_see_more':
    case 'videos_see_more':
    case 'testimonials_see_more':
    case 'team_see_more':
      return <SeeMore content={section.content} />
    
    default:
      // Check if section name includes "see more" as fallback
      if (sectionType.includes('see') && sectionType.includes('more')) {
        return <SeeMore content={section.content} />
      }
      // Unknown section type: don't render debug JSON in production
      return null
  }
}
