import Image from "next/image"

export default function WhyChoose() {
  const collage = [
    "/images/Why1.png",
    "/images/Why2.png",
    "/images/Why3.png",
    "/images/Why4.png",
  ]

  return (
    <section className="mx-auto max-w-[80%] px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Collage */}
        <div className="mx-auto grid w-full max-w-xl  grid-cols-2  items-start">
          <div className="rounded-[12px] border border-slate-400 p-2 shadow-sm relative w-3/4 h-5/6 bg-transparent " >
            <Image src={collage[0]} alt="Why choose image 1" width={220} height={200} className=" absolute -right-4 -z-10" />
          </div>
          <div className="">
            <Image src={collage[1]} alt="Why choose image 2" width={530} height={540} className="w-full h-auto relative right-8 " />
          </div>
          <div className="mt-6">
            <Image src={collage[2]} alt="Why choose image 3" width={287} height={265} className="w-full h-auto" />
          </div>
          <div className="mt-6 ml-10 rounded-[12px] border border-slate-400 p-2 shadow-sm relative w-[200px] h-5/6 bg-transparent "  >
            <Image src={collage[3]} alt="Why choose image 1" width={200} height={200} className=" absolute -left-3 -top-4" />
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
              className="inline-flex items-center gap-3 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
            >
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
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


