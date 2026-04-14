import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const experienceCards = [
  {
    title: 'Water activities',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    text: 'Jet ski, snorkeling, and island-hopping moments that travelers can request and arrange.',
  },
  {
    title: 'Group travel',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    text: 'Shared sightseeing and activity experiences with a lively travel vibe.',
  },
  {
    title: 'Fun movement',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80',
    text: 'Vibrant moments on the water and on the ground that make the trip feel active.',
  },
]

export function ExperienceShowcaseSection() {
  return (
    <section className="bg-gradient-to-b from-[#067bc2]/6 to-white px-4 py-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionTitle
            eyebrow="What you can do"
            title="Real travel experiences that can be arranged through TripuLike"
            subtitle="The images below show the kind of activities and services travelers can request, organize, and confirm."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {experienceCards.map((card) => (
            <Reveal key={card.title}>
              <article className="group overflow-hidden rounded-[1.75rem] border border-[#067bc2]/15 bg-white shadow-lg shadow-[#067bc2]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#067bc2]/15">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                    Requestable experience
                  </p>
                  <h3 className="text-xl font-semibold text-[#055f95]">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-[#067bc2]/80">{card.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
