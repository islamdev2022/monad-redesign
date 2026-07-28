import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { useSmoothNav } from '../hooks/useScrollEngine.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { t, lang, setLang } = useI18n()
  const handleNav = useSmoothNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    let rafId = null
    const sectionIds = ['hero', 'products', 'services', 'pricing', 'clients', 'contact']

    function detect() {
      const viewportMid = window.innerHeight * 0.35
      let current = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportMid && rect.bottom > viewportMid) {
          current = id
          break
        }
      }
      setActiveSection(current)
      rafId = requestAnimationFrame(detect)
    }

    rafId = requestAnimationFrame(detect)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const links = [
    { label: t('nav.products'), href: '#products', id: 'products' },
    { label: t('nav.services'), href: '#services', id: 'services' },
    { label: t('nav.clients'), href: '#clients', id: 'clients' },
    { label: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'عر' },
  ]

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/30 backdrop-blur-xl border-b border-black/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" onClick={handleNav} className="flex items-center gap-3 group">
            <img src="/Monad_files/MONAD-Presentation-removebg-preview-removebg-preview.png" alt="Monad — AI Solutions for Algeria" className="h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNav}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-0.5 border border-black/10 rounded-full overflow-hidden">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-xs px-3 py-1.5 transition-colors duration-200 ${
                    lang === l.code
                      ? 'bg-accent text-white'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href="https://forms.gle/WfCszpzeqXJgvbwp7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-light text-white text-sm font-medium px-6 py-2 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(29,78,216,0.25)]"
            >
              {t('nav.cta')}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5"
          >
            <div className="px-6 py-8 flex flex-col items-center">
              {/* Logo centered */}
              <img
                src="/Monad_files/MONAD-Presentation-removebg-preview-removebg-preview.png"
                alt="Monad"
                className="h-8 w-auto mb-6"
              />

              {/* Nav links */}
              <div className="space-y-3 w-full text-center">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { handleNav(e); setMobileOpen(false) }}
                    className={`block text-lg font-medium py-2 transition-colors ${
                      activeSection === link.id
                        ? 'text-accent'
                        : 'text-text-secondary'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Language switcher */}
              <div className="flex gap-2 mt-6">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false) }}
                    className={`text-sm px-4 py-2 rounded-lg border ${
                      lang === l.code
                        ? 'bg-accent text-white border-accent'
                        : 'border-black/10 text-text-secondary'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://forms.gle/WfCszpzeqXJgvbwp7"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-accent hover:bg-accent-light text-white text-center font-semibold px-5 py-4 rounded-xl mt-6 transition-all duration-300"
              >
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
