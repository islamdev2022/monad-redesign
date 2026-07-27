import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import { gsap, ScrollTrigger } from '../hooks/useScrollEngine.js'

const clients = [
  { name: 'Macir Vie', sector: 'Insurance' },
  { name: 'ENP', sector: 'Superior School' },
  { name: 'Whitelines', sector: 'Technology' },
]

export default function Clients() {
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const stripRef = useRef(null)
  const velocityRef = useRef(0)
  const xRef = useRef(0)
  const directionRef = useRef(-1)

  useEffect(() => {
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const baseSpeed = 0.5
      const items = strip.children
      const totalWidth = strip.scrollWidth / 2

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          velocityRef.current = self.getVelocity()
          directionRef.current = self.direction
        },
      })

      gsap.ticker.add(() => {
        const velocity = Math.abs(velocityRef.current)
        const speedBoost = Math.min(velocity / 800, 3)
        const speed = (baseSpeed + speedBoost) * directionRef.current * -1

        xRef.current += speed

        if (Math.abs(xRef.current) >= totalWidth) {
          xRef.current = 0
        }
        if (xRef.current > 0) {
          xRef.current = -totalWidth + xRef.current
        }

        gsap.set(strip, { x: xRef.current })

        velocityRef.current *= 0.92
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const doubled = [...clients, ...clients, ...clients, ...clients]

  return (
    <section id="clients" ref={sectionRef} className="relative py-16 lg:py-20 bg-snow overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-sm text-text-muted uppercase tracking-widest font-medium mb-12 text-center">
          {t('clients.title')}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-snow to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-snow to-transparent z-10 pointer-events-none" />

        <div ref={stripRef} className="flex items-center gap-16 w-max" style={{ willChange: 'transform' }}>
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex flex-col items-center gap-2 shrink-0">
              <img
                src={`/Monad_files/${client.name}.png`}
                alt={client.name}
                className="h-32 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
