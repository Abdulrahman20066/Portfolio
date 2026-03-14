'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Image, Archive, Eye, Loader2, FolderOpen } from 'lucide-react';
import { supabase, getFileUrl } from '@/lib/supabase';

// =============================================
// FILE TYPE HELPERS
// =============================================
function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || ''))
    return Image;
  if (['zip', 'tar', 'gz', 'rar'].includes(ext || ''))
    return Archive;
  return FileText;
}

function getFileCategory(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'PDF';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'Image';
  if (['zip', 'tar', 'gz'].includes(ext || '')) return 'Archive';
  if (['doc', 'docx'].includes(ext || '')) return 'Document';
  if (['ppt', 'pptx'].includes(ext || '')) return 'Presentation';
  return 'File';
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return '';
  }
}

// =============================================
// FILE CARD
// =============================================
function FileCard({
  file,
  index,
  inView,
}: {
  file: { name: string; metadata?: { size?: number; mimetype?: string }; created_at: string };
  index: number;
  inView: boolean;
}) {
  const Icon = getFileIcon(file.name);
  const category = getFileCategory(file.name);
  const filePath = `uploads/${file.name}`;
  const publicUrl = getFileUrl(filePath);
  const isPdf = file.name.endsWith('.pdf');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-card p-5 group hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
          <Icon size={22} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-text-primary font-medium text-sm truncate group-hover:text-accent-cyan transition-colors duration-300"
            title={file.name}
          >
            {file.name}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-mono text-text-muted">{category}</span>
            {file.metadata?.size && (
              <span className="text-xs text-text-muted">
                {formatBytes(file.metadata.size)}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-1">{formatDate(file.created_at)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-bg-border">
        {isPdf && (
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono text-text-muted border border-bg-border hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-200"
          >
            <Eye size={13} />
            Preview
          </a>
        )}
        <a
          href={publicUrl}
          download={file.name}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/20 transition-all duration-200"
        >
          <Download size={13} />
          Download
        </a>
      </div>
    </motion.div>
  );
}

// =============================================
// DEMO FILES (shown when Supabase is not set up)
// =============================================
const DEMO_FILES = [
  { id: 'd1', name: 'Abdulrahman_Resume.pdf',         category: 'PDF',          size: '245 KB', date: 'Jan 2024' },
  { id: 'd2', name: 'AWS_Certificate.pdf',             category: 'Certificate',  size: '890 KB', date: 'Dec 2023' },
  { id: 'd3', name: 'React_Portfolio_CaseStudy.pdf',   category: 'Case Study',   size: '1.2 MB', date: 'Nov 2023' },
  { id: 'd4', name: 'Udemy_NodeJS_Certificate.pdf',    category: 'Certificate',  size: '540 KB', date: 'Oct 2023' },
  { id: 'd5', name: 'SaaS_Project_Documentation.pdf',  category: 'Document',     size: '780 KB', date: 'Sep 2023' },
  { id: 'd6', name: 'Portfolio_Presentation.pdf',      category: 'Presentation', size: '3.1 MB', date: 'Aug 2023' },
];

function DemoFileCard({ file, index, inView }: {
  file: typeof DEMO_FILES[0]; index: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-card p-5 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center flex-shrink-0"
          style={{ color: 'var(--accent-pink)' }}>
          <FileText size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-medium text-sm truncate" title={file.name}>
            {file.name}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-mono text-text-muted">{file.category}</span>
            <span className="text-xs text-text-muted">{file.size}</span>
          </div>
          <p className="text-xs text-text-muted mt-1">{file.date}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 pt-4 border-t border-bg-border">
        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono text-text-muted border border-bg-border cursor-not-allowed opacity-50">
          <Download size={13} />
          Connect Supabase to enable
        </div>
      </div>
    </motion.div>
  );
}

// =============================================
// RESOURCES SECTION
// =============================================
export default function Resources() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [files,   setFiles]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co';

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    async function loadFiles() {
      try {
        const { data, error: err } = await supabase
          .storage
          .from('portfolio-files')
          .list('uploads', { limit: 50, sortBy: { column: 'created_at', order: 'desc' } });

        if (err) throw err;
        setFiles(data || []);
      } catch (e) {
        console.error('Failed to load files:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadFiles();
  }, [supabaseConfigured]);

  return (
    <section id="resources" ref={ref as any} className="section-padding relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 10% 80%, rgba(0,255,148,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="section-label">Resources</span>
          <div className="section-divider" />
          <h2 className="section-title text-text-primary mt-2">
            Files & <span className="gradient-text">Documents</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl">
            Certificates, case studies, project documentation, and other files available for download.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="text-accent-cyan animate-spin" />
          </div>
        )}

        {/* Live files from Supabase */}
        {!loading && supabaseConfigured && !error && (
          <>
            {files.length === 0 ? (
              <div className="text-center py-20">
                <FolderOpen size={48} className="text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">No files uploaded yet.</p>
                <p className="text-text-muted text-sm mt-1">Use the admin panel to upload files.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {files.map((file, idx) => (
                  <FileCard key={file.id || file.name} file={file} index={idx} inView={inView} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Demo files (Supabase not yet configured) */}
        {!loading && !supabaseConfigured && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="mb-6 px-4 py-3 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan text-sm font-mono flex items-center gap-2"
            >
              <span>ℹ</span>
              Demo mode — connect Supabase to enable real file storage. See .env.example.
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEMO_FILES.map((file, idx) => (
                <DemoFileCard key={file.id} file={file} index={idx} inView={inView} />
              ))}
            </div>
          </>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-text-muted">Could not load files. Check your Supabase configuration.</p>
          </div>
        )}
      </div>
    </section>
  );
}
