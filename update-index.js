const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const htmlFilePath = path.join(distDir, 'index.html');

let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

function updateImageUrls() {
  const fondoImagen = 'tapia-fondo';
  const movilImagen = 'tapia-fondo-movil';

  const files = fs.readdirSync(distDir);

  const fondoImgFile = files.find(file => file.includes(fondoImagen) && file.endsWith('.jpg'));
  const movilImgFile = files.find(file => file.includes(movilImagen) && file.endsWith('.jpg'));

  if (fondoImgFile && movilImgFile) {
    htmlContent = htmlContent.replace(
      'href="img/tapia-fondo.jpg"',  
      `href="${fondoImgFile}"`      
    );

    htmlContent = htmlContent.replace(
      'href="img/tapia-fondo-movil.jpg"',  
      `href="${movilImgFile}"`            
    );
  } else {
    console.error('No se encontraron los archivos de imagen con hash.');
  }
}

updateImageUrls();

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

console.log('HTML actualizado con las URLs de las imágenes generadas.');
