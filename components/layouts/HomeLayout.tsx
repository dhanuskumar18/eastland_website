import { PageData } from '@/types/page'
import DynamicSectionRenderer from '@/components/sections/DynamicSectionRenderer'

interface HomeLayoutProps {
  pageData: PageData
}

// Define the desired order for home page sections
const HOME_SECTION_ORDER: Record<string, number> = {
  'banner': 1,
  'about': 2,
  'products': 3,
  'video': 4,
  'why_choose_us': 5,
  'gallery': 6,
  'testimonial': 7,
}

export default function HomeLayout({ pageData }: HomeLayoutProps) {
  // Sort sections according to predefined order, not API order
  const sortedSections = [...pageData.sections].sort((a, b) => {
    const orderA = HOME_SECTION_ORDER[a.type.toLowerCase()] ?? 999 // Unknown sections go to end
    const orderB = HOME_SECTION_ORDER[b.type.toLowerCase()] ?? 999
    return orderA - orderB
  })

  return (
    <main className="flex min-h-dvh flex-col">
      {sortedSections.map((section) => (
        <DynamicSectionRenderer key={section.id} section={section} />
      ))}
    </main>
  )
}

