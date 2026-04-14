import { useState } from 'react'
import { Reveal } from '../components/Reveal'

type HeroSectionProps = {
  onHome: () => void
  onTryDemo: () => void
  onHowItWorks: () => void
  onOurValue: () => void
  onJoinWaitlist: () => void
}

export function HeroSection({ onHome, onTryDemo, onHowItWorks, onOurValue, onJoinWaitlist }: HeroSectionProps) {
  const [showContact, setShowContact] = useState(false)
  const backgroundIcons = [
    { icon: '✈️', className: 'left-5 top-24 animate-[tripuDrift_8s_ease-in-out_infinite]', toneClass: 'text-white/26' },
    { icon: '📍', className: 'left-12 bottom-20 animate-[tripuDrift_9s_ease-in-out_infinite]', toneClass: 'text-orange-100/35' },
    { icon: '📷', className: 'left-1/2 top-24 animate-[tripuDrift_8.5s_ease-in-out_infinite]', toneClass: 'text-cyan-100/30' },
    { icon: '🧭', className: 'right-10 top-32 animate-[tripuDrift_8s_ease-in-out_infinite]', toneClass: 'text-white/24' },
    { icon: '🧳', className: 'right-8 bottom-24 animate-[tripuDrift_8.8s_ease-in-out_infinite]', toneClass: 'text-orange-100/35' },
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
          <header className="flex flex-wrap items-start justify-between gap-6">
            <button type="button" onClick={onHome} className="text-left">
              <div className="text-3xl font-extrabold leading-none md:text-[2.35rem]">
                <span className="text-white">Trip</span>
                <span className="text-[#ff9100]">u</span>
                <span className="text-white">Like</span>
              </div>
              <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/85 md:text-[0.68rem]">
                Travel Experience Platform
              </p>
            </button>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/85 md:text-[0.95rem]" aria-label="Primary">
              <button type="button" onClick={onHome} className="tripu-nav-link">Home</button>
              <button type="button" onClick={onTryDemo} className="tripu-nav-link">Demo</button>
              <button type="button" onClick={onOurValue} className="tripu-nav-link">Our Value</button>
              <button type="button" onClick={onHowItWorks} className="tripu-nav-link">How It Works</button>
              <button type="button" onClick={() => setShowContact((prev) => !prev)} className="tripu-nav-link">Contact</button>
            </nav>
          </header>
        </Reveal>

        <div className="mt-14 max-w-4xl md:mt-20">
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
        </div>

        <div className="pointer-events-none mt-8 flex items-center gap-3 text-white/55 md:mt-12">
          <span className="h-px w-10 bg-white/45" />
          <span className="text-xs uppercase tracking-[0.26em]">Explore more</span>
          <span className="text-sm">➜</span>
        </div>
      </div>
    </section>
  )
}
