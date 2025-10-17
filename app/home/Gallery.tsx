import Image from "next/image"

export default function Gallery() {
  const images = [
    "/images/Mask group.png",
    "/images/Mask group (1).png", 
    "/images/Mask group (2).png",
    "/images/Mask group (3).png",
    "/images/Mask group (4).png",
    "/images/Mask group (5).png",
    "/images/Mask group (6).png",
    "/images/Mask group (1).png", // Duplicate to make 8 images for 2x4 grid
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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

      {/* Uniform 2x4 Grid Layout - 8 images with frames */}
      <div className="mt-12 grid grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
