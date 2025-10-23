import Image from "next/image"

export default function Gallery() {
  const images = [
    {
      src: "/images/Mask group.png",
      alt: "Modern restaurant interior with wooden bar counter",
      gridClass: "col-span-2 row-span-5" // Top-left: horizontal
    },
    {
      src: "/images/Mask group (1).png",
      alt: "Bright cafe with white textured ceiling",
      gridClass: "col-span-4 row-span-6" // Middle-left: vertical, spans 2 rows
    },
    {
      src: "/images/Mask group (2).png",
      alt: "Sophisticated cafe with dark blue walls and teal sofas",
      gridClass: "col-span-2 row-span-7" // Center-top: very tall vertical, spans 3 rows
    },
    {
      src: "/images/Mask group (3).png",
      alt: "Multi-level restaurant with warm lighting",
      gridClass: "col-span-2 row-span-7" // Top-right: very tall vertical, spans 3 rows
    },
    {
      src: "/images/Mask group (4).png",
      alt: "Industrial-style cafe with red brick walls",
      gridClass: "col-span-2 row-span-6" // Bottom-left: horizontal
    },
    {
      src: "/images/Mask group (5).png",
      alt: "Spacious modern cafe with high ceiling",
        gridClass: "col-span-2 row-span-6" // Bottom-middle: horizontal
    },
    {
      src: "/images/Mask group (6).png",
      alt: "Chic restaurant with teal accent wall",
      gridClass: "col-span-2 row-span-5" // Bottom-right: horizontal
    }
  ]

  return (
    <section className="mx-auto max-w-[80%] px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-slate-500">Our Gallery</p>
      
      <div className="mt-2 grid items-start gap-8 md:grid-cols-2">
        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          Explore Cafes and Quick Service
          <br /> <span className="text-emerald-700">Spaces We've Built</span>
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 md:mt-1">
          Discover how we transform ordinary spaces into high-performance cafés and quick service setups, designed for efficiency, aesthetics, and smooth customer flow.
        </p>
      </div>

      {/* Bento Grid Layout - 3 columns, 4 rows */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-rows-12 gap-4 h-[600px] sm:h-[700px] lg:h-[800px]">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`${image.gridClass} rounded-xl  bg-white p-2 shadow-sm overflow-hidden`}
          >
            <div className="relative w-full h-full">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
