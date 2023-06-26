'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import firstImage from '@/assets/hero-image1.webp'
import secondImage from '@/assets/hero-image2.webp'
import thirdImage from '@/assets/hero-image3.webp'
import { buttonVariantStyles } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { cn } from '@/lib/utils'

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  return (
    <div
      className="h-[calc(83.333333vh-72px)] w-full overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full touch-pan-y">
        <div className="relative flex min-w-full">
          <Container>
            <div className="flex h-full w-full flex-col items-start justify-center space-y-6">
              <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
                Go sailing on Georgian Bay
              </h1>
              <p className="max-w-2xl text-lg tracking-tight text-slate-200">
                Blah blah
              </p>

              <Link href="/trip" className={cn(buttonVariantStyles.primary)}>
                Check Dates
              </Link>

              <div className="flex justify-between"></div>
            </div>
          </Container>
          <Image
            src={thirdImage.src}
            alt="third carousel image"
            className="absolute -z-10 block w-full object-fill"
            width={1440}
            height={770}
          />
        </div>
        <div className="relative flex min-w-full">
          <Image
            src={secondImage.src}
            alt="second carousel image"
            className="block w-full"
            width={1440}
            height={770}
          />
        </div>
        <div className="relative flex min-w-full">
          <Image
            src={firstImage.src}
            alt="first carousel image"
            className="block w-full"
            width={1440}
            height={770}
          />
        </div>
      </div>

      <button
        className="absolute left-6 top-1/2 z-10 m-0 inline-flex h-16 w-16 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center border-0 bg-transparent p-0 no-underline"
        onClick={scrollPrev}
      >
        <svg
          className="h-2/3 text-white opacity-40"
          viewBox="137.718 -1.001 366.563 644"
        >
          <path
            fill="currentColor"
            d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
          />
        </svg>
      </button>

      <button
        className="absolute right-6 top-1/2 z-10 m-0 inline-flex h-16 w-16 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center border-0 bg-transparent p-0 no-underline"
        onClick={scrollNext}
      >
        <svg
          className="h-2/3 text-white opacity-40"
          viewBox="0 0 238.003 238.003"
        >
          <path
            fill="currentColor"
            d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
          />
        </svg>
      </button>
    </div>
  )
}
