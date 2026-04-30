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
          const baseOut = file.replace(/\.(jpe?g|png|webp)$/i, '');
          const outThumb = baseOut + '-thumb.jpg';
          const outThumbPath = path.join(thumbsDir, outThumb);
          const mediumDir = path.join(full, 'medium');
          await fs.mkdir(mediumDir, { recursive: true });
          const outMedium = baseOut + '-medium.jpg';
          const outMediumPath = path.join(mediumDir, outMedium);
          try {
            let skipThumb = false;
            let skipMedium = false;
            try {
              const [sThumb, sMedium, sIn] = await Promise.all([
                fs.stat(outThumbPath).catch(() => null),
                fs.stat(outMediumPath).catch(() => null),
                fs.stat(inPath),
              ]);
              if (sThumb && sThumb.mtimeMs >= sIn.mtimeMs) skipThumb = true;
              if (sMedium && sMedium.mtimeMs >= sIn.mtimeMs) skipMedium = true;
            } catch {}
            if (!skipThumb) {
              await sharp(inPath).resize({ width: 640 }).jpeg({ quality: 70 }).toFile(outThumbPath);
              console.log('Generated', outThumbPath);
            }
            if (!skipMedium) {
              await sharp(inPath).resize({ width: 1600 }).jpeg({ quality: 82 }).toFile(outMediumPath);
              console.log('Generated', outMediumPath);
            }
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
