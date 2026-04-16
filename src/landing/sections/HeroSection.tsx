import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import decorationImage from '../../assets/decoration pic - tripulike.jpg'
import tripulikeLogo from '../../assets/logo (2).png'

type HeroSectionProps = {
  onHome: () => void
  onTryDemo: () => void
  onHowItWorks: () => void
  onOurValue: () => void
  onJoinWaitlist: () => void
}

export function HeroSection({ onHome, onTryDemo, onJoinWaitlist }: HeroSectionProps) {
  const [showContact, setShowContact] = useState(false)
  const [validationChoice, setValidationChoice] = useState<'yes' | 'no' | null>(null)
  const [validationRating, setValidationRating] = useState<number | null>(null)
  const [validationSubmitted, setValidationSubmitted] = useState(false)
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

  return (
    <section className="relative w-full overflow-hidden bg-[#067bc2]" id="home">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.09),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(255,145,0,0.16),transparent_22%),radial-gradient(circle_at_65%_78%,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="tripu-dots pointer-events-none absolute -left-8 top-20 -z-10 h-24 w-24 opacity-18 md:h-32 md:w-32" />
      <div className="tripu-dots pointer-events-none absolute bottom-16 right-6 -z-10 h-20 w-20 opacity-16 md:h-28 md:w-28" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-36 hidden h-44 w-px bg-gradient-to-b from-white/75 via-white/30 to-transparent md:block" />
      <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] -z-10 h-44 w-44 rounded-full bg-white/6 blur-3xl md:h-52 md:w-52" />
      <div className="pointer-events-none absolute left-[-3rem] bottom-[10%] -z-10 h-40 w-40 rounded-full bg-[#ff9100]/8 blur-3xl md:h-48 md:w-48" />

      <div className="pointer-events-none absolute left-0 right-0 top-2.5 z-0 overflow-hidden px-4 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="tripu-hero-strip relative overflow-hidden rounded-full border border-white/12 bg-white/6 py-1.5 backdrop-blur-[2px]">
            <div
              className="tripu-hero-strip-track flex w-max items-center gap-3 px-4"
              style={{ animation: 'tripuHeroStripDrift 36s linear infinite' }}
            >
              {stripItems.map((icon, index) => (
                <span key={`${icon}-${index}`} className="tripu-hero-strip-item inline-flex items-center gap-2 text-white/72">
                  <span className="text-[0.8rem] opacity-80 sm:text-sm md:text-[0.95rem]">{icon}</span>
                  <span className="h-px w-4 bg-white/18 sm:w-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-10 pt-6 md:px-8 md:pb-12 md:pt-7 lg:pb-14 lg:pt-8">
        <Reveal>
          <header className="flex items-start">
            <button type="button" onClick={onHome} className="flex w-fit flex-col items-start text-left">
              <img
                src={tripulikeLogo}
                alt="TripuLike"
                className="h-14 w-auto drop-shadow-[0_4px_16px_rgba(2,35,72,0.2)] md:h-16"
              />
              <p className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.22em] text-white/85 md:text-[0.64rem]">
                Travel Experience Platform
              </p>
            </button>
          </header>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:mt-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:items-start lg:gap-10">
          <Reveal>
            <div className="relative pl-0 md:pl-5 xl:pl-8">
              <h1 className="hero-hook max-w-4xl text-left leading-none text-white">
                <span className="block text-[clamp(1.5rem,1.9vw,2rem)] font-medium tracking-[-0.02em] text-white/92">
                  Plan your trip.
                </span>
                <span className="mt-1 block text-[clamp(2.1rem,4.8vw,4.1rem)] font-extrabold tracking-[-0.035em] text-white">
                  In your <span className="text-[#ff9100]">budget</span>
                </span>
                <span className="tripu-outline mt-1 block text-[clamp(1.7rem,3.1vw,3.05rem)] font-semibold tracking-[-0.028em] text-white/10">
                  With full control
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-left text-[0.96rem] leading-relaxed text-white/88 md:text-[1.02rem]">
                Connect directly with local providers for activities, transport, and trusted support.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={onTryDemo}
                  className="rounded-full border border-orange-300/40 bg-[#ff9100] px-5 py-2 text-[0.9rem] font-semibold text-white shadow-lg shadow-orange-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500"
                >
                  Try the Demo
                </button>
                <button
                  type="button"
                  onClick={onJoinWaitlist}
                  className="rounded-full border border-white/30 bg-transparent px-4.5 py-2 text-[0.9rem] font-medium text-white/92 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  onClick={() => setShowContact((prev) => !prev)}
                  className="px-2 py-2 text-[0.9rem] font-medium text-white/75 underline decoration-white/35 underline-offset-4 transition duration-300 hover:text-white"
                >
                  Contact
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {['🧭 Plan', '📩 Request', '💬 Offers', '✅ Confirm'].map((step) => (
                  <span
                    key={step}
                    className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.02em] text-white/90"
                  >
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-4 max-w-[520px] rounded-[1.2rem] border border-white/14 bg-white/10 p-3.5 shadow-[0_18px_45px_rgba(2,35,72,0.18)] backdrop-blur-md md:p-4">
                {!validationSubmitted ? (
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-orange-200">Quick validation</p>
                        <p className="mt-1.5 max-w-xl text-[0.88rem] leading-relaxed text-white/92 md:text-[0.94rem]">
                          Do you want to get your activity booked in advance to get an estimated cost of the trip?
                        </p>
                      </div>
                      <span className="hidden rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/75 sm:inline-flex">
                        30 sec
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(['yes', 'no'] as const).map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setValidationChoice(choice)}
                          className={`rounded-full border px-3.5 py-1.5 text-[0.9rem] font-semibold transition duration-300 ${
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
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80">Importance out of 10</p>
                        <span className="text-[0.68rem] font-medium text-white/72">{validationRating ? `${validationRating}/10` : 'Select a value'}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setValidationRating(value)}
                            className={`h-8 rounded-full border text-[0.72rem] font-semibold transition duration-300 sm:h-7 ${
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

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (!validationChoice || !validationRating) {
                            return
                          }

                          setValidationSubmitted(true)
                        }}
                        className="rounded-full bg-white px-4 py-1.8 text-[0.9rem] font-semibold text-[#055f95] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50"
                      >
                        Submit feedback
                      </button>
                      <p className="text-[0.72rem] text-white/72">Quick input to help shape TripuLike.</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-[1.1rem] border border-white/14 bg-white/8 p-3.5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,145,0,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_28%)]" />
                    <div className="relative flex items-start gap-3">
                      <div className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#067bc2] shadow-lg shadow-black/10">
                        <span className="text-lg">✅</span>
                        <span
                          className="absolute inset-0 rounded-full border border-white/70"
                          style={{ animation: 'tripuValidationPulse 1.8s ease-in-out infinite' }}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-orange-200">Thanks for sharing your view</p>
                        <p className="text-[0.88rem] leading-relaxed text-white/92">Great — explore more about TripuLike below.</p>
                        <p className="text-[0.88rem] leading-relaxed text-white/80">Your feedback helps us shape the platform.</p>
                      </div>
                    </div>

                    <div className="relative mt-3.5 flex items-center gap-2 overflow-hidden">
                      {['✈️', '🧭', '🎟️', '💳', '✅'].map((icon, index) => (
                        <span
                          key={icon}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/14 bg-white/10 text-[0.85rem] text-white shadow-sm shadow-black/10"
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
                      className="relative mt-3.5 rounded-full border border-white/18 bg-white/8 px-4 py-1.8 text-[0.9rem] font-semibold text-white/92 transition hover:bg-white/12"
                    >
                      Answer again
                    </button>
                  </div>
                )}
              </div>

              {showContact && (
                <div id="hero-contact" className="mt-5 max-w-md rounded-2xl border border-white/25 bg-white/12 p-4 shadow-xl shadow-black/10 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Contact</p>
                  <p className="mt-2 text-base font-semibold text-white">Founder: Ahmed Esam</p>
                  <a
                    href="mailto:ahmedabuhjar476@gmail.com"
                    className="mt-1 block text-sm text-white/90 underline underline-offset-2"
                  >
                    ahmedabuhjar476@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-3 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                  >
                    Copy Email
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative pt-2 lg:pt-4">
              <div className="mb-5 flex justify-end lg:pr-5">
                <div className="tripu-coming-soon-text w-full max-w-[360px] text-center">
                  <span className="tripu-coming-soon-line tripu-coming-soon-line-1 block text-[clamp(2.15rem,4.3vw,4rem)] leading-[0.92] text-white">
                    COMING
                  </span>
                  <span className="tripu-coming-soon-line tripu-coming-soon-line-2 mt-0.5 block text-[clamp(2.35rem,4.7vw,4.25rem)] leading-[0.9] text-white">
                    SOON
                  </span>
                </div>
              </div>

              <div className="relative ml-auto w-full max-w-[420px] overflow-hidden rounded-[1.45rem] border border-white/18 bg-white/10 p-2.5 shadow-[0_30px_90px_rgba(2,35,72,0.35)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 lg:rotate-[-3deg]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,145,0,0.12))]" />
                <img
                  src={decorationImage}
                  alt="Travel flat lay with camera, passport, map, and accessories"
                  className="relative h-[215px] w-full rounded-[1.05rem] object-cover object-center shadow-lg sm:h-[245px] lg:h-[285px]"
                />

                <div className="relative mt-3 flex flex-wrap items-center justify-between gap-3 px-1 pb-1">
                  <div className="flex items-center gap-2 text-white/92">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                      LAUNCH TEASER
                    </span>
                  </div>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-orange-200">TRIPULIKE</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
