import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { InteractiveDemo } from '../demo/InteractiveDemo'
import { plannerCatalog, serviceTypeOptions } from '../data/demoData'

const previewCards = [
  {
    title: 'Tour Guide',
    text: serviceTypeOptions[0].detail,
    icon: serviceTypeOptions[0].icon,
    label: 'Service preview',
    image: plannerCatalog[0].image,
  },
  {
    title: 'Activity Operator',
    text: serviceTypeOptions[1].detail,
    icon: serviceTypeOptions[1].icon,
    label: 'Service preview',
    image: plannerCatalog[3].image,
  },
  {
    title: 'Translator',
    text: serviceTypeOptions[3].detail,
    icon: serviceTypeOptions[3].icon,
    label: 'Service preview',
    image: plannerCatalog[10].image,
  },
  {
    title: 'Driver / Airport Transfer',
    text: serviceTypeOptions[2].detail,
    icon: serviceTypeOptions[2].icon,
    label: 'Service preview',
    image: plannerCatalog[8].image,
  },
  {
    title: plannerCatalog[1].name,
    text: plannerCatalog[1].description,
    icon: '✨',
    label: plannerCatalog[1].location,
    image: plannerCatalog[1].image,
  },
  {
    title: plannerCatalog[4].name,
    text: plannerCatalog[4].description,
    icon: '🌊',
    label: plannerCatalog[4].location,
    image: plannerCatalog[4].image,
  },
  {
    title: plannerCatalog[6].name,
    text: plannerCatalog[6].description,
    icon: '🧭',
    label: plannerCatalog[6].location,
    image: plannerCatalog[6].image,
  },
  {
    title: plannerCatalog[9].name,
    text: plannerCatalog[9].description,
    icon: '🚐',
    label: plannerCatalog[9].location,
    image: plannerCatalog[9].image,
  },
]

export function DemoSection() {
  const railRef = useRef<HTMLDivElement | null>(null)

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current
    if (!rail) {
      return
    }

    const distance = Math.max(rail.clientWidth * 0.68, 280)
    rail.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:py-14 md:px-8 md:py-16" id="demo">
      <div className="tripu-dots pointer-events-none absolute -right-8 top-4 h-24 w-24 opacity-30 sm:-right-10 sm:top-6 sm:h-28 sm:w-28 md:opacity-35" />
      <span className="pointer-events-none absolute left-2 top-8 text-base text-[#067bc2]/20 animate-[tripuDrift_9s_ease-in-out_infinite] sm:left-3 sm:text-lg">✈️</span>
      <span className="pointer-events-none absolute right-6 -bottom-2 text-base text-orange-500/25 animate-[tripuDrift_8.2s_ease-in-out_infinite] sm:bottom-10 sm:text-lg">⌁</span>

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Interactive Demo"
            title="Plan your trip, request the services you need, and receive offers from local providers."
            subtitle="This simulation mirrors the full TripuLike request-and-offer flow from planning to confirmation."
          />
        </Reveal>
        <Reveal>
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 md:mb-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-orange-500 sm:text-sm">Browse services</p>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => scrollRail('left')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10"
                aria-label="Scroll services left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10"
                aria-label="Scroll services right"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={railRef}
            className="tripu-scrollbar-hidden flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 pr-1 sm:gap-4 md:gap-5"
          >
            {previewCards.map((card) => (
              <article
                key={`${card.label}-${card.title}`}
                className="group w-[min(85vw,340px)] shrink-0 snap-start overflow-hidden rounded-[1.1rem] border border-[#067bc2]/12 bg-white shadow-lg shadow-[#067bc2]/8 transition-transform duration-300 hover:-translate-y-1 sm:rounded-[1.4rem] md:w-[340px] md:rounded-[1.9rem]"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4 sm:space-y-2.5 sm:p-5 md:space-y-3 md:p-5">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-orange-500 sm:text-[0.68rem]">{card.label}</p>
                    <span className="text-lg text-[#067bc2] sm:text-xl">{card.icon}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#055f95] sm:text-lg">{card.title}</h4>
                  <p className="text-xs leading-relaxed text-[#067bc2]/80 sm:text-sm">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-6 sm:mt-8 md:mt-8">
            <InteractiveDemo />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
