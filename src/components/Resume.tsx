'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { experiences, education, personalInfo } from '@/lib/data';

// =============================================
// TIMELINE ITEM
// =============================================
function TimelineItem({
  item,
  index,
  inView,
  type,
}: {
  item: (typeof experiences)[0] | (typeof education)[0];
  index: number;
  inView: boolean;
  type: 'work' | 'edu';
}) {
  const isWork = type === 'work';
  const exp = item as typeof experiences[0];
  const edu = item as typeof education[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="absolute left-3.5 top-0 bottom-0 w-px bg-bg-border" />

      {/* Dot */}
      <div
        className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 border-bg-border bg-bg-secondary flex items-center justify-center"
        style={{
          borderColor: isWork ? 'var(--accent-cyan)' : 'var(--accent-pink)',
          boxShadow: isWork
            ? '0 0 12px rgba(0,212,255,0.3)'
            : '0 0 12px rgba(255,51,102,0.3)',
        }}
      >
        {isWork
          ? <Briefcase size={12} style={{ color: 'var(--accent-cyan)' }} />
          : <GraduationCap size={12} style={{ color: 'var(--accent-pink)' }} />
        }
      </div>

      {/* Card */}
      <div className="glass-card p-5 hover:border-accent-cyan/20 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div>
            <h3
              className="text-text-primary font-bold text-base"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {isWork ? exp.role : edu.degree}
            </h3>
            <p
              className="font-semibold text-sm mt-0.5"
              style={{ color: isWork ? 'var(--accent-cyan)' : 'var(--accent-pink)' }}
            >
              {isWork ? exp.company : edu.school}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
              <Calendar size={11} />
              {isWork ? exp.period : edu.period}
            </span>
            {isWork && exp.location && (
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <MapPin size={11} />
                {exp.location}
              </span>
            )}
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mt-2">
          {isWork ? exp.desc : edu.desc}
        </p>

        {isWork && exp.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-mono text-text-muted border border-bg-border bg-bg-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// =============================================
// RESUME SECTION
// =============================================
export default function Resume() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="resume" ref={ref as any} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Career</span>
            <div className="section-divider" />
            <h2 className="section-title text-text-primary mt-2">
              Resume & <span className="gradient-text">Experience</span>
            </h2>
          </motion.div>

          <motion.a
            href={personalInfo.resumeUrl}
            download
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="btn-primary self-start md:self-auto"
          >
            <Download size={16} />
            Download Full Resume
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                <Briefcase size={18} />
              </div>
              <h3
                className="text-text-primary font-bold text-xl"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Work Experience
              </h3>
            </motion.div>

            <div>
              {experiences.map((exp, idx) => (
                <TimelineItem
                  key={exp.id}
                  item={exp}
                  index={idx}
                  inView={inView}
                  type="work"
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center"
                style={{ color: 'var(--accent-pink)' }}
              >
                <GraduationCap size={18} />
              </div>
              <h3
                className="text-text-primary font-bold text-xl"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Education
              </h3>
            </motion.div>

            <div>
              {education.map((edu, idx) => (
                <TimelineItem
                  key={edu.id}
                  item={edu}
                  index={idx}
                  inView={inView}
                  type="edu"
                />
              ))}
            </div>

            {/* Resume preview CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 mt-8 text-center"
            >
              <p className="text-text-secondary text-sm mb-4">
                Want the full picture? Download my resume for a detailed view of my experience,
                skills, and achievements.
              </p>
              <a href={personalInfo.resumeUrl} download className="btn-primary">
                <Download size={16} />
                Download Resume (PDF)
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
