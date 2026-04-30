import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'src', 'content', 'images-meetup');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/meetup-?\d+/i.test(entry.name)) {
        const files = await fs.readdir(full);
        const imgFiles = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
        if (imgFiles.length === 0) continue;
        const thumbsDir = path.join(full, 'thumbs');
        await fs.mkdir(thumbsDir, { recursive: true });

        for (const file of imgFiles) {
          const inPath = path.join(full, file);
          const outName = file.replace(/\.(jpe?g|png|webp)$/i, '') + '-thumb.jpg';
          const outPath = path.join(thumbsDir, outName);
          try {
            let skip = false;
            try {
              const [sOut, sIn] = await Promise.all([fs.stat(outPath).catch(() => null), fs.stat(inPath)]);
              if (sOut && sOut.mtimeMs >= sIn.mtimeMs) skip = true;
            } catch {}
            if (skip) continue;
            await sharp(inPath).resize({ width: 640 }).jpeg({ quality: 70 }).toFile(outPath);
            console.log('Generated', outPath);
          } catch (err) {
            console.error('Thumb error for', inPath, err.message);
          }
        }
      } else {
        await walk(full);
      }
    }
  }
}

walk(IMAGES_DIR).catch((err) => {
  console.error(err);
  process.exit(1);
});
