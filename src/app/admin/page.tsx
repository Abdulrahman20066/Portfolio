'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Trash2, FileText, Image, Archive,
  Download, Loader2, CheckCircle, AlertCircle,
  Lock, LogOut, RefreshCw,
} from 'lucide-react';

interface UploadedFile {
  name:       string;
  created_at: string;
  metadata?:  { size?: number };
}

function formatBytes(bytes: number): string {
  if (!bytes) return '—';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg','jpeg','png','gif','webp','svg'].includes(ext || '')) return Image;
  if (['zip','tar','gz'].includes(ext || '')) return Archive;
  return FileText;
}

// =============================================
// LOGIN SCREEN
// =============================================
function LoginScreen({ onLogin, error }: { onLogin: (pwd: string) => void; error: string }) {
  const [pwd,     setPwd]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd.trim()) return;
    setLoading(true);
    await onLogin(pwd);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 w-full max-w-md text-center"
      >
        <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mx-auto mb-6">
          <Lock size={28} />
        </div>
        <h1 className="section-title text-2xl text-text-primary mb-2">Admin Panel</h1>
        <p className="text-text-muted text-sm mb-8">Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Admin password"
            className="form-input text-center"
            autoFocus
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20"
              style={{ color: 'var(--accent-pink)' }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            {loading ? 'Checking…' : 'Unlock Panel'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// =============================================
// ADMIN DASHBOARD
// =============================================
export default function AdminPage() {
  const [password,     setPassword]     = useState('');
  const [authed,       setAuthed]       = useState(false);
  const [authError,    setAuthError]    = useState('');
  const [files,        setFiles]        = useState<UploadedFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading,    setUploading]    = useState(false);
  const [uploadMsg,    setUploadMsg]    = useState<{ type: 'success'|'error'; text: string } | null>(null);
  const [dragging,     setDragging]     = useState(false);
  const [deleting,     setDeleting]     = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    if (!password) return;
    setLoadingFiles(true);
    try {
      const res = await fetch('/api/upload', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      // no-op
    } finally {
      setLoadingFiles(false);
    }
  }, [password]);

  useEffect(() => {
    if (authed) loadFiles();
  }, [authed, loadFiles]);

  // --- Login ---
  async function handleLogin(pwd: string) {
    setAuthError('');
    try {
      const res = await fetch('/api/upload', {
        headers: { Authorization: `Bearer ${pwd}` },
      });

      if (res.status === 401) {
        setAuthError('Wrong password. Check your .env.local file.');
        return;
      }

      if (res.status === 200) {
        setPassword(pwd);
        setAuthed(true);
        return;
      }

      // Any other status (500, 503) still means password was accepted
      setPassword(pwd);
      setAuthed(true);

    } catch (err) {
      setAuthError('Server error. Make sure npm run dev is running.');
    }
  }

  // --- Upload ---
  async function handleUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadMsg(null);

    const results = await Promise.allSettled(
      Array.from(fileList).map(async (file) => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', {
          method:  'POST',
          headers: { Authorization: `Bearer ${password}` },
          body:    fd,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Failed to upload ${file.name}`);
        }
        return file.name;
      })
    );

    const failed  = results.filter((r) => r.status === 'rejected') as PromiseRejectedResult[];
    const success = results.filter((r) => r.status === 'fulfilled').length;

    if (failed.length > 0) {
      setUploadMsg({ type: 'error', text: failed.map((f) => f.reason?.message).join('; ') });
    } else {
      setUploadMsg({ type: 'success', text: `${success} file${success > 1 ? 's' : ''} uploaded!` });
    }

    setUploading(false);
    await loadFiles();
    setTimeout(() => setUploadMsg(null), 4000);
  }

  async function handleDelete(name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(name);
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(`uploads/${name}`)}`, {
        method:  'DELETE',
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error();
      await loadFiles();
    } catch {
      alert('Failed to delete file.');
    } finally {
      setDeleting(null);
    }
  }

  // --- Not authed ---
  if (!authed) {
    return <LoginScreen onLogin={handleLogin} error={authError} />;
  }

  // --- Dashboard ---
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header className="border-b border-bg-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div>
          <h1 className="section-title text-xl text-text-primary">Admin Panel</h1>
          <p className="text-text-muted text-xs font-mono mt-0.5">Portfolio File Manager</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="btn-secondary text-sm py-2 px-4">← Back to Portfolio</a>
          <button
            onClick={() => setAuthed(false)}
            className="w-9 h-9 rounded-lg border border-bg-border flex items-center justify-center text-text-muted hover:text-accent-pink transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`upload-zone cursor-pointer p-12 text-center mb-10 ${dragging ? 'drag-over' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.ppt,.pptx,.zip,.txt"
          />
          <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mx-auto mb-4">
            {uploading ? <Loader2 size={28} className="animate-spin" /> : <Upload size={28} />}
          </div>
          <p className="text-text-primary font-medium mb-1">
            {uploading ? 'Uploading…' : 'Drop files here or click to browse'}
          </p>
          <p className="text-text-muted text-sm">PDF, images, documents — max 10MB</p>
        </div>

        <AnimatePresence>
          {uploadMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-6 text-sm border ${
                uploadMsg.type === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {uploadMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {uploadMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary font-bold">
            Uploaded Files
            <span className="text-text-muted font-normal text-sm ml-2">({files.length})</span>
          </h2>
          <button
            onClick={loadFiles}
            disabled={loadingFiles}
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors"
          >
            <RefreshCw size={13} className={loadingFiles ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {loadingFiles ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-accent-cyan animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <Upload size={40} className="mx-auto mb-3 opacity-30" />
            <p>No files yet. Connect Supabase to enable uploads.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => {
              const Icon = getIcon(file.name);
              return (
                <motion.div
                  key={file.name}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card px-5 py-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">{file.name}</p>
                    <p className="text-text-muted text-xs font-mono mt-0.5">
                      {file.metadata?.size ? formatBytes(file.metadata.size) : ''}
                      {file.created_at && ` · ${new Date(file.created_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(file.name)}
                      disabled={deleting === file.name}
                      className="w-8 h-8 rounded-lg border border-bg-border flex items-center justify-center text-text-muted hover:text-accent-pink hover:border-accent-pink/30 transition-all"
                    >
                      {deleting === file.name
                        ? <Loader2 size={14} className="animate-spin" />
                        : <Trash2 size={14} />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}