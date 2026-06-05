import { useRef } from 'react'
import { usePageEntrance } from '../hooks/usePageEntrance'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/munna-68' },
  { label: 'Read.cv', href: 'https://read.cv/munna-68' },
  { label: 'X / Twitter', href: 'https://x.com/munna-68' },
]

function ArrowOut() {
  return (
    <svg
      className="arrow w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 17L17 7M9 7h8v8"
      />
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

export default function Contact() {
  const rootRef = useRef(null)
  usePageEntrance(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center pt-40 md:pt-44 pb-24 px-[5vw] md:px-[8vw]"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <p className="label-eyebrow text-ink/50 mb-10">
          <span className="text-line-mask inline-block">
            <span className="text-char-slide">Contact — open</span>
          </span>
        </p>

        <h1 className="font-serif text-[14vw] md:text-[6.5rem] lg:text-[8rem] font-medium tracking-[-0.04em] leading-[0.95] text-ink max-w-[14ch] mx-auto mb-10">
          <span className="text-line-mask">
            <span className="text-char-slide">
              Let’s make something
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

        <p className="max-w-xl mx-auto text-[15px] md:text-[16px] leading-[1.7] text-ink/70 mb-14">
          <span className="text-line-mask inline-block">
            <span className="text-char-slide">
              Available for select freelance work and collaborations. The inbox
              is always open — for new projects, quiet questions, or just a
              hello.
            </span>
          </span>
        </p>

        <div className="mb-20">
          <span className="text-line-mask inline-block">
            <span className="text-char-slide">
              <a
                href="mailto:hello@munna.dev"
                className="group inline-flex items-baseline gap-4 font-serif text-[12vw] md:text-[5.5rem] lg:text-[6.5rem] text-ink tracking-[-0.04em] leading-none transition-colors duration-500 hover:text-accent"
              >
                hello@munna.dev
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 text-accent">
                  <ArrowOut />
                </span>
              </a>
            </span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <span className="flex-1 h-px bg-ink/15" />
            <span className="label-eyebrow text-ink/40">Elsewhere</span>
            <span className="flex-1 h-px bg-ink/15" />
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 label-eyebrow text-ink/65 hover:text-ink transition-colors duration-300"
                >
                  {l.label} <ArrowOut />
                </a>
              </li>
            ))}
            <li>
              <span className="inline-flex items-center gap-2 label-eyebrow text-ink/65">
                @munna-68
              </span>
            </li>
          </ul>
        </div>
      </div>

      <footer className="max-w-8xl mx-auto w-full mt-24 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="label-eyebrow text-ink/45">
          © 2026 Munna · All work shown is placeholder.
        </p>
        <a href="/work" className="pill-link">
          Back to work <ArrowRight />
        </a>
      </footer>
    </main>
  )
}
