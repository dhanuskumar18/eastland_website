import Image from "next/image"

export default function WhyChoose() {
  const collage = [
    "/images/Why1.png",
    "/images/Why2.png",
    "/images/Why3.png",
    "/images/Why4.png",
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Collage */}
        <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-6 items-start">
          <div className="rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
            <Image src={collage[0]} alt="Why choose image 1" width={193} height={239} className="w-full h-auto" />
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
            <Image src={collage[1]} alt="Why choose image 2" width={530} height={540} className="w-full h-auto" />
          </div>
          <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
            <Image src={collage[2]} alt="Why choose image 3" width={287} height={265} className="w-full h-auto" />
          </div>
          <div className="mt-2 rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
            <Image src={collage[3]} alt="Why choose image 4" width={193} height={239} className="w-full h-auto" />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-slate-500">Why Choose Us</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Excellence, Efficiency, &
            <br /> <span className="text-emerald-700">Innovation In Every Project</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            We specialize in designing, setting up, and installing high-performance quick service restaurants, cafés, and
            delis. Our team combines innovative layouts, efficient workflows, and future-ready installations to ensure your
            business runs smoothly from day one.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            We create efficient, visually stunning, and future-ready quick service restaurant spaces with precision and
            expertise.
          </p>

          <div className="mt-8">
            <a
              href="#why-choose"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-700 hover:text-white"
            >
              See More <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


