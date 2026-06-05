import { useRef } from 'react'
import { TransitionLink } from '../components/LiquidTransition'
import { usePageEntrance } from '../hooks/usePageEntrance'

const services = [
  {
    name: 'Interface Design',
    note: 'Design systems, component libraries, and considered UI for the web.',
  },
  {
    name: 'Front-end Engineering',
    note: 'React, Vite, GSAP — performance budgets that actually hold.',
  },
  {
    name: 'Motion & Interaction',
    note: 'Scroll-driven storytelling, page transitions, and micro-interactions.',
  },
  {
    name: 'Brand & Identity',
    note: 'Type, voice, and the small details that make a site feel like one place.',
  },
]

const timeline = [
  { year: '2026', note: 'Independent — freelance web development' },
  { year: '2024', note: 'Shipped first commissioned brand site' },
  { year: '2022', note: 'Started building for the web, full-time' },
]

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
        <section className="md:col-span-9">
          <h1 className="font-serif text-[12vw] md:text-[5.5rem] lg:text-[6.5rem] font-medium tracking-[-0.035em] leading-[0.95] text-ink max-w-[18ch] mb-12">
            <span className="text-line-mask">
              <span className="text-char-slide">
                I build websites that feel
                <span className="text-accent italic font-normal"> </span>
              </span>
            </span>
            <br />
            <span className="text-line-mask">
              <span className="text-char-slide">
                <span className="text-ink/45">considered</span>
                <span className="text-accent italic font-normal">.</span>
              </span>
            </span>
          </h1>

          <div className="max-w-2xl mb-20">
            <p className="text-[17px] md:text-[18px] leading-[1.65] text-ink/80 mb-6">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  I’m Munna — an independent web developer working at the
                  intersection of design and engineering. I build considered
                  digital experiences for hospitality, travel, and small
                  studios who care about how a site feels, not just how it
                  looks in a screenshot.
                </span>
              </span>
            </p>
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink/65">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  Every project is built from the ground up — no templates,
                  no short-cuts, no borrowed grids. Just type, motion, and
                  code, tuned until the details stop getting in the way of
                  the work.
                </span>
              </span>
            </p>
          </div>

          {/* What I do — editorial list */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="label-eyebrow text-ink/50">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">What I do</span>
                </span>
              </span>
              <span className="flex-1 h-px bg-ink/10" />
            </div>

            <ul className="border-t border-ink/10">
              {services.map((s) => (
                <li
                  key={s.name}
                  className="border-b border-ink/10 py-7 md:py-9 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12"
                >
                  <h3 className="font-serif text-3xl md:text-4xl text-ink tracking-[-0.02em] md:w-[40%]">
                    <span className="text-line-mask inline-block">
                      <span className="text-char-slide">{s.name}</span>
                    </span>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink/65 md:flex-1 max-w-md">
                    <span className="text-line-mask inline-block">
                      <span className="text-char-slide">{s.note}</span>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent timeline — concise, not a CV */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="label-eyebrow text-ink/50">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">Recent</span>
                </span>
              </span>
              <span className="flex-1 h-px bg-ink/10" />
            </div>

            <ul className="border-t border-ink/10">
              {timeline.map((t) => (
                <li
                  key={t.year}
                  className="border-b border-ink/10 py-6 md:py-7 flex items-baseline gap-6 md:gap-10"
                >
                  <span className="font-serif text-2xl md:text-3xl text-ink tracking-[-0.01em] w-20 md:w-24">
                    {t.year}
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink/65 flex-1 max-w-md">
                    {t.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools + CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <p className="text-[15px] text-ink/60 max-w-md leading-relaxed">
              <span className="text-line-mask inline-block">
                <span className="text-char-slide">
                  Recent tools of choice — React, Vite, GSAP, Tailwind, Figma,
                  and a notebook that travels everywhere.
                </span>
              </span>
            </p>
            <TransitionLink to="/work" className="pill-link">
              See the work <ArrowRight />
            </TransitionLink>
          </div>
        </section>
      </div>
    </main>
  )
}
