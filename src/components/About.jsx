import React from 'react';
import { motion } from 'framer-motion';
import { Server, Terminal, Layers, GraduationCap, MapPin, Activity, Zap } from 'lucide-react';
import RevealSection from './ui/RevealSection';
import SectionHeading from './ui/SectionHeading';
import { stack, experience, education } from '../data/data';
import TechCarousel from './ui/TechCarousel';

// Constante para estilo glassmorphism por defecto
const glassClass = "bg-white/60 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 10 }
    }
};

const About = () => (
    <RevealSection id="sobre-mi">
        <SectionHeading icon={Server} title="Sobre Mí" />

        <div className="space-y-16 max-w-5xl mx-auto">
            {/* SOBRE MÍ - TEXTO */}
            {/* SOBRE MÍ - GRID */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                {/* BIO */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`${glassClass} p-8 rounded-3xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10 flex flex-col justify-center`}
                >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        Soy un joven que emigró de Chile a España buscando nuevas oportunidades. Mi curiosidad por entender cómo funcionan las cosas me llevó a la ciberseguridad: proteger la infraestructura digital es mi forma de aportar valor.
                    </p>
                </motion.div>

                {/* STATS CARD */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`${glassClass} p-6 rounded-3xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10 flex flex-col justify-center gap-4`}
                >
                    {/* Level */}
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 pb-3">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Zap size={18} className="text-yellow-500" />
                            <span className="text-sm font-medium">Lvl</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">24</span>
                    </div>

                    {/* Base */}
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 pb-3">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <MapPin size={18} className="text-red-500" />
                            <span className="text-sm font-medium">Base</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">España 🇪🇸</span>
                    </div>

                    {/* Uptime */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Activity size={18} className="text-green-500" />
                            <span className="text-sm font-medium">Uptime</span>
                        </div>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400 font-mono">99.9%</span>
                    </div>
                </motion.div>
            </div>


            {/* STACK TECNOLÓGICO */}
            <div className="w-full">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <Terminal size={24} className="text-purple-600 dark:text-purple-400" /> Stack Tecnológico
                </h3>
                <TechCarousel />
            </div>

            {/* EXPERIENCIA */}
            <div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <Layers size={24} className="text-purple-600 dark:text-purple-400" /> Experiencia
                </h3>
                <div className="relative border-l border-gray-300 dark:border-gray-800 ml-3 pl-8 md:pl-10 space-y-8">
                    {experience.map((job, idx) => {
                        const JobCard = (
                            <motion.div
                                key={idx}
                                className={`relative p-6 md:p-8 rounded-2xl hover:border-purple-500/30 transition-all shadow-sm ${glassClass} ${job.link ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * (idx + 1) }}
                            >
                                <span className="absolute -left-[41px] md:-left-[49px] top-8 h-4 w-4 rounded-full border-2 border-white dark:border-[#050505] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h4>
                                    <span className="text-xs font-mono text-purple-600 dark:text-purple-300 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit">{job.period}</span>
                                </div>
                                <p className="text-purple-600 dark:text-purple-400 font-medium mb-4 text-lg flex items-center gap-2">
                                    {job.company}
                                    {job.link && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    )}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {job.description}
                                </p>
                            </motion.div>
                        );

                        return job.link ? (
                            <a
                                key={idx}
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                {JobCard}
                            </a>
                        ) : JobCard;
                    })}
                </div>
            </div>

            {/* EDUCACIÓN */}
            <div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <GraduationCap size={24} className="text-purple-600 dark:text-purple-400" /> Formación
                </h3>
                <div className="relative border-l border-gray-300 dark:border-gray-800 ml-3 pl-8 md:pl-10 space-y-6">
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative p-6 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900/20 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                        >
                            <span className="absolute -left-[39px] md:-left-[47px] top-8 h-3 w-3 rounded-full border-2 border-white dark:border-[#050505] bg-gray-400 dark:bg-gray-600 group-hover:bg-purple-500 transition-colors" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                                <span className="text-xs font-mono text-gray-500">{edu.year}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </RevealSection>
);

export default About;
