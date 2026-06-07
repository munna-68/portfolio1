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
      const textSlides = root.querySelectorAll('.text-char-slide')
      const pageMedia = root.querySelectorAll('.page-media')
      if (!textSlides.length && !pageMedia.length) return

      const tl = gsap.timeline()
      if (textSlides.length) {
        tl.to(textSlides, {
          y: '0%',
          duration: 1.8,
          stagger: 0.15,
          ease: 'power4.out',
        })
      }
      if (pageMedia.length) {
        tl.fromTo(
          pageMedia,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 2.0, ease: 'power4.out' },
          textSlides.length ? '-=1.2' : 0
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])
}
