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
    <section className="relative overflow-hidden px-4 py-16 md:px-8" id="demo">
      <div className="tripu-dots pointer-events-none absolute -right-10 top-6 h-28 w-28 opacity-35" />
      <span className="pointer-events-none absolute left-3 top-10 text-lg text-[#067bc2]/20 animate-[tripuDrift_9s_ease-in-out_infinite]">✈️</span>
      <span className="pointer-events-none absolute right-8 bottom-10 text-lg text-orange-500/25 animate-[tripuDrift_8.2s_ease-in-out_infinite]">⌁</span>

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Interactive Demo"
            title="Plan your trip, request the services you need, and receive offers from local providers."
            subtitle="This simulation mirrors the full TripuLike request-and-offer flow from planning to confirmation."
          />
        </Reveal>
        <Reveal>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">Browse services</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollRail('left')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5"
                aria-label="Scroll services left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#067bc2]/15 bg-white text-[#067bc2] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5"
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
            className="tripu-scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pr-1"
          >
            {previewCards.map((card) => (
              <article
                key={`${card.label}-${card.title}`}
                className="group w-[min(82vw,360px)] shrink-0 snap-start overflow-hidden rounded-[1.9rem] border border-[#067bc2]/12 bg-white shadow-lg shadow-[#067bc2]/8 transition-transform duration-300 hover:-translate-y-1 md:w-[340px]"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-orange-500">{card.label}</p>
                    <span className="text-xl text-[#067bc2]">{card.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-[#055f95]">{card.title}</h4>
                  <p className="text-sm leading-relaxed text-[#067bc2]/80">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8">
            <InteractiveDemo />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
