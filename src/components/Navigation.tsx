'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useScrollAnimation';
import { personalInfo } from '@/lib/data';

// =============================================
// NAV ITEMS
// =============================================
const NAV_ITEMS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume',   href: '#resume'   },
  { label: 'Resources',href: '#resources'},
  { label: 'Contact',  href: '#contact'  },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

export default function Navigation() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  // Detect scroll to add backdrop blur
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* ======== DESKTOP NAV ======== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-bg-border/50' : ''}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">

         {/* Logo */}
<a href="#hero">
  <img src="/logo.svg" alt="AMD Logo" width={36} height={36} className="rounded-lg hover:opacity-80 transition-opacity duration-300" />
</a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${isActive
                        ? 'text-accent-cyan'
                        : 'text-text-secondary hover:text-text-primary'
                      }
                    `}
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-accent-cyan/10 rounded-lg border border-accent-cyan/20"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <a
            href={personalInfo.resumeUrl}
            download
            className="hidden md:flex btn-primary text-sm py-2 px-5"
          >
            Download CV
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-secondary hover:text-accent-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ======== MOBILE MENU ======== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="section-title text-3xl text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.resumeUrl}
                download
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="btn-primary mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
