import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const enabled =
    typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches

  useEffect(() => {
    if (!enabled || !cursorRef.current) return

    document.body.classList.add('has-custom-cursor')
    const cursor = cursorRef.current

    const onMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const onEnter = () => {
      cursor.classList.add('scale-[3.0]')
      cursor.style.backgroundColor = 'rgba(46, 51, 38, 0.1)'
    }
    const onLeave = () => {
      cursor.classList.remove('scale-[3.0]')
      cursor.style.backgroundColor = 'rgba(46, 51, 38, 0.8)'
    }

    const targets = document.querySelectorAll('a, button')
    window.addEventListener('mousemove', onMove)
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="fixed w-3 h-3 rounded-full bg-ink/80 pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out scale-100"
    />
  )
}
