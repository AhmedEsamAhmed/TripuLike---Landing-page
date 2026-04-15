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
  const backgroundIcons = [
    { icon: '✈️', className: 'left-5 top-24 animate-[tripuDrift_8s_ease-in-out_infinite]', toneClass: 'text-white/26' },
    { icon: '📍', className: 'left-12 bottom-20 animate-[tripuDrift_9s_ease-in-out_infinite]', toneClass: 'text-orange-100/35' },
    { icon: '📷', className: 'left-1/2 top-24 animate-[tripuDrift_8.5s_ease-in-out_infinite]', toneClass: 'text-cyan-100/30' },
    { icon: '🧭', className: 'right-10 top-28 animate-[tripuDrift_8s_ease-in-out_infinite]', toneClass: 'text-white/24' },
    { icon: '🧳', className: 'right-12 bottom-28 animate-[tripuDrift_8.8s_ease-in-out_infinite]', toneClass: 'text-orange-100/35' },
    { icon: '🌊', className: 'right-1/3 bottom-12 animate-[tripuDrift_9.2s_ease-in-out_infinite]', toneClass: 'text-cyan-100/32' },
    { icon: '➜', className: 'right-24 top-1/2 animate-[tripuDrift_7.6s_ease-in-out_infinite]', toneClass: 'text-white/24' },
    { icon: '⌁', className: 'left-1/3 bottom-28 animate-[tripuDrift_8.4s_ease-in-out_infinite]', toneClass: 'text-orange-100/30' },
  ]

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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,145,0,0.24),transparent_30%),radial-gradient(circle_at_65%_78%,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="tripu-dots pointer-events-none absolute -left-10 top-20 -z-10 h-40 w-40 opacity-45" />
      <div className="tripu-dots pointer-events-none absolute bottom-14 right-8 -z-10 h-32 w-32 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-36 hidden h-44 w-px bg-gradient-to-b from-white/75 via-white/30 to-transparent md:block" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

      {backgroundIcons.map((item) => (
        <span
          key={`${item.icon}-${item.className}`}
          aria-hidden="true"
          className={`pointer-events-none absolute select-none text-xl transition-all duration-500 sm:text-2xl md:text-3xl ${item.className} ${item.toneClass}`}
        >
          {item.icon}
        </span>
      ))}

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">
        <Reveal>
          <header className="flex items-start">
            <button type="button" onClick={onHome} className="flex w-fit flex-col items-start text-left">
              <img
                src={tripulikeLogo}
                alt="TripuLike"
                className="h-16 w-auto drop-shadow-[0_4px_16px_rgba(2,35,72,0.2)] md:h-20"
              />
              <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/85 md:text-[0.68rem]">
                Travel Experience Platform
              </p>
            </button>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start lg:gap-12">
          <Reveal>
            <div className="relative pl-0 md:pl-8">
              <h1 className="hero-hook max-w-4xl text-left leading-none text-white">
                <span className="block text-[clamp(1.75rem,2.2vw,2.3rem)] font-medium tracking-[-0.02em] text-white/92">
                  Plan your trip
                </span>
                <span className="mt-1 block text-[clamp(2.45rem,5.4vw,4.9rem)] font-extrabold tracking-[-0.035em] text-white">
                  In your <span className="text-[#ff9100]">budget</span>
                </span>
                <span className="tripu-outline mt-1 block text-[clamp(2rem,3.8vw,3.65rem)] font-semibold tracking-[-0.028em] text-white/10">
                  What you want to do
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-left text-base leading-relaxed text-white/88 md:text-lg">
                Connect directly with local providers for activities, transport, and trusted support.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onTryDemo}
                  className="rounded-full border border-orange-300/40 bg-[#ff9100] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500"
                >
                  Try the Demo
                </button>
                <button
                  type="button"
                  onClick={onJoinWaitlist}
                  className="rounded-full border border-white/30 bg-transparent px-5 py-2.5 text-sm font-medium text-white/92 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  onClick={() => setShowContact((prev) => !prev)}
                  className="px-2 py-2 text-sm font-medium text-white/75 underline decoration-white/35 underline-offset-4 transition duration-300 hover:text-white"
                >
                  Contact
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['🧭 Plan', '📩 Request', '💬 Offers', '✅ Confirm'].map((step) => (
                  <span
                    key={step}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold tracking-[0.02em] text-white/90"
                  >
                    {step}
                  </span>
                ))}
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
                <div className="tripu-coming-soon-text w-full max-w-[420px] text-center">
                  <span className="block text-[clamp(2.5rem,5.2vw,4.95rem)] leading-[0.92] text-white">
                    COMING
                  </span>
                  <span className="mt-1 block text-[clamp(2.8rem,5.8vw,5.35rem)] leading-[0.9] text-white">
                    SOON
                  </span>
                </div>
              </div>

              <div className="relative ml-auto w-full max-w-[480px] overflow-hidden rounded-[1.45rem] border border-white/18 bg-white/10 p-3 shadow-[0_30px_90px_rgba(2,35,72,0.35)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 lg:rotate-[-3deg]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,145,0,0.12))]" />
                <img
                  src={decorationImage}
                  alt="Travel flat lay with camera, passport, map, and accessories"
                  className="relative h-[260px] w-full rounded-[1.1rem] object-cover object-center shadow-lg sm:h-[300px] lg:h-[340px]"
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
