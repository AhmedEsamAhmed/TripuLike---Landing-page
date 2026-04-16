import { useEffect, useRef, useState } from 'react'

export function useScrollProgress<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrame = 0

    const updateProgress = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const element = elementRef.current
        if (!element) {
          return
        }

        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const scrollableDistance = Math.max(rect.height - viewportHeight, 1)
        const scrolledDistance = Math.min(Math.max(-rect.top, 0), scrollableDistance)

        setProgress(scrolledDistance / scrollableDistance)
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return { elementRef, progress }
}
