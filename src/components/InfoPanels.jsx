import { TransitionLink } from './LiquidTransition'
import { projects } from '../data/projects'

function ArrowIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  )
}

function ExternalArrow() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  )
}

/**
 * 3-button stack used for each project panel:
 *   1. View case study  → pill-link-solid (large, solid)
 *   2. Live site        → pill-link-large (large, outline)
 *   3. GitHub           → pill-link       (smaller, outline)
 */
function ProjectActions({ to, liveUrl, repoUrl }) {
  return (
    <div className="flex flex-col items-stretch gap-2.5 w-full max-w-[18rem] sm:max-w-sm">
      <TransitionLink
        to={to}
        className="pointer-events-auto pill-link-solid w-full justify-center"
      >
        View case study <ArrowIcon />
      </TransitionLink>
      {liveUrl || repoUrl ? (
        <div className="flex gap-2.5 w-full">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto pill-link-large flex-1 justify-center"
            >
              Live site <ExternalArrow />
            </a>
          ) : null}
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto pill-link flex-1 justify-center"
            >
              GitHub <ExternalArrow />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function CtaButton({ children, to }) {
  if (to) {
    return (
      <TransitionLink to={to} className="pointer-events-auto pill-link-solid">
        {children} <ArrowIcon />
      </TransitionLink>
    )
  }
  return (
    <button
      type="button"
      className="pointer-events-auto px-8 py-4 rounded-full bg-ink text-cream text-[11px] font-mono tracking-widest uppercase hover:bg-ink/90 active:scale-95 transition-all duration-300 shadow-xl"
    >
      {children}
    </button>
  )
}

export default function InfoPanels() {
  return (
    <div
      id="info-viewport"
      className="absolute left-[5vw] right-[5vw] bottom-[6vh] md:left-auto md:right-[5vw] md:top-[50%] md:bottom-auto md:-translate-y-1/2 md:w-[42vw] lg:right-[8vw] lg:w-[35vw] w-auto h-[34vh] md:h-[55vh] z-30 pointer-events-none flex items-center"
    >
      {projects.map((p) => (
        <div
          key={p.id}
          id={p.id}
          className="project-info absolute w-full flex flex-col justify-between h-full opacity-0 translate-y-[80px]"
        >
          <div>
            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-semibold font-mono tracking-widest text-ink/60 mb-4 sm:mb-8">
              <span className="text-lg font-serif">{p.number}</span>
              <span>/</span>
              <span>{p.total}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl text-ink font-medium tracking-tight mb-4 sm:mb-6 max-w-[9ch]">
              {p.title}
            </h2>
            {p.isButton ? (
              <CtaButton to={p.to}>{p.cta}</CtaButton>
            ) : (
              <ProjectActions
                to={p.to}
                liveUrl={p.liveUrl}
                repoUrl={p.repoUrl}
              />
            )}
          </div>
          <div className="border-t border-ink/10 pt-4 sm:pt-6">
            <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-ink/50 mb-2">
              {p.scopeLabel}
            </p>
            <p className="text-[11px] sm:text-xs leading-relaxed text-ink/80 max-w-sm">
              {p.scope}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
