export default function Videos() {
  const cards: Array<{ title: string; image?: string }> = [
    { title: "Rapid Installation", image: "/images/Rectangle 36.png" },
    // Rectangle 38.png not found in repo; using 39 as provided asset
    { title: "Design Walkthrough", image: "/images/Rectangle 39.png" },
    { title: "Seating Arrangement", image: "/images/Rectangle 42.png" },
    { title: "Space Transformation", image: "/images/Rectangle 45.png" },
  ]

  function PlayButton() {
    return (
      <span
        className={[
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white",
          "shadow-md",
        ].join(" ")}
        aria-hidden
      >
        <span
          className={[
            "ml-0.5 inline-block h-0 w-0 border-y-8 border-l-[14px] border-y-transparent",
            "border-l-emerald-600",
          ].join(" ")}
        />
      </span>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-slate-500">Featured Videos</p>

      <div className="mt-2 grid items-start gap-8 md:grid-cols-2">
        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          Watch How We Transform <span className="text-emerald-700">Empty Spaces</span>
          <br /> Into Full-Scale Restaurants
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 md:mt-1">
          Witness complete transformations as we convert blank layouts into fully functional, customer-ready restaurants with
          precision planning, rapid execution, and flawless finishing.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, image }) => (
          <article
            key={title}
            className={[
              "group relative rounded-[28px]  text-slate-900",
              "bg-[#F3F0E9] transition-colors duration-300 hover:bg-emerald-700 hover:text-white",
              "shadow-sm ring-1 ring-slate-100 hover:ring-emerald-700",
            ].join(" ")}
          >
            <div className="p-5">
            <div className="flex items-center gap-2 text-[11px] ">
              <span className="rounded-full bg-white px-2 py-1 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">Cafe</span>
              <span className="rounded-full bg-white px-2 py-1 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">Restaurent</span>
              </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 group-hover:text-white/80">Witness complete transformations as we convert</p>
            </div>
            <div className="mt-5 overflow-hidden rounded-b-2xl">
              <div className="relative aspect-[16/12] w-full overflow-hidden rounded-b-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${encodeURI(image ?? "/images/home1.png")}")` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0 w-0 rounded-2xl bg-black/30 transition-all duration-[1000ms] ease-out group-hover:h-full group-hover:w-full" />
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <PlayButton />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="#more-videos"
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
    </section>
  )
}


