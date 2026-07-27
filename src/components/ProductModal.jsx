import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'

export default function ProductModal({ product, onClose }) {
  const { t } = useI18n()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const details = t(`productDetails.${product}`)
  if (!details) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      data-lenis-prevent
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl my-8 rounded-2xl bg-white border border-black/5 shadow-2xl p-8 lg:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cloud transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <span className="text-xs font-mono font-medium text-accent uppercase tracking-widest">
            {details.tag}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mt-3">
            {details.title}
          </h2>
          <p className="text-text-secondary text-lg mt-3 leading-relaxed">
            {details.description}
          </p>
        </div>

        <div className="space-y-6">
          {details.tabs.map((tab, i) => (
            <div key={i} className="p-6 rounded-xl bg-paper border border-black/5">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                {tab.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {tab.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-black/5">
          <a
            href="https://forms.gle/WfCszpzeqXJgvbwp7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            {t('products.tryProduct')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
