import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHardwareAcceleration } from '../hooks/useHardwareAcceleration';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    // Inicializar desde localStorage o predeterminar a false
    const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('performanceMode');
            return saved === 'true';
        }
        return false;
    });

    const isHardwareAccelerated = useHardwareAcceleration();

    // Habilitar automáticamente el modo rendimiento si la aceleración de hardware está desactivada
    useEffect(() => {
        if (!isHardwareAccelerated) {
            setIsPerformanceMode(true);
            // No guardamos necesariamente esta configuración automática en localStorage,
            // ¿o tal vez sí? ¿Si el usuario lo apaga manualmente, deberíamos respetarlo?
            // Por ahora, simplemente lo configuramos.
        }
    }, [isHardwareAccelerated]);

    // Persistir en localStorage cuando se cambia manualmente (o automáticamente)
    useEffect(() => {
        localStorage.setItem('performanceMode', isPerformanceMode);

        // Opcional: Agregar clase al body para estilizado CSS global
        if (isPerformanceMode) {
            document.body.classList.add('performance-mode');
        } else {
            document.body.classList.remove('performance-mode');
        }
    }, [isPerformanceMode]);

    const value = {
        isPerformanceMode,
        setIsPerformanceMode
    };

    return (
        <PerformanceContext.Provider value={value}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};
