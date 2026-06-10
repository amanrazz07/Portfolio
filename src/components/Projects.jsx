import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './SectionHeading'
import { FiGithub, FiExternalLink, FiArrowUpRight, FiCode, FiLayers, FiShield, FiCpu } from 'react-icons/fi'

const projects = [
  {
    title: 'SmartCart',
    subtitle: 'Quick Commerce Aggregator',
    description:
      'A production-grade quick-commerce aggregator that compares real-time product pricing across Blinkit, Zepto & Instamart — with pin-code-specific availability, a universal multi-platform cart, and Google-style auto-suggest search.',
    highlights: ['Real-time Scraping', 'Geo-fenced Pricing', 'Multi-platform Cart', 'Auto-suggest Search'],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express.js'],
    github: null,
    live: null,
    // featured: true,
    status: 'In Development',
    statusColor: '#22d3ee',
    role: 'Full Stack',
    accent: '#22d3ee',
    accentSecondary: '#06b6d4',
    icon: <FiLayers />,
  },
  {
    title: 'Secure Auth System',
    subtitle: 'Enterprise Login Architecture',
    description:
      'A production-ready Java web authentication system with BCrypt password hashing, SQL-injection-proof queries, MySQL persistence, and a premium glassmorphic UI — following enterprise-grade security practices.',
    highlights: ['BCrypt Hashing', 'SQL Injection Safe', 'Session Management', 'Glassmorphic UI'],
    tech: ['Java', 'MySQL', 'HTML', 'CSS', 'Servlets'],
    github: 'https://github.com/amanrazz07/Secure-Auth-System',
    live: null,
    featured: true,
    status: 'Completed',
    statusColor: '#34d399',
    role: 'Backend',
    accent: '#a855f7',
    accentSecondary: '#7c3aed',
    icon: <FiShield />,
  },
]

const otherProjects = [
  {
    title: 'AI Phishing Detection',
    subtitle: 'ML Security System',
    description: 'An ML-trained system that classifies URLs as safe or phishing in real-time using feature extraction and a trained model pipeline.',
    tech: ['JavaScript', 'Python', 'ML'],
    github: 'https://github.com/amanrazz07/Ai_ML_Trained_Phishing_URL_Detection',
    accent: '#f59e0b',
    icon: <FiCpu />,
  },
  {
    title: 'Chess Game',
    subtitle: 'Interactive Board Game',
    description: 'A complete chess engine with full move validation, check/checkmate detection, castling, en passant, and an elegant board UI.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/amanrazz07/Chess-Game',
    accent: '#34d399',
    icon: <FiCode />,
  },
  {
    title: 'To-Do List',
    subtitle: 'Task Manager',
    description: 'A full-stack task management app with CRUD operations, persistent storage, and a clean responsive interface.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/amanrazz07/To-Do-List',
    accent: '#6366f1',
    icon: <FiCode />,
  },
  {
    title: 'Timetable App',
    subtitle: 'Schedule Organizer',
    description: 'A web-based schedule organizer for managing class timetables with drag-drop interface and local persistence.',
    tech: ['HTML', 'JavaScript', 'CSS'],
    github: 'https://github.com/amanrazz07/timetable-app',
    accent: '#ec4899',
    icon: <FiCode />,
  },
]

/* ─── Featured Hero Card (SmartCart — full width) ─── */
function HeroCard({ project, inView }) {
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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${hovered ? `${project.accent}40` : 'rgba(255,255,255,0.06)'}`,
          transform: hovered ? 'translateY(-6px)' : 'none',
          boxShadow: hovered
            ? `0 25px 80px rgba(0,0,0,0.4), 0 0 60px ${project.accent}10`
            : 'none',
        }}
      >
        {/* Cursor glow follow */}
        {hovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mouse.x - 250,
              top: mouse.y - 250,
              width: 500,
              height: 500,
              background: `radial-gradient(circle, ${project.accent}08, transparent 70%)`,
              borderRadius: '50%',
            }}
          />
        )}

        {/* Top shimmer accent bar */}
        <div className="project-shimmer" style={{ '--accent': project.accent, '--accent2': project.accentSecondary }} />

        <div className="relative p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left content - Spans 7 columns on desktop */}
            <div className="lg:col-span-7 min-w-0">
              {/* Status + Role row */}
              <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: '1.5rem' }}>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{
                    background: `${project.statusColor}12`,
                    color: project.statusColor,
                    border: `1px solid ${project.statusColor}25`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.statusColor }} />
                  {project.status}
                </span>
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{
                    background: `${project.accent}10`,
                    color: project.accent,
                    border: `1px solid ${project.accent}20`,
                  }}
                >
                  {project.role}
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4" style={{ marginBottom: '0.5rem' }}>
                <span className="text-2xl" style={{ color: project.accent }}>{project.icon}</span>
                <h3 className="text-3xl lg:text-4xl font-black text-white">{project.title}</h3>
              </div>
              <p className="text-text-muted text-sm font-medium" style={{ marginBottom: '1.25rem' }}>{project.subtitle}</p>

              {/* Description */}
              <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl" style={{ marginBottom: '2rem' }}>
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4">
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
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: project.accent }}
                  >
                    <FiExternalLink className="text-base" /> Live Demo <FiArrowUpRight className="text-xs" />
                  </a>
                )}
              </div>
            </div>

            {/* Right content - Spans 5 columns on desktop */}
            <div className="lg:col-span-5 relative flex flex-col gap-6 lg:pl-6">
              {/* Big watermark number */}
              <span className="absolute -top-12 -right-4 font-black leading-none select-none pointer-events-none hidden lg:block" style={{ fontSize: '10rem', color: `${project.accent}05` }}>
                01
              </span>

              <div className="relative z-10">
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: project.accent }}>
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${project.accent}08`,
                        color: project.accent,
                        border: `1px solid ${project.accent}15`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: project.accent }}>
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted font-mono"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Featured Compact Card (Secure Auth) ─── */
function CompactFeaturedCard({ project, inView }) {
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
      transition={{ duration: 0.7, delay: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${hovered ? `${project.accent}40` : 'rgba(255,255,255,0.06)'}`,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${project.accent}08`
            : 'none',
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
              background: `radial-gradient(circle, ${project.accent}06, transparent 70%)`,
              borderRadius: '50%',
            }}
          />
        )}

        {/* Top shimmer accent */}
        <div className="project-shimmer" style={{ '--accent': project.accent, '--accent2': project.accentSecondary }} />

        <div className="relative p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left content - Spans 7 columns on desktop */}
            <div className="lg:col-span-7 min-w-0">
              {/* Status + Role */}
              <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: '1.25rem' }}>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: `${project.statusColor}12`,
                    color: project.statusColor,
                    border: `1px solid ${project.statusColor}25`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.statusColor }} />
                  {project.status}
                </span>
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: `${project.accent}10`,
                    color: project.accent,
                    border: `1px solid ${project.accent}20`,
                  }}
                >
                  {project.role}
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-3" style={{ marginBottom: '0.35rem' }}>
                <span className="text-xl" style={{ color: project.accent }}>{project.icon}</span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">{project.title}</h3>
              </div>
              <p className="text-text-muted text-sm" style={{ marginBottom: '1rem' }}>{project.subtitle}</p>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed" style={{ marginBottom: '1.5rem' }}>
                {project.description}
              </p>

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
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: project.accent }}
                  >
                    <FiExternalLink className="text-base" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right content - Spans 5 columns on desktop */}
            <div className="lg:col-span-5 relative flex flex-col gap-5 lg:pl-6">
              {/* Big number bg */}
              <span
                className="absolute -top-12 -right-4 font-black select-none pointer-events-none hidden lg:block"
                style={{ fontSize: '8rem', color: `${project.accent}04` }}
              >
                02
              </span>

              <div className="relative z-10">
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: project.accent }}>
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      style={{
                        background: `${project.accent}08`,
                        color: project.accent,
                        border: `1px solid ${project.accent}15`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: project.accent }}>
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-text-muted font-mono"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Other Project Card ─── */
function SmallCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl h-full transition-all duration-400 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? `${project.accent}30` : 'rgba(255,255,255,0.05)'}`,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.25), 0 0 30px ${project.accent}06` : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          }}
        />

        <div className="p-6">
          {/* Header: icon + number */}
          <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `${project.accent}10`,
                    color: project.accent,
                    border: `1px solid ${project.accent}20`,
                  }}
                >
                  <FiGithub className="text-lg" />
                </a>
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${project.accent}10`, color: project.accent }}
                >
                  {project.icon}
                </div>
              )}
            </div>
            <span className="text-3xl font-black select-none" style={{ color: `${project.accent}10` }}>
              0{index + 1}
            </span>
          </div>

          <h4 className="text-white font-bold text-base" style={{ marginBottom: '0.25rem' }}>{project.title}</h4>
          <p className="text-text-muted text-xs font-medium" style={{ marginBottom: '0.75rem', color: project.accent + '90' }}>{project.subtitle}</p>
          <p className="text-text-muted text-xs leading-relaxed" style={{ marginBottom: '1rem' }}>{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Hover reveal link */}
          {project.github && (
            <div
              className="transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: hovered ? '40px' : '0',
                opacity: hovered ? 1 : 0,
                marginTop: hovered ? '0.75rem' : '0',
              }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                style={{ color: project.accent }}
              >
                View Code <FiArrowUpRight className="text-[10px]" />
              </a>
            </div>
          )}
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
      style={{ paddingTop: '5rem', paddingBottom: '4rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>
        <SectionHeading
          label="Projects"
          title="What I've Built"
        />

        {/* Featured Hero — SmartCart (full width) */}
        <div style={{ marginTop: '3rem' }}>
          <HeroCard project={projects[0]} inView={inView} />
        </div>

        {/* Featured Compact — Secure Auth */}
        <div style={{ marginTop: '1.5rem' }}>
          <CompactFeaturedCard project={projects[1]} inView={inView} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
          <span className="text-text-muted text-xs tracking-widest uppercase font-medium">More Projects</span>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
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
          style={{ marginTop: '2.5rem' }}
        >
          <a
            href="https://github.com/amanrazz07?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            id="projects-view-all"
          >
            <FiGithub /> View all on GitHub <FiArrowUpRight className="text-xs" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
