import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const valueBlocks = [
  {
    title: 'Plan clearly before arrival',
    text: 'Build structure first, then request what you need with confidence.',
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Connect with trusted providers',
    text: 'Reach guides, drivers, and operators in one organized flow.',
    image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Confirm cost and roadmap',
    text: 'Compare offers and finalize your plan with full visibility.',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=900&q=80',
  },
]

export function ValueSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50/70 px-4 py-16 md:px-8" id="value">
      <div className="tripu-dots pointer-events-none absolute right-4 top-10 h-24 w-24 opacity-30" />
      <span className="pointer-events-none absolute left-4 top-16 text-base text-orange-500/25 animate-[tripuDrift_8.4s_ease-in-out_infinite]">📷</span>
      <span className="pointer-events-none absolute right-8 bottom-8 text-lg text-[#067bc2]/20 animate-[tripuDrift_9s_ease-in-out_infinite]">🌊</span>

      <Reveal>
        <SectionTitle
          eyebrow="Why TripuLike"
          title="Built to make travel planning feel organized and calm"
          subtitle="A lightweight system for planning clearly, requesting confidently, and confirming before arrival."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {valueBlocks.map((item, index) => (
          <Reveal key={item.title}>
            <article className="group h-full overflow-hidden rounded-[1.75rem] border border-[#067bc2]/12 bg-white/86 shadow-sm shadow-[#067bc2]/6 transition-all duration-300 hover:-translate-y-1 hover:border-[#067bc2]/18 hover:shadow-md hover:shadow-[#067bc2]/10">
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-orange-500">0{index + 1}</p>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#067bc2]/20 to-transparent" />
                </div>
                <h4 className="text-lg font-semibold text-[#055f95]">{item.title}</h4>
                <p className="text-sm leading-relaxed text-[#067bc2]/78">{item.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {['Estimate cost', 'Trusted providers', 'Clear roadmap'].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-[#067bc2]/14 bg-white/70 px-3 py-1 text-xs font-semibold text-[#067bc2]"
          >
            {chip}
          </span>
        ))}
      </div>
    </section>
  )
}
