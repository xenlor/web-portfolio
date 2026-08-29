// Punto de entrada para el prerenderizado. Monta el mismo arbol que main.jsx
// pero devolviendo una cadena de HTML en vez de pintar en el navegador.
// Lo usa scripts/prerender.mjs; no forma parte del paquete que se descarga.
import { renderToString } from 'react-dom/server';
import App from '../src/App.jsx';
import { PerformanceProvider } from '../src/context/PerformanceContext';

export function render() {
    return renderToString(
        <PerformanceProvider>
            <App />
        </PerformanceProvider>
    );
}
