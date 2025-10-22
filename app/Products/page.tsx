import Image from "next/image"

export default function ProductsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top Panel with Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/aboutUs/Rectangle 52.png"
            alt="Products - Restaurant Interior Design"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-white/80 mb-2">Our Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative w-full max-w-[520px]">
              <div className="rounded-tl-[250px] rounded-bl-[22px] border-2 border-slate-200 bg-white p-3 shadow">
                <div className="relative aspect-[519/442] overflow-hidden rounded-tl-[250px] rounded-bl-[18px]">
                  <Image 
                    src="/images/aboutUs/Rectangle 52.png" 
                    alt="Modern Kitchen Interior" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Expert Kitchen Services with <span className="text-emerald-700">Equipment and Sanitization Product Support</span>
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

      {/* Products Grid Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Future-Ready Quick Service <span className="text-emerald-700">Installations</span>
            <br /> <span className="text-emerald-700">With Efficient Workflow</span>
          </h2>

          <div className="mt-14 relative">
            {/* Continuous vertical lines for each column */}
            <div className="absolute left-1/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            <div className="absolute left-3/4 top-0 hidden h-full w-px bg-slate-200 lg:block" aria-hidden />
            
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Quick Installations */}
              <div className="relative lg:mt-6">
                <h3 className="text-lg font-semibold text-slate-900">Quick Installations</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/2 (1).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Restaurant Interiors */}
              <div className="relative lg:mt-24">
                <h3 className="text-lg font-semibold text-slate-900">Restaurant Interiors</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/Rectangle 36.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Equipment Integration */}
              <div className="relative lg:mt-6">
                <h3 className="text-lg font-semibold text-slate-900">Equipment Integration</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/1.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Space Optimization */}
              <div className="relative lg:mt-24">
                <h3 className="text-lg font-semibold text-slate-900">Space Optimization</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/Rectangle 39.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Quick Installations - Second Row */}
              <div className="relative lg:mt-6">
                <h3 className="text-lg font-semibold text-slate-900">Quick Installations</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/2 (1).png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Restaurant Interiors - Second Row */}
              <div className="relative lg:mt-24">
                <h3 className="text-lg font-semibold text-slate-900">Restaurant Interiors</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/Rectangle 36.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Equipment Integration - Second Row */}
              <div className="relative lg:mt-6">
                <h3 className="text-lg font-semibold text-slate-900">Equipment Integration</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/1.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>

              {/* Space Optimization - Second Row */}
              <div className="relative lg:mt-24">
                <h3 className="text-lg font-semibold text-slate-900">Space Optimization</h3>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/Rectangle 39.png")` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                <div className="mt-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Products Section */}
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
                    alt="Elegant Dining Area" 
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
                    alt="Modern Cafe Setting" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <p className="text-sm font-semibold text-slate-500">About Our Products</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                High-Quality Products Supporting <span className="text-emerald-700">Safe, Efficient, and Modern Kitchen</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Founded with a vision to revolutionize the food service industry, we specialize in designing and installing high-performance spaces for quick service restaurants, cafés, and delis. What began as a small setup service has evolved into a full-scale solutions provider offering everything from layout planning and custom fabrication to equipment integration and end-to-end installation.
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
    </main>
  )
}