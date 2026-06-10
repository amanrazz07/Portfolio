import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaFigma } from 'react-icons/fa'
import { SiTailwindcss, SiVite } from 'react-icons/si'

const allSkills = [
  { name: 'HTML', icon: <FaHtml5 />, color: '#e34f26' },
  { name: 'CSS', icon: <FaCss3Alt />, color: '#1572b6' },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#f7df1e' },
  { name: 'React', icon: <FaReact />, color: '#61dafb' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06b6d4' },
  { name: 'Vite', icon: <SiVite />, color: '#646cff' },
  { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
  { name: 'Figma', icon: <FaFigma />, color: '#a259ff' },
]

export default function TechStack() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="w-full" style={{ marginTop: '2rem' }}>
      <div className="w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <h3 className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase text-center" style={{ marginBottom: '1.5rem' }}>
            Tech Stack
          </h3>
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-4 min-w-max w-full">
              {allSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-300 cursor-default flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ color: skill.color }} className="text-lg">
                    {skill.icon}
                  </span>
                  <span className="text-text-primary text-sm font-medium whitespace-nowrap">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
