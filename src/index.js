const sharp = require('sharp');
   
// create thumbnails
  (async function () {
    try {
        await sharp('img/tapia-cerca1.jpg')
        .resize (128,64)
        .toFile('thumbnails/newimage.jpg')
    } catch (error) {
        console.log(error)
    }
  })();

