import { useEffect, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function useScrollEngine() {
  useEffect(() => {
    if (lenisInstance) return

    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
      syncTouch: false,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(lenisInstance.raf)
      lenisInstance.destroy()
      lenisInstance = null
    }
  }, [])
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.6, offset: 0, ...options })
  }
}

export function useSmoothNav() {
  return useCallback((e) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const target = href === '#' ? 0 : href
      scrollTo(target)
    }
  }, [])
}

export { gsap, ScrollTrigger }
