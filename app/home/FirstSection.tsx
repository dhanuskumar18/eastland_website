export default function HomeFirstSection() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/images/home1.png')] bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10  flex max-w-full flex-row justify-around items-end  px-4 py-24 sm:px-6 lg:px-16 min-h-screen">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Seamless Design
          </h1>
          <p className="mt-6 text-2xl font-light text-white/90 sm:text-3xl">
            Beauty and function in perfect sync.
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="text-lg text-white/80 leading-relaxed sm:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          </p>
          <div className="mt-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 hover:border-white/50"
            >
              Explore our projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-36 z-10 flex gap-4 text-white">
        <svg className="h-24 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <svg className="h-24 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Bottom navigation dots */}
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3">
          <span className="h-3 w-3 rounded-full border border-white/50 bg-white/20 backdrop-blur" />
          <span className="h-3 w-3 rounded-full border border-white/30 bg-white/10 backdrop-blur" />
        </div>
      </div> */}
    </section>
  )
}


