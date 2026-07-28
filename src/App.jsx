import { useState, useEffect } from 'react'
import { useI18n } from './i18n.jsx'
import { useScrollEngine } from './hooks/useScrollEngine.js'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ProductModal from './components/ProductModal'
import Threads from './components/Threads'

export default function App() {
  const { dir, lang } = useI18n()
  const [modalProduct, setModalProduct] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)
  useScrollEngine()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="min-h-screen bg-snow w-full relative" dir={dir} lang={lang} style={{ fontFamily: dir === 'rtl' ? 'var(--font-arabic)' : undefined }}>
      {/* Fixed Threads background — visible behind all sections, hero covers it with its own bg */}
      {isDesktop && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Threads
            color={[0.114, 0.306, 0.847]}
            amplitude={0.6}
            distance={0.4}
            className="opacity-30"
            enableMouseInteraction
          />
        </div>
      )}

      <ScrollProgress />
      <Navbar />
      <Hero />
      <Products onDiscover={setModalProduct} />
      <Services />
      <Pricing />
      <Clients />
      <Contact />
      <Footer />

      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
  )
}
