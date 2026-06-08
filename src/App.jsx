import { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

import BackgroundDecor from './components/BackgroundDecor'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import LiquidTransitionProvider from './components/LiquidTransition'

import Landing from './pages/Landing'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function App() {
  const [preloaderState, setPreloaderState] = useState('LOADING')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [preloaderAnimProgress, setPreloaderAnimProgress] = useState(0)
  const preloaderStartTime = useRef(null)
  const preloaderReqRef = useRef(null)

  useEffect(() => {
    let start = null
    const countDuration = 2200

    function step(ts) {
      if (!start) start = ts
      const p = Math.min((ts - start) / countDuration, 1)
      const easeOut = 1 - Math.pow(1 - p, 4)
      setLoadingProgress(Math.floor(easeOut * 100))
      if (p < 1) {
        requestAnimationFrame(step)
      } else {
        setTimeout(() => setPreloaderState('REVEALING'), 300)
      }
    }
    requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    if (preloaderState !== 'REVEALING') return
    preloaderStartTime.current = null

    function animate(ts) {
      if (!preloaderStartTime.current) preloaderStartTime.current = ts
      const elapsed = ts - preloaderStartTime.current
      const revealDuration = 850
      let p = Math.min(elapsed / revealDuration, 1)
      p = easeInOutCubic(p)
      setPreloaderAnimProgress(p)
      if (elapsed < revealDuration) {
        preloaderReqRef.current = requestAnimationFrame(animate)
      } else {
        setPreloaderState('DONE')
      }
    }
    preloaderReqRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(preloaderReqRef.current)
  }, [preloaderState])

  const curveIntensity = 0.16
  let pTopY = 0
  let pTopCurveY = 0
  let pBottomY = 1
  let pBottomCurveY = 1

  if (preloaderState === 'REVEALING') {
    pTopY = preloaderAnimProgress
    pTopCurveY = pTopY - Math.sin(preloaderAnimProgress * Math.PI) * curveIntensity
  } else if (preloaderState === 'DONE') {
    pTopY = 1
    pTopCurveY = 1
  }

  const preloaderClip = `M 0 ${pTopY} Q 0.5 ${pTopCurveY} 1 ${pTopY} L 1 ${pBottomY} Q 0.5 ${pBottomCurveY} 0 ${pBottomY} Z`

  return (
    <BrowserRouter>
      <LiquidTransitionProvider>
        <ScrollToTop />

        <div className="relative min-h-screen bg-cream">
          {/* Persistent editorial shell — never re-mounts on route change. */}
          <BackgroundDecor />
          <div className="grain-overlay" aria-hidden />
          <Header />
          <CustomCursor />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </div>

        {/* ── Preloader ── */}
        <div
          className="fixed inset-0 bg-[#2C2E27] z-[60] flex flex-col justify-end pointer-events-auto"
          style={{
            clipPath: `url(#preloader-clip)`,
            WebkitClipPath: `url(#preloader-clip)`,
            display: preloaderState === 'DONE' ? 'none' : 'flex',
          }}
        >
          <div className="p-8 md:p-12 w-full flex justify-between items-end">
            <div className="font-mono text-[5.5rem] md:text-[9.5rem] leading-none text-[#F4F3EF] tracking-tighter mix-blend-difference">
              {loadingProgress}
            </div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#F4F3EF] mb-4 md:mb-6 mr-2" />
          </div>
        </div>

        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden>
          <defs>
            <clipPath id="preloader-clip" clipPathUnits="objectBoundingBox">
              <path d={preloaderClip} />
            </clipPath>
          </defs>
        </svg>
      </LiquidTransitionProvider>
    </BrowserRouter>
  )
}
