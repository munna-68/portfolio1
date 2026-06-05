import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Stagger-in animation for a set of project cards. Each card slides up and
 * fades in as it enters the viewport (or all on mount, whichever first).
 * Uses GSAP + ScrollTrigger to match the existing motion system.
 */
export function useProjectCardReveal(rootRef, selector = '[data-project-card]') {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(selector)
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: cards[0] || root,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [rootRef, selector])
}
