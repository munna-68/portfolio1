import { useRef } from 'react'
import { usePageEntrance } from '../hooks/usePageEntrance'
import { TransitionLink } from '../components/LiquidTransition'

export default function Home() {
  const rootRef = useRef(null)
  usePageEntrance(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative pt-40 md:pt-44 pb-24 px-[5vw] md:px-[8vw]"
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Left rail — label + meta */}
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-32">
            <p className="label-eyebrow text-ink/50 mb-4">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">About —</span>
              </span>
            </p>
            <p className="label-eyebrow text-ink/40 leading-loose">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  Independent
                  <br />
                  Web · 2022 —
                  <br />
                  Based anywhere
                </span>
              </span>
            </p>
          </div>
        </aside>

        {/* Right — bio + services */}
        <section id="about" className="md:col-span-9 flex flex-col justify-between">
          
          {/* Block 1 — Hero statement row */}
          <div className="pb-16 flex items-center gap-4">
            <span className="label-eyebrow text-ink/50">ABOUT</span>
            <span className="w-12 h-px bg-ink/10" />
          </div>

          {/* Block 2 — Headline + photo split */}
          <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Headline & subline */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[9vw] md:text-[5rem] lg:text-[5.8rem] font-medium tracking-[-0.035em] leading-[0.95] text-ink">
                Two people.
                <br />
                One obsession.
              </h2>
              <p className="text-sm italic text-ink/65 font-serif mt-6">
                We build sites that don't need explaining.
              </p>
            </div>

            {/* Right: portrait photo placeholder */}
            <div className="lg:col-span-5 w-full">
              <div className="w-full aspect-[3/4] overflow-hidden bg-ink/5">
                <img
                  src="/images/about-photo.jpg"
                  alt="Munna"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="label-eyebrow text-[9.5px] text-ink/50 mt-3 tracking-[0.25em]">
                MUNNA — DEVELOPER
              </p>
            </div>
          </div>

          {/* Block 3 — Bio + stats row */}
          <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Bio paragraph */}
            <div className="lg:col-span-7 text-[17px] md:text-[18px] leading-[1.7] text-ink/80 font-normal">
              <p>
                My wife and I run a two-person studio — she handles design and client communication, I handle every line of code. I'm self-taught, in my final year of an MIS degree, and I've been obsessed with how the web works since before I had the words for it. I work remotely with businesses of all sizes, from local shops that need their first site to clients who want something built properly, once. Every project is hand-coded in React and Tailwind. No templates. No shortcuts. Just work that holds up.
              </p>
            </div>

            {/* Right: Stats Table */}
            <div className="lg:col-span-5 flex flex-col pt-12 lg:pt-16 w-full">
              <div className="flex justify-between items-baseline py-4 border-t border-ink/10">
                <span className="label-eyebrow font-bold text-ink/50">ROLE</span>
                <span className="text-[15px] md:text-[16px] text-ink/80 font-normal">Developer</span>
              </div>
              <div className="flex justify-between items-baseline py-4 border-t border-ink/10">
                <span className="label-eyebrow font-bold text-ink/50">STUDIO</span>
                <span className="text-[15px] md:text-[16px] text-ink/80 font-normal">Two-person</span>
              </div>
              <div className="flex justify-between items-baseline py-4 border-t border-ink/10">
                <span className="label-eyebrow font-bold text-ink/50">APPROACH</span>
                <span className="text-[15px] md:text-[16px] text-ink/80 font-normal">Hand-coded, no templates</span>
              </div>
              <div className="flex justify-between items-baseline py-4 border-t border-ink/10">
                <span className="label-eyebrow font-bold text-ink/50">STACK</span>
                <span className="text-[15px] md:text-[16px] text-ink/80 font-normal">React · Tailwind · Vite</span>
              </div>
            </div>
          </div>

          {/* Block 4 — Bottom strip */}
          <div className="py-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-ink/10">
            <p className="label-eyebrow text-ink/50 tracking-[0.3em] text-[11px]">
              REMOTE · AVAILABLE FOR NEW PROJECTS
            </p>
            <TransitionLink
              to="/contact"
              className="text-[15px] text-ink/50 hover:text-ink transition-colors duration-300 underline underline-offset-4 decoration-ink/15 hover:decoration-ink/40 font-mono tracking-wide"
            >
              Start a project &rarr;
            </TransitionLink>
          </div>

        </section>
      </div>
    </main>
  )
}
