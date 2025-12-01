import { PageData } from '@/types/page'
import DynamicSectionRenderer from '@/components/sections/DynamicSectionRenderer'

interface DefaultLayoutProps {
  pageData: PageData
}

export default function DefaultLayout({ pageData }: DefaultLayoutProps) {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      {pageData.hero && (
        <section className="relative h-[60vh] min-h-[500px]">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {pageData.title}
              </h1>
              {pageData.description && (
                <p className="mt-4 text-xl text-white">{pageData.description}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      <div className="py-20">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          {pageData.sections.map((section) => (
            <DynamicSectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </div>
    </main>
  )
}

