//Importando configuradot de vite
import { defineConfig } from 'vite'
//Importando un admoin de rutas
import {resolve} from 'node:path'
// Importa módulos para manejar rutas
import { dirname } from 'node:path';
// Imports para crear __dirname
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite'

// Crear las variables __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    //directorio raiz de los archivos fuente del front end
    root: 'src', 

    //Agregando a vite el logging de Tailwinds
    plugins: [
    tailwindcss()
],

    //configurando un servidor de desarrollo 
    server: {
        port: 5173,
        //Rigidez del puerto
        strict: true,
                host: '0.0.0.0',
        cors: {
            origin: [
                /^https:\/\/.*-3000\.app\.github\.dev$/,
                'http://localhost:3000'
            ]
        }
  
    },

    // Configurando el build
    build: {
        //Directorio de salida del java script para produccion
        outDir: "../dist",
        //Asegurando limpieza del folder de produccion
        emptyOutDir: true,
        //Generando manifiesto para el servidor 
        manifest: true,
        //opciones de em paquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
            //Configuraciones adicionales de Rollup si es necesario
        }
    },
      //Configuracion para el desarrollo
      publicDir: false
})