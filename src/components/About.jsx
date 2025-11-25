import React from 'react';
import { motion } from 'framer-motion';
import { Server, Terminal, Layers, GraduationCap } from 'lucide-react';
import RevealSection from './ui/RevealSection';
import SectionHeading from './ui/SectionHeading';
import { stack, experience, education } from '../data/data';

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

        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`${glassClass} p-8 rounded-3xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10`}
                >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        Soy un joven que emigró de Chile buscando nuevas oportunidades en España. A raíz de los videojuegos encontré mi pasión por los ordenadores y, sobre todo, por entender cómo funcionan las cosas por detrás.
                        <br /><br />
                        Me especialicé en ciberseguridad porque considero fundamental contar con una infraestructura digital que, además de facilitarnos la vida, sea capaz de proteger nuestra información.
                    </p>

                </motion.div>

                <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <Terminal size={20} className="text-purple-600 dark:text-purple-400" /> Stack Tecnológico
                    </h3>
                    <motion.div
                        className="grid grid-cols-2 gap-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stack.map((tech) => (
                            <motion.div
                                key={tech}
                                variants={itemVariants}
                                className="px-4 py-4 rounded-xl text-center hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group cursor-default shadow-sm hover:shadow-purple-500/20 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50"
                            >
                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-white transition-colors">{tech}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="space-y-12">
                {/* EXPERIENCIA */}
                <div>
                    <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
                        <Layers size={20} className="text-purple-600 dark:text-purple-400" /> Experiencia
                    </h3>
                    <div className="relative border-l border-gray-300 dark:border-gray-800 ml-3 pl-10 pb-2">
                        {experience.map((job, idx) => (
                            <motion.div
                                key={idx}
                                className={`relative p-6 rounded-2xl hover:border-purple-500/30 transition-all shadow-sm mb-6 last:mb-0 ${glassClass}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * (idx + 1) }}
                            >
                                <span className="absolute -left-[49px] top-8 h-4 w-4 rounded-full border-2 border-white dark:border-[#050505] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                                <p className="text-xs font-mono text-purple-600 dark:text-purple-300 mb-2 inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded">{job.period}</p>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{job.role}</h4>
                                <p className="text-purple-600 dark:text-purple-400 font-medium mb-4">{job.company}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {job.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* EDUCACIÓN */}
                <div>
                    <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
                        <GraduationCap size={20} className="text-purple-600 dark:text-purple-400" /> Formación
                    </h3>
                    <motion.div
                        className="space-y-6 border-l border-gray-300 dark:border-gray-800 ml-3 pl-10 relative"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {education.map((edu, idx) => (
                            <motion.div key={idx} className="relative p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/20 transition-colors" variants={itemVariants}>
                                <span className="absolute -left-[47px] top-6 h-3 w-3 rounded-full border-2 border-white dark:border-[#050505] bg-gray-400 dark:bg-gray-600 group-hover:bg-purple-500 transition-colors" />
                                <p className="text-xs font-mono text-gray-500 mb-1">{edu.year}</p>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.institution}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    </RevealSection>
);

export default About;
