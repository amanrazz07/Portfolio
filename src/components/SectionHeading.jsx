import { motion } from 'framer-motion'

export default function SectionHeading({ label, title, description }) {
  return (
    <div className="text-center" style={{ marginBottom: '1rem' }}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-primary"
          style={{ marginBottom: '1rem' }}
        >
          // {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ marginTop: '1rem' }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-[2px] w-12 mx-auto rounded-full"
        style={{
          marginTop: '1.5rem',
          background: 'linear-gradient(90deg, #6366f1, #a855f7)',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}
