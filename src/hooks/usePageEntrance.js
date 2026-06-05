import { useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Mirrors the entrance choreography used by useScrollTimeline:
 *   - staggered text reveal via .text-char-slide  (y: '115%' -> '0%')
 *   - page media fades + lifts in via .page-media
 * Scoped to a root ref so it never reaches across pages.
 */
export function usePageEntrance(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(root.querySelectorAll('.text-char-slide'), {
        y: '0%',
        duration: 1.8,
        stagger: 0.15,
        ease: 'power4.out',
      }).fromTo(
        root.querySelectorAll('.page-media'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.0, ease: 'power4.out' },
        '-=1.2'
      )
    }, root)

    return () => ctx.revert()
  }, [])
}
