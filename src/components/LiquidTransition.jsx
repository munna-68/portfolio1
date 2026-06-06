import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const TransitionContext = createContext(null)

export function useLiquidTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error(
      'useLiquidTransition must be used within <LiquidTransitionProvider>'
    )
  }
  return ctx
}

/**
 * Drop-in replacement for <Link> that triggers the liquid page-transition
 * curtain. Preserves modifier-key behaviour (cmd/ctrl-click, etc.) so the
 * browser can still open in a new tab / window.
 */
export function TransitionLink({ to, onClick, children, ...rest }) {
  const { navigateTo } = useLiquidTransition()
  const handleClick = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
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
  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}

const NAV_ITEMS = [
  { to: '/', label: 'Work', end: true },
  { to: '/home', label: 'Home' },
  { to: '/contact', label: 'Contact' },
]

const MENU_FOOTER = [
  { label: 'mahamudmunna8@gmail.com', href: 'mailto:mahamudmunna8@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/munna-68' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/17ur3qWUwx/' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mahamud13954?igsh=dm1jNGV0d3cwdGNo',
  },
]

const DURATION = 850
const CURVE_INTENSITY = 0.16

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function getReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function buildClipPath(menuState, progress) {
  let topY = 0
  let topCurveY = 0
  let bottomY = 0
  let bottomCurveY = 0

  if (menuState === 'OPENING') {
    bottomY = progress
    bottomCurveY = bottomY + Math.sin(progress * Math.PI) * CURVE_INTENSITY
  } else if (menuState === 'OPEN') {
    bottomY = 1
    bottomCurveY = 1
  } else if (menuState === 'CLOSING') {
    bottomY = 1
    bottomCurveY = 1
    topY = progress
    topCurveY = topY - Math.sin(progress * Math.PI) * CURVE_INTENSITY
  }

  return `M 0 ${topY} Q 0.5 ${topCurveY} 1 ${topY} L 1 ${bottomY} Q 0.5 ${bottomCurveY} 0 ${bottomY} Z`
}

export default function LiquidTransitionProvider({ children }) {
  const [menuState, setMenuState] = useState('CLOSED')
  const [progress, setProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isPageWipe, setIsPageWipe] = useState(false)
  const [navHoverReady, setNavHoverReady] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const requestRef = useRef(null)
  const startTimeRef = useRef(null)
  const pendingPathRef = useRef(null)
  const isWipingPageRef = useRef(false)
  const menuStateRef = useRef(menuState)
  const reducedMotionRef = useRef(getReducedMotion())

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => {
      reducedMotionRef.current = e.matches
    }
    if (mql.addEventListener) mql.addEventListener('change', handler)
    else mql.addListener(handler)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler)
      else mql.removeListener(handler)
    }
  }, [])

  useEffect(() => {
    menuStateRef.current = menuState
  }, [menuState])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setNavHoverReady(true))
      return undefined
    }
    const timer = window.setTimeout(() => setNavHoverReady(true), 300)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (menuState === 'OPEN') {
      setNavHoverReady(true)
    }
  }, [menuState])

  const animateMenu = useCallback(
    (time) => {
      if (startTimeRef.current == null) startTimeRef.current = time
      const elapsed = time - startTimeRef.current
      const raw = Math.min(elapsed / DURATION, 1)
      const eased = easeInOutCubic(raw)
      setProgress(eased)

      if (elapsed < DURATION) {
        requestRef.current = requestAnimationFrame(animateMenu)
        return
      }

      const current = menuStateRef.current
      if (current === 'OPENING') {
        setMenuState('OPEN')
        if (isWipingPageRef.current && pendingPathRef.current) {
          const next = pendingPathRef.current
          pendingPathRef.current = null
          isWipingPageRef.current = false
          navigate(next)
          // Immediately initiate the sweep-out to reveal the new page.
          window.setTimeout(() => {
            startTimeRef.current = null
            setProgress(0)
            setMenuState('CLOSING')
          }, 50)
        }
      } else if (current === 'CLOSING') {
        setMenuState('CLOSED')
        setIsPageWipe(false)
      }
    },
    [navigate]
  )

  useEffect(() => {
    if (menuState === 'OPENING' || menuState === 'CLOSING') {
      startTimeRef.current = null
      requestRef.current = requestAnimationFrame(animateMenu)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [menuState, animateMenu])

  // Lock body scroll while menu sits OPEN.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const lock = menuState === 'OPEN' || menuState === 'OPENING'
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuState])

  const toggleMenu = useCallback(() => {
    if (reducedMotionRef.current) {
      setProgress(1)
      setMenuState((s) =>
        s === 'OPEN' || s === 'OPENING' ? 'CLOSED' : 'OPEN'
      )
      return
    }
    if (menuState === 'CLOSED' || menuState === 'CLOSING') {
      setIsPageWipe(false)
      setProgress(0)
      setMenuState('OPENING')
    } else {
      setProgress(0)
      setMenuState('CLOSING')
    }
  }, [menuState])

  const navigateTo = useCallback(
    (targetPath) => {
      if (pathname === targetPath) {
        if (menuState !== 'CLOSED') toggleMenu()
        return
      }

      if (reducedMotionRef.current) {
        navigate(targetPath)
        if (menuState !== 'CLOSED') {
          setProgress(0)
          setMenuState('CLOSED')
        }
        return
      }

      if (menuState === 'OPEN' || menuState === 'OPENING') {
        // Menu already covering: swap behind it, then sweep off.
        navigate(targetPath)
        setProgress(0)
        setMenuState('CLOSING')
      } else {
        // Cover the screen first; swap + sweep off happens at the peak.
        pendingPathRef.current = targetPath
        isWipingPageRef.current = true
        setIsPageWipe(true)
        setProgress(0)
        setMenuState('OPENING')
      }
    },
    [pathname, menuState, toggleMenu, navigate]
  )

  const clipPathString = buildClipPath(menuState, progress)
  const isMenuVisible = menuState !== 'CLOSED'

  const isMenuInteractive = menuState === 'OPEN' && navHoverReady
  const showMenuChrome = !isPageWipe

  const contextValue = {
    menuState,
    isMenuVisible,
    isPageWipe,
    toggleMenu,
    navigateTo,
  }

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}

      {/* Curtain overlay — full-screen wipe above all chrome (incl. header). */}
      <div
        id="liquid-curtain-menu"
        className="fixed inset-0 bg-ink z-[60]"
        style={{
          clipPath: 'url(#liquid-curtain-clip)',
          WebkitClipPath: 'url(#liquid-curtain-clip)',
          display: menuState === 'CLOSED' ? 'none' : 'block',
        }}
        aria-hidden={!isMenuVisible}
      >
        {showMenuChrome ? (
          <div className="absolute inset-0 flex flex-col h-full">
            {/* Spacer keeps menu body below the fixed header. */}
            <div className="h-24 md:h-28 shrink-0 pointer-events-none" />

            <div className="flex-1 flex flex-col px-[5vw] md:px-[8vw] justify-center max-w-8xl w-full mx-auto pb-12">
              <nav
                aria-label="Primary"
                className="flex flex-col gap-1.5 md:gap-3 relative"
              >
                {NAV_ITEMS.map((item, index) => {
                  const isActive =
                    item.end
                      ? pathname === item.to
                      : pathname === item.to ||
                        pathname.startsWith(`${item.to}/`)
                  const isHovered =
                    isMenuInteractive && hoveredIndex === index
                  const showDot =
                    isHovered || (hoveredIndex === null && isActive)
                  return (
                    <div
                      key={item.to}
                      className="relative flex items-center group w-fit"
                      onMouseEnter={() => {
                        if (isMenuInteractive) setHoveredIndex(index)
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <span
                        aria-hidden
                        className={[
                          'absolute -left-6 md:-left-8 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          showDot
                            ? 'opacity-100 translate-x-0 scale-100'
                            : 'opacity-0 -translate-x-3 scale-50',
                        ].join(' ')}
                      />
                      <button
                        type="button"
                        onClick={() => navigateTo(item.to)}
                        tabIndex={isMenuVisible ? 0 : -1}
                        aria-current={isActive ? 'page' : undefined}
                        className={[
                          'text-cream font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
                          'tracking-[-0.04em] leading-[0.95] text-left',
                          'transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left',
                          'cursor-pointer',
                          'focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-cream focus-visible:outline-offset-4',
                          isHovered
                            ? 'translate-x-4 italic font-normal opacity-100'
                            : 'opacity-80 hover:opacity-100',
                          isActive && !isHovered ? 'italic font-medium' : '',
                        ].join(' ')}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden
                            className="text-accent italic font-normal"
                          >
                            .
                          </span>
                        )}
                      </button>
                    </div>
                  )
                })}
              </nav>

              <div className="mt-14 md:mt-20 flex flex-wrap gap-x-10 gap-y-3">
                {MENU_FOOTER.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http') ? 'noreferrer' : undefined
                    }
                    tabIndex={isMenuVisible ? 0 : -1}
                    className="label-eyebrow text-cream/45 hover:text-cream transition-colors duration-500"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* SVG clip definition — re-evaluated each animation frame. */}
      <svg
        width="0"
        height="0"
        aria-hidden
        className="fixed pointer-events-none"
        style={{ width: 0, height: 0 }}
      >
        <defs>
          <clipPath
            id="liquid-curtain-clip"
            clipPathUnits="objectBoundingBox"
          >
            <path d={clipPathString} />
          </clipPath>
        </defs>
      </svg>
    </TransitionContext.Provider>
  )
}
