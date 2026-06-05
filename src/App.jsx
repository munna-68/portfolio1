import { useEffect } from 'react'
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

import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LiquidTransitionProvider>
        <ScrollToTop />

        <div className="relative min-h-screen bg-cream">
          {/* Persistent editorial shell — never re-mounts on route change. */}
          <BackgroundDecor />
          <div className="grain-overlay" aria-hidden />
          <CustomCursor />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </LiquidTransitionProvider>
    </BrowserRouter>
  )
}
