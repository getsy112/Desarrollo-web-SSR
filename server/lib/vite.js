// Importación de módulos necesarios para el manejo de archivos y rutas
import fs from 'node:fs'
//biblioteca de rutas
import path from 'path'
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
//Creando las variables de las rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
   *Helper para handelbers que genera las etiquetas de vite 
   *Desarrollo Conecta al servidor de desarrollo de Vite
   *En produccion Usa los compilados de vite 
 */

   export function viteAssets() {
       // Obtener modo de ejecucion 
       const isDev = process.env.NODE_ENV !== 'PRODUCTION'
       //Rescatando la URL del servior de desarrollo de Vite
       const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

       //Si estamos en desarrollo, usamos el servidor de desarrollo de Vite
       if (isDev) {
        //En desarrollo cargamos los archivos 
        //del front end directamente en servidor vite
        //de desarrollo de vite
        return `<script type="module" src="${viteDevServer}/@vite/client"></script>
                <script type="module" src="${viteDevServer}/main.js"></script>`;

   }
   //En produccion leemos el manifest 
   // y generamos las etiquetas finales de produccion 
   const manifestPath 
   = path.join(__dirname, '..', '..','dist','vite','manifest.json');
 
   //Si no existe Manifest
   if (!fs.existsSync(manifestPath)) {
       console.warn("Vite Manifest not found, Run 'npm run build'");
       return '';
   }
   //Leyendo y parseando a JSON el archivo 
   // de manifiesto que genera vite en la copilacion 
   //de los archivos del front-end
   const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
   const mainEntry = manifest['main.js']
   //Guarda del Maim.js
   if(mainEntry){
    console.warn('Archivo main.js no esat disponible en el manifest de Vite');
    return '';
   }
   let tags = '';
   if (mainEntry.css) {
    mainEntry.css.forEach(cssFiles => {
      tags +=`<link rel = "stylesheet" href="${cssFiles}">\n`
    });
   }

   //Js Files
   tags +=`<script type="module" src="${mainEntry.file}" defer></script>`;

   return tags;

}

/**
 * Funcion registradora  del helper de handlbears
 */
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', ()=>{
      //Sanitizando la salida para que sea segura en Handlebars
      return new hbs.SafeString(viteAssets())});
}
 