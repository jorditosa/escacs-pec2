/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import Markdown
import { marked } from 'marked';

// import 'Translations module i18next';
import i18next from 'i18next';
import { caLocale } from '../../locales/ca';
import { esLocale } from '../../locales/es';


/******
 * Translations
******/

// Agrega un controlador de eventos al botón para cambiar el idioma
document.querySelector('#switch-lang').addEventListener('click', function() {
    // Obtiene el idioma actual
    const currentLanguage = i18next.language;
  
    const newLanguage = currentLanguage === 'es' ? 'ca' : 'es';
  
    // Cambia el contenido del idioma 
    document.querySelector('#switch-lang').textContent = currentLanguage.toUpperCase();
  
    // Actualiza el idioma activo en i18next y vuelve a renderizar las traducciones en el idioma correspondiente
    i18next.changeLanguage(newLanguage, function(err, t) {
      if (err) return console.log('Something went wrong loading the translation:', err);
      updateContent();
    });
  });
  
  // render translation to html
  i18next.init({
    lng: 'es',
    debug: true,
    resources: {
      es: {
        translation: caLocale
      },
      ca: {
        translation: esLocale
      }
    },
    
  }, function(err, t) {
    updateContent();
  });
  
   // Función para actualizar el contenido de la página con las traducciones
   function updateContent() {
      
    const elements = document.querySelectorAll('[data-i18n-target]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const target = element.getAttribute('data-i18n-target');
      element[target] = i18next.t(key);
    });
  }