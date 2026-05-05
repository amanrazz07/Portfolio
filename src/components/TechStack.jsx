import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaJava, FaNodeJs, FaLinux } from 'react-icons/fa'
import { SiSpringboot, SiExpress, SiMysql, SiMongodb } from 'react-icons/si'
import { HiServer } from 'react-icons/hi'

const allSkills = [
  { name: 'Java', icon: <FaJava />, color: '#f89820' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
  { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
  { name: 'Express.js', icon: <SiExpress />, color: '#ffffff' },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'Linux', icon: <FaLinux />, color: '#fcc624' },
  { name: 'REST APIs', icon: <HiServer />, color: '#6366f1' },
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
