import { supabase } from '../utils/supabase/client'

type FeedbackPayload = {
  sessionId: string
  wouldUsePlatform: string
  likesAboutIdea?: string
  valueSeenInPlatform?: string
  trustImprovement?: string
  concerns?: string
}

export function validateFeedbackInput(payload: FeedbackPayload) {
  if (!payload.wouldUsePlatform.trim()) {
    throw new Error('Please answer the first feedback question.')
  }
}

export async function submitFeedback(payload: FeedbackPayload) {
  validateFeedbackInput(payload)

  const { error } = await supabase.from('feedback_responses').insert({
    session_id: payload.sessionId,
    would_use_platform: payload.wouldUsePlatform.trim(),
    likes_about_idea: payload.likesAboutIdea?.trim() || null,
    value_seen_in_platform: payload.valueSeenInPlatform?.trim() || null,
    trust_improvement: payload.trustImprovement?.trim() || null,
    concerns: payload.concerns?.trim() || null,
  })

  if (error) {
    throw new Error(error.message)
  }
}
