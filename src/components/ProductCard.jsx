import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProductCard({ product, index, reversed, learnMore }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
    >
      <div className={`space-y-6 text-center lg:text-start ${reversed ? 'lg:order-2' : ''}`}>
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

        <h3 className="font-display font-bold text-3xl sm:text-4xl text-text-primary leading-tight">
          {product.title}
        </h3>

        <p className="text-text-secondary text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
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

        <motion.a
          href="#contact"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-2 text-sm font-semibold mt-4 transition-colors duration-300"
          style={{ color: product.color }}
        >
          {learnMore}
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>

      <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
        <div className="relative rounded-2xl border border-black/5 bg-paper p-10 lg:p-12 overflow-hidden group hover:border-black/10 transition-all duration-500 hover:shadow-lg hover:shadow-black/5">
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(600px circle at 50% 50%, ${product.color}08, transparent 60%)`,
            }}
          />

          {/* Mockup content */}
          {/* <div className="relative z-10"> */}

            <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg" />
            {/* <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-black/8" />
              <div className="w-3 h-3 rounded-full bg-black/8" />
              <div className="w-3 h-3 rounded-full bg-black/8" />
              <div className="flex-1 h-6 rounded-md bg-black/4 ms-4" />
            </div> */}

            {/* <div className="space-y-3">
              {product.mockupLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: product.color, opacity: 0.5 + (i * 0.1) }}
                  />
                  <div
                    className="h-4 rounded bg-black/5"
                    style={{ width: line.width }}
                  />
                  {line.accent && (
                    <div
                      className="h-4 w-12 rounded"
                      style={{ backgroundColor: product.color + '18' }}
                    />
                  )}
                </motion.div>
              ))}
            </div> */}

            {/* Stats grid */}
            {/* <div className="mt-8 pt-6 border-t border-black/5">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className="h-16 rounded-lg"
                      style={{ backgroundColor: product.color + '0' + (8 + i * 3) }}
                    />
                    <div className="h-2 w-3/4 rounded bg-black/5" />
                  </div>
                ))}
              </div>
            </div> */}
          {/* </div> */}
        </div>

        {/* Floating accent blur */}
        <div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-15"
          style={{ backgroundColor: product.color }}
        />
      </div>
    </motion.div>
  )
}
