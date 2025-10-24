import Slider from '@/components/ui/slider'

export default function HomeFirstSection() {
  // Array of images for the carousel
  const carouselImages = [
    '/images/home1.png',
    '/images/home1.png',
    '/images/home1.png',
    '/images/home1.png',
  ]

  // Content for each slide
  const carouselContent = [
    {
      title: "Seamless Design",
      subtitle: "Beauty and function in perfect sync.",
      description: "Creating innovative solutions that blend aesthetic appeal with practical functionality for modern living spaces.",
      buttonText: "Explore our projects",
      buttonLink: "#projects"
    },
    {
      title: "Premium Quality",
      subtitle: "Crafting excellence in every detail.",
      description: "Our commitment to superior materials and meticulous craftsmanship ensures lasting beauty and durability.",
      buttonText: "View our portfolio",
      buttonLink: "#portfolio"
    },
    {
      title: "Innovative Solutions",
      subtitle: "Transforming spaces with creativity.",
      description: "We bring fresh perspectives and cutting-edge design concepts to create unique environments that inspire.",
      buttonText: "Discover more",
      buttonLink: "#services"
    },
    {
      title: "Expert Craftsmanship",
      subtitle: "Where vision meets precision.",
      description: "Our skilled artisans combine traditional techniques with modern innovation to deliver exceptional results.",
      buttonText: "Get in touch",
      buttonLink: "#contact"
    }
  ]

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Slider 
          images={carouselImages} 
          content={carouselContent}
          autoPlay={true} 
          autoPlayInterval={8000}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}


