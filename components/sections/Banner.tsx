"use client"

import Image from 'next/image'

interface BannerProps {
  content?: {
    title?: string
    subTitle?: string
    image?: string
  }
  defaultTitle?: string
  defaultSubTitle?: string
  defaultImage?: string
}

export default function Banner({ 
  content, 
  defaultTitle = "Page Title",
  defaultSubTitle = "Page Subtitle",
  defaultImage = "/images/default-banner.jpg"
}: BannerProps) {
  const title = content?.title || defaultTitle
  const subTitle = content?.subTitle || defaultSubTitle
  const image = content?.image || defaultImage

  return (
    <section className="relative h-[60vh] min-h-[500px]">
      <div className="absolute inset-0">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            {title}
          </h1>
          {subTitle && subTitle !== ".." && (
            <p className="mt-4 text-xl text-white">{subTitle}</p>
          )}
        </div>
      </div>
    </section>
  )
}

