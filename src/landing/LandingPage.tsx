import { useEffect, useRef, useState } from 'react'
import { FloatingAppDemo } from './components/FloatingAppDemo'
import { DemoSection } from './sections/DemoSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { HeroSection } from './sections/HeroSection'
import { HowItWorksSection } from './sections/HowItWorksSection'
import { ValueSection } from './sections/ValueSection'
import { WaitlistSection } from './sections/WaitlistSection'
import { HeroValueSection } from './sections/HeroValueSection'
import { HighlightMarqueeStrip } from './components/HighlightMarqueeStrip'
import { trackAnalyticsEvent, trackTimeSpentWithKeepalive } from '../services/analyticsService'
import { getOrCreateSessionId } from '../utils/session'

export function LandingPage() {
  const [sessionId] = useState(() => getOrCreateSessionId())
  const hasSentTimeSpentRef = useRef(false)

  const scrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const trackEvent = async (eventName: string, eventValue?: string) => {
    try {
      await trackAnalyticsEvent({
        sessionId,
        eventName,
        eventValue,
        page: '/landing',
      })
    } catch {
      // Keep UI responsive even if analytics insert fails
    }
  }

  useEffect(() => {
    void trackEvent('page_view_landing')
  }, [])

  useEffect(() => {
    const startTime = Date.now()

    const sendTimeSpent = () => {
      if (hasSentTimeSpentRef.current) {
        return
      }

      hasSentTimeSpentRef.current = true
      const millisecondsSpent = Date.now() - startTime
      trackTimeSpentWithKeepalive({
        sessionId,
        millisecondsSpent,
        page: '/landing',
      })
    }

    const onPageHide = () => sendTimeSpent()
    const onBeforeUnload = () => sendTimeSpent()

    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      sendTimeSpent()
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [sessionId])

  return (
    <div className="relative overflow-x-hidden bg-white text-[#067bc2]">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-[#067bc2]/20 blur-3xl" />
      
      <HeroSection
        sessionId={sessionId}
        onHome={() => scrollTo('home')}
        onTryDemo={() => {
          void trackEvent('clicked_try_demo')
          scrollTo('demo')
        }}
        onHowItWorks={() => {
          void trackEvent('clicked_learn_how_it_works')
          scrollTo('how-it-works')
        }}
        onOurValue={() => {
          void trackEvent('clicked_our_value')
          scrollTo('our-value')
        }}
        onJoinWaitlist={() => {
          void trackEvent('clicked_join_waitlist')
          scrollTo('waitlist')
        }}
        onContactClick={() => {
          void trackEvent('clicked_contact')
        }}
      />

      <HighlightMarqueeStrip />
      
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <HeroValueSection />
        <DemoSection />
        <HowItWorksSection />
        <ValueSection />
        <WaitlistSection sessionId={sessionId} />
        <FeedbackSection sessionId={sessionId} />
      </div>
      <FloatingAppDemo />
    </div>
  )
}
