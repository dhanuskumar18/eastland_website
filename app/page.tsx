export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Welcome to Eastland
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl">
          Next.js + TailwindCSS basic setup is ready. Edit <code>app/page.tsx</code> to start building.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1">Next.js</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">React 18</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">TailwindCSS</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">TypeScript</span>
      </div>

    
    </main>
  )
}
