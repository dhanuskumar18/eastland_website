"use client"

import Link from 'next/link'
import Image from 'next/image'

interface SeeMoreProps {
  content?: {
    title?: string
    subTitle?: string
    image?: string
    linkUrl?: string
    buttonText?: string
  }
}

export default function SeeMore({ content }: SeeMoreProps) {
  const title = content?.title || ''
  const subTitle = content?.subTitle || ''
  const image = content?.image || ''
  const linkUrl = content?.linkUrl || '#'
  const buttonText = content?.buttonText || 'See More'

  // If no content, don't render
  if (!title && !subTitle && !image && !linkUrl) {
    return null
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Image */}
          {image && (
            <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title || 'See More'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Title and Subtitle */}
          {(title || subTitle) && (
            <div className="text-center">
              {title && (
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  {title}
                </h2>
              )}
              {subTitle && (
                <p className="text-base md:text-lg text-slate-600">
                  {subTitle}
                </p>
              )}
            </div>
          )}

          {/* See More Button */}
          {linkUrl && (
            <div className="flex justify-center">
              <Link
                href={linkUrl}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:border-emerald-800 hover:shadow-lg hover:scale-105 group"
              >
                {buttonText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 rotate-0 group-hover:rotate-45"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

