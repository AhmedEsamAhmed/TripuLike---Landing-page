import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { trackAnalyticsEvent } from '../../services/analyticsService'
import { submitFeedback } from '../../services/feedbackService'

type FeedbackForm = {
  useIt: string
  likes: string
  value: string
  concerns: string
  trust: string
}

const initialFeedback: FeedbackForm = {
  useIt: '',
  likes: '',
  value: '',
  concerns: '',
  trust: '',
}

type FeedbackSectionProps = {
  sessionId: string
}

export function FeedbackSection({ sessionId }: FeedbackSectionProps) {
  const [feedback, setFeedback] = useState<FeedbackForm>(initialFeedback)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      await submitFeedback({
        sessionId,
        wouldUsePlatform: feedback.useIt,
        likesAboutIdea: feedback.likes,
        valueSeenInPlatform: feedback.value,
        trustImprovement: feedback.trust,
        concerns: feedback.concerns,
      })

      try {
        await trackAnalyticsEvent({
          sessionId,
          eventName: 'submitted_feedback',
          page: '/landing',
        })
      } catch {
        // Do not block primary flow when analytics insert fails
      }

      setSubmitSuccess('Thanks for the feedback. Your input helps shape TripuLike.')
      setFeedback(initialFeedback)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not submit feedback. Please try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-50/50 px-4 py-12 sm:py-14 md:px-8 md:py-16" id="feedback">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Validation"
            title="Tell us what you think"
            subtitle="Your feedback shapes the first public release of TripuLike."
          />
        </Reveal>
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="grid gap-3 rounded-xl border border-[#067bc2]/20 bg-white p-4 shadow-lg shadow-[#067bc2]/15 sm:gap-4 sm:rounded-2xl sm:p-5 md:gap-4 md:rounded-2xl md:p-6"
          >
            <textarea
              required
              value={feedback.useIt}
              onChange={(event) => setFeedback((prev) => ({ ...prev, useIt: event.target.value }))}
              className="min-h-24 rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:min-h-26 sm:px-4 sm:py-3 sm:text-[0.95rem] md:min-h-28"
              placeholder="1) Would you use a platform like this to plan and arrange your trip?"
            />
            <textarea
              value={feedback.likes}
              onChange={(event) => setFeedback((prev) => ({ ...prev, likes: event.target.value }))}
              className="min-h-24 rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:min-h-26 sm:px-4 sm:py-3 sm:text-[0.95rem] md:min-h-28"
              placeholder="2) What do you like about this idea?"
            />
            <textarea
              value={feedback.value}
              onChange={(event) => setFeedback((prev) => ({ ...prev, value: event.target.value }))}
              className="min-h-24 rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:min-h-26 sm:px-4 sm:py-3 sm:text-[0.95rem] md:min-h-28"
              placeholder="3) What value do you see in this platform?"
            />
            <textarea
              value={feedback.trust}
              onChange={(event) => setFeedback((prev) => ({ ...prev, trust: event.target.value }))}
              className="min-h-24 rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:min-h-26 sm:px-4 sm:py-3 sm:text-[0.95rem] md:min-h-28"
              placeholder="4) What would make you trust it more?"
            />
            <textarea
              value={feedback.concerns}
              onChange={(event) => setFeedback((prev) => ({ ...prev, concerns: event.target.value }))}
              className="min-h-24 rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:min-h-26 sm:px-4 sm:py-3 sm:text-[0.95rem] md:min-h-28"
              placeholder="5) What concerns you?"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white transition hover:scale-[1.02] sm:w-fit sm:rounded-xl sm:px-5 sm:py-3"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            {submitSuccess && <p className="text-xs font-medium text-emerald-700 sm:text-sm">{submitSuccess}</p>}
            {submitError && <p className="text-xs font-medium text-red-600 sm:text-sm">{submitError}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
