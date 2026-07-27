import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Pricing() {
  const { t } = useI18n()
  const [yearly, setYearly] = useState(false)

  const plans = t('pricing.plans')

  return (
    <section id="pricing" className="relative py-20 lg:py-24 bg-snow">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-medium text-accent uppercase tracking-widest">
            {t('pricing.label')}
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4">
            {t('pricing.title')}
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-lg mx-auto">
            {t('pricing.description')}
          </p>
        </div>
      </div>
    </section>
  )
}
