import React, { useRef, useEffect, useState } from 'react';
import { stack } from '../../data/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TechCarousel = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const positionRef = useRef(0); // Para acumular decimales y evitar redondeo del DOM

    // Duplicamos el stack varias veces para asegurar un scroll infinito fluido
    // (Cuadruple duplicación para tener suficiente contenido para el loop)
    const extendedStack = [...stack, ...stack, ...stack, ...stack];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        const scrollSpeed = 0.2; // Velocidad suave y constante (ahora sí funciona gracias al ref)

        // Inicializamos el scroll en el segundo set para tener margen a la izquierda
        // Solo si está en 0 (inicio)
        const singleSetWidth = scrollContainer.scrollWidth / 4;
        if (scrollContainer.scrollLeft === 0 && singleSetWidth > 0) {
            scrollContainer.scrollLeft = singleSetWidth;
            positionRef.current = singleSetWidth; // Sincronizamos ref
        } else {
            // Si ya tiene scroll (por recarga o HMR), sincronizamos
            positionRef.current = scrollContainer.scrollLeft;
        }

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                // Sumamos al ref de alta precisión
                positionRef.current += scrollSpeed;

                // Aplicamos al DOM (el navegador redondeará visualmente, pero nosotros mantenemos el float)
                scrollContainer.scrollLeft = positionRef.current;

                // Recalculamos por si cambia el tamaño
                const currentSetWidth = scrollContainer.scrollWidth / 4;

                // Lógica de loop infinito bidireccional:
                if (currentSetWidth > 0 && positionRef.current >= currentSetWidth * 2) {
                    positionRef.current -= currentSetWidth;
                    scrollContainer.scrollLeft = positionRef.current;
                }
                else if (currentSetWidth > 0 && positionRef.current <= 0) {
                    positionRef.current += currentSetWidth;
                    scrollContainer.scrollLeft = positionRef.current;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const scrollManual = (direction) => {
        if (scrollRef.current) {
            setIsPaused(true);

            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });

            // Actualizamos nuestro ref de posición al destino aproximado
            // Nota: scrollBy es animado, así que positionRef se desincronizará momentáneamente.
            // Al reactivar el loop, deberíamos resincronizar.

            setTimeout(() => {
                // Al volver, leemos la posición real del DOM para seguir desde ahí
                if (scrollRef.current) {
                    positionRef.current = scrollRef.current.scrollLeft;
                }
                setIsPaused(false);
            }, 2000);
        }
    };

    return (
        <div className="relative w-full group/carousel">
            {/* Botón Izquierda */}
            <button
                onClick={() => scrollManual('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
                aria-label="Scroll Left"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Contenedor Scroll */}
            <div
                ref={scrollRef}
                className="w-full overflow-x-hidden flex items-center py-20 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%_-_128px),transparent_100%)]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <ul className="flex items-center gap-0 w-fit">
                    {extendedStack.map((tech, index) => (
                        <li key={`${tech.name}-${index}`} className="flex flex-col items-center gap-3 group min-w-[140px] px-4 select-none relative">
                            <div className="text-5xl md:text-6xl transition-all duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 p-2 cursor-pointer">
                                {tech.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors whitespace-nowrap">
                                {tech.name}
                            </span>

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 text-center shadow-xl">
                                {tech.description}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Botón Derecha */}
            <button
                onClick={() => scrollManual('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
                aria-label="Scroll Right"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default TechCarousel;
