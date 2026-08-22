import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getSession } from '@/lib/auth';
import {
  MAX_HEIC_BYTES,
  convertHeicToJpeg,
  detectImageFormat,
  isHeicFilename,
  isHeicMimeType,
} from '@/lib/images';

export const runtime = 'nodejs';
// HEIC conversion is CPU-bound and can take a few seconds for a full-size photo.
export const maxDuration = 60;

function sanitizeExtension(filename: string): string | null {
  const parts = filename.toLowerCase().split('.');
  if (parts.length < 2) return null;

  const extension = parts.pop()!.replace(/[^a-z0-9]/g, '');
  return extension.length > 0 && extension.length <= 5 ? extension : null;
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer);

    // Browsers often report HEIC files with an empty or generic MIME type, so the
    // file's own bytes are the primary source of truth; the declared type and the
    // filename are only fallbacks for formats we do not sniff.
    const detected = detectImageFormat(buffer);
    const isHeic = detected
      ? detected.mime === 'image/heic'
      : isHeicMimeType(file.type) || isHeicFilename(file.name);

    // Validate file type
    if (!detected && !isHeic && !file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    let contentType = detected?.mime || file.type;
    let extension = detected?.extension || sanitizeExtension(file.name) || 'jpg';

    // HEIC is only displayable in Safari, so convert it to JPEG before storing.
    if (isHeic) {
      if (buffer.length > MAX_HEIC_BYTES) {
        return NextResponse.json(
          { error: 'HEIC image is too large to convert (max 20MB)' },
          { status: 400 }
        );
      }

      try {
        buffer = await convertHeicToJpeg(buffer);
      } catch {
        return NextResponse.json(
          { error: 'Could not convert HEIC image. Try exporting it as JPEG.' },
          { status: 400 }
        );
      }

      contentType = 'image/jpeg';
      extension = 'jpg';
    }

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filename, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(filename);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
