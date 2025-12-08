import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/data';
import avatarImage from '../assets/avatar.png';

const Hero = ({ scrollToSection }) => (
    <motion.section
        id="inicio"
        className="min-h-screen grid items-center pt-16 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        {/* Contenedor Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

            {/* COLUMNA DE TEXTO */}
            <div className="col-span-1 md:col-span-7 space-y-6 order-2 md:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-mono border border-purple-200 dark:border-purple-500/30 backdrop-blur-sm"
                >
                    <Terminal size={14} />
                    <span>@{personalInfo.alias}</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Hola, soy <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">{personalInfo.name}.</span>
                </motion.h1>

                <motion.h2
                    className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {personalInfo.role}
                </motion.h2>

                <motion.p
                    className="max-w-xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {personalInfo.tagline} {personalInfo.bio}
                </motion.p>

                <motion.div
                    className="flex gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <button
                        onClick={() => scrollToSection('proyectos')}
                        className="px-8 py-4 bg-gray-900 dark:bg-purple-600 text-white rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-purple-700 transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                        Ver Proyectos
                    </button>
                    <button
                        onClick={() => scrollToSection('contacto')}
                        className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-black dark:hover:text-white transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
                    >
                        Contactar
                    </button>
                </motion.div>
            </div>

            {/* COLUMNA DE IMAGEN */}
            <motion.div
                className="col-span-1 md:col-span-5 flex justify-center relative order-1 md:order-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
            >
                {/* Resplandor detrás del avatar */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/30 to-blue-400/30 dark:from-purple-600/30 dark:to-blue-600/30 rounded-full blur-3xl animate-pulse z-0" style={{ transform: 'scale(1.2)' }} />

                {/* Contenedor del avatar */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 p-2 rounded-full border border-white/50 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md shadow-2xl"
                >
                    <img
                        src={avatarImage}
                        alt={personalInfo.name}
                        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                        loading="eager"
                    />
                </motion.div>
            </motion.div>

        </div>

        {/* Indicador de Scroll */}
        <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <ChevronDown size={24} />
        </motion.div>
    </motion.section>
);

export default Hero;
