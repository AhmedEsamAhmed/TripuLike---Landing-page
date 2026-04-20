const SESSION_STORAGE_KEY = 'tripulike_session_id'

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  const random = Math.random().toString(36).slice(2)
  return `tripu-${Date.now()}-${random}`
}

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') {
    return 'server-session'
  }

  const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY)

  if (existingSessionId) {
    return existingSessionId
  }

  const sessionId = createSessionId()
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
  return sessionId
}

export function getSessionId() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(SESSION_STORAGE_KEY)
}
