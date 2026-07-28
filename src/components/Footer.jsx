import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer aria-label="Site footer" className="border-t border-black/5 py-10 bg-paper z-100">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-start">
          <div className="md:col-span-1">
            <img src="/Monad_files/MONAD-Presentation-removebg-preview-removebg-preview.png" alt="Monad" className="h-10 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto md:mx-0">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('footer.products')}</h4>
            <ul className="space-y-3">
              <li><a href="#products" className="text-sm text-text-muted hover:text-accent transition-colors">Narwhal</a></li>
              <li><a href="#products" className="text-sm text-text-muted hover:text-accent transition-colors">9anun</a></li>
              <li><a href="#products" className="text-sm text-text-muted hover:text-accent transition-colors">Chatbot</a></li>
              <li><a href="#products" className="text-sm text-text-muted hover:text-accent transition-colors">3xS</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-text-muted hover:text-accent transition-colors">OCR</a></li>
              <li><a href="#services" className="text-sm text-text-muted hover:text-accent transition-colors">Data Extraction</a></li>
              <li><a href="#services" className="text-sm text-text-muted hover:text-accent transition-colors">Data Collection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-sm text-text-muted hover:text-accent transition-colors">{t('footer.contactLink')}</a></li>
              <li><a href="https://dz.linkedin.com/company/monad-dz" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="mailto:contact@monad-dz.com" className="text-sm text-text-muted hover:text-accent transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">{t('footer.copyright')}</p>
          <p className="text-xs text-text-muted">{t('footer.builtFor')}</p>
        </div>
      </div>
    </footer>
  )
}
