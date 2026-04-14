import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { InteractiveDemo } from '../demo/InteractiveDemo'

export function DemoSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8" id="demo">
      <div className="tripu-dots pointer-events-none absolute -right-10 top-6 h-28 w-28 opacity-35" />
      <span className="pointer-events-none absolute left-3 top-10 text-lg text-[#067bc2]/20 animate-[tripuDrift_9s_ease-in-out_infinite]">✈️</span>
      <span className="pointer-events-none absolute right-8 bottom-10 text-lg text-orange-500/25 animate-[tripuDrift_8.2s_ease-in-out_infinite]">⌁</span>

      <Reveal>
        <SectionTitle
          eyebrow="Interactive Demo"
          title="Plan your trip, request the services you need, and receive offers from local providers."
          subtitle="This simulation mirrors the full TripuLike request-and-offer flow from planning to confirmation."
        />
      </Reveal>
      <Reveal>
        <div className="mb-5 flex flex-wrap gap-2">
          {['Tour Guide', 'Translator', 'Driver / Airport Transfer', 'Activity Operator'].map((service) => (
            <span
              key={service}
              className="rounded-full border border-[#067bc2]/20 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#067bc2] shadow-sm shadow-[#067bc2]/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/60"
            >
              {service}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <InteractiveDemo />
      </Reveal>
    </section>
  )
}
