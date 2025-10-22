import Image from "next/image"

export default function QSRDesignsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/aboutUs/Rectangle 52.png"
            alt="QSR Designs"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              QSR Designs
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Quick Service Restaurant Design Solutions
            </p>
          </div>
        </div>
      </section>

      {/* QSR Designs Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Overlapping Images */}
            <div className="relative w-full max-w-[520px]">
              {/* Main Image */}
              <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
                  <Image 
                    src="/images/aboutUs/Rectangle 52.png" 
                    alt="Modern Cafe Interior" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 right-8 w-[300px] rounded-2xl shadow-2xl">
                <div className="relative aspect-[365/252] overflow-hidden rounded-2xl">
                  <Image 
                    src="/images/aboutUs/Frame 26080088.png" 
                    alt="Refined Dining Space" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">QSR Designs</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Innovative Fast-Food Spaces Crafted for <span className="text-emerald-700">Modern Experiences</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Expert Kitchen Services with Essential Equipment and Sanitization Product Support
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                We provide end-to-end commercial kitchen solutions, including design, installation, maintenance, and deep cleaning services. Alongside our expertise, we offer essential kitchen equipment, smallwares, and professional sanitization products to ensure safety, efficiency, and compliance across all food service operations. Our support is tailored to hotels, restaurants, cafeterias, bakeries, and industrial facilities.
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

      {/* Gallery Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Future-Ready Quick Service Installations With Efficient Workflow
            </h2>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            {/* First Row - First 2 columns: 1 large image */}
            <div className="col-span-2 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Rectangle 52.png" 
                  alt="Deli and Cafe Design" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <h3 className="font-semibold text-slate-900">Deli and Cafe Design</h3>
                </div>
              </div>
            </div>

            {/* First Row - Next 2 columns: 2 separate images */}
            <div className="col-span-1 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Frame 26080088.png" 
                  alt="Coffee Bar Counter" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Rectangle 52.png" 
                  alt="Restaurant Interior" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

            {/* Second Row - First 2 columns: 2 separate images */}
            <div className="col-span-1 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Frame 26080088.png" 
                  alt="Modern Dining Space" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Rectangle 52.png" 
                  alt="Ambient Restaurant" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

            {/* Second Row - Next 2 columns: 1 large image */}
            <div className="col-span-2 row-span-1">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/aboutUs/Frame 26080088.png" 
                  alt="Setup and Installation" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <h3 className="font-semibold text-slate-900">Setup and Installation</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About QSR Designs Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Image with custom border radius */}
            <div className="relative w-full max-w-[596px]">
              <div 
                className="relative shadow-lg"
                style={{
                  width: '520px',
                  height: '442px',
                  border: '1px solid black',
                  borderTopLeftRadius: '168px',
                  borderBottomRightRadius: '168px',
                  borderTopRightRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  padding: '20px'
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[148px] rounded-br-[148px] rounded-tr-none rounded-bl-none">
                  <Image 
                    src="/images/aboutUs/Rectangle 52.png" 
                    alt="Modern Restaurant Interior" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">About QSR Designs</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Transforming Quick-Service Restaurants with <span className="text-emerald-700">Creative Design Solutions</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                QSR Designs specializes in designing and installing high-performance spaces for quick-service restaurants, cafés, and delis. We offer full-scale solutions from layout planning to end-to-end installation, ensuring your space is optimized for efficiency, customer experience, and operational success.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Our team combines creative vision with practical expertise to deliver spaces that not only look stunning but also function seamlessly for your business needs. From concept to completion, we handle every aspect of your project with precision and care.
              </p>

              <div className="mt-10">
                <a href="#enquiry" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800">
                  Enquiry Now <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
