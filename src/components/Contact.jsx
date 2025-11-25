import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import RevealSection from './ui/RevealSection';
import { personalInfo } from '../data/data';

const Contact = () => (
    <RevealSection id="contacto" className="pb-32">
        <div className="max-w-3xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="p-10 md:p-16 rounded-[3rem] relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-2xl hover:shadow-purple-500/10 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-900/50 dark:to-[#0a0a0a] backdrop-blur-md border border-gray-200 dark:border-gray-800/50"
            >
                {/* Glow effect animado */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-400/20 dark:bg-purple-600/30 blur-[120px] rounded-full pointer-events-none group-hover:bg-purple-400/30 dark:group-hover:bg-purple-600/40 transition-all duration-1000 animate-pulse" />

                <div className="relative z-10 space-y-8">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/10">
                        <Mail size={40} />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">¿Hablamos?</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto">
                        Actualmente no estoy buscando nuevas oportunidades laborales.<br></br>
                        Sin embargo, si tienes alguna consulta o simplemente quieres charlar sobre tecnología, ¡no dudes en escribirme!
                    </p>

                    <div className="pt-4">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 active:scale-95"
                        >
                            <Mail size={20} />
                            {personalInfo.email}
                        </a>
                    </div>

                    <div className="pt-12 flex justify-center gap-10">
                        {personalInfo.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex flex-col items-center gap-3 hover:-translate-y-2 duration-300 group/social"
                            >
                                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 group-hover/social:border-purple-500/50 group-hover/social:bg-purple-50 dark:group-hover/social:bg-purple-900/20 transition-all shadow-lg">
                                    {social.icon}
                                </div>
                                <span className="text-sm font-medium tracking-wider">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    </RevealSection>
);

export default Contact;
