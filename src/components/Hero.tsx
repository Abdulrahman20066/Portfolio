'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/lib/data';

const HeroCanvas = dynamic(() => import('./3d/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, transparent 0%, rgba(5,10,15,0.7) 70%, rgba(5,10,15,0.95) 100%)',
        }}
      />

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-accent-cyan/20 text-xs font-mono text-accent-cyan">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse flex-shrink-0" />
              {personalInfo.available ? 'Available for opportunities' : 'Currently not available'}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-3">
            <span className="block text-text-secondary font-mono text-xs tracking-widest mb-2 uppercase">
              Hello, I am
            </span>
            <h1
              className="section-title text-text-primary leading-none"
              style={{ fontSize: 'clamp(2rem, 8vw, 7rem)' }}
            >
              {personalInfo.name}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-4">
            <h2
              className="section-title gradient-text"
              style={{ fontSize: 'clamp(1rem, 3.5vw, 3rem)', fontFamily: 'var(--font-syne)' }}
            >
              {personalInfo.title}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-text-secondary text-sm sm:text-base leading-relaxed mb-7 px-2"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-7 w-full max-w-xs sm:max-w-none"
          >
            <a href="#projects" className="btn-primary justify-center text-sm px-5 py-2.5">
              <ExternalLink size={15} />
              View Projects
            </a>
            <a href={personalInfo.resumeUrl} download className="btn-secondary justify-center text-sm px-5 py-2.5">
              <Download size={15} />
              Download Resume
            </a>
            <a href="#contact" className="btn-secondary justify-center text-sm px-5 py-2.5">
              <Mail size={15} />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300">
              <Mail size={18} />
            </a>
            <span className="hidden sm:block w-8 h-px bg-bg-border" />
            <span className="text-text-muted font-mono text-xs">{personalInfo.location}</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bg-border to-transparent z-20" />
    </section>
  );
}