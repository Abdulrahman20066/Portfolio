'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/lib/data';

// =============================================
// PROJECT CARD
// =============================================
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card overflow-hidden group transition-all duration-500 hover:scale-[1.02]"
      style={{
        boxShadow: hovered
          ? '0 0 30px rgba(0, 212, 255, 0.12), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden bg-bg-secondary">
        {/* Placeholder gradient when no image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsl(${index * 60 + 200}, 60%, 10%) 0%, hsl(${index * 60 + 220}, 70%, 7%) 100%)`,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Project title over image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-5xl font-bold text-white/5"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay with links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm flex items-center justify-center gap-4"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
              aria-label="View source on GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </motion.div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3
          className="text-text-primary font-bold text-lg mb-2 group-hover:text-accent-cyan transition-colors duration-300"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-xs font-mono text-text-muted border border-bg-border bg-bg-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-3 pt-4 border-t border-bg-border">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-cyan transition-colors font-mono"
            >
              <Github size={13} />
              Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-cyan transition-colors font-mono"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// =============================================
// PROJECTS SECTION
// =============================================
export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayed = filter === 'featured'
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" ref={ref as any} className="section-padding relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(0,212,255,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">My Work</span>
            <div className="section-divider" />
            <h2 className="section-title text-text-primary mt-2">
              Selected <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            {(['all', 'featured'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? 'bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan'
                    : 'border border-bg-border text-text-muted hover:border-bg-border/80 hover:text-text-secondary'
                }`}
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-2 gap-6"
          >
            {displayed.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                inView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/abdulrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
