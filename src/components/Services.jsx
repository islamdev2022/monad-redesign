import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import { gsap, ScrollTrigger } from '../hooks/useScrollEngine.js'

const icons = [
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
]

const visualStates = [
  { label: 'OCR', desc: 'Document → Text', progress: 87 },
  { label: 'Extract', desc: 'Web → Data', progress: 64 },
  { label: 'Collect', desc: 'Pipeline → Output', progress: 92 },
]

export default function Services() {
  const { t } = useI18n()
  const items = t('services.items')
  const sectionRef = useRef(null)
  const textBlocksRef = useRef([])
  const progressBarsRef = useRef([])
  const stateLabelsRef = useRef([])
  const percentLabelsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const textBlocks = textBlocksRef.current.filter(Boolean)
    if (!section || textBlocks.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      function activateState(index) {
        stateLabelsRef.current.forEach((label, i) => {
          if (!label) return
          gsap.to(label, {
            opacity: i === index ? 1 : 0.25,
            duration: 0.4,
            ease: 'power2.out',
          })
        })

        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return
          const targetWidth = i === index ? visualStates[i].progress : 0
          gsap.to(bar, {
            width: `${targetWidth}%`,
            duration: 0.8,
            ease: 'power2.out',
          })
        })

        percentLabelsRef.current.forEach((label, i) => {
          if (!label) return
          const target = i === index ? visualStates[i].progress : 0
          gsap.to(label, {
            innerText: target,
            duration: 0.6,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              label.textContent = Math.round(parseFloat(label.textContent)) + '%'
            },
          })
        })
      }

      activateState(0)

      textBlocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => activateState(i),
          onEnterBack: () => activateState(i),
        })

        gsap.from(block, {
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.6,
          },
        })
      })
    })

    mm.add('(max-width: 1023px)', () => {
      textBlocks.forEach((block) => {
        gsap.set(block, { y: 0, opacity: 1 })
        gsap.from(block, {
          y: 40,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
        })
      })
    })

    return () => mm.revert()
  }, [items])

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 bg-cloud/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs font-mono font-medium text-accent uppercase tracking-widest">
            {t('services.label')}
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4">
            {t('services.title')}
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-lg mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          {/* Left column: sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-[20vh]">
              <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-lg shadow-black/[0.03]">
                <div className="space-y-6">
                  {visualStates.map((state, i) => (
                    <div
                      key={state.label}
                      ref={(el) => (stateLabelsRef.current[i] = el)}
                      className="flex items-center gap-4"
                      style={{ opacity: i === 0 ? 1 : 0.25 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent shrink-0">
                        {icons[i]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-text-primary">{state.label}</span>
                          <span
                            ref={(el) => (percentLabelsRef.current[i] = el)}
                            className="text-xs text-text-muted font-mono"
                          >
                            {i === 0 ? `${state.progress}%` : '0%'}
                          </span>
                        </div>
                        <div className="h-2 bg-cloud rounded-full overflow-hidden">
                          <div
                            ref={(el) => (progressBarsRef.current[i] = el)}
                            className="h-full bg-accent rounded-full"
                            style={{
                              width: i === 0 ? `${state.progress}%` : '0%',
                            }}
                          />
                        </div>
                        <p className="text-xs text-text-muted mt-2">{state.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-black/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span className="text-xs text-text-muted">Processing pipeline active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: scrolling text */}
          <div className="space-y-16 lg:space-y-48 lg:pt-8">
            {items.map((service, i) => (
              <div
                key={service.title}
                ref={(el) => (textBlocksRef.current[i] = el)}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent">
                    {icons[i]}
                  </div>
                  <h3 className="font-display font-semibold text-2xl lg:text-3xl text-text-primary">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
