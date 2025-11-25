import React from 'react';
import { motion } from 'framer-motion';

// --- NUEVO COMPONENTE DE FONDO DINÁMICO ---
const BackgroundWrapper = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 bg-gray-50 dark:bg-[#050505]">
        {/* 1. Patrón de rejilla (Grid) */}
        <div
            className="absolute inset-0 
        bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] 
        bg-[size:4rem_4rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        />

        {/* 2. Luces ambientales animadas */}
        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-[250px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
        />
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }}
            className="absolute top-[40%] -left-[20%] w-[700px] h-[700px] bg-blue-300/30 dark:bg-blue-800/10 rounded-full blur-[250px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
        />
        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
            className="absolute -bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-[200px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
        />
    </div>
);

export default BackgroundWrapper;
