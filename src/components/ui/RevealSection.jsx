import React from 'react';

// Componente Wrapper para secciones principales
const RevealSection = ({ children, id, className = "" }) => (
    <section id={id} className={`py-20 md:py-32 relative z-10 ${className}`}>
        {children}
    </section>
);

export default RevealSection;
