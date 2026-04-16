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
    <section className="bg-gradient-to-b from-[#067bc2]/5 via-white to-white px-4 py-14 md:px-8 md:py-16" id="our-value">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Our Value"
            title="Why trips break, and what TripuLike helps you arrange"
            subtitle="See each problem and its TripuLike value side by side in a horizontal browsing flow."
          />
        </Reveal>

        <Reveal>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">Problem to value</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollRail('left')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5"
                aria-label="Scroll value slides left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5"
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
          className="-mx-4 overflow-x-auto px-4 pb-3 md:mx-0 md:px-0 tripu-scrollbar-hidden scroll-smooth"
        >
          <div className="flex min-w-max gap-5 pr-4 md:pr-0">
            {slides.map((slide, index) => (
              <article
                key={`${slide.problem.title}-${slide.value.title}`}
                className="w-[min(88vw,980px)] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-[#067bc2]/12 bg-white shadow-lg shadow-[#067bc2]/8 md:w-[960px]"
              >
                <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                  <article className="border-b border-[#067bc2]/12 bg-[#ff9100]/5 p-5 md:border-b-0 md:border-r md:border-[#067bc2]/12 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-orange-500">Problem</p>
                      <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#067bc2]/70">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-orange-500/10 bg-white shadow-sm">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={slide.problem.image} alt={slide.problem.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-2 p-4">
                        <h5 className="text-lg font-semibold text-[#055f95]">{slide.problem.title}</h5>
                        <p className="text-sm leading-relaxed text-[#067bc2]/75">{slide.problem.text}</p>
                      </div>
                    </div>
                  </article>

                  <div className="flex items-center justify-center border-b border-[#067bc2]/12 bg-white px-5 py-4 text-2xl font-semibold text-[#067bc2] md:border-b-0 md:border-r md:border-[#067bc2]/12 md:px-4">
                    <span className="md:hidden">↓</span>
                    <span className="hidden md:inline-flex">→</span>
                  </div>

                  <article className="bg-[#067bc2]/5 p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#067bc2]">TripuLike Value</p>
                      <span className="rounded-full bg-[#067bc2] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-[#067bc2]/20">
                        Solution
                      </span>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-[#067bc2]/15 bg-white shadow-sm shadow-[#067bc2]/8">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={slide.value.image} alt={slide.value.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-2 p-4">
                        <h5 className="text-lg font-semibold text-[#055f95]">{slide.value.title}</h5>
                        <p className="text-sm leading-relaxed text-[#067bc2]/80">{slide.value.text}</p>
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
