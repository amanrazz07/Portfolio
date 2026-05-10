import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiHeart } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'

const links = [
  { icon: <FiGithub />, href: 'https://github.com/amanrazz07', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/aman-kumar-btech/', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/aman_razz07/', label: 'Instagram' },
  { icon: <FiMail />, href: 'mailto:arazz5349@gmail.com', label: 'Email' },
  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/amanrazz01/', label: 'LeetCode' },
]

export default function Footer() {
  return (
    <footer className="relative" style={{ marginTop: '2rem' }}>
      {/* Top border with gradient */}
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(168,85,247,0.3), transparent)',
        }}
      />

      <div className="section-container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Text */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 0 20px rgba(99,102,241,0.3)',
              }}
            >
              A
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Aman Kumar
              </p>
              <p className="text-text-muted text-xs">
                Backend Developer
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                id={`footer-${link.label.toLowerCase()}`}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-text-muted text-xs flex items-center gap-1">
            Crafted with <FiHeart className="text-red-400 text-[10px]" /> by Aman Kumar © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
