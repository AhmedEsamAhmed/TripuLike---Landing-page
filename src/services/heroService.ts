import { supabase } from '../utils/supabase/client'

type HeroResponsePayload = {
  sessionId: string
  wantsAdvanceBooking: boolean
  importanceRating: number
}

export async function submitHeroResponse(payload: HeroResponsePayload) {
  const { error } = await supabase.from('hero_responses').insert({
    session_id: payload.sessionId,
    wants_advance_booking: payload.wantsAdvanceBooking,
    importance_rating: payload.importanceRating,
  })

  if (error) {
    throw new Error(error.message)
  }
}
