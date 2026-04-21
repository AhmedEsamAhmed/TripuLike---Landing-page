import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import decorationImage from '../../assets/deoration pic .png'
import tripulikeLogo from '../../assets/logo (2).png'
import { trackAnalyticsEvent } from '../../services/analyticsService'
import { submitHeroResponse } from '../../services/heroService'

type HeroSectionProps = {
  sessionId: string
  onHome: () => void
  onTryDemo: () => void
  onHowItWorks: () => void
  onOurValue: () => void
  onJoinWaitlist: () => void
  onContactClick: () => void
}

export function HeroSection({ sessionId, onHome, onTryDemo, onJoinWaitlist, onContactClick }: HeroSectionProps) {
  const [showContact, setShowContact] = useState(false)
  const [validationChoice, setValidationChoice] = useState<'yes' | 'no' | null>(null)
  const [validationRating, setValidationRating] = useState<number | null>(null)
  const [validationSubmitted, setValidationSubmitted] = useState(false)
  const [validationSubmitting, setValidationSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const iconStrip = ['✈️', '🧳', '📍', '📷', '🤿', '🌴', '🧭', '🎟️', '💳', '🪪', '✅', '⭐']
  const stripItems = [...iconStrip, ...iconStrip]

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ahmedabuhjar476@gmail.com')
      console.log('Email copied: ahmedabuhjar476@gmail.com')
    } catch {
      console.log('Copy failed. Email: ahmedabuhjar476@gmail.com')
    }
  }

  const onSubmitValidation = async () => {
    if (!validationChoice || !validationRating) {
      setValidationError('Please select Yes/No and an importance rating before submitting.')
      return
    }

    setValidationSubmitting(true)
    setValidationError(null)

    try {
      await submitHeroResponse({
        sessionId,
        wantsAdvanceBooking: validationChoice === 'yes',
        importanceRating: validationRating,
      })

      try {
        await trackAnalyticsEvent({
          sessionId,
          eventName: 'submitted_hero_question',
          eventValue: `${validationChoice}:${validationRating}`,
          page: '/landing',
        })
      } catch {
        // Do not block UX if analytics fails
      }

      setValidationSubmitted(true)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not save your response. Please try again.'
      setValidationError(message)
    } finally {
      setValidationSubmitting(false)
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#067bc2]" id="home">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.09),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(255,145,0,0.16),transparent_22%),radial-gradient(circle_at_65%_78%,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="tripu-dots pointer-events-none absolute -left-8 top-20 -z-10 h-20 w-20 opacity-15 sm:h-24 sm:w-24 md:h-32 md:w-32" />
      <div className="tripu-dots pointer-events-none absolute -bottom-4 right-2 -z-10 h-16 w-16 opacity-12 sm:bottom-16 sm:right-6 sm:h-20 sm:w-20 md:h-28 md:w-28" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-36 hidden h-44 w-px bg-gradient-to-b from-white/75 via-white/30 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] -z-10 h-40 w-40 rounded-full bg-white/6 blur-3xl sm:right-[-2rem] sm:top-[-2rem] sm:h-44 sm:w-44 md:h-52 md:w-52" />
      <div className="pointer-events-none absolute left-[-4rem] bottom-[10%] -z-10 h-32 w-32 rounded-full bg-[#ff9100]/8 blur-3xl sm:left-[-3rem] sm:h-40 sm:w-40 md:h-48 md:w-48" />

      <div className="pointer-events-none absolute left-0 right-0 top-2 z-0 hidden overflow-hidden px-4 sm:top-2.5 md:px-8 lg:block">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="tripu-hero-strip relative overflow-hidden rounded-full border border-white/12 bg-white/6 py-1.5 backdrop-blur-[2px]">
            <div
              className="tripu-hero-strip-track flex w-max items-center gap-3 px-4"
              style={{ animation: 'tripuHeroStripDrift 36s linear infinite' }}
            >
              {stripItems.map((icon, index) => (
                <span key={`${icon}-${index}`} className="tripu-hero-strip-item inline-flex items-center gap-2 text-white/72">
                  <span className="text-[0.75rem] opacity-80 sm:text-sm md:text-[0.95rem]">{icon}</span>
                  <span className="h-px w-3 bg-white/18 sm:w-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-6 pt-4 sm:pb-8 sm:pt-5 md:px-8 md:pb-10 md:pt-6 lg:pb-11 lg:pt-7">
        <Reveal>
          <header className="flex items-start">
            <button type="button" onClick={onHome} className="flex w-fit flex-col items-start text-left">
              <img
                src={tripulikeLogo}
                alt="TripuLike"
                className="h-11 w-auto drop-shadow-[0_4px_16px_rgba(2,35,72,0.2)] sm:h-12 md:h-14"
              />
              <p className="mt-0.5 text-[0.52rem] font-medium uppercase tracking-[0.2em] text-white/85 sm:mt-1 sm:text-[0.55rem] md:text-[0.6rem]">
                Travel Experience Platform
              </p>
            </button>
          </header>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:mt-6 md:mt-7 lg:mt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-start lg:gap-8">
          <Reveal>
            <div className="relative pl-0 sm:pl-3 md:pl-5 xl:pl-8">
              <h1 className="hero-hook max-w-4xl text-left leading-none text-white">
                <span className="block text-[clamp(1.2rem,1.6vw,1.7rem)] font-medium tracking-[-0.02em] text-white/92">
                  Plan your trip.
                </span>
                <span className="mt-0.5 block text-[clamp(1.65rem,3.8vw,3.4rem)] font-extrabold tracking-[-0.035em] text-white">
                  In your <span className="text-[#ff9100]">budget</span>
                </span>
                <span className="tripu-outline mt-0.5 block text-[clamp(1.35rem,2.5vw,2.5rem)] font-semibold tracking-[-0.028em] text-white/10">
                  With full control
                </span>
              </h1>

              <p className="mt-2.5 max-w-lg text-left text-[0.85rem] leading-relaxed text-white/88 sm:mt-3 md:text-[0.95rem]">
                Connect directly with local providers for activities, transport, and trusted support.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-3.5">
                <button
                  type="button"
                  onClick={onTryDemo}
                  className="rounded-full border border-orange-300/40 bg-[#ff9100] px-3.5 py-1.5 text-[0.8rem] font-semibold text-white shadow-lg shadow-orange-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500 sm:px-4.5 sm:text-[0.85rem]"
                >
                  Try the Demo
                </button>
                <button
                  type="button"
                  onClick={onJoinWaitlist}
                  className="rounded-full border border-white/30 bg-transparent px-3.5 py-1.5 text-[0.8rem] font-medium text-white/92 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-4 sm:text-[0.85rem]"
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onContactClick()
                    setShowContact((prev) => !prev)
                  }}
                  className="px-2 py-1.5 text-[0.8rem] font-medium text-white/75 underline decoration-white/35 underline-offset-3 transition duration-300 hover:text-white sm:text-[0.85rem]"
                >
                  Contact
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
                {['🧭 Plan', '📩 Request', '💬 Offers', '✅ Confirm'].map((step) => (
                  <span
                    key={step}
                    className="rounded-full border border-white/15 bg-white/8 px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.02em] text-white/90 sm:px-2.5 sm:py-0.5 sm:text-[0.65rem]"
                  >
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-2.5 w-full max-w-full rounded-[0.95rem] border border-white/14 bg-white/10 p-2.5 shadow-[0_18px_45px_rgba(2,35,72,0.18)] backdrop-blur-md sm:mt-3 sm:p-3 md:max-w-[500px] md:rounded-[1.1rem] md:p-3.5">
                {!validationSubmitted ? (
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2.5">
                      <div>
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-orange-200 sm:text-[0.6rem]">Quick validation</p>
                        <p className="mt-0.5 max-w-lg text-[0.75rem] leading-snug text-white/92 sm:mt-1 sm:text-[0.82rem] md:text-[0.88rem]">
                          Do you want to get your activity booked in advance to get an estimated cost of the trip?
                        </p>
                      </div>
                      <span className="hidden rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/75 sm:inline-flex md:text-[0.55rem]">
                        30 sec
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {(['yes', 'no'] as const).map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setValidationChoice(choice)}
                          className={`rounded-full border px-2.5 py-0.5 text-[0.75rem] font-semibold transition duration-300 sm:px-3 sm:py-1 sm:text-[0.8rem] ${
                            validationChoice === choice
                              ? 'border-[#ff9100] bg-[#ff9100] text-white shadow-lg shadow-orange-500/20'
                              : 'border-white/18 bg-white/8 text-white/92 hover:bg-white/12'
                          }`}
                        >
                          {choice === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between gap-1.5 sm:gap-2.5">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[0.63rem]">Importance out of 10</p>
                        <span className="text-[0.6rem] font-medium text-white/72 sm:text-[0.63rem]">{validationRating ? `${validationRating}/10` : 'Select'}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1 sm:grid-cols-10 sm:gap-1.5">
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setValidationRating(value)}
                            className={`h-6 rounded-full border text-[0.6rem] font-semibold transition duration-300 sm:h-6.5 sm:text-[0.68rem] ${
                              validationRating === value
                                ? 'border-[#ff9100] bg-[#ff9100] text-white shadow-md shadow-orange-500/20'
                                : 'border-white/14 bg-white/8 text-white/78 hover:bg-white/12'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
                      <button
                        type="button"
                        onClick={onSubmitValidation}
                        disabled={validationSubmitting}
                        className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-semibold text-[#055f95] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 sm:px-3.5 sm:py-1.5 sm:text-[0.8rem]"
                      >
                        {validationSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                      <p className="text-[0.65rem] text-white/72 sm:text-[0.68rem]">Help shape TripuLike.</p>
                    </div>
                    {validationError && <p className="text-[0.72rem] text-orange-200 sm:text-[0.74rem]">{validationError}</p>}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-[0.8rem] border border-white/14 bg-white/8 p-2.5 sm:rounded-[0.95rem] sm:p-3 md:rounded-[1rem] md:p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,145,0,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_28%)]" />
                    <div className="relative flex items-start gap-1.5 sm:gap-2">
                      <div className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#067bc2] shadow-lg shadow-black/10 sm:h-9 sm:w-9">
                        <span className="text-base sm:text-lg">✅</span>
                        <span
                          className="absolute inset-0 rounded-full border border-white/70"
                          style={{ animation: 'tripuValidationPulse 1.8s ease-in-out infinite' }}
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-1.5">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-orange-200 sm:text-[0.68rem]">Thank you!</p>
                        <p className="text-[0.75rem] leading-snug text-white/92 sm:text-[0.8rem]">Explore TripuLike below.</p>
                        <p className="text-[0.75rem] leading-snug text-white/80 sm:text-[0.8rem]">Your feedback shapes us.</p>
                      </div>
                    </div>

                    <div className="relative mt-1.5 flex items-center gap-1 overflow-hidden sm:mt-2 sm:gap-1.5">
                      {['✈️', '🧭', '🎟️', '💳', '✅'].map((icon, index) => (
                        <span
                          key={icon}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/14 bg-white/10 text-[0.6rem] text-white shadow-sm shadow-black/10 sm:h-7 sm:w-7 sm:text-[0.75rem]"
                          style={{ animation: `tripuBurstFloat ${2.2 + index * 0.14}s ease-in-out infinite` }}
                        >
                          {icon}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setValidationChoice(null)
                        setValidationRating(null)
                        setValidationSubmitted(false)
                      }}
                      className="relative mt-1.5 rounded-full border border-white/18 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold text-white/92 transition hover:bg-white/12 sm:mt-2 sm:px-3.5 sm:py-1.5 sm:text-[0.8rem]"
                    >
                      Answer again
                    </button>
                  </div>
                )}
              </div>

              {showContact && (
                <div id="hero-contact" className="mt-2.5 w-full max-w-sm rounded-[0.95rem] border border-white/25 bg-white/12 p-2.5 shadow-xl shadow-black/10 backdrop-blur-md sm:mt-3 sm:rounded-xl sm:p-3 md:max-w-md md:rounded-[1.05rem]">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-orange-300 sm:text-[0.68rem]">Contact</p>
                  <p className="mt-1.5 text-[0.8rem] font-semibold text-white sm:mt-1.5 sm:text-[0.9rem]">Founder: Ahmed Esam</p>
                  <a
                    href="mailto:ahmedabuhjar476@gmail.com"
                    className="mt-0.5 block text-[0.75rem] text-white/90 underline underline-offset-1.5 sm:text-[0.8rem]"
                  >
                    ahmedabuhjar476@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-2 rounded-lg bg-orange-500 px-3 py-1.5 text-[0.75rem] font-semibold text-white transition hover:scale-[1.02] sm:rounded-lg sm:px-3.5 sm:py-1.5 sm:text-[0.8rem]"
                  >
                    Copy Email
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative pt-0.5 sm:pt-1.5 lg:pt-3">
              <div className="mb-2 flex justify-end sm:mb-3 lg:pr-5">
                <div className="tripu-coming-soon-text w-full max-w-xs text-center sm:max-w-sm">
                  <span className="tripu-coming-soon-line tripu-coming-soon-line-1 block text-[clamp(1.6rem,3.5vw,3.5rem)] leading-[0.92] text-white">
                    COMING
                  </span>
                  <span className="tripu-coming-soon-line tripu-coming-soon-line-2 mt-0 block text-[clamp(1.75rem,4vw,3.7rem)] leading-[0.9] text-white sm:mt-0.5">
                    SOON
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[1.1rem] border border-white/20 bg-white/10 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(255,145,0,0.15)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_50px_rgba(255,145,0,0.2)] sm:max-w-sm md:ml-auto lg:max-w-[390px] lg:rotate-[-2.5deg] [animation:tripuFloatingDecoration_4s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_40%,rgba(255,145,0,0.1))]" />
                <img
                  src={decorationImage}
                  alt="Travel flat lay with camera, passport, map, and accessories"
                  className="relative h-[160px] w-full rounded-[0.8rem] object-cover object-center shadow-[inset_0_1px_3px_rgba(255,255,255,0.3),0_10px_30px_rgba(0,0,0,0.3)] sm:h-[195px] md:h-[225px] lg:h-[265px]"
                />

                <div className="relative mt-1.5 flex flex-wrap items-center justify-between gap-1.5 px-1 pb-0.5 sm:mt-2 sm:gap-2 sm:pb-1">
                  <div className="flex items-center gap-1 text-white/92 sm:gap-1.5">
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm sm:px-2.5 sm:py-0.5 sm:text-[0.62rem]">
                      LAUNCH TEASER
                    </span>
                  </div>
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-orange-200 sm:text-[0.62rem]">TRIPULIKE</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
