// index.js
import fondoImagen from './img/tapia-fondo.jpg';
import movilImagen from './img/tapia-fondo-movil.jpg';

// Solo agregar el preload en el <head> de index.html
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si estamos en la página index.html
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    
    // Crear los links de preload dinámicamente
    const preloadFondo = document.createElement('link');
    preloadFondo.rel = 'preload';
    preloadFondo.href = fondoImagen; // Ruta generada por Parcel
    preloadFondo.as = 'image';
    document.head.appendChild(preloadFondo);

    const preloadMovil = document.createElement('link');
    preloadMovil.rel = 'preload';
    preloadMovil.href = movilImagen; // Ruta generada por Parcel
    preloadMovil.as = 'image';
    document.head.appendChild(preloadMovil);
    
    // Crear y añadir los estilos dinámicamente
    const styles = `
      @media (max-width: 600px) {
        header.index {
            background-image: url(${movilImagen});
            background-repeat: no-repeat;
            background-size: cover;
            min-width: 100px;
            min-height: 50px;
            color: white;
            background-position: center;
        }
    }

      @media (min-width: 600px) {
        header.index {
          background-image: url(${fondoImagen});
        }
      }
    `;
    
    // Crear una etiqueta <style> y añadirla al documento
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
  }
});
