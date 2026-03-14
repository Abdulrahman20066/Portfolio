'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Coffee, Code2 } from 'lucide-react';
import { personalInfo } from '@/lib/data';

// =============================================
// STAT CARD
// =============================================
function StatCard({ value, label, icon: Icon }: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div className="glass-card p-5 flex items-center gap-4 transition-all duration-300 hover:scale-105">
      <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <div
          className="text-2xl font-bold text-text-primary"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {value}
        </div>
        <div className="text-text-secondary text-sm">{label}</div>
      </div>
    </div>
  );
}

// =============================================
// ABOUT SECTION
// =============================================
export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const stats = [
    { value: '5+',   label: 'Years Experience',   icon: Calendar },
    { value: '30+',  label: 'Projects Completed',  icon: Code2    },
    { value: '15+',  label: 'Happy Clients',        icon: Coffee   },
    { value: 'Lagos',label: 'Based in Nigeria',     icon: MapPin   },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref as any}>
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255,51,102,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">About Me</span>
          <div className="section-divider" />
          <h2 className="section-title text-text-primary mt-2">
            Building the web,{' '}
            <span className="gradient-text-cyan">one line</span> at a time.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">

          {/* ---- Profile Image Column ---- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Photo container with animated border */}
            <div className="relative w-56 h-56 lg:w-full lg:h-auto lg:aspect-square max-w-xs mx-auto">
              {/* Animated glowing border */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-70"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink), var(--accent-green), var(--accent-cyan))',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 4s ease infinite',
                  borderRadius: '18px',
                }}
              />
              <style>{`
                @keyframes gradientShift {
                  0%   { background-position: 0% 50%; }
                  50%  { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>

              {/* Image wrapper */}
              <div className="relative rounded-2xl overflow-hidden bg-bg-secondary w-full h-full"
                style={{ aspectRatio: '1 / 1' }}>
                {/* Replace /profile.jpg with your actual photo */}
                <img
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback: show initials avatar if image not found
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar (shown if /profile.jpg is missing) */}
                <div
                  className="absolute inset-0 items-center justify-center"
                  style={{ display: 'none', background: 'linear-gradient(135deg, #0A1520, #0D1B2A)' }}
                >
                  <span
                    className="text-6xl font-bold gradient-text"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {personalInfo.name.charAt(0)}
                  </span>
                </div>

                {/* Subtle overlay shine */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(160deg, rgba(0,212,255,0.08) 0%, transparent 50%, rgba(255,51,102,0.05) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Name + title under photo */}
            <div className="mt-5 text-center lg:text-left w-full max-w-xs mx-auto">
              <p
                className="text-text-primary font-bold text-lg"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {personalInfo.name}
              </p>
              <p className="text-accent-cyan text-sm font-mono mt-0.5">
                {personalInfo.title}
              </p>
              <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-text-muted text-xs">
                  {personalInfo.available ? 'Available for work' : 'Not available'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ---- Text Column ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-1"
          >
            <div
              className="text-text-secondary text-lg leading-relaxed space-y-5"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {personalInfo.bio.trim().split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Tech list */}
            <div className="mt-10">
              <p className="text-text-muted font-mono text-xs tracking-widest uppercase mb-4">
                Technologies I work with
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'JavaScript (ES6+)', 'TypeScript',
                  'React / Next.js',   'Node.js / Express',
                  'PostgreSQL',        'Supabase',
                  'Docker',            'Git & GitHub',
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-accent-cyan text-xs">▸</span>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---- Stats Column ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-4"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="glass-card p-6 border-l-2 border-accent-cyan mt-6"
            >
              <p className="text-text-secondary text-sm italic leading-relaxed">
                "I write code not just to make things work, but to make them work
                <span className="text-text-primary"> beautifully</span>."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
