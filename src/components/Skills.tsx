'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/lib/data';

// =============================================
// SKILL BAR
// =============================================
function SkillBar({
  name, icon, level, delay,
}: {
  name: string; icon: string; level: number; delay: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-text-primary text-sm font-medium">{name}</span>
        </div>
        <span className="font-mono text-xs text-text-muted">{level}%</span>
      </div>

      {/* Progress track */}
      <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))',
          }}
        >
          {/* Shine effect */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// =============================================
// SKILL CATEGORY CARD
// =============================================
function SkillCategory({
  title, items, accentColor, delay,
}: {
  title: string;
  items: { name: string; icon: string; level: number }[];
  accentColor: string;
  delay: number;
}) {
  return (
    <div className="glass-card p-7 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2 h-6 rounded-full"
          style={{ background: accentColor }}
        />
        <h3
          className="text-text-primary font-bold text-lg"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-5">
        {items.map((skill, idx) => (
          <SkillBar
            key={skill.name}
            {...skill}
            delay={delay + idx * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================
// SKILLS SECTION
// =============================================
export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = [
    { title: 'Frontend',  items: skills.frontend, accentColor: 'var(--accent-cyan)', delay: 0.1 },
    { title: 'Backend',   items: skills.backend,  accentColor: 'var(--accent-pink)', delay: 0.2 },
    { title: 'Tools',     items: skills.tools,    accentColor: 'var(--accent-green)',delay: 0.3 },
  ];

  return (
    <section
      id="skills"
      ref={ref as any}
      className="section-padding relative overflow-hidden"
    >
      {/* Background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,51,102,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">Technical Skills</span>
          <div className="section-divider" />
          <h2 className="section-title text-text-primary mt-2">
            My <span className="gradient-text">Toolbox</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl">
            Technologies I've worked with across frontend, backend, and DevOps — each representing
            real project experience.
          </p>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: cat.delay }}
            >
              <SkillCategory {...cat} />
            </motion.div>
          ))}
        </div>

        {/* Tech badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-bg-border"
        >
          <p className="text-text-muted font-mono text-xs tracking-widest uppercase text-center mb-6">
            Also worked with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'GraphQL', 'Redis', 'Socket.io', 'AWS', 'Vercel',
              'Prisma', 'tRPC', 'Sass', 'Webpack', 'Vite',
              'Jest', 'Playwright', 'CI/CD', 'Linux',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-md text-xs font-mono text-text-muted border border-bg-border bg-bg-secondary hover:border-accent-cyan/30 hover:text-text-primary transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
