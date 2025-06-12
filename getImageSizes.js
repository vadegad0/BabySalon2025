// filepath: d:\Desktop\project\getImageSizes.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galeriaDir = path.join(__dirname, 'public', 'apoyan');
const files = fs.readdirSync(galeriaDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

const getDimensions = async (filePath) => {
  try {
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (err) {
    return null;
  }
};

const main = async () => {
  const photos = [];
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(galeriaDir, filename);
    const dimensions = await getDimensions(filePath);
    if (dimensions) {
      photos.push({
        id: `day1-photo-${i + 1}`,
        src: `/apoyan/${filename}`,
        thumbnail: `/apoyan/${filename}`,
        alt: `Fotografía del día 1 - ${i + 1}`,
        width: dimensions.width,
        height: dimensions.height,
      });
    } else {
      console.warn(`No se pudo procesar ${filename}`);
    }
  }
  console.log(JSON.stringify(photos, null, 2));
};

main();