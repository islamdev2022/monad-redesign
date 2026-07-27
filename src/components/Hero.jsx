import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './NeuralNetwork'
import { useI18n } from '../i18n.jsx'
import { gsap, ScrollTrigger } from '../hooks/useScrollEngine.js'

export default function Hero() {
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const bgLayerRef = useRef(null)
  const fgLayerRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Parallax: background moves slower than foreground on scroll
      gsap.to(bgLayerRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(fgLayerRef.current, {
        yPercent: -35,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      })

      // Word-by-word headline reveal — confident deceleration, no 3D gimmick
      const headline = headlineRef.current
      if (headline) {
        const words = headline.querySelectorAll('.word')
        gsap.set(words, { opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' })

        gsap.to(words, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          stagger: 0.05,
          delay: 0.3,
        })
      }

      // Subtext fade — moderate ease
      gsap.from(subtextRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.8,
      })

      // CTA — faster, less theatrical
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: 'power1.out',
        delay: 1.0,
      })
    }, section)

    return () => ctx.revert()
  }, [t])

  const title1 = t('hero.title1')
  const title2 = t('hero.title2')
  const titleAccent = t('hero.titleAccent')
  const allWords = `${title1} ${title2} ${titleAccent}`.split(' ')
  const t1Words = title1.split(' ')
  const t2Words = title2.split(' ')
  const accentWords = titleAccent.split(' ')

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-snow">
      {/* Background layer — moves slower (parallax) */}
      <div ref={bgLayerRef} className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <NeuralNetwork />
          </Suspense>
        </Canvas>

        {/* Subtle ambient light — no gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-light/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Foreground content — moves faster */}
      <div ref={fgLayerRef} className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h1
            ref={headlineRef}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-text-primary mb-6"
            style={{ overflow: 'hidden' }}
          >
            {t1Words.map((word, i) => (
              <span key={`t1-${i}`} className="word inline-block mx-[0.12em]">{word}</span>
            ))}
            <br />
            {t2Words.map((word, i) => (
              <span key={`t2-${i}`} className="word inline-block mx-[0.12em]">{word}</span>
            ))}{' '}
            {accentWords.map((word, i) => (
              <span key={`acc-${i}`} className="word inline-block mx-[0.12em] text-accent">{word}</span>
            ))}
          </h1>

          <p ref={subtextRef} className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-10">
            {t('hero.description')}
          </p>

          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4">
            <a
              href="https://forms.gle/WfCszpzeqXJgvbwp7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(29,78,216,0.25)] overflow-hidden"
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
            </a>
            <a
              href="#products"
              className="border border-black/10 hover:border-accent/30 text-text-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-accent/5"
            >
              {t('hero.cta2')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-text-muted tracking-widest uppercase">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
