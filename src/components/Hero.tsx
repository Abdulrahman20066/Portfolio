'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/lib/data';

// Lazy-load Three.js canvas (no SSR)
const HeroCanvas = dynamic(() => import('./3d/HeroCanvas'), {
  ssr:     false,
  loading: () => null,
});

// =============================================
// TEXT ANIMATION VARIANTS
// =============================================
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// =============================================
// HERO SECTION
// =============================================
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ---- 3D Background ---- */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* ---- Radial gradient overlay ---- */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, transparent 0%, rgba(5,10,15,0.7) 70%, rgba(5,10,15,0.95) 100%)',
        }}
      />

      {/* ---- Left edge glow ---- */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-[500px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(0,212,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ---- Content ---- */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent-cyan/20 text-xs font-mono text-accent-cyan">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              {personalInfo.available ? 'Available for opportunities' : 'Currently not available'}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="block text-text-secondary font-mono text-sm tracking-widest mb-3 uppercase"
            >
              Hello, I'm
            </span>
            <h1
              className="section-title text-text-primary leading-none"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
            >
              {personalInfo.name}
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2
              className="section-title gradient-text"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontFamily: 'var(--font-syne)' }}
            >
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-text-secondary text-lg leading-relaxed mb-10"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary">
              <ExternalLink size={16} />
              View Projects
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-secondary"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail size={16} />
              Contact Me
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            {[
              { href: personalInfo.github,   icon: Github,   label: 'GitHub'   },
              { href: personalInfo.linkedin,  icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
            <span className="w-8 h-px bg-bg-border" />
            <span className="text-text-muted font-mono text-xs">{personalInfo.location}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors group"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </motion.div>

      {/* ---- Decorative line ---- */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bg-border to-transparent z-20" />
    </section>
  );
}
