export default function Features() {
  const items: Array<{ title: string; image: string; description: string }> = [
    {
      title: "Cafe Design",
      image: "/images/2 (1).png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Kitchen Setup",
      image: "/images/Rectangle 36.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Workflow Solutions",
      image: "/images/1.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
    {
      title: "Deli Counters",
      image: "/images/Rectangle 39.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    },
  ]

  return (
    <section className="mx-auto max-w-[80%] px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
        Future-Ready Quick Service <span className="text-emerald-700">Installations</span>
        <br /> <span className="text-emerald-700">With Efficient Workflow</span>
      </h2>

      <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, image, description }, idx) => (
          <div key={title} className={["relative", idx % 2 === 0 ? "lg:mt-6" : "lg:mt-32"].join(" ") }>
            <div className="absolute -left-6 top-0 hidden h-full w-px bg-slate-400 opacity-50                                                            lg:block" aria-hidden />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${encodeURI(image)}")` }}
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">{description}</p>
            <div className="mt-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-110 group cursor-pointer">
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
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


