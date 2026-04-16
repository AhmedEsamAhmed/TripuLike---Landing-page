import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

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

export function FeedbackSection() {
  const [feedback, setFeedback] = useState<FeedbackForm>(initialFeedback)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('TripuLike Landing Feedback', feedback)
    setFeedback(initialFeedback)
  }

  return (
    <section className="bg-slate-50/50 px-4 py-16 md:px-8" id="feedback">
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
            className="grid gap-4 rounded-2xl border border-[#067bc2]/20 bg-white p-6 shadow-lg shadow-[#067bc2]/15"
          >
            <textarea
              required
              value={feedback.useIt}
              onChange={(event) => setFeedback((prev) => ({ ...prev, useIt: event.target.value }))}
              className="min-h-28 rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
              placeholder="1) Would you use a platform like this to plan and arrange your trip?"
            />
            <textarea
              value={feedback.likes}
              onChange={(event) => setFeedback((prev) => ({ ...prev, likes: event.target.value }))}
              className="min-h-28 rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
              placeholder="2) What do you like about this idea?"
            />
            <textarea
              value={feedback.value}
              onChange={(event) => setFeedback((prev) => ({ ...prev, value: event.target.value }))}
              className="min-h-28 rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
              placeholder="3) What value do you see in this platform?"
            />
            <textarea
              value={feedback.trust}
              onChange={(event) => setFeedback((prev) => ({ ...prev, trust: event.target.value }))}
              className="min-h-28 rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
              placeholder="4) What would make you trust it more?"
            />
            <textarea
              value={feedback.concerns}
              onChange={(event) => setFeedback((prev) => ({ ...prev, concerns: event.target.value }))}
              className="min-h-28 rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
              placeholder="5) What concerns you?"
            />
            <button
              type="submit"
              className="w-fit rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Submit Feedback
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
