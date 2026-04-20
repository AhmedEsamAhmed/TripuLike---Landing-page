import { supabase } from '../utils/supabase/client'

type AnalyticsEventPayload = {
  sessionId: string
  eventName: string
  eventValue?: string
  page?: string
}

export async function trackAnalyticsEvent(payload: AnalyticsEventPayload) {
  const { error } = await supabase.from('analytics_events').insert({
    session_id: payload.sessionId,
    event_name: payload.eventName,
    event_value: payload.eventValue ?? null,
    page: payload.page ?? '/landing',
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function trackTimeSpentWithKeepalive(payload: { sessionId: string; millisecondsSpent: number; page?: string }) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !publishableKey) {
    return
  }

  const body = JSON.stringify({
    session_id: payload.sessionId,
    event_name: 'time_spent',
    event_value: String(payload.millisecondsSpent),
    page: payload.page ?? '/landing',
  })

  void fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      Prefer: 'return=minimal',
    },
    body,
    keepalive: true,
  })
}
