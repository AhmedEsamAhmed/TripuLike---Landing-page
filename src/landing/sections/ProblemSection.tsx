import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const problems = [
  { key: 'ARRANGE', icon: '🧩', title: 'You do not know what to arrange before your trip', text: 'Important services are missed until the last minute.' },
  { key: 'ORGANIZE', icon: '🗂️', title: 'No clear way to organize your activities', text: 'It is hard to turn ideas into a structured plan.' },
  { key: 'TRUST', icon: '🤝', title: 'Hard to find trusted local providers', text: 'You are unsure which guide, driver, or operator is reliable.' },
  { key: 'PRICE', icon: '💸', title: 'Prices are unclear until you arrive', text: 'Costs vary unexpectedly when booking late on the ground.' },
  { key: 'DISCONNECT', icon: '🔗', title: 'Planning and booking are disconnected', text: 'Your trip plan and the services you need live in separate tools.' },
]

export function ProblemSection() {
  return (
    <section className="bg-sky-50 px-4 py-16 md:px-8" id="problem">
      <Reveal>
        <SectionTitle
          eyebrow="Why trips break"
          title="Most travelers struggle because planning and service booking are disconnected"
          subtitle="TripuLike solves this by combining planning, service requests, and provider offers in one flow."
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Reveal key={problem.title} className="h-full">
            <article className="h-full rounded-2xl border border-[#067bc2]/20 bg-white p-6 shadow-md shadow-[#067bc2]/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-500">
                <span className="text-base">{problem.icon}</span>
                <span>{problem.key}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#055f95]">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#067bc2]/80">{problem.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
