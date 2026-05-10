import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowRight, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import BallpitBackground from './BallpitBackground'

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BallpitBackground
        count={150}
        colors={['#6366f1', '#a855f7', '#22d3ee', '#1e293b']}
        gravity={0.3}
        friction={0.998}
        followCursor={true}
      />

      <div className="section-container relative z-10 py-40 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-12"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-text-secondary">
                Open to opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-text-secondary text-xl mb-4 font-mono"
            >
              {'>'} Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-6xl sm:text-7xl lg:text-[6rem] font-black tracking-tight leading-tight mb-6"
            >
              Aman{' '}
              <span className="animated-gradient-text drop-shadow-lg">Kumar</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-secondary mb-10 h-12"
            >
              <TypeAnimation
                sequence={[
                  'Backend Developer',
                  2000,
                  'System Designer',
                  2000,
                  'Problem Solver',
                  2000,
                  'API Architect',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text-alt"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-text-muted text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-normal"
            >
              Building scalable and efficient backend systems. Passionate about
              clean architecture, high-performance APIs, and solving complex
              problems with elegant code.
            </motion.p>

            {/* Actions Group (Buttons + Socials) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-6 items-center lg:items-start"
            >
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
                <a href="#projects" className="btn-primary group hover:scale-[1.03] shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300" id="hero-view-projects">
                  <span className="flex items-center gap-2">
                    View Projects <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="#contact" className="btn-secondary hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-accent-primary/50 transition-all duration-300" id="hero-contact">
                  <FiMail className="text-accent-primary" />
                  Contact Me
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 sm:gap-5 justify-center lg:justify-start">
                {[
                  { icon: <FiGithub />, href: 'https://github.com/amanrazz07', label: 'GitHub' },
                  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/aman-kumar-btech/', label: 'LinkedIn' },
                  { icon: <FiMail />, href: 'mailto:arazz5349@gmail.com', label: 'Email' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`hero-social-${social.label.toLowerCase()}`}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/10 text-xl"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            className="flex-shrink-0 animate-float"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              />
              <div className="profile-ring">
                <img
                  src="/profile.jpg"
                  alt="Aman Kumar"
                  className="w-56 h-56 sm:w-72 sm:h-72 rounded-full object-cover relative z-10"
                  style={{ objectPosition: 'center' }}
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
        >
          <span className="text-text-muted text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
