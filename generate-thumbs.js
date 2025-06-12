// scripts/generate-thumbs.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fullDir = path.resolve('public/gallery/full');
const thumbsDir = path.resolve('public/gallery/thumbs');

const thumbWidth = 400; // puedes ajustarlo según tus necesidades

async function generateThumbnails() {
  if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
  }

  const files = fs.readdirSync(fullDir).filter(file => /\.(jpe?g|png|webp)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(fullDir, file);
    const outputPath = path.join(thumbsDir, file);

    if (fs.existsSync(outputPath)) {
      console.log(`✔ Miniatura ya existe: ${file}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize({ width: thumbWidth })
        .toFile(outputPath);
      console.log(`🖼 Miniatura creada: ${file}`);
    } catch (err) {
      console.error(`❌ Error procesando ${file}:`, err);
    }
  }
}

generateThumbnails();
