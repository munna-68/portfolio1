import { Link } from 'react-router-dom'
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

function CtaLink({ children, to }) {
  if (to) {
    return (
      <Link to={to} className="pointer-events-auto pill-link">
        {children} <ArrowIcon />
      </Link>
    )
  }
  return (
    <a
      href="#"
      className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ink/20 text-[11px] font-mono tracking-widest uppercase hover:bg-ink hover:text-cream transition-all duration-300"
    >
      {children} <ArrowIcon />
    </a>
  )
}

function CtaButton({ children, to }) {
  if (to) {
    return (
      <Link to={to} className="pointer-events-auto pill-link-solid">
        {children} <ArrowIcon />
      </Link>
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
      className="absolute right-[5vw] lg:right-[8vw] top-[50%] -translate-y-1/2 w-[85vw] md:w-[42vw] lg:w-[35vw] h-[55vh] z-30 pointer-events-none flex items-center"
    >
      {projects.map((p) => (
        <div
          key={p.id}
          id={p.id}
          className="project-info absolute w-full flex flex-col justify-between h-full opacity-0 translate-y-[80px]"
        >
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold font-mono tracking-widest text-ink/60 mb-8">
              <span className="text-lg font-serif">{p.number}</span>
              <span>/</span>
              <span>{p.total}</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-7xl text-ink font-medium tracking-tight mb-6">
              {p.title}
            </h2>
            {p.isButton ? (
              <CtaButton to={p.to}>{p.cta}</CtaButton>
            ) : (
              <CtaLink to={p.to}>{p.cta}</CtaLink>
            )}
          </div>
          <div className="border-t border-ink/10 pt-6">
            <p className="text-xs font-mono tracking-wider uppercase text-ink/50 mb-2">
              {p.scopeLabel}
            </p>
            <p className="text-xs leading-relaxed text-ink/80 max-w-sm">{p.scope}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
