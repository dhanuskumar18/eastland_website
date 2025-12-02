import Image from "next/image"
import LazyImage from "@/components/ui/LazyImage"

interface GalleryProps {
  content?: {
    title?: string
    description?: string
    descSubTitle?: string
    images?: Array<{
      image?: string
      title?: string
    }>
  }
  sectionId?: number | string
}

export default function Gallery({ content, sectionId }: GalleryProps = {}) {
  // Static fallback images
  const defaultImages = [
    {
      src: "/images/Mask group.png",
      alt: "Modern restaurant interior with wooden bar counter",
      gridClass: "row-span-2" // div1: spans 2 rows
    },
    {
      src: "/images/Mask group (1).png",
      alt: "Bright cafe with white textured ceiling",
      gridClass: "row-span-4 col-start-1 row-start-3" // div2: 4 rows starting at column 1, row 3
    },
    {
      src: "/images/Mask group (2).png",
      alt: "Sophisticated cafe with dark blue walls and teal sofas",
      gridClass: "col-span-3 row-span-3 col-start-2 row-start-1" // div3: 3 columns, 3 rows starting at column 2, row 1
    },
    {
      src: "/images/Mask group (3).png",
      alt: "Multi-level restaurant with warm lighting",
      gridClass: "row-span-3 col-start-2 row-start-4" // div4: 3 rows starting at column 2, row 4
    },
    {
      src: "/images/Mask group (4).png",
      alt: "Industrial-style cafe with red brick walls",
      gridClass: "col-span-2 row-span-3 col-start-3 row-start-4" // div5: 2 columns, 3 rows starting at column 3, row 4
    },
    {
      src: "/images/Mask group (5).png",
      alt: "Spacious modern cafe with high ceiling",
      gridClass: "row-span-4 col-start-5 row-start-1" // div6: 4 rows starting at column 5, row 1
    },
    {
      src: "/images/Mask group (6).png",
      alt: "Chic restaurant with teal accent wall",
      gridClass: "row-span-2 col-start-5 row-start-5" // div7: 2 rows starting at column 5, row 5
    }
  ]

  // Use API images if available, otherwise use default images
  const images = content?.images && content.images.length > 0 && content.images.some(img => img.image)
    ? content.images.map((img, idx) => ({
        src: img.image || defaultImages[idx % defaultImages.length]?.src || "/images/Mask group.png",
        alt: img.title || defaultImages[idx % defaultImages.length]?.alt || "Gallery image",
        gridClass: defaultImages[idx % defaultImages.length]?.gridClass || "row-span-2"
      }))
    : defaultImages

  return (
    <section className="mx-auto max-w-[80%] px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-slate-500">{content?.title || "Our Gallery"}</p>
      
      <div className="mt-2 grid items-start gap-8 md:grid-cols-2">
        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          {content?.descSubTitle || (
            <>
              Explore Cafes and Quick Service
              <br /> <span className="text-emerald-700">Spaces We've Built</span>
            </>
          )}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 md:mt-1">
          {content?.description || "Discover how we transform ordinary spaces into high-performance cafés and quick service setups, designed for efficiency, aesthetics, and smooth customer flow."}
        </p>
      </div>

      {/* Bento Grid Layout - 5 columns, 6 rows */}
      <div className="mt-12 grid grid-cols-5 grid-rows-6 gap-4 h-[520px]">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`${image.gridClass} rounded-xl overflow-hidden group cursor-pointer`}
          >
            <div className="relative w-full h-full">
              <LazyImage 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                imageType="gallery"
                sectionId={sectionId}
              />
              
              {/* Hover overlay with slide-up effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-full group-hover:translate-y-0">
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="text-lg font-semibold text-white">View Project</h3>
                  <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 group">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
