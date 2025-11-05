"use client"

import { PageSection } from '@/types/page'
import HomeFirstSection from '@/app/home/FirstSection'
import AboutUs from '@/app/home/AboutUs'
import Videos from '@/app/home/Videos'
import Features from '@/app/home/Features'
import WhyChoose from '@/app/home/WhyChoose'
import Gallery from '@/app/home/Gallery'
import Testimonials from '@/app/home/Testimonials'

interface DynamicSectionRendererProps {
  section: PageSection
}

export default function DynamicSectionRenderer({ section }: DynamicSectionRendererProps) {
  const sectionType = section.type.toLowerCase()

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
