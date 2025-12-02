import type { Metadata } from 'next'

type GlobalSEO = {
  defaultTitle?: string
  defaultDescription?: string
  defaultKeywords?: string
  googleSiteVerification?: string
  bingSiteVerification?: string
} | null

type PageSEO = {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  canonicalUrl?: string
  robots?: string
} | null

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchGlobalSEO(): Promise<GlobalSEO> {
  if (!API_URL) return null

  try {
    const res = await fetch(`${API_URL}api/seo/global`, {
      cache: 'force-cache',
    })

    if (!res.ok) return null

    const json = await res.json()
    return json?.data ?? null
  } catch {
    return null
  }
}

export async function fetchPageSEOBySlug(
  slug: string | undefined,
  cache: RequestCache = 'no-store',
): Promise<PageSEO> {
  if (!API_URL || !slug) return null

  try {
    const res = await fetch(`${API_URL}api/seo/pages/slug/${slug}`, {
      cache,
    })
    if (!res.ok) return null

    const json = await res.json()

    if (!json?.status || json?.data == null) return null

    return json.data
  } catch {
    return null
  }
}

export async function buildPageMetadata(
  slug: string | undefined,
  fallback: { title: string; description?: string },
  options?: { cache?: RequestCache },
): Promise<Metadata> {
  const cache = options?.cache ?? 'no-store'

  const [globalSEO, pageSEO] = await Promise.all([
    fetchGlobalSEO(),
    fetchPageSEOBySlug(slug, cache),
  ])

  const title =
    pageSEO?.metaTitle ?? globalSEO?.defaultTitle ?? fallback.title

  const description =
    pageSEO?.metaDescription ??
    globalSEO?.defaultDescription ??
    fallback.description ??
    ''

  const keywords =
    pageSEO?.metaKeywords ?? globalSEO?.defaultKeywords ?? undefined

  const canonical = pageSEO?.canonicalUrl

  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    robots: pageSEO?.robots ?? 'index,follow',
    other: {
      'google-site-verification': globalSEO?.googleSiteVerification || '',
      'msvalidate.01': globalSEO?.bingSiteVerification || '',
    },
  }
}


