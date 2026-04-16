import { useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { useViewportMatch } from '../hooks/useViewportMatch'

const steps = [
  {
    id: '01',
    title: 'Plan your trip',
  },
  {
    id: '02',
    title: 'Request services',
  },
  {
    id: '03',
    title: 'Receive offers',
  },
  {
    id: '04',
    title: 'Confirm your travel plan',
  },
]

export function HowItWorksSection() {
  const isDesktop = useViewportMatch('(min-width: 1024px)')
  const sectionRef = useRef<HTMLElement | null>(null)
  const interactionRef = useRef<HTMLDivElement | null>(null)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const timelineProgressPercent = (activeStepIndex / (steps.length - 1)) * 100

  const setStepFromClientX = (clientX: number) => {
    const rail = interactionRef.current

    if (!rail) {
      return
    }

    const rect = rail.getBoundingClientRect()
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    const nextIndex = Math.min(steps.length - 1, Math.floor(ratio * steps.length))

    setActiveStepIndex(nextIndex)
  }

  const moveStep = (direction: 'left' | 'right') => {
    setActiveStepIndex((current) => {
      if (direction === 'left') {
        return Math.max(0, current - 1)
      }

      return Math.min(steps.length - 1, current + 1)
    })
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop || event.pointerType === 'touch') {
      return
    }

    setStepFromClientX(event.clientX)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setStepFromClientX(event.clientX)

    if (event.pointerType !== 'mouse') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop) {
      return
    }

    const touch = event.touches[0]

    if (!touch) {
      return
    }

    setStepFromClientX(touch.clientX)
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-14 md:px-8 md:py-16"
      id="how-it-works"
    >
      <div className="tripu-dots pointer-events-none absolute -left-8 top-8 h-28 w-28 opacity-35" />
      <span className="pointer-events-none absolute right-5 top-8 text-lg text-[#067bc2]/18 animate-[tripuDrift_8.6s_ease-in-out_infinite]">🧭</span>
      <span className="pointer-events-none absolute left-6 bottom-8 text-base text-orange-500/28 animate-[tripuDrift_9.2s_ease-in-out_infinite]">➜</span>

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="How It Works"
            title="A simple 4-step flow from planning to confirmation"
            subtitle="Move across the section to change the active step, or use the arrows to move through the flow."
          />
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <div
            ref={interactionRef}
            className="rounded-[2rem] border border-[#067bc2]/15 bg-white/95 p-6 shadow-lg shadow-[#067bc2]/8 backdrop-blur-sm md:p-8"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">Guided process</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveStep('left')}
                  disabled={activeStepIndex === 0}
                  aria-label="Previous step"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 ${
                    activeStepIndex === 0
                      ? 'cursor-not-allowed border-[#067bc2]/10 bg-white text-[#067bc2]/30'
                      : 'border-[#067bc2]/15 bg-white text-[#067bc2]'
                  }`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => moveStep('right')}
                  disabled={activeStepIndex === steps.length - 1}
                  aria-label="Next step"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 ${
                    activeStepIndex === steps.length - 1
                      ? 'cursor-not-allowed border-[#067bc2]/10 bg-white text-[#067bc2]/30'
                      : 'border-[#067bc2]/15 bg-white text-[#067bc2]'
                  }`}
                >
                  →
                </button>
              </div>
            </div>

            <div className="relative mb-12">
              <div className="absolute left-0 top-6 h-1 w-full rounded-full bg-[#067bc2]/12" />
              <div
                className="absolute left-0 top-6 h-1 rounded-full bg-gradient-to-r from-[#067bc2] to-[#ff9100] transition-all duration-300"
                style={{ width: `${timelineProgressPercent}%` }}
              />

              <div className="relative flex justify-between gap-4">
                {steps.map((step, index) => {
                  const isActive = activeStepIndex === index
                  const isPassed = activeStepIndex > index

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      className="flex flex-col items-center"
                      aria-label={`Go to step ${step.id}`}
                    >
                      <span
                        className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 font-bold transition-all duration-300 ${
                          isActive
                            ? 'border-[#067bc2] bg-[#067bc2] text-white shadow-lg shadow-[#067bc2]/25'
                            : isPassed
                              ? 'border-[#067bc2] bg-white text-[#067bc2]'
                              : 'border-[#067bc2]/25 bg-white/75 text-[#067bc2]/50'
                        }`}
                      >
                        {step.id}
                      </span>

                      <span className="w-24 text-center text-sm font-semibold text-[#055f95] transition-colors duration-300 md:w-32">
                        {step.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-[#067bc2]/12 pt-8">
              <div className="rounded-xl bg-[#067bc2]/5 p-6 transition-all duration-300">
                <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-orange-500">Current Step</p>
                <h4 className="mt-2 text-lg font-semibold text-[#055f95]">
                  {steps[activeStepIndex].id} — {steps[activeStepIndex].title}
                </h4>
                <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#067bc2] to-[#ff9100]" />
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-[#067bc2]/70">
              Move across the section or use the arrows to progress through each step.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
