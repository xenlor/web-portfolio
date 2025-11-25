import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowUpRight } from 'lucide-react';
import RevealSection from './ui/RevealSection';
import SectionHeading from './ui/SectionHeading';
import { projects } from '../data/data';

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

const ProjectsList = () => (
    <RevealSection id="proyectos">
        <SectionHeading icon={Shield} title="Proyectos & Labs" />
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl text-lg"
        >
            Aquí muestro algunos de mis trabajos académicos y personales, enfocados en hardening de sistemas, scripts de automatización en Bash y despliegue de infraestructuras seguras.
        </motion.p>

        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {projects.map((project) => (
                <motion.a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`group block relative rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] transition-all duration-500 ${glassClass}`}
                >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500" />

                    <div className="p-8 space-y-6 h-full flex flex-col relative z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-500/20">
                                {project.category}
                            </span>
                            <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors">
                                <ArrowUpRight size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </div>
                        </div>

                        <div className="flex-grow space-y-3">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-6 mt-auto border-t border-gray-200 dark:border-white/5">
                            {project.tech.map(t => (
                                <span key={t} className="px-2.5 py-1 bg-gray-100 dark:bg-[#0a0a0a]/50 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md border border-gray-200 dark:border-white/10 group-hover:border-purple-200 dark:group-hover:border-white/20 transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.a>
            ))}
        </motion.div>
    </RevealSection>
);

export default ProjectsList;
