import { useEffect, useRef } from 'react'
import MediaStage from '../components/MediaStage'
import InfoPanels from '../components/InfoPanels'
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

export default function Work() {
  useScrollTimeline()
  const indicatorRef = useRef(null)

  // Scroll indicator inside the pinned viewport — fades in on load,
  // then hands over to a scroll-driven fade as the user begins the morph.
  useEffect(() => {
    const el = indicatorRef.current
    if (!el) return
    el.style.transition = 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
    const enterTimer = window.setTimeout(() => {
      el.style.opacity = '1'
    }, 1000)

    let scrollHandler
    const handoffTimer = window.setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease-out'
      scrollHandler = () => {
        const y = window.scrollY
        el.style.opacity = String(Math.max(0, 1 - y / 180))
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    }, 2500)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(handoffTimer)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className="select-none antialiased">
      <div id="scroll-space" className="w-full relative h-[800vh]">
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

          <div ref={indicatorRef} className="scroll-indicator">
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
    </div>
  )
}
