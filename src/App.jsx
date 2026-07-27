import { useState } from 'react'
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

export default function App() {
  const { dir, lang } = useI18n()
  const [modalProduct, setModalProduct] = useState(null)
  useScrollEngine()

  return (
    <div className="min-h-screen bg-snow w-full relative" dir={dir} lang={lang} style={{ fontFamily: dir === 'rtl' ? 'var(--font-arabic)' : undefined }}>
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
