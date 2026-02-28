import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Terminal, Layers, GraduationCap, MapPin, Zap, Globe } from 'lucide-react';
import RevealSection from './ui/RevealSection';
import SectionHeading from './ui/SectionHeading';
import { experience, education, languages, softSkills } from '../data/data';
import TechCarousel from './ui/TechCarousel';

const glassClass = "bg-white/85 dark:bg-white/[0.03] backdrop-blur-md border border-purple-200/60 dark:border-white/[0.08] shadow-sm dark:shadow-none";

const TABS = [
    { label: 'Experiencia', icon: Layers },
    { label: 'Formación',   icon: GraduationCap },
    { label: 'Skills',      icon: Globe },
];

const About = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <RevealSection id="sobre-mi">
            <SectionHeading icon={Server} title="Sobre Mí" />

            <div className="space-y-16 max-w-5xl mx-auto">

                {/* ── BIO + STATS ── */}
                <div className="grid md:grid-cols-[2fr_1fr] gap-6">

                    {/* BIO */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`${glassClass} p-8 rounded-3xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10 flex flex-col gap-5`}
                    >
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            De Chile a España, movido por la curiosidad y las ganas de aprender.
                            Al llegar a mi empresa actual, me adapté rápidamente a las herramientas
                            existentes, propuse mejoras y fui asumiendo responsabilidad. Hoy llevo
                            la parte técnica, de soporte y ciberseguridad para toda la empresa.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            No me conformo con que las cosas funcionen — necesito entender
                            por qué funcionan, y cómo hacerlas más seguras. Así llegué a la ciberseguridad.
                        </p>

                        {/* Idiomas */}
                        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-200 dark:border-gray-700/50">
                            {languages.map(lang => (
                                <div
                                    key={lang.name}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10"
                                >
                                    <span className="text-base">{lang.flag}</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lang.name}</span>
                                    <span className="text-xs text-purple-600 dark:text-purple-400 font-mono bg-purple-100 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
                                        {lang.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* STATS CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`${glassClass} p-6 rounded-3xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10 flex flex-col gap-4 self-start`}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 pb-3">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <MapPin size={18} className="text-red-500" />
                                <span className="text-sm font-medium">Origen</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">CL 🇨🇱 → ES 🇪🇸</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 pb-3">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <Zap size={18} className="text-yellow-500" />
                                <span className="text-sm font-medium">Edad</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">24</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <Globe size={18} className="text-purple-500" />
                                <span className="text-sm font-medium">Foco</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white text-right">SysAdmin &<br/>Ciberseguridad</span>
                        </div>
                    </motion.div>
                </div>

                {/* ── STACK ── */}
                <div className="w-full">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                        <Terminal size={24} className="text-purple-600 dark:text-purple-400" /> Stack Tecnológico
                    </h3>
                    <TechCarousel />
                </div>

                {/* ── TABS ── */}
                <div>
                    {/* Tab buttons */}
                    <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-gray-800">
                        {TABS.map((tab, i) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl border-b-2 -mb-px transition-all ${
                                        activeTab === i
                                            ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab content */}
                    <AnimatePresence mode="wait">

                        {/* ── Experiencia ── */}
                        {activeTab === 0 && (
                            <motion.div
                                key="exp"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="relative border-l border-gray-300 dark:border-gray-800 ml-3 pl-8 md:pl-10 space-y-8"
                            >
                                {experience.map((job, idx) => {
                                    const card = (
                                        <motion.div
                                            className={`relative p-6 md:p-8 rounded-2xl hover:border-purple-500/30 transition-all shadow-sm ${glassClass} ${job.link ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * (idx + 1) }}
                                        >
                                            <span className="absolute -left-[41px] md:-left-[49px] top-8 h-4 w-4 rounded-full border-2 border-white dark:border-[#050505] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h4>
                                                <span className="text-xs font-mono text-purple-600 dark:text-purple-300 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit">{job.period}</span>
                                            </div>

                                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-1 text-lg flex items-center gap-2">
                                                {job.company}
                                                {job.link && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                )}
                                            </p>

                                            <p className="text-gray-500 dark:text-gray-500 text-sm mb-4 italic">{job.summary}</p>

                                            <ul className="space-y-2">
                                                {job.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 dark:bg-purple-500 shrink-0" />
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    );

                                    return job.link ? (
                                        <a key={idx} href={job.link} target="_blank" rel="noopener noreferrer" className="block">
                                            {card}
                                        </a>
                                    ) : (
                                        <div key={idx}>{card}</div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* ── Formación ── */}
                        {activeTab === 1 && (
                            <motion.div
                                key="edu"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="relative border-l border-gray-300 dark:border-gray-800 ml-3 pl-8 md:pl-10 space-y-6"
                            >
                                {education.map((edu, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`relative p-6 rounded-2xl transition-all ${glassClass} hover:border-purple-500/30`}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * (idx + 1) }}
                                    >
                                        <span className="absolute -left-[39px] md:-left-[47px] top-7 h-3 w-3 rounded-full border-2 border-white dark:border-[#050505] bg-gray-400 dark:bg-gray-600" />

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                                            <span className="text-xs font-mono text-purple-600 dark:text-purple-300 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit">{edu.year}</span>
                                        </div>

                                        <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">{edu.institution}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {edu.tags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md border border-gray-200 dark:border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* ── Skills ── */}
                        {activeTab === 2 && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-10"
                            >
                                {/* Idiomas */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Globe size={18} className="text-purple-500" /> Idiomas
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {languages.map(lang => (
                                            <div key={lang.name} className={`${glassClass} p-5 rounded-2xl flex items-center gap-4`}>
                                                <span className="text-3xl">{lang.flag}</span>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-semibold text-gray-900 dark:text-white">{lang.name}</span>
                                                        <span className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">{lang.level}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                                            style={{ width: `${lang.percent}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Soft Skills */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Zap size={18} className="text-purple-500" /> Soft Skills
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {softSkills.map(skill => (
                                            <div
                                                key={skill.label}
                                                className={`${glassClass} p-5 rounded-2xl flex items-start gap-4 hover:border-purple-500/30 transition-all`}
                                            >
                                                <span className="text-2xl mt-0.5">{skill.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{skill.label}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{skill.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

            </div>
        </RevealSection>
    );
};

export default About;
