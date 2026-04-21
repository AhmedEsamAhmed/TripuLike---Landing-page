import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { InteractiveDemo } from '../demo/InteractiveDemo'

export function DemoSection() {
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
          <div className="mt-1 sm:mt-2 md:mt-3">
            <InteractiveDemo />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
