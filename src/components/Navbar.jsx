import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { useSmoothNav } from '../hooks/useScrollEngine.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const handleNav = useSmoothNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t('nav.products'), href: '#products' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.clients'), href: '#clients' },
    { label: t('nav.contact'), href: '#contact' },
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
      <div className=" mx-auto px-8 lg:px-12">
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
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300 font-medium"
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
              className=" bg-accent hover:bg-accent-light text-white text-sm font-medium px-6 py-1 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(29,78,216,0.25)]"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { handleNav(e); setMobileOpen(false) }}
                  className="block text-lg text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
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
              <a
                href="#contact"
                className="block bg-accent text-white text-center font-medium px-5 py-5 rounded-lg mt-4"
              >
                {/* {t('nav.cta')} */}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
