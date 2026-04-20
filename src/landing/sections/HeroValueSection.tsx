import { useRef } from 'react'
import type { WheelEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const problems = [
  {
    title: 'Not sure what to arrange first',
    text: 'Travelers often miss key services before departure and scramble on arrival.',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'No clear planning structure',
    text: 'Activities, transport, and timing are hard to organize into one smooth plan.',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Unclear pricing before arrival',
    text: 'Without early offers, costs stay vague and the budget becomes hard to control.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Low trust in providers',
    text: 'Choosing guides, drivers, or operators is stressful when reliability is unclear.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80',
  },
]

const valueItems = [
  {
    title: 'Request a tour guide',
    text: 'Connect with local guides for sightseeing, culture, and route support.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Request activities',
    text: 'Arrange snorkeling, island trips, water adventures, and day experiences.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Arrange transport easily',
    text: 'Book airport transfer and daily driver service based on your plan.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Get a full trip roadmap',
    text: 'Estimate costs, compare offers, and confirm services before you arrive.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
  },
]

type PairedSlide = {
  problem: (typeof problems)[number]
  value: (typeof valueItems)[number]
}

export function HeroValueSection() {
  const railRef = useRef<HTMLDivElement | null>(null)

  const slides: PairedSlide[] = [
    { problem: problems[0], value: valueItems[3] },
    { problem: problems[1], value: valueItems[0] },
    { problem: problems[2], value: valueItems[1] },
    { problem: problems[3], value: valueItems[2] },
  ]

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    const distance = Math.max(rail.clientWidth * 0.72, 280)
    rail.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' })
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current

    if (!rail || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return
    }

    rail.scrollLeft += event.deltaY
    event.preventDefault()
  }

  return (
    <section className="bg-gradient-to-b from-[#067bc2]/5 via-white to-white px-4 py-12 sm:py-14 md:px-8 md:py-16" id="our-value">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Our Value"
            title="Why trips break, and what TripuLike helps you arrange"
            subtitle="See each problem and its TripuLike value side by side in a horizontal browsing flow."
          />
        </Reveal>

        <Reveal>
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 md:mb-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-orange-500 sm:text-sm">Problem to value</p>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => scrollRail('left')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10"
                aria-label="Scroll value slides left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10"
                aria-label="Scroll value slides right"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={railRef}
          onWheel={handleWheel}
          className="-mx-4 overflow-x-auto px-4 pb-2 sm:pb-3 md:mx-0 md:px-0 tripu-scrollbar-hidden scroll-smooth"
        >
          <div className="flex min-w-max gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-0">
            {slides.map((slide, index) => (
              <article
                key={`${slide.problem.title}-${slide.value.title}`}
                className="w-[min(90vw,920px)] shrink-0 snap-start overflow-hidden rounded-[1.3rem] border border-[#067bc2]/12 bg-white shadow-lg shadow-[#067bc2]/8 sm:rounded-[1.6rem] md:w-[960px] md:rounded-[2rem]"
              >
                <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                  <article className="border-b border-[#067bc2]/12 bg-[#ff9100]/5 p-3 sm:p-4 md:border-b-0 md:border-r md:border-[#067bc2]/12 md:p-6">
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-orange-500 sm:text-[0.65rem]">Problem</p>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#067bc2]/70 sm:px-3 sm:py-1 sm:text-[0.65rem]">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg border border-orange-500/10 bg-white shadow-sm sm:mt-4 sm:rounded-2xl">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={slide.problem.image} alt={slide.problem.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-1.5 p-3 sm:space-y-2 sm:p-4">
                        <h5 className="text-base font-semibold text-[#055f95] sm:text-lg">{slide.problem.title}</h5>
                        <p className="text-xs leading-relaxed text-[#067bc2]/75 sm:text-sm">{slide.problem.text}</p>
                      </div>
                    </div>
                  </article>

                  <div className="flex items-center justify-center border-b border-[#067bc2]/12 bg-white px-3 py-3 text-lg font-semibold text-[#067bc2] sm:px-4 sm:py-4 sm:text-2xl md:border-b-0 md:border-r md:border-[#067bc2]/12 md:px-4">
                    <span className="md:hidden">↓</span>
                    <span className="hidden md:inline-flex">→</span>
                  </div>

                  <article className="bg-[#067bc2]/5 p-3 sm:p-4 md:p-6">
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#067bc2] sm:text-[0.65rem]">TripuLike Value</p>
                      <span className="rounded-full bg-[#067bc2] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-[#067bc2]/20 sm:px-3 sm:py-1 sm:text-[0.65rem]">
                        Solution
                      </span>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg border border-[#067bc2]/15 bg-white shadow-sm shadow-[#067bc2]/8 sm:mt-4 sm:rounded-2xl">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={slide.value.image} alt={slide.value.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-1.5 p-3 sm:space-y-2 sm:p-4">
                        <h5 className="text-base font-semibold text-[#055f95] sm:text-lg">{slide.value.title}</h5>
                        <p className="text-xs leading-relaxed text-[#067bc2]/80 sm:text-sm">{slide.value.text}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
