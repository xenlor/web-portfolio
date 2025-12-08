import { useState, useEffect } from 'react';

export const useHardwareAcceleration = () => {
    const [isHardwareAccelerated, setIsHardwareAccelerated] = useState(true);

    useEffect(() => {
        const checkHardwareAcceleration = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

                if (!gl) {
                    setIsHardwareAccelerated(false);
                    return;
                }

                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) {
                    // No se puede determinar, ¿asumimos verdadero o falso?
                    // Si no podemos obtener la información de depuración, podríamos estar en un entorno restringido.
                    // Asumimos verdadero para evitar falsos positivos.
                    // "Deshabilitado" estricto generalmente implica que no hay GL o renderizadores específicos.
                    setIsHardwareAccelerated(true);
                    return;
                }

                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();

                // Lista de renderizadores por software conocidos
                const softwareRenderers = [
                    'swiftshader',
                    'llvmpipe',
                    'software rasterizer',
                    'microsoft basic render driver',
                    'mesa offscreen',
                    'software' // ¿Captura genérica? podría ser demasiado amplio
                ];

                const isSoftware = softwareRenderers.some(r => renderer.includes(r));

                setIsHardwareAccelerated(!isSoftware);
            } catch (e) {
                console.warn('Error al verificar aceleración de hardware:', e);
                setIsHardwareAccelerated(true); // Predeterminar a verdadero en caso de error
            }
        };

        checkHardwareAcceleration();
    }, []);

    return isHardwareAccelerated;
};
