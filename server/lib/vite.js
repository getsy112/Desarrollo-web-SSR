
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtener las rutas del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Helper para Handlebars que genera las etiquetas de Vite.
 * En desarrollo conecta con el servidor de Vite.
 * En producción utiliza los archivos compilados.
 */
export function viteAssets() {
    const isDev = process.env.NODE_ENV !== 'production';
    const viteDevServer =
        process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    // Modo desarrollo
    if (isDev) {
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // Modo producción: localizar el manifiesto
    const manifestPath = path.join(
        __dirname,
        '..',
        '..',
        'dist',
        '.vite',
        'manifest.json'
    );

    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "Vite manifest not found. Run 'npm run build'."
        );
        return '';
    }

    // Leer el manifiesto generado por Vite
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    const mainEntry = manifest['main.js'];

    if (!mainEntry) {
        console.warn(
            "The 'main.js' entry was not found in the Vite manifest."
        );
        return '';
    }

    let tags = '';

    // Incluir hojas de estilo
    if (mainEntry.css) {
        mainEntry.css.forEach((cssFile) => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
        });
    }

    // Incluir JavaScript compilado
    tags += `<script type="module" src="/${mainEntry.file}"></script>`;

    return tags;
}

/**
 * Registrar el helper de Vite en Handlebars.
 */
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => {
        return new hbs.SafeString(viteAssets());
    });
}
