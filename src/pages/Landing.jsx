import { useEffect, useRef } from 'react'
import MediaStage from '../components/MediaStage'
import InfoPanels from '../components/InfoPanels'
import { usePageEntrance } from '../hooks/usePageEntrance'
import { useScrollTimeline } from '../hooks/useScrollTimeline'

function ArrowDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}

export default function Landing() {
  const rootRef = useRef(null)
  const scrollRootRef = useRef(null)

  // Entrance reveal for the surrounding sections (intro, video, cta).
  // Scoped to rootRef so it never reaches across into the scroll showcase,
  // which is animated by useScrollTimeline.
  usePageEntrance(rootRef)

  // Scroll-driven work showcase. Scoped to scrollRootRef so the entrance
  // .text-char-slide reveal only animates the hero text inside the
  // showcase, never the surrounding landing-page sections.
  useScrollTimeline(scrollRootRef)

  // Showcase scroll indicator — fades in once the pinned-viewport is
  // active, then hands over to a scroll-driven fade as the user begins
  // the morph. Computes progress relative to the scroll-space's own
  // position so the fade timing stays correct regardless of where the
  // showcase sits on the page.
  const workIndicatorRef = useRef(null)
  useEffect(() => {
    const el = workIndicatorRef.current
    if (!el) return
    el.style.transition = 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)'

    let activated = false
    let scrollHandler

    const enterTimer = window.setTimeout(() => {
      el.style.opacity = '1'
    }, 1000)

    const activate = () => {
      if (activated) return
      activated = true
      el.style.transition = 'opacity 0.4s ease-out'
      scrollHandler = () => {
        const ss = document.getElementById('scroll-space')
        if (!ss) return
        const ssRect = ss.getBoundingClientRect()
        // Scroll progress within the scroll-space (0 at top, grows as user scrolls).
        const progress = Math.max(
          0,
          Math.min(1, -ssRect.top / Math.max(1, ss.offsetHeight - window.innerHeight))
        )
        // Fade over the first 18% of the morph so the indicator clears
        // before the first project panel settles in.
        el.style.opacity = String(Math.max(0, 1 - progress / 0.18))
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            activate()
          }
        }
      },
      { threshold: [0, 0.3, 0.6, 0.9] }
    )
    const pinned = document.getElementById('pinned-viewport')
    if (pinned) observer.observe(pinned)

    // Fallback: if for some reason IntersectionObserver never fires,
    // activate after a long timeout so the indicator is still interactive.
    const fallbackTimer = window.setTimeout(activate, 3000)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(fallbackTimer)
      observer.disconnect()
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <main ref={rootRef} className="relative">
      {/* SELECTED WORK — the dominant section, scroll-driven showcase */}
      <section
        id="work"
        className="relative"
        data-landing-work
      >
        <div
          ref={scrollRootRef}
          id="scroll-space"
          className="w-full relative h-[800vh]"
        >
          <div
            id="pinned-viewport"
            className="sticky top-0 left-0 w-full h-screen overflow-hidden flex justify-center items-center"
          >
            <div
              id="hero-text-wrapper"
              className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4"
            >
              <span className="label-eyebrow text-ink/55 mb-7">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">
                    munna-68 · web developer
                  </span>
                </span>
              </span>

              <h1 className="font-serif text-[15vw] md:text-[12rem] lg:text-[11.5rem] font-medium tracking-[-0.04em] text-ink leading-[0.92] mb-6">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    Selected work
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h1>

              <p className="max-w-xl text-sm md:text-[15px] text-ink/75 font-medium leading-relaxed tracking-wide px-4">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    An independent web developer crafting considered digital
                    experiences — type, motion, and code, in that order.
                  </span>
                </span>
              </p>
            </div>

            <div ref={workIndicatorRef} className="scroll-indicator">
              <span>scroll</span>
              <ArrowDown />
              <div className="line">
                <div className="dot" />
              </div>
            </div>

            <MediaStage />
            <InfoPanels />
          </div>
        </div>
      </section>
    </main>
  )
}
