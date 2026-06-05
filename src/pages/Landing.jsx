import { useEffect, useRef } from 'react'
import { TransitionLink } from '../components/LiquidTransition'
import ProjectCard from '../components/ProjectCard'
import { usePageEntrance } from '../hooks/usePageEntrance'
import { useProjectCardReveal } from '../hooks/useProjectCardReveal'
import { projects } from '../data/projects'

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

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function VideoTile() {
  // Self-contained editorial video tile — preserves the existing
  // "video section" of the old home page, but in a quieter, more
  // presentational form that fits the work-first landing.
  return (
    <figure className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-midnight shadow-[0_40px_80px_-30px_rgba(26,20,36,0.45)]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        poster=""
        aria-hidden
      >
        <source
          src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,20,36,0.2) 0%, rgba(26,20,36,0.5) 100%)',
        }}
      />
      <figcaption className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-cream">
        <div className="flex items-center gap-3 mb-3 text-[10.5px] font-mono tracking-widest-2 uppercase text-cream/70">
          <span className="font-serif italic text-base text-cream">—</span>
          <span>Field notes</span>
        </div>
        <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-0.025em] leading-[1.05] max-w-2xl text-cream">
          A short loop — the work, the rhythm of it
          <span className="text-accent italic font-normal">.</span>
        </p>
      </figcaption>
    </figure>
  )
}

export default function Landing() {
  const rootRef = useRef(null)
  usePageEntrance(rootRef)
  useProjectCardReveal(rootRef)

  // Scroll indicator — only meaningful when the intro fits the viewport.
  const indicatorRef = useRef(null)
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
      {/* INTRO — short, work-first */}
      <section
        className="relative min-h-[88vh] md:min-h-screen flex flex-col justify-center px-[5vw] md:px-[8vw] pt-32 md:pt-40 pb-16"
        data-landing-intro
      >
        <div className="max-w-8xl mx-auto w-full">
          <div className="flex items-baseline gap-3 md:gap-4 mb-7 md:mb-9">
            <span className="text-line-mask inline-block">
              <span className="text-char-slide label-eyebrow text-ink/55">
                Munna · web developer · 2026
              </span>
            </span>
            <span className="flex-1 h-px bg-ink/10" />
            <span className="text-line-mask inline-block">
              <span className="text-char-slide label-eyebrow text-ink/35">
                Selected work · 03
              </span>
            </span>
          </div>

          <h1 className="font-serif text-[12vw] sm:text-[10vw] md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] font-medium tracking-[-0.04em] leading-[0.92] text-ink max-w-[16ch] mb-8 md:mb-10">
            <span className="text-line-mask">
              <span className="text-char-slide">
                Designing and building modern web experiences
                <span className="text-accent italic font-normal">.</span>
              </span>
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 max-w-6xl">
            <p className="md:col-span-7 text-[15px] md:text-[17px] leading-[1.7] text-ink/75 max-w-2xl">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  I’m Munna — an independent web developer working on
                  considered digital products for hospitality, travel, and
                  small studios. Type, motion, and code — in that order.
                </span>
              </span>
            </p>
            <p className="md:col-span-5 text-[14px] md:text-[15px] leading-[1.7] text-ink/55 max-w-md">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  Specialising in editorial interfaces, brand sites, and
                  marketing builds that read like the work they were made
                  for. Available for select freelance work through 2026.
                </span>
              </span>
            </p>
          </div>
        </div>

        <div ref={indicatorRef} className="scroll-indicator">
          <span>scroll</span>
          <ArrowDown />
          <div className="line">
            <div className="dot" />
          </div>
        </div>
      </section>

      {/* FEATURED WORK — the dominant section */}
      <section
        id="work"
        className="relative px-[5vw] md:px-[8vw] py-24 md:py-36"
        data-landing-work
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
            <div>
              <p className="label-eyebrow text-ink/50 mb-5">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">Featured work —</span>
                </span>
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-ink max-w-[14ch]">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    Selected projects, 2026
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 text-right">
              <span className="label-eyebrow text-ink/45">
                Hospitality · Travel · Studio
              </span>
              <span className="label-eyebrow text-ink/35">3 projects</span>
            </div>
          </div>

          <div className="flex flex-col gap-28 md:gap-40">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO — preserved from the existing home */}
      <section
        className="relative px-[5vw] md:px-[8vw] py-20 md:py-28"
        data-landing-video
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <p className="label-eyebrow text-ink/50 mb-3">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">In motion —</span>
                </span>
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-[-0.025em] leading-tight text-ink max-w-xl">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    A short loop of the work in progress
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h2>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 label-eyebrow text-ink/40">
              <PlayIcon /> 0:18 · looped
            </span>
          </div>
          <VideoTile />
        </div>
      </section>

      {/* WORK TOGETHER — preserved and rewritten */}
      <section
        className="relative px-[5vw] md:px-[8vw] py-28 md:py-40"
        data-landing-cta
      >
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-ink/50 mb-5">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">Work together —</span>
              </span>
            </p>
            <h2 className="font-serif text-[12vw] md:text-[4.5rem] lg:text-[5.5rem] font-medium tracking-[-0.04em] leading-[0.96] text-ink max-w-[14ch]">
              <span className="text-line-mask">
                <span className="text-char-slide">
                  Have a project in mind? Let’s build something considered
                  <span className="text-accent italic font-normal">.</span>
                </span>
              </span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] md:text-[16px] leading-[1.7] text-ink/65">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  I take on a small number of projects each quarter. If
                  you’re working on something that needs to feel like one
                  place, the inbox is open.
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
                <TransitionLink
                  to="/home"
                  className="pointer-events-auto pill-link"
                >
                  About me <ArrowRight />
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
                Built with React, Vite, GSAP, and a notebook
              </span>
            </span>
          </p>
        </div>
      </section>
    </main>
  )
}
