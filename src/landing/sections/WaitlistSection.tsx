import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { trackAnalyticsEvent } from '../../services/analyticsService'
import { submitWaitlist } from '../../services/waitlistService'

type WaitlistForm = {
  name: string
  email: string
  phone: string
}

const initialForm: WaitlistForm = {
  name: '',
  email: '',
  phone: '',
}

type WaitlistSectionProps = {
  sessionId: string
}

export function WaitlistSection({ sessionId }: WaitlistSectionProps) {
  const [form, setForm] = useState<WaitlistForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      await submitWaitlist({
        sessionId,
        name: form.name,
        email: form.email,
        phone: form.phone,
      })

      try {
        await trackAnalyticsEvent({
          sessionId,
          eventName: 'submitted_waitlist',
          page: '/landing',
        })
      } catch {
        // Do not block primary flow when analytics insert fails
      }

      setSubmitSuccess('Thanks. You are on the waitlist and we will contact you soon.')
      setForm(initialForm)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not submit waitlist form. Please try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-orange-50/60 px-4 py-12 sm:py-14 md:px-8 md:py-16" id="waitlist">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <SectionTitle
            eyebrow="Early Access"
            title="Start planning your trip the right way"
            subtitle="Join early access to arrange activities and services before you arrive."
          />
        </Reveal>
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="grid gap-3 rounded-xl border border-[#067bc2]/20 bg-white p-4 shadow-lg shadow-orange-500/15 sm:gap-4 sm:rounded-2xl sm:p-5 md:gap-4 md:grid-cols-2 md:rounded-2xl md:p-6"
          >
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:px-4 sm:py-3 sm:text-[0.95rem]"
              placeholder="Name"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:px-4 sm:py-3 sm:text-[0.95rem]"
              placeholder="Email"
            />
            <input
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2.5 text-sm text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 sm:px-4 sm:py-3 sm:text-[0.95rem] md:col-span-2"
              placeholder="Phone (optional)"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white transition hover:scale-[1.02] sm:rounded-xl sm:px-5 sm:py-3 md:col-span-2 md:w-fit"
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </button>
            {submitSuccess && <p className="text-xs font-medium text-emerald-700 sm:text-sm md:col-span-2">{submitSuccess}</p>}
            {submitError && <p className="text-xs font-medium text-red-600 sm:text-sm md:col-span-2">{submitError}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
