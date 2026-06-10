import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './SectionHeading'
import { SiLeetcode, SiCodechef } from 'react-icons/si'
import { HiAcademicCap, HiBadgeCheck } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'

const timeline = [
  {
    title: 'B.Tech in Computer Science',
    org: 'Galgotias University, Greater Noida',
    period: '2023 — 2027',
    description: 'Pursuing B.Tech CSE with focus on DSA, Web Development, and Frontend Engineering.',
    icon: <HiAcademicCap />,
  },
  {
    title: 'LeetCode — Problem Solving',
    org: 'Competitive Programming',
    period: 'Ongoing',
    description: 'Solved 400+ problems covering Arrays, Strings, Trees, Graphs, Dynamic Programming, and more.',
    icon: <SiLeetcode />,
    stats: [
      { value: '400+', label: 'Solved' },
      { value: '1550+', label: 'Rating' },
    ],
  },
  {
    title: 'CodeChef — 1★ Coder',
    org: 'Competitive Programming',
    period: 'Ongoing',
    description: 'Active competitive programmer with 10+ contests participated and multiple badges earned.',
    icon: <SiCodechef />,
    stat: { value: '1300', label: 'Rating' },
  },

  {
    title: 'Badges & Certifications',
    org: 'CodeChef',
    period: '2024 — 2026',
    description: 'Daily Streak Diamond Badge (100 days), Problem Solver Gold Badge (500+ problems), Contest Contender Bronze Badge (5+ contests).',
    icon: <HiBadgeCheck />,
    badges: ['Diamond Streak', 'Gold Solver', 'Bronze Contender'],
  },

]

function TimelineItem({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="relative flex gap-6"
      style={{ paddingBottom: index < timeline.length - 1 ? '2.5rem' : '0' }}
    >
      {/* Line + Dot */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '20px' }}>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 0 12px rgba(99,102,241,0.4)',
          }}
        />
        {index < timeline.length - 1 && (
          <div className="flex-1 w-[1px]" style={{ background: 'rgba(99,102,241,0.15)', marginTop: '0.5rem' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-1" style={{ paddingBottom: '0.5rem' }}>
        {/* Period */}
        <span className="text-text-muted text-xs font-mono">{item.period}</span>

        {/* Title + Org */}
        <h3 className="text-white font-semibold text-lg" style={{ marginTop: '0.25rem' }}>{item.title}</h3>
        <p className="text-text-muted text-sm">{item.org}</p>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed" style={{ marginTop: '0.5rem' }}>
          {item.description}
        </p>

        {/* Optional stats */}
        {item.stats && (
          <div className="flex flex-wrap items-center gap-6" style={{ marginTop: '0.75rem' }}>
            {item.stats.map((s, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="text-2xl font-black gradient-text">{s.value}</span>
                <span className="text-text-muted text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {/* Legacy single stat */}
        {item.stat && !item.stats && (
          <div className="flex items-baseline gap-2" style={{ marginTop: '0.75rem' }}>
            <span className="text-2xl font-black gradient-text">{item.stat.value}</span>
            <span className="text-text-muted text-xs">{item.stat.label}</span>
          </div>
        )}

        {/* Optional badges */}
        {item.badges && (
          <div className="flex flex-wrap gap-2" style={{ marginTop: '0.75rem' }}>
            {item.badges.map((badge) => (
              <span
                key={badge}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  color: '#818cf8',
                  border: '1px solid rgba(99,102,241,0.12)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Optional link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent-primary transition-colors"
            style={{ marginTop: '0.5rem' }}
          >
            View Profile <FiExternalLink className="text-[10px]" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section
      id="experience"
      className="relative"
      style={{ paddingTop: '3.5rem', paddingBottom: '3rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>
        <SectionHeading
          label="Journey"
          title="Experience & Achievements"
        />

        {/* Clean vertical timeline — left-aligned */}
        <div className="max-w-3xl mx-auto" style={{ marginTop: '2.5rem' }}>
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
