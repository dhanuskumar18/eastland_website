"use client"

import { PageSection } from '@/types/page'
import HomeFirstSection from '@/components/pages/home/FirstSection'
import AboutUs from '@/components/pages/home/AboutUs'
import Videos from '@/components/pages/home/Videos'
import Features from '@/components/pages/home/Features'
import WhyChoose from '@/components/pages/home/WhyChoose'
import Gallery from '@/components/pages/home/Gallery'
import Testimonials from '@/components/pages/home/Testimonials'

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
    
    
    
    default:
      // Unknown section type: don't render debug JSON in production
      return null
  }
}
