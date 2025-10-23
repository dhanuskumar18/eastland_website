import Image from "next/image"

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 md:grid-cols-2">
        {/* Left Section - Introduction */}
        <div>
          <p className="text-sm font-semibold text-slate-500">Client Testimonial</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            What Our Valued Clients Say About Us
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Discover what our valued clients have to say about their experience with us. Each testimonial reflects our dedication to quality, trust, and long-lasting.
          </p>
          <button className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group">
            See More
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 rotate-45 group-hover:rotate-0"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
        </div>

        {/* Right Section - Testimonial Card */}
        <div className="relative">
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            {/* Decorative quotation marks */}
            <div className="absolute left-4 top-4 text-6xl font-bold text-slate-200">"</div>
            <div className="absolute bottom-4 right-4 text-6xl font-bold text-slate-200">"</div>
            
            <div className="flex gap-6">
              {/* Client Image - Left side with slanting border effect */}
              <div className="flex-shrink-0">
                <div className="relative h-24 w-24">
                  {/* Slanting border effect - light brown on top/left, black on bottom/right */}
                  <div className="absolute inset-0 rounded-lg border-2 border-amber-200" style={{
                    borderTopColor: '#fbbf24',
                    borderLeftColor: '#fbbf24',
                    borderBottomColor: '#000000',
                    borderRightColor: '#000000',
                    transform: 'rotate(-2deg)'
                  }}></div>
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                    <Image 
                      src="/images/Mask group.png" 
                      alt="Thomas Raj"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Testimonial Content - Right side */}
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-slate-700">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsun has been the industry's standard dummy text ever since the 1500s, when an unknown.
                </p>
                
                {/* Rating Stars */}
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Client Name and Title */}
                <div className="mt-3">
                  <h4 className="text-sm font-bold text-slate-900">Thomas Raj</h4>
                  <p className="text-xs text-slate-500">Cafe Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
