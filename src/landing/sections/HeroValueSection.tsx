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

export function HeroValueSection() {
  return (
    <section className="bg-gradient-to-b from-[#067bc2]/5 via-white to-white px-4 py-16 md:px-8" id="our-value">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionTitle
            eyebrow="Our Value"
            title="Why trips break, and what TripuLike helps you arrange"
            subtitle="See the problem on one side and the service-driven solution on the other, all in one easy-to-scan section."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-[#067bc2]/15 bg-white p-6 shadow-lg shadow-[#067bc2]/8 md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-xl text-orange-500">
                  ⚠️
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Why trips break</p>
                  <h3 className="text-2xl font-semibold text-[#055f95] md:text-3xl">The problem we solve</h3>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {problems.map((problem) => (
                  <article
                    key={problem.title}
                    className="group overflow-hidden rounded-2xl border border-orange-500/15 bg-orange-500/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/15"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={problem.image}
                        alt={problem.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">Problem</p>
                      <h4 className="text-lg font-semibold text-[#055f95]">{problem.title}</h4>
                      <p className="text-sm leading-relaxed text-[#067bc2]/80">{problem.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full rounded-[2rem] border border-[#067bc2]/15 bg-white p-6 shadow-lg shadow-[#067bc2]/10 md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#067bc2] text-xl text-white">
                  ✨
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">What you can do with TripuLike</p>
                  <h3 className="text-2xl font-semibold text-[#055f95] md:text-3xl">The TripuLike value</h3>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {valueItems.map((item) => (
                  <article
                    key={item.title}
                    className="group overflow-hidden rounded-2xl border border-[#067bc2]/15 bg-[#067bc2]/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#067bc2]/15"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#067bc2]">Value</p>
                      <h4 className="text-lg font-semibold text-[#055f95]">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-[#067bc2]/80">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
