import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const steps = [
  {
    id: '01',
    icon: '🧭',
    title: 'Plan your trip',
    text: 'Define budget, dates, and preferences with a clear starting structure.',
  },
  {
    id: '02',
    icon: '📩',
    title: 'Request services',
    text: 'Send requests for activities, guide support, transport, or custom needs.',
  },
  {
    id: '03',
    icon: '💬',
    title: 'Receive offers',
    text: 'Compare provider offers, inclusions, and timing before you confirm.',
  },
  {
    id: '04',
    icon: '✅',
    title: 'Confirm your travel plan',
    text: 'Lock your selected services and get a complete pre-arrival roadmap.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-blue-50/35 px-4 py-16 md:px-8" id="how-it-works">
      <div className="tripu-dots pointer-events-none absolute -left-8 top-8 h-28 w-28 opacity-35" />
      <span className="pointer-events-none absolute right-5 top-8 text-lg text-[#067bc2]/18 animate-[tripuDrift_8.6s_ease-in-out_infinite]">🧭</span>
      <span className="pointer-events-none absolute left-6 bottom-8 text-base text-orange-500/28 animate-[tripuDrift_9.2s_ease-in-out_infinite]">➜</span>

      <Reveal>
        <SectionTitle
          eyebrow="How It Works"
          title="A simple 4-step flow from planning to confirmation"
          subtitle="A calm path that keeps the planning, request, and confirmation flow easy to follow."
        />
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#067bc2]/18 to-transparent lg:block" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Reveal key={step.id}>
              <article className="group h-full rounded-[1.75rem] border border-[#067bc2]/12 bg-white/80 p-6 shadow-sm shadow-[#067bc2]/6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#067bc2]/18 hover:shadow-md hover:shadow-[#067bc2]/10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#067bc2]/10 text-lg font-bold text-[#067bc2] transition-transform duration-300 group-hover:scale-105">
                    {step.icon}
                  </span>
                  <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-orange-500">STEP {step.id}</p>
                </div>
                <div className="mb-4 h-px w-16 bg-gradient-to-r from-[#067bc2]/30 to-transparent" />
                <h3 className="text-[1.05rem] font-semibold text-[#055f95]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#067bc2]/78">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
