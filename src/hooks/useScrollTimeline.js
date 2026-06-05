import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTimeline() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation (runs once on mount)
      gsap
        .timeline()
        .to('.text-char-slide', {
          y: '0%',
          duration: 1.8,
          stagger: 0.15,
          ease: 'power4.out',
        })
        .from(
          '#media-container',
          {
            y: 100,
            opacity: 0,
            duration: 2.0,
            ease: 'power4.out',
          },
          '-=1.2'
        )

      // Kick off autoplay on all videos (some browsers block it without gesture)
      document.querySelectorAll('video').forEach((v) => {
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      })

      // Master scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-space',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
          invalidateOnRefresh: true,
        },
      })

      // STEP 1: Hero -> left-dock split layout
      tl.addLabel('morphStart', 0)
        .to(
          '#main-nav',
          { y: -100, opacity: 0, duration: 2.0, ease: 'power3.inOut' },
          'morphStart'
        )
        .to(
          '#hero-text-wrapper',
          {
            y: '-25vh',
            opacity: 0,
            scale: 0.55,
            duration: 2.5,
            ease: 'power3.inOut',
          },
          'morphStart'
        )
        .to(
          '#dynamic-glow',
          {
            scale: 0.8,
            xPercent: -35,
            yPercent: -10,
            duration: 2.5,
            ease: 'power3.inOut',
          },
          'morphStart'
        )
        .to(
          '#media-container',
          {
            left: '5vw',
            xPercent: 0,
            x: 0,
            bottom: '50%',
            yPercent: 50,
            width: '40vw',
            height: '40vw',
            borderRadius: '2rem',
            duration: 3.0,
            ease: 'power3.inOut',
          },
          'morphStart'
        )
        .to(
          '#info-0',
          { y: 0, opacity: 1, duration: 2.0, ease: 'power3.out' },
          'morphStart+=1.5'
        )

      tl.to({}, { duration: 1.5 })

      // STEP 2: Project 02
      tl.addLabel('project2', '+=0')
        .to(
          '#info-0',
          { y: '-100px', opacity: 0, duration: 1.5, ease: 'power3.inOut' },
          'project2'
        )
        .to(
          '#media-2',
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.5, ease: 'power3.inOut' },
          'project2'
        )
        .to(
          '#media-container',
          {
            scale: 0.96,
            yoyo: true,
            repeat: 1,
            duration: 1.25,
            ease: 'power2.inOut',
          },
          'project2'
        )
        .to(
          '#info-1',
          { y: 0, opacity: 1, duration: 2.0, ease: 'power3.out' },
          'project2+=0.8'
        )

      tl.to({}, { duration: 1.5 })

      // STEP 3: Project 03
      tl.addLabel('project3', '+=0')
        .to(
          '#info-1',
          { y: '-100px', opacity: 0, duration: 1.5, ease: 'power3.inOut' },
          'project3'
        )
        .to(
          '#media-3',
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.5, ease: 'power3.inOut' },
          'project3'
        )
        .to(
          '#media-container',
          {
            scale: 0.96,
            yoyo: true,
            repeat: 1,
            duration: 1.25,
            ease: 'power2.inOut',
          },
          'project3'
        )
        .to(
          '#info-2',
          { y: 0, opacity: 1, duration: 2.0, ease: 'power3.out' },
          'project3+=0.8'
        )

      tl.to({}, { duration: 1.5 })

      // STEP 4: Explore Ecosystem
      tl.addLabel('explore', '+=0')
        .to(
          '#info-2',
          { y: '-100px', opacity: 0, duration: 1.5, ease: 'power3.inOut' },
          'explore'
        )
        .to(
          '#media-4',
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.5, ease: 'power3.inOut' },
          'explore'
        )
        .to(
          '#media-container',
          {
            borderRadius: '50%',
            scale: 0.95,
            duration: 2.0,
            ease: 'power3.inOut',
          },
          'explore'
        )
        .to(
          '#info-explore',
          { y: 0, opacity: 1, duration: 2.0, ease: 'power3.out' },
          'explore+=0.8'
        )

      tl.to({}, { duration: 1.5 })
    })

    return () => ctx.revert() // kills all tweens + ScrollTriggers created inside
  }, [])
}
