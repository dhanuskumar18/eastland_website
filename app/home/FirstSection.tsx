export default function HomeFirstSection() {
  return (
    <section className="relative isolate min-h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/images/home1.png')] bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">Smart Setup</h1>
          <p className="mt-4 text-xl text-white/85">Efficiency starts at the layout.</p>
        </div>

        <div className="max-w-2xl rounded-xl bg-white/5 p-6 text-white/90 ring-1 ring-white/10 backdrop-blur">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever
          </p>
          <div className="mt-6 inline-flex items-center gap-3">
            <a href="#projects" className="rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white">Explore our projects</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl justify-between px-4 sm:px-6 lg:px-8">
        <span className="h-10 w-10 -translate-x-2 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur" />
        <span className="h-10 w-10 translate-x-2 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur" />
      </div>
    </section>
  )
}


