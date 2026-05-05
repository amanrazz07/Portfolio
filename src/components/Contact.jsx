import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './SectionHeading'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight } from 'react-icons/fi'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import emailjs from '@emailjs/browser'

const socials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/amanrazz07' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aman-kumar-btech/' },
  { icon: <FiInstagram />, label: 'Instagram', href: 'https://www.instagram.com/aman_razz07/' },
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Min 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    // EmailJS integration
    emailjs
      .send(
        'YOUR_SERVICE_ID', // e.g. 'service_xxxxx'
        'YOUR_TEMPLATE_ID', // e.g. 'template_xxxxx'
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'YOUR_PUBLIC_KEY' // e.g. 'xxxxxxxxxxxxxxx'
      )
      .then(
        () => {
          setStatus('success')
          setForm({ name: '', email: '', message: '' })
          setTimeout(() => setStatus(null), 5000)
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setStatus('error')
          setTimeout(() => setStatus(null), 5000)
        }
      )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
  }

  const fieldStyle = (name) => ({
    background: focused === name ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
    border: `1px solid ${errors[name] ? 'rgba(239,68,68,0.4)' : focused === name ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)'}`,
  })

  return (
    <section
      id="contact"
      className="relative"
      style={{ paddingTop: '8rem', paddingBottom: '10rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>
        <SectionHeading
          label="Contact"
          title="Get In Touch"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 max-w-5xl mx-auto w-full" style={{ marginTop: '4rem' }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-text-muted mb-2">Name</label>
                  <input
                    id="contact-name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-xl text-white placeholder-text-muted/50 focus:outline-none transition-all duration-200"
                    style={fieldStyle('name')}
                  />
                  {errors.name && <p className="text-red-400/80 text-xs mt-1.5 flex items-center gap-1"><HiExclamationCircle /> {errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm text-text-muted mb-2">Email</label>
                  <input
                    id="contact-email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 rounded-xl text-white placeholder-text-muted/50 focus:outline-none transition-all duration-200"
                    style={fieldStyle('email')}
                  />
                  {errors.email && <p className="text-red-400/80 text-xs mt-1.5 flex items-center gap-1"><HiExclamationCircle /> {errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm text-text-muted mb-2">Message</label>
                  <textarea
                    id="contact-message" name="message"
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl text-white placeholder-text-muted/50 focus:outline-none transition-all duration-200 resize-none"
                    style={fieldStyle('message')}
                  />
                  {errors.message && <p className="text-red-400/80 text-xs mt-1.5 flex items-center gap-1"><HiExclamationCircle /> {errors.message}</p>}
                </div>
              </div>

              <button
                type="submit" id="contact-submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.25)',
                }}
              >
                <FiSend className={status === 'sending' ? 'animate-pulse' : ''} /> 
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-emerald-400 text-sm flex items-center gap-2 justify-center"
                  style={{ marginTop: '1rem' }}
                >
                  <HiCheckCircle /> Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-red-400 text-sm flex items-center gap-2 justify-center"
                  style={{ marginTop: '1rem' }}
                >
                  <HiExclamationCircle /> Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold text-white" style={{ marginBottom: '0.5rem' }}>
              Let's work together
            </h3>
            <p className="text-text-muted text-sm leading-relaxed" style={{ marginBottom: '2rem' }}>
              I'm always open to new projects and opportunities. Feel free to reach out.
            </p>

            {/* Email */}
            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
              <FiMail className="text-accent-primary text-base flex-shrink-0" />
              <a href="mailto:arazz5349@gmail.com" className="text-white text-sm font-medium hover:text-accent-primary transition-colors">
                arazz5349@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3" style={{ marginBottom: '2rem' }}>
              <FiMapPin className="text-accent-secondary text-base flex-shrink-0" />
              <span className="text-text-secondary text-sm">Greater Noida, India</span>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-12" style={{ background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  id={`contact-social-${s.label.toLowerCase()}`}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
