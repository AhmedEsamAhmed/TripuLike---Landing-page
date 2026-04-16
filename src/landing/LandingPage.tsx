import { FloatingAppDemo } from './components/FloatingAppDemo'
import { DemoSection } from './sections/DemoSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { HeroSection } from './sections/HeroSection'
import { HowItWorksSection } from './sections/HowItWorksSection'
import { ValueSection } from './sections/ValueSection'
import { WaitlistSection } from './sections/WaitlistSection'
import { HeroValueSection } from './sections/HeroValueSection'
import { HighlightMarqueeStrip } from './components/HighlightMarqueeStrip'

export function LandingPage() {
  const scrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative overflow-x-hidden bg-white text-[#067bc2]">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-[#067bc2]/20 blur-3xl" />
      
      <HeroSection
        onHome={() => scrollTo('home')}
        onTryDemo={() => scrollTo('demo')}
        onHowItWorks={() => scrollTo('how-it-works')}
        onOurValue={() => scrollTo('our-value')}
        onJoinWaitlist={() => scrollTo('waitlist')}
      />

      <HighlightMarqueeStrip />
      
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <HeroValueSection />
        <DemoSection />
        <HowItWorksSection />
        <ValueSection />
        <WaitlistSection />
        <FeedbackSection />
      </div>
      <FloatingAppDemo />
    </div>
  )
}
