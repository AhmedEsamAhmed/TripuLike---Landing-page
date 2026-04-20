import { supabase } from '../utils/supabase/client'

type WaitlistPayload = {
  sessionId: string
  name: string
  email: string
  phone?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateWaitlistInput(payload: WaitlistPayload) {
  if (!payload.name.trim()) {
    throw new Error('Name is required.')
  }

  if (!payload.email.trim()) {
    throw new Error('Email is required.')
  }

  if (!emailPattern.test(payload.email.trim())) {
    throw new Error('Please enter a valid email address.')
  }
}

export async function submitWaitlist(payload: WaitlistPayload) {
  validateWaitlistInput(payload)

  const { error } = await supabase.from('waitlist_submissions').insert({
    session_id: payload.sessionId,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || null,
  })

  if (!error) {
    return
  }

  if (error.code === '23505') {
    throw new Error('This email is already on the waitlist. Thanks for your interest.')
  }

  throw new Error(error.message)
}
