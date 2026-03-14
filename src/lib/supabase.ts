import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co';

if (!isConfigured) {
  console.warn('[Supabase] Not configured yet — file uploads disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnon);

export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set.');
  }
  return createClient(supabaseUrl, serviceKey);
}

export async function listFiles() {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .storage
    .from('portfolio-files')
    .list('uploads', {
      limit:  100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });
  if (error) return [];
  return data || [];
}

export function getFileUrl(path: string): string {
  const { data } = supabase
    .storage
    .from('portfolio-files')
    .getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(path: string) {
  const { error } = await supabase
    .storage
    .from('portfolio-files')
    .remove([path]);
  if (error) throw error;
}