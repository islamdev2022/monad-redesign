import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger, useSmoothNav } from '../hooks/useScrollEngine.js'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState('hero')
  const barRef = useRef(null)
  const handleNav = useSmoothNav()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Use getBoundingClientRect for section detection — immune to GSAP pin-spacers
  useEffect(() => {
    let rafId = null

    function detectSection() {
      const viewportMid = window.innerHeight * 0.4
      let current = 'hero'

      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportMid && rect.bottom > viewportMid) {
          current = id
          break
        }
      }

      setActiveSection(current)
      rafId = requestAnimationFrame(detectSection)
    }

    rafId = requestAnimationFrame(detectSection)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <div ref={barRef} className="scroll-progress" />

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col items-center gap-4">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleNav}
            className="group relative flex items-center"
          >
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-text-secondary bg-white/90 backdrop-blur-sm border border-black/5 rounded-md px-2 py-1 whitespace-nowrap shadow-sm">
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === id
                  ? 'w-3 h-3 bg-accent'
                  : 'w-2 h-2 bg-black/15 hover:bg-accent/50'
              }`}
            />
          </a>
        ))}
      </div>
    </>
  )
}
