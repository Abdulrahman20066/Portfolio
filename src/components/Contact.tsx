'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Send, Github, Linkedin, Mail,
  MapPin, Clock, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react';
import { personalInfo } from '@/lib/data';

// =============================================
// CONTACT FORM
// =============================================
type FormState = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [form,      setForm]      = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [status,    setStatus]    = useState<FormState>('idle');
  const [errorMsg,  setErrorMsg]  = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send message.');
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });

      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  const socials = [
    { href: personalInfo.github,   icon: Github,   label: 'GitHub',   color: 'var(--text-primary)' },
    { href: personalInfo.linkedin,  icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email', color: 'var(--accent-cyan)' },
  ];

  return (
    <section id="contact" ref={ref as any} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <span className="section-label">Get In Touch</span>
          <div className="section-divider mx-auto" />
          <h2 className="section-title text-text-primary mt-2">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Whether you have a project in mind, a job opportunity, or just want to say hello —
            my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ---- Left info column ---- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info cards */}
            {[
              { icon: Mail,    label: 'Email Me',   value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
              { icon: MapPin,  label: 'Location',   value: personalInfo.location, href: '#' },
              { icon: Clock,   label: 'Response',   value: 'Within 24 hours',     href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 glass-card p-4 hover:border-accent-cyan/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-mono uppercase tracking-wider">{label}</p>
                  <p className="text-text-primary text-sm font-medium group-hover:text-accent-cyan transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <p className="text-text-muted font-mono text-xs tracking-widest uppercase mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            {personalInfo.available && (
              <div className="glass-card p-4 border-l-2 border-accent-green">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'var(--accent-green)' }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    Open to Work
                  </span>
                </div>
                <p className="text-text-secondary text-xs">
                  Currently available for full-time roles, contract work, and freelance projects.
                </p>
              </div>
            )}
          </motion.div>

          {/* ---- Right form column ---- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, job opportunity..."
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'success' && <CheckCircle size={16} />}
                  {status === 'idle'    && <Send size={16} />}
                  {status === 'error'   && <AlertCircle size={16} />}

                  {status === 'sending' ? 'Sending…'
                    : status === 'success' ? 'Message Sent!'
                    : status === 'error'   ? 'Try Again'
                    : 'Send Message'}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm"
                    style={{ color: 'var(--accent-green)' }}
                  >
                    ✓ Your message has been sent. I'll get back to you soon!
                  </motion.p>
                )}
                {status === 'error' && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm"
                    style={{ color: 'var(--accent-pink)' }}
                  >
                    ✗ {errorMsg}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
