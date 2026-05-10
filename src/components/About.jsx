import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './SectionHeading'
import TechStack from './TechStack'

const stats = [
  { value: '500+', label: 'Problems Solved' },
  { value: '10+', label: 'Projects Built' },
  { value: '2027', label: 'Graduating' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ paddingTop: '3.5rem', paddingBottom: '3rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>
        <motion.div style={{ opacity }}>
          <SectionHeading
            label="About"
            title="Who I Am"
          />
        </motion.div>

        {/* Main Content — Clean 2-column */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start" style={{ marginTop: '2.5rem' }}>

          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 max-w-2xl"
          >
            <p className="text-xl text-text-secondary leading-relaxed" style={{ marginBottom: '1.5rem' }}>
              I'm <span className="text-white font-semibold">Aman Kumar</span>, a CS student at{' '}
              <span className="text-accent-primary font-medium">Galgotias University</span> (2027)
              — focused on backend development, scalable systems, and clean architecture.
            </p>

            <p className="text-lg text-text-muted leading-relaxed" style={{ marginBottom: '2.5rem' }}>
              I build with Java, Spring Boot, Node.js & MongoDB, and actively solve 500+ DSA
              problems across LeetCode, CodeChef & GFG.
            </p>

            {/* Stats row */}
            <div className="flex gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex-1 rounded-xl text-center py-5 px-4"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-text-muted text-xs" style={{ marginTop: '0.35rem' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: What I Do cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex-1 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Backend Systems', desc: 'Scalable server-side architecture with clean separation of concerns.', emoji: '⚙️' },
                { title: 'API Design', desc: 'High-performance RESTful APIs optimized for speed and reliability.', emoji: '🔗' },
                { title: 'System Design', desc: 'Breaking complex problems into elegant distributed solutions.', emoji: '🏗️' },
                { title: 'Problem Solving', desc: '500+ DSA problems solved across multiple competitive platforms.', emoji: '🧩' },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="text-2xl" style={{ marginBottom: '0.75rem' }}>{card.emoji}</div>
                  <h4 className="text-white font-semibold text-base" style={{ marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] w-full"
          style={{ marginTop: '2.5rem', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        />

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: '0.5rem' }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
