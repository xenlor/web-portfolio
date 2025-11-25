import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ icon: Icon, title }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
    >
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 shadow-sm dark:shadow-[0_0_10px_rgba(168,85,247,0.1)]">
            <Icon size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{title}</h2>
    </motion.div>
);

export default SectionHeading;
