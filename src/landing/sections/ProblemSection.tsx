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
    <section className="bg-sky-50 px-4 py-12 sm:py-14 md:px-8 md:py-16" id="problem">
      <Reveal>
        <SectionTitle
          eyebrow="Why trips break"
          title="Most travelers struggle because planning and service booking are disconnected"
          subtitle="TripuLike solves this by combining planning, service requests, and provider offers in one flow."
        />
      </Reveal>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {problems.map((problem) => (
          <Reveal key={problem.title} className="h-full">
            <article className="h-full rounded-lg border border-[#067bc2]/20 bg-white p-4 shadow-md shadow-[#067bc2]/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-orange-500/20 sm:rounded-xl sm:p-5 md:rounded-2xl md:p-6">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-lg bg-orange-500/10 px-2.5 py-1 text-[0.7rem] font-bold tracking-wider text-orange-500 sm:mb-3 sm:px-3 sm:py-1 sm:text-xs">
                <span className="text-base">{problem.icon}</span>
                <span>{problem.key}</span>
              </div>
              <h3 className="text-base font-semibold text-[#055f95] sm:text-lg md:text-xl">{problem.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#067bc2]/80 sm:mt-2 sm:text-sm">{problem.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
