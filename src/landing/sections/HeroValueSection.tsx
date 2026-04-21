import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

const problemValuePairs = [
  {
    problem: 'No clear plan before the trip',
    value: 'Build your trip with a clear guided structure',
    problemAccent: 'Planning gap',
    valueAccent: 'Guided planning',
  },
  {
    problem: 'Services and booking feel disconnected',
    value: 'Request and arrange services in one flow',
    problemAccent: 'Disconnected flow',
    valueAccent: 'Unified flow',
  },
  {
    problem: 'Prices are unclear until arrival',
    value: 'Get estimated cost before your trip',
    problemAccent: 'Unclear pricing',
    valueAccent: 'Early estimates',
  },
  {
    problem: 'Hard to trust local providers',
    value: 'Connect with trusted local service providers',
    problemAccent: 'Trust friction',
    valueAccent: 'Trusted network',
  },
  {
    problem: 'Too many things to arrange manually',
    value: 'Get one roadmap for what you plan to do',
    problemAccent: 'Manual overload',
    valueAccent: 'Single roadmap',
  },
]

export function HeroValueSection() {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    () => problemValuePairs.map(() => false),
  )

  const toggleCard = (cardIndex: number) => {
    setFlippedCards((previous) =>
      previous.map((isFlipped, index) => (index === cardIndex ? !isFlipped : isFlipped)),
    )
  }

  return (
    <section className="bg-gradient-to-b from-[#067bc2]/5 via-white to-white px-4 py-12 sm:py-14 md:px-8 md:py-16" id="our-value">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Our Value"
            title="Why trips break, and what TripuLike helps you arrange"
            subtitle="Tap or click each card to flip from the traveler problem to the TripuLike value."
          />
        </Reveal>

        <Reveal>
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5 md:mb-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-orange-500 sm:text-xs">Problem to value</p>
            <p className="text-[0.68rem] text-[#067bc2]/75 sm:text-xs">Flip card</p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {problemValuePairs.map((pair, index) => (
            <article key={`${pair.problem}-${pair.value}`} className="[perspective:1400px]">
              <button
                type="button"
                onClick={() => toggleCard(index)}
                className="group relative block h-[220px] w-full rounded-[1.1rem] text-left outline-none sm:h-[230px] sm:rounded-[1.25rem] md:h-[240px] md:rounded-[1.35rem]"
                aria-pressed={flippedCards[index]}
                aria-label={`Flip card ${index + 1} to view ${flippedCards[index] ? 'problem' : 'solution'}`}
              >
                <div
                  className={`relative h-full w-full rounded-[1.1rem] transition-transform duration-500 ease-[cubic-bezier(0.2,0.75,0.2,1)] [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#067bc2]/15 sm:rounded-[1.25rem] md:rounded-[1.35rem] ${
                    flippedCards[index] ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  <div className="absolute inset-0 flex h-full flex-col justify-between rounded-[1.1rem] border border-orange-500/20 bg-white p-4 shadow-lg shadow-[#067bc2]/8 [backface-visibility:hidden] sm:rounded-[1.25rem] sm:p-5 md:rounded-[1.35rem]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#ff9100]/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-orange-500 sm:text-[0.66rem]">
                        Problem
                      </span>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#067bc2]/55">
                        {pair.problemAccent}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-[1.02rem] font-semibold leading-tight text-[#055f95] sm:text-[1.08rem]">
                      {pair.problem}
                    </p>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#067bc2]/65 sm:text-[0.7rem]">
                      Tap to reveal value
                    </p>
                  </div>

                  <div className="absolute inset-0 flex h-full flex-col justify-between rounded-[1.1rem] border border-[#067bc2]/20 bg-gradient-to-br from-white via-[#067bc2]/[0.03] to-[#067bc2]/10 p-4 shadow-xl shadow-[#067bc2]/12 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-[1.25rem] sm:p-5 md:rounded-[1.35rem]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#067bc2] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white sm:text-[0.66rem]">
                        TripuLike Value
                      </span>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#067bc2]">
                        {pair.valueAccent}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-[1.02rem] font-semibold leading-tight text-[#055f95] sm:text-[1.08rem]">
                      {pair.value}
                    </p>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#067bc2]/65 sm:text-[0.7rem]">
                      Tap to see problem
                    </p>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
