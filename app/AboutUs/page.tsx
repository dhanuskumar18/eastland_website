import Image from "next/image"

export default function AboutUsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image 
            src="/images/aboutUs/Rectangle 52.png" 
            alt="About Us - Modern Interior Design" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-white/80 mb-2">About Us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Background Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Image on the left */}
            <div className="relative w-full max-w-[520px]">
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image src="/images/aboutUs/Rectangle 52.png" alt="Company Background" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Content on the right */}
            <div>
              <p className="text-sm font-semibold text-slate-500">Company Background</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                The Story Behind Our Passion For Building <span className="text-emerald-700">Efficient</span> Food Spaces
              </h2>
              <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation.
              </p>
              <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
                With a team of experienced designers, engineers, and fabricators, we ensure every project is delivered with precision, speed, and long-term durability.
              </p>

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-2 rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-700 hover:text-white">
                  Enquiry Now <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/aboutUs/Frame 26080088.png"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mission Part */}
          <div className="mb-20 grid items-center gap-16 md:grid-cols-2">
            {/* Text on the left */}
            <div>
              <p className="mb-2 text-sm font-semibold text-white/80">Mission</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                Delivering efficient, high-quality restaurant setups with precision and speed.
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                Our mission is to deliver end-to-end design and installation solutions that turn empty spaces into fully functional, high-performance food service environments. By integrating intelligent layouts, durable materials, and precise execution, we enable brands to operate efficiently, serve customers faster, and achieve consistent quality, ensuring long-term success and a competitive edge in the industry.
              </p>
            </div>
            {/* Image on the right */}
            <div className="relative w-full max-w-[520px] justify-self-end">
              <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                <Image
                  src="/images/aboutUs/Rectangle 52.png"
                  alt="Modern Restaurant Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision Part */}
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Image on the left */}
            <div className="relative w-full max-w-[520px]">
              <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                <Image
                  src="/images/aboutUs/Rectangle 52.png"
                  alt="Elegant Dining Area"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Text on the right */}
            <div>
              <p className="mb-2 text-sm font-semibold text-white/80">Vision</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                Empowering food businesses with smarter, faster, future-ready restaurant spaces.
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                We strive to be the global benchmark for quick service restaurant and café design, creating spaces that seamlessly combine efficiency, innovation, and visual appeal. Our vision is to empower every food brand with future-ready environments that enhance operational performance, delight customers, and support sustainable growth while setting new industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
