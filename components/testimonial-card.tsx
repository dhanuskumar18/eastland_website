import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  image: string
  quote: string
  name: string
  title: string
  rating?: number
}

export function TestimonialCard({ image, quote, name, title, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative quote marks background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 text-6xl font-serif text-gray-400">
        <div className="absolute top-0 left-0">"</div>
        <div className="absolute bottom-0 right-0">"</div>
      </div>

      {/* Main card container */}
      <div className="relative flex gap-8 items-start bg-white rounded-3xl  border border-gray-200 shadow-sm">
        {/* Left side - Profile image */}
        <div className="flex-shrink-0">
          <div className="relative w-[300px] h-[280px] overflow-hidden rounded-2xl"  style={{ clipPath: 'polygon(0% 0%, 85% 0%, 75% 100%, 0% 100%)' }}>
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
          </div>
        </div>

        {/* Right side - Testimonial content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Quote mark icon */}
          <div className="text-gray-300 text-5xl mb-4">"</div>

          {/* Quote text */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{quote}</p>

          {/* Rating stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Author info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>

        {/* Right quote mark */}
        <div className="absolute bottom-8 right-8 text-gray-300 text-5xl">"</div>
      </div>
    </div>
  )
}
