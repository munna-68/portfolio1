import { useEffect, useRef } from 'react'
import { TransitionLink } from '../components/LiquidTransition'
import { usePageEntrance } from '../hooks/usePageEntrance'

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

function ArrowRight() {
  return (
    <svg
      className="arrow w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  )
}

export default function Home() {
  const rootRef = useRef(null)
  const indicatorRef = useRef(null)
  usePageEntrance(rootRef)

  // Robust scroll-indicator: fade in on load, then scroll-driven fade out.
  useEffect(() => {
    const el = indicatorRef.current
    if (!el) return
    el.style.transition = 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
    const enterTimer = window.setTimeout(() => {
      el.style.opacity = '1'
    }, 1100)

    let scrollHandler
    const handoffTimer = window.setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease-out'
      scrollHandler = () => {
        const y = window.scrollY
        el.style.opacity = String(Math.max(0, 1 - y / 220))
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    }, 2600)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(handoffTimer)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <main ref={rootRef} className="relative">
      {/* HERO — full viewport, centered editorial landing */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <span className="label-eyebrow text-ink/50 mb-8 md:mb-10">
          <span className="text-line-mask inline-block">
            <span className="text-char-slide">
              munna-68 · web developer · 2026
            </span>
          </span>
        </span>

        <h1 className="font-serif text-[19vw] sm:text-[16vw] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-medium tracking-[-0.05em] leading-[0.9] text-ink mb-3 md:mb-4">
          <span className="text-line-mask">
            <span className="text-char-slide">
              Munna
              <span className="text-accent italic font-normal">.</span>
            </span>
          </span>
        </h1>

        <p className="font-serif italic text-xl md:text-2xl lg:text-[1.9rem] text-ink/55 tracking-[-0.01em] leading-tight mb-9 md:mb-12">
          <span className="text-line-mask">
            <span className="text-char-slide">
              web developer
              <span className="text-accent font-normal">.</span>
            </span>
          </span>
        </p>

        <p className="max-w-xl text-[15px] md:text-[16px] text-ink/70 font-medium leading-[1.7] tracking-wide px-4">
          <span className="text-line-mask">
            <span className="text-char-slide">
              An independent web developer crafting considered digital
              experiences — type, motion, and the quiet details in between.
            </span>
          </span>
        </p>

        <div ref={indicatorRef} className="scroll-indicator">
          <span>scroll</span>
          <ArrowDown />
          <div className="line">
            <div className="dot" />
          </div>
        </div>
      </section>

      {/* OUTRO — small editorial colophon so the page is complete and the scroll indicator has somewhere to point */}
      <section className="relative px-[5vw] md:px-[8vw] py-24 md:py-32">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-ink/50 mb-5">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">Currently —</span>
              </span>
            </p>
            <p className="font-serif text-2xl md:text-[2rem] lg:text-[2.4rem] text-ink/85 leading-[1.2] tracking-[-0.02em] max-w-xl">
              <span className="text-line-mask">
                <span className="text-char-slide">
                  Available for select freelance work and quiet collaborations
                  through 2026
                  <span className="text-accent italic font-normal">.</span>
                </span>
              </span>
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end gap-4">
            <span className="text-line-mask inline-block">
              <span className="text-char-slide">
                <TransitionLink
                  to="/contact"
                  className="pointer-events-auto pill-link-solid"
                >
                  Get in touch <ArrowRight />
                </TransitionLink>
              </span>
            </span>
            <span className="text-line-mask inline-block">
              <span className="text-char-slide">
                <TransitionLink to="/work" className="pointer-events-auto pill-link">
                  See the work <ArrowRight />
                </TransitionLink>
              </span>
            </span>
          </div>
        </div>

        <div className="max-w-8xl mx-auto mt-20 md:mt-28 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="label-eyebrow text-ink/45">
            <span className="text-line-mask inline-block">
              <span className="text-char-slide">© 2026 Munna · @munna-68</span>
            </span>
          </p>
          <p className="label-eyebrow text-ink/35">
            <span className="text-line-mask inline-block">
              <span className="text-char-slide">
                Selected work is placeholder
              </span>
            </span>
          </p>
        </div>
      </section>
    </main>
  )
}
