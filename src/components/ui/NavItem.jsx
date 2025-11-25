import React from 'react';
import { motion } from 'framer-motion';

const NavItem = ({ active, label, onClick, mobile = false }) => (
    <button
        onClick={onClick}
        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg
      ${mobile ? 'w-full text-left py-4 text-lg border-b border-gray-100 dark:border-white/5' : ''}
      ${active
                ? 'text-purple-600 dark:text-purple-400 font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'
            }
    `}
    >
        {!mobile && active && (
            <motion.span
                layoutId="nav-glow"
                className="absolute inset-0 bg-purple-100 dark:bg-purple-500/10 rounded-lg -z-10 border border-purple-200 dark:border-purple-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        {label}
    </button>
);

export default NavItem;
