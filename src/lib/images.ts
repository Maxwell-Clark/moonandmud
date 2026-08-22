// Image format detection and HEIC conversion for uploads.
//
// iPhones save photos as HEIC, which browsers other than Safari cannot display,
// so HEIC uploads are converted to JPEG before they reach storage. Detection is
// done from the file's magic bytes because browsers frequently report HEIC files
// with an empty or generic MIME type.

export type ImageFormat = {
  mime: string;
  extension: string;
};

// ISO base media file format brands that indicate a HEIF still image.
const HEIF_BRANDS = new Set([
  'heic', 'heix', 'heim', 'heis',
  'hevc', 'hevx', 'hevm', 'hevs',
  'mif1', 'msf1', 'heif',
]);

// AVIF shares the ISO-BMFF container (and the mif1 brand) with HEIF, but browsers
// render it natively, so it must not be routed through the HEIC converter.
const AVIF_BRANDS = new Set(['avif', 'avis']);

const HEIC_MIME_TYPES = new Set([
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]);

const HEIC_EXTENSIONS = new Set(['heic', 'heif', 'hif']);

// HEIC decoding expands to raw RGBA in memory (a 12MP photo is ~48MB), so cap the
// input well above any real phone photo but below what would exhaust the function.
export const MAX_HEIC_BYTES = 20 * 1024 * 1024;

function readBrands(buffer: Buffer): string[] {
  // ftyp box: [4-byte size][ftyp][major brand][minor version][compatible brands...]
  if (buffer.length < 12 || buffer.toString('latin1', 4, 8) !== 'ftyp') {
    return [];
  }

  const boxSize = Math.min(buffer.readUInt32BE(0), buffer.length);
  const brands = [buffer.toString('latin1', 8, 12)];

  for (let offset = 16; offset + 4 <= boxSize; offset += 4) {
    brands.push(buffer.toString('latin1', offset, offset + 4));
  }

  return brands;
}

/**
 * Identify an image from its magic bytes. Returns null for anything that is not a
 * recognised image format (including formats we simply do not sniff for).
 */
export function detectImageFormat(buffer: Buffer): ImageFormat | null {
  if (buffer.length < 12) return null;

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mime: 'image/jpeg', extension: 'jpg' };
  }

  if (buffer.toString('latin1', 0, 8) === '\x89PNG\r\n\x1a\n') {
    return { mime: 'image/png', extension: 'png' };
  }

  if (buffer.toString('latin1', 0, 6) === 'GIF87a' || buffer.toString('latin1', 0, 6) === 'GIF89a') {
    return { mime: 'image/gif', extension: 'gif' };
  }

  if (buffer.toString('latin1', 0, 4) === 'RIFF' && buffer.toString('latin1', 8, 12) === 'WEBP') {
    return { mime: 'image/webp', extension: 'webp' };
  }

  const brands = readBrands(buffer);
  if (brands.some((brand) => AVIF_BRANDS.has(brand))) {
    return { mime: 'image/avif', extension: 'avif' };
  }
  if (brands.some((brand) => HEIF_BRANDS.has(brand))) {
    return { mime: 'image/heic', extension: 'heic' };
  }

  return null;
}

export function isHeicMimeType(mimeType: string): boolean {
  return HEIC_MIME_TYPES.has(mimeType.toLowerCase());
}

export function isHeicFilename(filename: string): boolean {
  const extension = filename.toLowerCase().split('.').pop();
  return extension ? HEIC_EXTENSIONS.has(extension) : false;
}

/**
 * Decode a HEIC/HEIF buffer and re-encode it as JPEG. The import is deferred so
 * the libheif WebAssembly bundle is only loaded when a HEIC is actually uploaded.
 */
export async function convertHeicToJpeg(buffer: Buffer): Promise<Buffer> {
  const imported = await import('heic-convert');
  // heic-convert is CommonJS: depending on the bundler the function is either the
  // module itself or its default export.
  const convert = imported.default ?? (imported as unknown as typeof imported.default);
  const output = await convert({ buffer, format: 'JPEG', quality: 0.92 });
  return Buffer.from(output);
}
