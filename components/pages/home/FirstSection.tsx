import Slider from '@/components/ui/slider'

interface HomeFirstSectionProps {
  content?: {
    sliders?: Array<{
      image?: string
      title?: string
      subtitle?: string
      buttonText?: string
      description?: string
    }>
  }
  sectionId?: number | string
}

export default function HomeFirstSection({ content, sectionId }: HomeFirstSectionProps = {}) {
  // Default fallback data
  const defaultSliders = [
    {
      image: '/images/home1.png',
      title: "Seamless Design",
      subtitle: "Beauty and function in perfect sync.",
      description: "Creating innovative solutions that blend aesthetic appeal with practical functionality for modern living spaces.",
      buttonText: "Explore our projects",
    },
    {
      image: '/images/home2.png',
      title: "Premium Quality",
      subtitle: "Crafting excellence in every detail.",
      description: "Our commitment to superior materials and meticulous craftsmanship ensures lasting beauty and durability.",
      buttonText: "View our portfolio",
    },
    {
      image: '/images/home3.png',
      title: "Innovative Solutions",
      subtitle: "Transforming spaces with creativity.",
      description: "We bring fresh perspectives and cutting-edge design concepts to create unique environments that inspire.",
      buttonText: "Discover more",
    },
    {
      image: '/images/home1.png',
      title: "Expert Craftsmanship",
      subtitle: "Where vision meets precision.",
      description: "Our skilled artisans combine traditional techniques with modern innovation to deliver exceptional results.",
      buttonText: "Get in touch",
    }
  ]

  // Use API content if available, otherwise use defaults
  const sliders = content?.sliders && content.sliders.length > 0 
    ? content.sliders.filter(slider => slider.image) // Only include sliders with images
    : defaultSliders

  // Extract images and content arrays for the Slider component
  const carouselImages = sliders.map(slider => slider.image || '/images/home1.png')
  const carouselContent = sliders.map(slider => ({
    title: slider.title || '',
    subtitle: slider.subtitle || '',
    description: slider.description || '',
    buttonText: slider.buttonText || '',
    buttonLink: '/contact' // Default link, can be made dynamic if needed
  }))

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Slider 
          images={carouselImages} 
          content={carouselContent}
          autoPlay={true} 
          autoPlayInterval={8000}
          sectionId={sectionId}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}


