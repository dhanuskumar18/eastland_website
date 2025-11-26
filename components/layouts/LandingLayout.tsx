import { PageData } from '@/types/page'
import DynamicSectionRenderer from '@/components/sections/DynamicSectionRenderer'

interface LandingLayoutProps {
  pageData: PageData
}

export default function LandingLayout({ pageData }: LandingLayoutProps) {
  // Render landing page with dynamic sections
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      {pageData.hero && (
        <section className="relative h-[60vh] min-h-[500px]">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {pageData.hero.title || pageData.title}
              </h1>
              {pageData.hero.subtitle && (
                <p className="mt-4 text-xl text-white">{pageData.hero.subtitle}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {pageData.sections.map((section) => (
        <DynamicSectionRenderer key={section.id} section={section} />
      ))}
    </main>
  )
}

