import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Image collage */}
        <div className="relative w-full max-w-[520px]">
          {/* Outer framed image with rounded corners and fixed aspect */}
          <div className="rounded-[22px] border-2 border-slate-200 bg-white p-3 shadow">
            <div className="relative aspect-[519/442] overflow-hidden rounded-[18px]">
              <Image src="/images/1.png" alt="About primary" fill className="object-cover" />
            </div>
          </div>

          {/* Smaller overlapping image (has its own white border in asset) */}
          <div className="absolute -bottom-8 right-8 w-[300px] rounded-2xl shadow-2xl">
            <div className="relative aspect-[365/252] overflow-hidden rounded-2xl">
              <Image src="/images/2.png" alt="About secondary" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-slate-500">About Us</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Shaping the Future of <span className="text-emerald-700">Quick Service</span>
            <br className="hidden sm:block" /> <span className="text-emerald-700">Restaurant Design</span>
          </h2>
          <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-slate-700">
            We redefine modern quick service restaurant design with optimized layouts, advanced equipment integration, and
            future-ready planning—ensuring faster operations, smoother workflows, and unforgettable customer experiences from
            day one.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="flex items-start gap-3">
              <Image src="/images/fi_18280468.png" alt="Experience icon" width={32} height={32} />
              <div>
                <div className="text-base font-semibold text-slate-900">20 Years Of Experience</div>
                <p className="mt-1 text-sm text-slate-600">We have been partnered with top property developers in Nilgiris</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/images/Vector.png" alt="Projects icon" width={32} height={32} />
              <div>
                <div className="text-base font-semibold text-slate-900">100+ Projects</div>
                <p className="mt-1 text-sm text-slate-600">We have been partnered with top property developers in Nilgiris</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a href="#enquiry" className="inline-flex items-center gap-2 rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-700 hover:text-white">
              Enquiry Now <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


