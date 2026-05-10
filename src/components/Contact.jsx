import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { BsLightningChargeFill } from 'react-icons/bs'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Required'
    else if (form.message.trim().length < 10) errs.message = 'Min 10 chars'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    // Simulate sending delay for UI effect
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
  }

  const fieldBorder = (field) =>
    errors[field]
      ? '1px solid rgba(239,68,68,0.5)'
      : focused === field
        ? '1px solid rgba(99,102,241,0.5)'
        : '1px solid rgba(255,255,255,0.08)'

  return (
    <section
      id="contact"
      className="relative"
      style={{ paddingTop: '4rem', paddingBottom: '3.5rem' }}
    >
      <div className="section-container relative z-10" ref={ref}>

        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '2.5rem' }}
        >
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem',
            }}
          >
            Let's Connect
          </h2>

          <div
            className="mx-auto"
            style={{
              width: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
              borderRadius: '2px',
              marginBottom: '1rem',
            }}
          />

          <p className="text-text-muted" style={{ fontSize: '15px', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
            Have a project in mind or want to discuss an opportunity? Drop a message or reach out through my social links.
          </p>
        </motion.div>

        {/* 2-col layout — full width, no max-width cap */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: '3.5rem' }}
        >

          {/* LEFT — Form (flat, no card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} id="contact-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-white font-bold" style={{ fontSize: '13px', marginBottom: '0.5rem' }}>
                    Name
                  </label>
                  <input
                    id="contact-name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className="w-full text-white placeholder-text-muted/40 focus:outline-none transition-all duration-200"
                    style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: fieldBorder('name'), fontSize: '14px' }}
                  />
                  {errors.name && <p className="text-red-400/80 text-xs flex items-center gap-1" style={{ marginTop: '0.3rem' }}><HiExclamationCircle /> {errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-white font-bold" style={{ fontSize: '13px', marginBottom: '0.5rem' }}>
                    Email
                  </label>
                  <input
                    id="contact-email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="your.email@example.com"
                    className="w-full text-white placeholder-text-muted/40 focus:outline-none transition-all duration-200"
                    style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: fieldBorder('email'), fontSize: '14px' }}
                  />
                  {errors.email && <p className="text-red-400/80 text-xs flex items-center gap-1" style={{ marginTop: '0.3rem' }}><HiExclamationCircle /> {errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-white font-bold" style={{ fontSize: '13px', marginBottom: '0.5rem' }}>
                    Message
                  </label>
                  <textarea
                    id="contact-message" name="message"
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="w-full text-white placeholder-text-muted/40 focus:outline-none transition-all duration-200 resize-vertical"
                    style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: fieldBorder('message'), fontSize: '14px' }}
                  />
                  {errors.message && <p className="text-red-400/80 text-xs flex items-center gap-1" style={{ marginTop: '0.3rem' }}><HiExclamationCircle /> {errors.message}</p>}
                </div>
              </div>

              {/* Button */}
              <button
                type="submit" id="contact-submit"
                disabled={status === 'sending'}
                className="w-full text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  marginTop: '1.5rem',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <FiSend className={status === 'sending' ? 'animate-pulse' : ''} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 text-sm flex items-center gap-2 justify-center" style={{ marginTop: '0.75rem' }}>
                  <HiCheckCircle /> Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm flex items-center gap-2 justify-center" style={{ marginTop: '0.75rem' }}>
                  <HiExclamationCircle /> Failed to send. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* RIGHT — Connect With Me */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold" style={{ fontSize: '17px', marginBottom: '1.25rem' }}>
              Connect With Me
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

              {/* GitHub */}
              <a
                href="https://github.com/amanrazz07" target="_blank" rel="noreferrer"
                className="flex items-center gap-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                id="contact-social-github"
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.06)' }}>
                  <FiGithub className="text-white" style={{ fontSize: '20px' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold" style={{ fontSize: '15px' }}>GitHub</h4>
                  <p className="text-text-muted" style={{ fontSize: '13px', marginTop: '1px' }}>View my repositories</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/aman-kumar-btech/" target="_blank" rel="noreferrer"
                className="flex items-center gap-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                id="contact-social-linkedin"
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'rgba(99,102,241,0.1)' }}>
                  <FiLinkedin style={{ fontSize: '20px', color: '#818cf8' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold" style={{ fontSize: '15px' }}>LinkedIn</h4>
                  <p className="text-text-muted" style={{ fontSize: '13px', marginTop: '1px' }}>Connect professionally</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:arazz5349@gmail.com"
                className="flex items-center gap-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                id="contact-social-email"
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'rgba(168,85,247,0.1)' }}>
                  <FiMail style={{ fontSize: '20px', color: '#a78bfa' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold" style={{ fontSize: '15px' }}>Email</h4>
                  <p className="text-text-muted" style={{ fontSize: '13px', marginTop: '1px' }}>Send me an email</p>
                </div>
              </a>

              {/* Quick Response */}
              <div
                className="flex items-center gap-4 rounded-xl"
                style={{ padding: '1rem 1.25rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(245,158,11,0.02))', border: '1px solid rgba(245,158,11,0.12)' }}
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'rgba(245,158,11,0.08)' }}>
                  <BsLightningChargeFill style={{ fontSize: '20px', color: '#f59e0b' }} />
                </div>
                <div>
                  <h4 className="font-bold" style={{ fontSize: '15px', color: '#f59e0b' }}>Quick Response Guaranteed</h4>
                  <p className="text-text-muted" style={{ fontSize: '13px', marginTop: '1px' }}>I typically respond within 24 hours</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
