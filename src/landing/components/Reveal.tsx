import type { ReactNode } from 'react'
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

type RevealProps = {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className = '' }: RevealProps) {
  const { elementRef, isVisible } = useFadeInOnScroll<HTMLDivElement>()

  return (
    <div
      ref={elementRef}
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-[1px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}
