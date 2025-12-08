import React, { useRef, useEffect, useState } from 'react';
import { stack } from '../../data/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePerformance } from '../../context/PerformanceContext';

const TechCarousel = () => {
    const { isPerformanceMode } = usePerformance();
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const positionRef = useRef(0); // Para acumular decimales y evitar redondeo del DOM
    const timeoutRef = useRef(null); // Para manejar el timer de reanudación

    // Refs para física de inercia
    const touchStartXRef = useRef(0); // Para detectar swipe
    const touchStartYRef = useRef(0); // Para detectar scroll vertical
    const touchStartScrollRef = useRef(0); // Posición inicial del scroll
    const lastTouchXRef = useRef(0); // Para calcular velocidad
    const lastTouchTimeRef = useRef(0); // Para calcular velocidad
    const velocityRef = useRef(0); // Velocidad actual de inercia
    const isDraggingRef = useRef(false); // Para saber si estamos arrastrando

    // Duplicamos el stack varias veces para asegurar un scroll infinito fluido
    // (Cuadruple duplicación para tener suficiente contenido para el loop)
    const extendedStack = [...stack, ...stack, ...stack, ...stack];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        const scrollSpeed = 0.2; // Velocidad suave y constante

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
            if (scrollContainer && !isDraggingRef.current) {
                let shouldUpdateDOM = false;

                // Si hay velocidad de inercia, la aplicamos
                if (Math.abs(velocityRef.current) > 0.1) {
                    positionRef.current += velocityRef.current;
                    velocityRef.current *= 0.95; // Fricción (desaceleración)
                    shouldUpdateDOM = true;
                } else if (!isPaused && !isPerformanceMode) {
                    // Si no hay inercia y NO está pausado y NO está en modo rendimiento, aplicamos auto-scroll
                    positionRef.current += scrollSpeed;
                    velocityRef.current = 0;
                    shouldUpdateDOM = true;
                }

                if (shouldUpdateDOM) {
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
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    // Touch handlers para swipe en móvil con inercia
    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
        lastTouchXRef.current = e.touches[0].clientX;
        lastTouchTimeRef.current = Date.now();
        touchStartScrollRef.current = scrollRef.current.scrollLeft;
        velocityRef.current = 0;
        isDraggingRef.current = true;
        setIsPaused(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleTouchMove = (e) => {
        if (!scrollRef.current) return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const now = Date.now();

        const diffX = touchStartXRef.current - touchX;
        const diffY = touchStartYRef.current - touchY;

        // Si el movimiento es más horizontal que vertical, prevenimos el scroll de la página
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (e.cancelable) {
                e.preventDefault();
            }
            const newScroll = touchStartScrollRef.current + diffX;
            scrollRef.current.scrollLeft = newScroll;
            positionRef.current = newScroll;

            // Calcular velocidad instantánea
            const dt = now - lastTouchTimeRef.current;
            if (dt > 0) {
                const dx = lastTouchXRef.current - touchX;
                velocityRef.current = dx / dt * 16; // Normalizar a frames (aprox 16ms)
            }
            lastTouchXRef.current = touchX;
            lastTouchTimeRef.current = now;
        }
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;

        // Reanudar auto-scroll después de que termine la inercia (o un tiempo fijo)
        timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            velocityRef.current = 0; // Resetear velocidad al volver a auto-scroll
        }, 2000);
    };

    const scrollManual = (direction) => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            setIsPaused(true);
            velocityRef.current = 0; // Detener inercia inmediatamente

            // Limpiamos timeout anterior si existe para evitar race conditions
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            const singleSetWidth = scrollContainer.scrollWidth / 4;
            const currentScroll = scrollContainer.scrollLeft;

            // Lógica de "Teleport" para mantenernos en la zona segura central
            // Si estamos muy a la derecha, saltamos un set atrás
            if (direction === 'right' && currentScroll >= 2 * singleSetWidth) {
                scrollContainer.scrollLeft -= singleSetWidth;
            }
            // Si estamos muy a la izquierda, saltamos un set adelante
            else if (direction === 'left' && currentScroll <= singleSetWidth) {
                scrollContainer.scrollLeft += singleSetWidth;
            }

            const scrollAmount = 300;
            scrollContainer.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });

            // Reiniciamos el loop después de la interacción
            timeoutRef.current = setTimeout(() => {
                if (scrollRef.current) {
                    // Sincronizamos la posición exacta donde quedó el scroll manual
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
                className="w-full overflow-x-hidden flex items-center py-20 touch-pan-y [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%_-_128px),transparent_100%)]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
