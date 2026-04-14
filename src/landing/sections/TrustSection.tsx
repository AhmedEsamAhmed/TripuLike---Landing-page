import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const shots = [
  'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501556424050-d4816356b73e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
]

const trustCaptions = [
  'Designed for real travel planning, not random browsing.',
  'Built around real service providers and clear deliverables.',
  'Focused on clarity, trust, and control before you arrive.',
]

export function TrustSection() {
  return (
    <section className="px-4 py-16 md:px-8" id="trust">
      <Reveal>
        <SectionTitle
          eyebrow="Trust Signals"
          title="Built around real services and real providers"
          subtitle="TripuLike helps you plan clearly, request confidently, and confirm trusted local support."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {shots.map((shot, index) => (
          <Reveal key={shot}>
            <figure className="overflow-hidden rounded-2xl border border-[#067bc2]/20 bg-white shadow-md shadow-[#067bc2]/10 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
              <img src={shot} alt={`Trip screenshot placeholder ${index + 1}`} className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105" />
              <figcaption className="p-4 text-sm text-[#067bc2]/80">
                {trustCaptions[index]}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#067bc2]/80 md:text-base">
          Compare offers from tour guides, activity operators, and drivers, then confirm the services that match your plan and budget.
        </p>
      </Reveal>
    </section>
  )
}
