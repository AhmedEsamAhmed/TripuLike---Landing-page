import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'

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

export function WaitlistSection() {
  const [form, setForm] = useState<WaitlistForm>(initialForm)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('TripuLike Waitlist Submission', form)
    setForm(initialForm)
  }

  return (
    <section className="bg-orange-50/60 px-4 py-16 md:px-8" id="waitlist">
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
          className="grid gap-4 rounded-2xl border border-[#067bc2]/20 bg-white p-6 shadow-lg shadow-orange-500/15 md:grid-cols-2"
        >
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
            placeholder="Name"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2"
            placeholder="Email"
          />
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="rounded-lg border border-[#067bc2]/20 bg-white px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 transition-all focus:ring-2 md:col-span-2"
            placeholder="Phone (optional)"
          />
          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] md:col-span-2 md:w-fit"
          >
            Join Waitlist
          </button>
        </form>
      </Reveal>
    </section>
  )
}
