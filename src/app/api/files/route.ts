import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// =============================================
// DELETE FILE API ROUTE
// DELETE /api/files?path=uploads/filename.pdf
// =============================================

export async function DELETE(req: NextRequest) {
  try {
    // Auth
    const authHeader = req.headers.get('authorization');
    const adminPwd   = process.env.ADMIN_PASSWORD;

    if (!adminPwd || authHeader !== `Bearer ${adminPwd}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const path = req.nextUrl.searchParams.get('path');
    if (!path) {
      return NextResponse.json({ error: 'No file path provided.' }, { status: 400 });
    }

    // Only allow deleting from uploads/ folder (security)
    if (!path.startsWith('uploads/')) {
      return NextResponse.json({ error: 'Invalid path.' }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .storage
      .from('portfolio-files')
      .remove([path]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Files API] Delete error:', err);
    return NextResponse.json({ error: 'Failed to delete file.' }, { status: 500 });
  }
}
