import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import { gsap, ScrollTrigger } from '../hooks/useScrollEngine.js'

export default function Contact() {
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -30,
        opacity: 0,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 55%',
          scrub: 0.5,
        },
      })

      gsap.from(rightRef.current, {
        x: 30,
        opacity: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 50%',
          scrub: 0.5,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 lg:py-28 bg-snow">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
          <div ref={leftRef} className="text-center lg:text-start">
            <span className="text-xs font-mono font-medium text-accent uppercase tracking-widest">
              {t('contact.label')}
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-text-secondary text-lg mt-5 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t('contact.description')}
            </p>

            <div className="mt-10 space-y-6 inline-block text-start">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted">{t('contact.email')}</p>
                  <p className="text-text-primary font-medium">contact@monad-dz.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted">{t('contact.linkedin')}</p>
                  <p className="text-text-primary font-medium">Monad-DZ</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted">{t('contact.location')}</p>
                  <p className="text-text-primary font-medium">{t('contact.locationValue')}</p>
                </div>
              </div>
            </div>
          </div>

          <form
            ref={rightRef}
            onSubmit={handleSubmit}
            className="space-y-6 p-10 lg:p-12 rounded-2xl border border-black/5 bg-paper"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-black/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-black/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm text-text-secondary mb-2">
                {t('contact.form.company')}
              </label>
              <input
                id="company"
                type="text"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white border border-black/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                placeholder={t('contact.form.companyPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white border border-black/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(29,78,216,0.2)]"
            >
              {t('contact.form.submit')}
            </button>
            <p className="text-xs text-text-muted text-center">
              {t('contact.form.note')}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
