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
      className="relative overflow-hidden px-4 py-12 sm:py-14 md:px-8 md:py-16"
      id="how-it-works"
    >
      <div className="tripu-dots pointer-events-none absolute -left-6 top-6 h-24 w-24 opacity-30 sm:-left-8 sm:top-8 sm:h-28 sm:w-28 md:opacity-35" />
      <span className="pointer-events-none absolute right-4 top-8 text-base text-[#067bc2]/18 animate-[tripuDrift_8.6s_ease-in-out_infinite] sm:right-5 sm:text-lg md:top-8">🧭</span>
      <span className="pointer-events-none absolute left-5 -bottom-2 text-sm text-orange-500/28 animate-[tripuDrift_9.2s_ease-in-out_infinite] sm:left-6 sm:text-base md:bottom-8">➜</span>

      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="How It Works"
            title="A simple 4-step flow from planning to confirmation"
            subtitle="Move across the section to change the active step, or use the arrows to move through the flow."
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-16">
          <div
            ref={interactionRef}
            className="rounded-[1.5rem] border border-[#067bc2]/15 bg-white/95 p-4 shadow-lg shadow-[#067bc2]/8 backdrop-blur-sm sm:rounded-[1.8rem] sm:p-5 md:rounded-[2rem] md:p-8"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
          >
            <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5 sm:gap-3 md:mb-6 md:gap-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-orange-500 sm:text-sm">Guided process</p>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => moveStep('left')}
                  disabled={activeStepIndex === 0}
                  aria-label="Previous step"
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10 ${
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
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition hover:-translate-y-0.5 hover:bg-[#067bc2]/5 sm:h-10 sm:w-10 ${
                    activeStepIndex === steps.length - 1
                      ? 'cursor-not-allowed border-[#067bc2]/10 bg-white text-[#067bc2]/30'
                      : 'border-[#067bc2]/15 bg-white text-[#067bc2]'
                  }`}
                >
                  →
                </button>
              </div>
            </div>

            <div className="relative mb-8 sm:mb-10 md:mb-12">
              <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-[#067bc2]/12 sm:top-6 md:top-6" />
              <div
                className="absolute left-0 top-5 h-1 rounded-full bg-gradient-to-r from-[#067bc2] to-[#ff9100] transition-all duration-300 sm:top-6 md:top-6"
                style={{ width: `${timelineProgressPercent}%` }}
              />

              <div className="relative flex justify-between gap-1 sm:gap-2 md:gap-4">
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
                        className={`relative z-10 mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 text-[0.85rem] font-bold transition-all duration-300 sm:mb-4 sm:h-14 sm:w-14 sm:text-sm md:mb-6 md:h-16 md:w-16 ${
                          isActive
                            ? 'border-[#067bc2] bg-[#067bc2] text-white shadow-lg shadow-[#067bc2]/25'
                            : isPassed
                              ? 'border-[#067bc2] bg-white text-[#067bc2]'
                              : 'border-[#067bc2]/25 bg-white/75 text-[#067bc2]/50'
                        }`}
                      >
                        {step.id}
                      </span>

                      <span className="w-16 text-center text-[0.65rem] font-semibold text-[#055f95] transition-colors duration-300 sm:w-20 sm:text-xs md:w-32 md:text-sm">
                        {step.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-[#067bc2]/12 pt-4 sm:pt-5 md:pt-8">
              <div className="rounded-lg bg-[#067bc2]/5 p-4 transition-all duration-300 sm:rounded-xl sm:p-5 md:rounded-xl md:p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-orange-500 sm:text-[0.7rem]">Current Step</p>
                <h4 className="mt-1.5 text-base font-semibold text-[#055f95] sm:mt-2 sm:text-lg">
                  {steps[activeStepIndex].id} — {steps[activeStepIndex].title}
                </h4>
                <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#067bc2] to-[#ff9100] sm:mt-3 md:w-12" />
              </div>
            </div>

            <p className="mt-4 text-center text-[0.7rem] text-[#067bc2]/70 sm:mt-5 sm:text-[0.75rem] md:mt-8 md:text-sm">
              Move across the section or use the arrows to progress through each step.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
