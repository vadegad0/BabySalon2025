const fs = require('fs');
const path = require('path');

const folderPath = './'; // Carpeta actual

// Leer archivos de la carpeta
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  // Filtrar solo archivos .webp
  const webpFiles = files.filter(file => path.extname(file).toLowerCase() === '.webp');

  // Ordenar por nombre original (puedes cambiar esto si quieres orden alfabético diferente)
  webpFiles.sort();

  // Renombrar los archivos
  webpFiles.forEach((file, index) => {
    const newFileName = `${index + 1}.webp`;
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, newFileName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error al renombrar ${file}:`, err);
      } else {
        console.log(`Renombrado: ${file} → ${newFileName}`);
      }
    });
  });
});
