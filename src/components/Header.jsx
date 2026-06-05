import { NavLink, Link } from 'react-router-dom'
import { useLiquidTransition } from './LiquidTransition'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Header() {
  const { isMenuVisible, toggleMenu, navigateTo } = useLiquidTransition()

  const onLinkClick = (e, to) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return
    }
    e.preventDefault()
    navigateTo(to)
  }

  const navClass = ({ isActive }) =>
    [
      'group inline-flex items-center gap-2 text-[11px] font-mono uppercase',
      'tracking-widest-2 transition-colors duration-500',
      isActive
        ? isMenuVisible
          ? 'text-cream'
          : 'text-ink'
        : isMenuVisible
        ? 'text-cream/40 hover:text-cream/80'
        : 'text-ink/35 hover:text-ink/80',
    ].join(' ')

  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 w-full flex justify-between items-start px-[5vw] py-6 md:py-8 z-50 pointer-events-none"
    >
      <Link
        to="/"
        onClick={(e) => onLinkClick(e, '/')}
        className="pointer-events-auto flex flex-col leading-none group"
        aria-label="Munna — Home"
      >
        <span
          className={[
            'font-serif text-2xl md:text-[1.7rem] font-medium tracking-tight leading-none transition-colors duration-500',
            isMenuVisible ? 'text-cream' : 'text-ink',
          ].join(' ')}
        >
          munna
          <span
            className={[
              'italic transition-colors duration-500',
              isMenuVisible
                ? 'text-accent group-hover:text-cream'
                : 'text-accent group-hover:text-ink',
            ].join(' ')}
          >
            .
          </span>
        </span>
        <span
          className={[
            'mt-1.5 label-eyebrow transition-colors duration-500',
            isMenuVisible
              ? 'text-cream/45 group-hover:text-cream/70'
              : 'text-ink/50 group-hover:text-ink/70',
          ].join(' ')}
        >
          web&nbsp;developer · @munna-68
        </span>
      </Link>

      <div className="hidden md:flex flex-col items-center gap-1 mt-2 pointer-events-auto">
        <span
          className={[
            'label-eyebrow transition-colors duration-500',
            isMenuVisible ? 'text-cream/45' : 'text-ink/45',
          ].join(' ')}
        >
          independent
        </span>
        <span
          className={[
            'label-eyebrow transition-colors duration-500',
            isMenuVisible ? 'text-cream/45' : 'text-ink/45',
          ].join(' ')}
        >
          available · 2026
        </span>
      </div>

      {/* Desktop nav — intercepts clicks for the liquid page transition. */}
      <nav className="pointer-events-auto hidden md:flex flex-col items-end gap-2 md:gap-2.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={(e) => onLinkClick(e, item.to)}
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
                      : isMenuVisible
                      ? 'bg-cream opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-75'
                      : 'bg-ink opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-75',
                  ].join(' ')}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile hamburger — opens the liquid curtain menu. */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isMenuVisible ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuVisible}
        aria-controls="liquid-curtain-menu"
        className="pointer-events-auto md:hidden flex items-center gap-3 mt-2 group"
      >
        <span
          className={[
            'label-eyebrow transition-colors duration-500',
            isMenuVisible ? 'text-cream' : 'text-ink',
          ].join(' ')}
        >
          {isMenuVisible ? 'Close' : 'Menu'}
        </span>
        <span className="relative flex flex-col justify-center items-end h-3 w-[22px]">
          <span
            className={[
              'absolute h-[1.5px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isMenuVisible
                ? 'bg-cream w-[22px] rotate-45 translate-y-0'
                : 'bg-ink w-[22px] -translate-y-[4px]',
            ].join(' ')}
          />
          <span
            className={[
              'absolute h-[1.5px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isMenuVisible
                ? 'bg-cream w-[22px] -rotate-45 translate-y-0'
                : 'bg-ink w-[14px] group-hover:w-[22px] translate-y-[4px]',
            ].join(' ')}
          />
        </span>
      </button>
    </header>
  )
}
