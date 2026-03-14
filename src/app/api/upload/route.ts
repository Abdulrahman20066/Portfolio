import { NextRequest, NextResponse } from 'next/server';

const MAX_SIZE_MB    = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
  'text/plain',
];

const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co';

// =============================================
// POST — Upload a file
// =============================================
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const adminPwd   = process.env.ADMIN_PASSWORD;

    if (!adminPwd) {
      return NextResponse.json({ error: 'Admin password not configured.' }, { status: 500 });
    }
    if (authHeader !== `Bearer ${adminPwd}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
    }

    const formData = await req.formData();
    const file     = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: `File too large. Max ${MAX_SIZE_MB}MB.` }, { status: 413 });
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `File type not allowed.` }, { status: 415 });
    }

    const { getSupabaseAdmin } = await import('@/lib/supabase');
    const admin      = getSupabaseAdmin();
    const safeName   = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_{2,}/g, '_');
    const uploadPath = `uploads/${Date.now()}_${safeName}`;
    const buffer     = Buffer.from(await file.arrayBuffer());

    const { data, error } = await admin
      .storage
      .from('portfolio-files')
      .upload(uploadPath, buffer, {
        contentType:  file.type,
        cacheControl: '3600',
        upsert:       false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = admin
      .storage
      .from('portfolio-files')
      .getPublicUrl(uploadPath);

    return NextResponse.json({
      success:   true,
      path:      data.path,
      publicUrl: urlData.publicUrl,
      name:      safeName,
      size:      file.size,
    }, { status: 201 });

  } catch (err) {
    console.error('[Upload API]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}

// =============================================
// GET — List files
// =============================================
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const adminPwd   = process.env.ADMIN_PASSWORD;

    if (!adminPwd || authHeader !== `Bearer ${adminPwd}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // Return empty list if Supabase not set up yet
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ files: [] });
    }

    const { getSupabaseAdmin } = await import('@/lib/supabase');
    const admin = getSupabaseAdmin();

    const { data, error } = await admin
      .storage
      .from('portfolio-files')
      .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) throw error;

    return NextResponse.json({ files: data || [] });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to list files.' }, { status: 500 });
  }
}