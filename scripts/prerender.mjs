/**
 * Mete el HTML de la pagina dentro de dist/index.html despues de compilar.
 *
 * El sitio lo pinta React en el navegador, asi que el HTML servido llegaba con
 * el <div id="root"> vacio. Los rastreadores de IA no ejecutan JavaScript: una
 * auditoria GEO contaba 0 palabras en el HTML crudo. Google si lo ejecuta, pero
 * en una segunda pasada que tarda dias.
 *
 * Se usa react-dom/server, que ya viene con React, y el propio Vite para
 * compilar el JSX a algo que Node entienda. La alternativa habitual
 * (vite-plugin-prerender) descarga un navegador entero de 200 MB para esto.
 *
 * Al cargar la pagina, React monta encima y todo funciona igual: animaciones,
 * modo oscuro y el resto no cambian.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporal = resolve(raiz, '.prerender-tmp');

// El codigo del cliente lee APIs del navegador al montar (localStorage,
// matchMedia). En Node no existen: se rellenan con lo minimo para que el render
// no falle. Solo son lecturas de preferencias, no afectan al HTML resultante.
globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};
globalThis.matchMedia = () => ({
    matches: false,
    media: '',
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
});

// Compila la app para Node (el CSS se descarta: ya va en su propio fichero).
await build({
    configFile: false,
    logLevel: 'error',
    plugins: [react()],
    build: {
        ssr: resolve(raiz, 'scripts/entrada-servidor.jsx'),
        outDir: temporal,
        emptyOutDir: true,
        rollupOptions: { output: { entryFileNames: 'entrada.mjs' } },
    },
});

// pathToFileURL: en Windows un import() con ruta absoluta ("C:\...") falla con
// ERR_UNSUPPORTED_ESM_URL_SCHEME. Hace falta el esquema file://
const { render } = await import(pathToFileURL(resolve(temporal, 'entrada.mjs')).href);
const html = render();

const destino = resolve(raiz, 'dist/index.html');
const original = readFileSync(destino, 'utf8');

if (!original.includes('<div id="root"></div>')) {
    console.error('  ERROR: el div raiz no esta vacio. Plantilla cambiada?');
    process.exit(1);
}

writeFileSync(destino, original.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
rmSync(temporal, { recursive: true, force: true });

const palabras = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`==> prerender: ${palabras} palabras ya en el HTML servido`);
