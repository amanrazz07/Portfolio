import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './SectionHeading'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'

const projects = [
  {
    title: 'SmartCart',
    subtitle: 'Quick Commerce Aggregator',
    description:
      'A full-stack quick-commerce aggregator that compares real-time product pricing and availability across multiple platforms with pin-code-specific results, universal cart system, and auto-suggest search.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: 'Secure Auth System',
    subtitle: 'Login Authentication System',
    description:
      'A secure, core Java web authentication system featuring BCrypt password hashing, MySQL database integration, and a premium glassmorphic UI — built with enterprise-grade security practices.',
    tech: ['Java', 'HTML', 'CSS'],
    github: 'https://github.com/amanrazz07/Secure-Auth-System',
    live: null,
    featured: true,
  },
]

const otherProjects = [
  {
    title: 'AI Phishing Detection',
    subtitle: 'ML Security System',
    description: 'An ML-trained phishing URL detection system that classifies URLs as safe or malicious in real-time.',
    tech: ['JavaScript', 'Python', 'ML'],
    github: 'https://github.com/amanrazz07/Ai_ML_Trained_Phishing_URL_Detection',
  },
  {
    title: 'Chess Game',
    subtitle: 'Interactive Board Game',
    description: 'A fully interactive chess game with complete game logic, move validation, and an elegant board UI.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/amanrazz07/Chess-Game',
  },
  {
    title: 'To-Do List',
    subtitle: 'Task Manager',
    description: 'A clean task management app with adding, viewing, and marking tasks complete with persistent storage.',
    tech: ['Java', 'HTML'],
    github: 'https://github.com/amanrazz07/To-Do-List',
  },
  {
    title: 'Timetable App',
    subtitle: 'Schedule Organizer',
    description: 'A web-based timetable management app for organizing class schedules with an intuitive interface.',
    tech: ['HTML', 'JavaScript', 'CSS'],
    github: 'https://github.com/amanrazz07/timetable-app',
  },
]

function FeaturedCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex-1 min-w-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${hovered ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.05)'}`,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(99,102,241,0.06)' : 'none',
        }}
      >
        {/* Cursor glow */}
        {hovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mouse.x - 200,
              top: mouse.y - 200,
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
              borderRadius: '50%',
            }}
          />
        )}

        {/* Top accent line */}
        <div
          className="h-[1px] transition-all duration-500"
          style={{
            background: hovered
              ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(168,85,247,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          }}
        />

        <div className="relative p-8 lg:p-10">
          {/* Number + Tag */}
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: 'rgba(99,102,241,0.08)',
                color: '#818cf8',
                border: '1px solid rgba(99,102,241,0.12)',
              }}
            >
              Featured
            </span>
            <span className="text-6xl font-black" style={{ color: 'rgba(255,255,255,0.03)' }}>
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-white" style={{ marginBottom: '0.25rem' }}>
            {project.title}
          </h3>
          <p className="text-text-muted text-sm" style={{ marginBottom: '1rem' }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed" style={{ marginBottom: '1.5rem' }}>
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg text-xs font-medium text-text-muted"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
              >
                <FiGithub className="text-base" /> Source Code <FiArrowUpRight className="text-xs" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-white transition-colors duration-200"
              >
                <FiExternalLink className="text-base" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SmallCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl h-full transition-all duration-300 p-6"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-white transition-colors"
            >
              <FiGithub className="text-lg" />
            </a>
          ) : (
            <FiGithub className="text-text-muted text-lg" />
          )}
        </div>

        <h4 className="text-white font-semibold text-base" style={{ marginBottom: '0.25rem' }}>{project.title}</h4>
        <p className="text-text-muted text-xs" style={{ marginBottom: '0.75rem' }}>{project.subtitle}</p>
        <p className="text-text-muted text-xs leading-relaxed" style={{ marginBottom: '1rem' }}>{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] text-text-muted font-mono">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section
      id="projects"
      className="relative"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>
        <SectionHeading
          label="Projects"
          title="What I've Built"
        />

        {/* Featured — side by side */}
        <div className="flex flex-col lg:flex-row gap-6" style={{ marginTop: '4rem' }}>
          {projects.map((p, i) => (
            <FeaturedCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <div className="flex-1 h-[1px]" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span className="text-text-muted text-xs tracking-widest uppercase font-medium">More Projects</span>
          <div className="flex-1 h-[1px]" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Other Projects — 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherProjects.map((p, i) => (
            <SmallCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
          style={{ marginTop: '3rem' }}
        >
          <a
            href="https://github.com/amanrazz07?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
            id="projects-view-all"
          >
            <FiGithub /> View all on GitHub <FiArrowUpRight className="text-xs" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
