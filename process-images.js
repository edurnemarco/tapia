const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/img';
const outputDir = 'src/process-img';

const sizes = [
  { width: 640, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
];

const densities = [1, 1.5, 2]; 
const formats = ['jpeg', 'webp']; 


const processImage = async (file) => {
  const filePath = path.join(inputDir, file);
  const fileName = path.parse(file).name;
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const { width, suffix } of sizes) {
    for (const density of densities) {
      const outputFileName = `${fileName}${suffix}-${density}x`;
      const outputFilePath = path.join(outputDir, `${outputFileName}.jpeg`);

      try {
        await sharp(filePath)
          .resize(Math.round(width * density)) 
          .toFormat('jpeg') 
          .toFile(outputFilePath); 

        console.log(`Imagen procesada: ${outputFilePath}`);
      } catch (err) {
        console.error(`Error procesando ${file}: ${err.message}`);
      }

      for (const format of formats.slice(1)) { 
        const outputFileFormatPath = path.join(outputDir, `${outputFileName}.${format}`);

        try {
          await sharp(filePath)
            .resize(Math.round(width * density))
            .toFormat(format)
            .toFile(outputFileFormatPath);

          console.log(`Imagen procesada en formato ${format}: ${outputFileFormatPath}`);
        } catch (err) {
          console.error(`Error procesando ${file} en formato ${format}: ${err.message}`);
        }
      }
    }
  }
};

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error leyendo el directorio:', err);
    return;
  }

  const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg');

  images.forEach(processImage);
});
