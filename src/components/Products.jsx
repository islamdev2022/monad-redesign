import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import { gsap, ScrollTrigger } from '../hooks/useScrollEngine.js'

const productMeta = [
  {
    image: '/Monad_files/Changer-la-vue-et-rajouter-les-marques-37.png',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    color: '#1d4ed8',
  },
  {
    image: '/Monad_files/MONAD-PITCH-DECK.png',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
    color: '#16a34a',
  },
  {
    image: '/Monad_files/Changer_la_vue_et_rajouter_les_marques__31_-removebg-preview.png',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    color: '#7c3aed',
  },
  {
    image: '/Monad_files/Changer_la_vue_et_rajouter_les_marques__30_-removebg-preview.png',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: '#dc2626',
  },
]

const productKeys = ['narwhal', 'qanun', 'chatbot', '3xs']

export default function Products({ onDiscover }) {
  const { t } = useI18n()
  const items = t('products.items')
  const sectionRef = useRef(null)
  const cardsWrapRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const cardsWrap = cardsWrapRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!section || !cardsWrap || cards.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const cardHeight = cards[0]?.offsetHeight || 400
      const scrollPerCard = cardHeight * 0.85

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: i + 1,
          y: i === 0 ? 0 : cardHeight + 80,
          opacity: i === 0 ? 1 : 0,
          scale: 1,
        })
      })

      gsap.set(cardsWrap, { height: cardHeight })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsWrap,
          start: 'top 12%',
          end: () => `+=${scrollPerCard * (cards.length - 1) + 200}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return

        const prevCard = cards[i - 1]
        const progress = (i - 1) / (cards.length - 1)

        // Previous card: scale down slightly then hide completely
        tl.to(prevCard, {
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, progress)

        // New card slides up into view
        tl.fromTo(card, {
          y: cardHeight + 80,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, progress + 0.05)
      })
    })

    mm.add('(max-width: 1023px)', () => {
      cards.forEach((card) => {
        gsap.set(card, {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          width: '100%',
          zIndex: 'auto',
          y: 0,
          opacity: 1,
          scale: 1,
        })

        gsap.from(card, {
          y: 50,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        })
      })

      gsap.set(cardsWrap, { height: 'auto' })
    })

    return () => mm.revert()
  }, [items])

  return (
    <section id="products" ref={sectionRef} className="relative bg-snow pt-36 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header — NOT inside the pinned area */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono font-medium text-accent uppercase tracking-widest">
            {t('products.label')}
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4 max-w-2xl mx-auto leading-tight">
            {t('products.title')}
          </h2>
          <p className="text-text-secondary text-lg mt-5 max-w-xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        {/* Card stack — this is what gets pinned */}
        <div ref={cardsWrapRef} className="relative overflow-visible">
          {items.map((item, index) => {
            const product = { ...item, ...productMeta[index] }

            return (
              <div
                key={item.tag}
                ref={(el) => (cardsRef.current[index] = el)}
                className="w-full lg:mb-0 mb-8"
              >
                <div className="max-w-5xl mx-auto rounded-3xl border border-black/5 bg-white p-8 lg:p-10 shadow-xl shadow-black/[0.03]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-4 text-center lg:text-start">
                      <div className="inline-flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: product.color + '12', border: `1px solid ${product.color}25` }}
                        >
                          <span style={{ color: product.color }}>{product.icon}</span>
                        </div>
                        <span
                          className="text-xs font-mono font-medium uppercase tracking-widest"
                          style={{ color: product.color }}
                        >
                          {product.tag}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
                        {product.title}
                      </h3>

                      <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
                        {product.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/8 text-text-secondary bg-cloud"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onDiscover && onDiscover(productKeys[index])}
                        className="inline-flex items-center gap-2 text-sm font-semibold mt-2 transition-colors duration-300 cursor-pointer"
                        style={{ color: product.color }}
                      >
                        {t('products.learnMore')}
                        <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>

                    <div className="relative">
                      <div className="rounded-2xl border border-black/5 bg-paper p-4 lg:p-6 overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
