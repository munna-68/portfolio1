import { NavLink, Link } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

function navClass({ isActive }) {
  return [
    'group inline-flex items-center gap-2 text-[11px] font-mono uppercase',
    'tracking-widest-2 transition-colors duration-500',
    isActive ? 'text-ink' : 'text-ink/35 hover:text-ink/80',
  ].join(' ')
}

export default function Header() {
  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 w-full flex justify-between items-start px-[5vw] py-6 md:py-8 z-50 transition-all duration-700 pointer-events-none"
    >
      <Link
        to="/"
        className="pointer-events-auto flex flex-col leading-none group"
        aria-label="Munna — Home"
      >
        <span className="font-serif text-2xl md:text-[1.7rem] font-medium tracking-tight text-ink leading-none">
          munna
          <span className="text-accent italic transition-colors duration-500 group-hover:text-ink">
            .
          </span>
        </span>
        <span className="mt-1.5 label-eyebrow text-ink/50 group-hover:text-ink/70 transition-colors duration-500">
          web&nbsp;developer · @munna-68
        </span>
      </Link>

      <div className="hidden md:flex flex-col items-center gap-1 mt-2 pointer-events-auto">
        <span className="label-eyebrow text-ink/45">independent</span>
        <span className="label-eyebrow text-ink/45">available · 2026</span>
      </div>

      <nav className="pointer-events-auto flex flex-col items-end gap-2 md:gap-2.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navClass}
          >
            {({ isActive }) => (
              <>
                <span
                  aria-hidden
                  className={[
                    'inline-block w-1.5 h-1.5 rounded-full transition-all duration-500',
                    isActive
                      ? 'bg-accent opacity-100 scale-100'
                      : 'bg-ink opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-75',
                  ].join(' ')}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
