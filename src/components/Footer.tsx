'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bg-border">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display font-800 text-lg text-text-secondary hover:text-text-primary transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            <span className="text-accent-cyan">&lt;</span>
            {personalInfo.name}
            <span className="text-accent-cyan">/&gt;</span>
          </a>

          {/* Copyright */}
          <p className="text-text-muted text-sm font-mono text-center">
            © {year} {personalInfo.name}. Built with Next.js & Three.js
          </p>

          {/* Social + back to top */}
          <div className="flex items-center gap-4">
            <a href={personalInfo.github}   target="_blank" rel="noopener noreferrer" aria-label="GitHub"
               className="text-text-muted hover:text-accent-cyan transition-colors">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="text-text-muted hover:text-accent-cyan transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email"
               className="text-text-muted hover:text-accent-cyan transition-colors">
              <Mail size={18} />
            </a>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-lg border border-bg-border flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200 ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
