import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import comingSoonImage from '../../assets/New coming soon.png'
import decorationImage from '../../assets/updated 3d.png'
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
    <section className="relative h-auto w-full overflow-hidden bg-[#067bc2]" id="home">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.09),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(255,145,0,0.16),transparent_22%),radial-gradient(circle_at_65%_78%,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="tripu-dots pointer-events-none absolute -left-8 top-20 -z-10 h-20 w-20 opacity-15 sm:h-24 sm:w-24 md:h-32 md:w-32" />
      <div className="tripu-dots pointer-events-none absolute -bottom-4 right-2 -z-10 h-16 w-16 opacity-12 sm:bottom-16 sm:right-6 sm:h-20 sm:w-20 md:h-28 md:w-28" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-36 hidden h-44 w-px bg-gradient-to-b from-white/75 via-white/30 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] -z-10 h-40 w-40 rounded-full bg-white/6 blur-3xl sm:right-[-2rem] sm:top-[-2rem] sm:h-44 sm:w-44 md:h-52 md:w-52" />
      <div className="pointer-events-none absolute left-[-4rem] bottom-[10%] -z-10 h-32 w-32 rounded-full bg-[#ff9100]/8 blur-3xl sm:left-[-3rem] sm:h-40 sm:w-40 md:h-48 md:w-48" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-1 pt-2 sm:pb-2 sm:pt-3 md:px-8 lg:pb-3 lg:pt-5">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:items-start lg:gap-8 xl:gap-9">
          <Reveal>
            <div className="w-full max-w-[640px]">
              <header className="flex items-start">
                <button type="button" onClick={onHome} className="flex w-fit flex-col items-start text-left">
                  <img
                    src={tripulikeLogo}
                    alt="TripuLike"
                    className="h-[4.75rem] w-auto drop-shadow-[0_4px_16px_rgba(2,35,72,0.2)] sm:h-[5.15rem] md:h-[5.5rem]"
                  />
                  <p className="mt-0 text-[0.56rem] font-medium uppercase tracking-[0.2em] text-white/85 sm:text-[0.6rem]">
                    Travel Experience Platform
                  </p>
                </button>
              </header>

              <div className="mt-3.5 sm:mt-4">
                <h1 className="hero-hook max-w-[620px] text-left leading-[0.96] text-white">
                  <span className="block text-[clamp(1.2rem,1.6vw,1.55rem)] font-medium tracking-[-0.022em] text-white/92">
                    Plan your trip.
                  </span>
                  <span className="mt-1 block text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.038em] text-white">
                    In your <span className="text-[#ff9100]">budget</span>
                  </span>
                  <span className="tripu-outline mt-1 block text-[clamp(1.35rem,2.35vw,2.2rem)] font-semibold tracking-[-0.028em] text-white/10">
                    With full control
                  </span>
                </h1>

                <p className="mt-3 max-w-[540px] text-left text-[0.96rem] leading-relaxed text-white/88 sm:text-[1.02rem]">
                  Connect directly with local providers for activities, transport, and trusted support.
                </p>

                <div className="mt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={onTryDemo}
                    className="rounded-full border border-orange-300/40 bg-[#ff9100] px-4 py-2 text-[0.82rem] font-semibold text-white shadow-lg shadow-orange-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500 sm:px-4.5 sm:text-[0.86rem]"
                  >
                    Try the Demo
                  </button>
                  <button
                    type="button"
                    onClick={onJoinWaitlist}
                    className="rounded-full border border-white/30 bg-transparent px-4 py-2 text-[0.82rem] font-medium text-white/92 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-4.25 sm:text-[0.86rem]"
                  >
                    Join Waitlist
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onContactClick()
                      setShowContact((prev) => !prev)
                    }}
                    className="px-1 py-2 text-[0.8rem] font-medium text-white/78 underline decoration-white/35 underline-offset-3 transition duration-300 hover:text-white"
                  >
                    Contact
                  </button>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {['🧭 Plan', '📩 Request', '💬 Offers', '✅ Confirm'].map((step) => (
                    <span
                      key={step}
                      className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.02em] text-white/92 sm:text-[0.68rem]"
                    >
                      {step}
                    </span>
                  ))}
                </div>

                <div className="mt-2.5 w-full rounded-[1rem] border border-white/14 bg-white/10 p-3 shadow-[0_18px_45px_rgba(2,35,72,0.18)] backdrop-blur-md sm:p-3.5 md:max-w-[520px] md:rounded-[1.05rem]">
                {!validationSubmitted ? (
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-orange-200">Quick validation</p>
                        <p className="mt-1 max-w-lg text-[0.78rem] leading-snug text-white/92 sm:text-[0.82rem]">
                          Do you want to get your activity booked in advance to get an estimated cost of the trip?
                        </p>
                      </div>
                      <span className="hidden rounded-full border border-white/15 bg-white/10 px-1.5 py-0.75 text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-white/75 sm:inline-flex">
                        30 sec
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(['yes', 'no'] as const).map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setValidationChoice(choice)}
                          className={`rounded-full border px-3 py-1 text-[0.72rem] font-semibold transition duration-300 ${
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
                      <div className="mb-1.5 flex items-center justify-between gap-1.5">
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/80">Importance out of 10</p>
                        <span className="text-[0.58rem] font-medium text-white/72">{validationRating ? `${validationRating}/10` : 'Select'}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1 sm:grid-cols-10 sm:gap-1.25">
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setValidationRating(value)}
                            className={`h-6.5 rounded-full border text-[0.6rem] font-semibold transition duration-300 sm:h-7 sm:text-[0.62rem] ${
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

                    <div className="flex flex-col gap-1.25 sm:flex-row sm:items-center sm:gap-2">
                      <button
                        type="button"
                        onClick={onSubmitValidation}
                        disabled={validationSubmitting}
                        className="rounded-full bg-white px-3.5 py-1.35 text-[0.74rem] font-semibold text-[#055f95] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50"
                      >
                        {validationSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                      <p className="text-[0.64rem] text-white/72">Help shape TripuLike.</p>
                    </div>
                    {validationError && <p className="text-[0.66rem] text-orange-200">{validationError}</p>}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-[0.9rem] border border-white/14 bg-white/8 p-2.75 sm:rounded-[1rem] sm:p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,145,0,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_28%)]" />
                    <div className="relative flex items-start gap-1.5">
                      <div className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#067bc2] shadow-lg shadow-black/10 sm:h-7.5 sm:w-7.5">
                        <span className="text-[0.95rem]">✅</span>
                        <span
                          className="absolute inset-0 rounded-full border border-white/70"
                          style={{ animation: 'tripuValidationPulse 1.8s ease-in-out infinite' }}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-orange-200">Thank you!</p>
                        <p className="text-[0.8rem] leading-snug text-white/92">Explore TripuLike below.</p>
                        <p className="text-[0.8rem] leading-snug text-white/80">Your feedback shapes us.</p>
                      </div>
                    </div>

                    <div className="relative mt-2 flex items-center gap-1 overflow-hidden">
                      {['✈️', '🧭', '🎟️', '💳', '✅'].map((icon, index) => (
                        <span
                          key={icon}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/14 bg-white/10 text-[0.58rem] text-white shadow-sm shadow-black/10 sm:h-6.5 sm:w-6.5 sm:text-[0.62rem]"
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
                      className="relative mt-2 rounded-full border border-white/18 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold text-white/92 transition hover:bg-white/12"
                    >
                      Answer again
                    </button>
                  </div>
                )}
              </div>

              {showContact && (
                <div id="hero-contact" className="mt-3 w-full max-w-sm rounded-[1rem] border border-white/25 bg-white/12 p-3 shadow-xl shadow-black/10 backdrop-blur-md md:max-w-md">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-orange-300">Contact</p>
                  <p className="mt-1 text-[0.8rem] font-semibold text-white">Founder: Ahmed Esam</p>
                  <a
                    href="mailto:ahmedabuhjar476@gmail.com"
                    className="mt-1 block text-[0.74rem] text-white/90 underline underline-offset-1.5"
                  >
                    ahmedabuhjar476@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-2 rounded-lg bg-orange-500 px-3 py-1.25 text-[0.74rem] font-semibold text-white transition hover:scale-[1.02]"
                  >
                    Copy Email
                  </button>
                </div>
              )}
            </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex w-full items-start justify-center lg:justify-self-end">
              <div className="mx-auto flex w-full max-w-[560px] flex-col items-center justify-start gap-1 sm:gap-1.5 lg:gap-2">
                <div className="w-full max-w-[290px] sm:max-w-[340px] md:max-w-[370px] lg:max-w-[410px]">
                  <img
                    src={comingSoonImage}
                    alt="Coming soon"
                    className="h-auto w-full object-contain [animation:tripuComingSoonObjectFloat_6.8s_cubic-bezier(0.4,0.0,0.2,1)_infinite]"
                  />
                </div>

                <div className="relative w-full max-w-[380px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[560px]">
                  <div className="pointer-events-none absolute left-1/2 top-[58%] h-[34%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/24 blur-3xl" />
                  <div className="pointer-events-none absolute left-1/2 top-[54%] h-[36%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9100]/12 blur-[42px]" />
                  <img
                    src={decorationImage}
                    alt="3D travel planning scene"
                    className="relative h-[250px] w-full object-contain object-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.34)] [animation:tripuFloatingDecoration_6.8s_cubic-bezier(0.4,0.0,0.2,1)_infinite] sm:h-[300px] md:h-[340px] lg:h-[390px]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
