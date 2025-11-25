import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ArrowUp, Rocket, Terminal } from 'lucide-react';
import BackgroundWrapper from './components/ui/BackgroundWrapper';
import NavItem from './components/ui/NavItem';
import SpaceInvaders from './components/SpaceInvaders';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsList from './components/ProjectsList';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [gameActive, setGameActive] = useState(false); // Estado para el juego

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  // --- KONAMI CODE LOGIC ---
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let cursor = 0;

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === konamiCode[cursor].toLowerCase()) {
        cursor++;
        if (cursor === konamiCode.length) {
          setGameActive(true);
          cursor = 0;
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setActiveSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if ((window.innerHeight + currentScroll) >= document.body.offsetHeight - 50) {
        setActiveSection('contacto');
        return;
      }

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = currentScroll + 250;

      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-500 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-200 selection:bg-purple-500/30">

      {/* --- FONDO GLOBAL --- */}
      <BackgroundWrapper />

      {/* --- EASTER EGG OVERLAY --- */}
      <AnimatePresence>
        {gameActive && <SpaceInvaders onClose={() => setGameActive(false)} />}
      </AnimatePresence>

      {/* Header Flotante */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 transition-colors duration-500 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl">
        <div className="px-6 h-16 flex items-center justify-between">
          <div
            className="font-bold text-xl tracking-tighter cursor-pointer flex items-center gap-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors z-50 relative group"
            onClick={() => scrollToSection('inicio')}
          >
            <div className="p-1.5 bg-purple-100 dark:bg-purple-500/20 rounded-lg border border-purple-200 dark:border-purple-500/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/40 transition-colors">
              <Terminal size={18} className="text-purple-600 dark:text-purple-400 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors" />
            </div>
            xenlor.dev
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Navegación Desktop */}
            <nav className="hidden md:flex gap-1 bg-gray-100/50 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  active={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                />
              ))}
            </nav>

            {/* Botón Tema */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-600" />}
            </button>

            {/* Toggle Menú Móvil */}
            <button
              className="md:hidden z-50 relative p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menú Móvil Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full z-40 mt-2 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden md:hidden bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl"
              >
                <div className="flex flex-col p-4">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.id}
                      label={item.label}
                      active={activeSection === item.id}
                      onClick={() => scrollToSection(item.id)}
                      mobile={true}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <ProjectsList />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/5 py-12 text-center relative z-10 transition-colors duration-500 bg-white/80 dark:bg-[#020202]/80 backdrop-blur-md">
        <div className="flex justify-center items-center gap-3 mb-6 text-gray-500">
          <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full animate-pulse">
            <Terminal size={16} className="text-green-600 dark:text-green-500" />
          </div>
          <span className="text-sm font-mono tracking-wider">SYSTEM STATUS: ONLINE</span>
        </div>
        <p className="text-gray-500 text-sm leading-loose flex items-center justify-center flex-col md:flex-row gap-1">
          <span>© {new Date().getFullYear()} Esteban Castillo Loren (xenlor).</span>
          {/* --- ROCKET EASTER EGG --- */}
          <button
            onClick={() => setGameActive(true)}
            className="opacity-20 hover:opacity-100 transition-opacity text-purple-500 mx-2"
            title="Protocolo de Seguridad"
          >
            <Rocket size={14} />
          </button>
          <span className="hidden md:inline">|</span>
          <span>Built with <span className="text-purple-600 dark:text-purple-400">React</span>, <span className="text-blue-600 dark:text-blue-400">Tailwind</span>, <span className="text-red-500 dark:text-red-400">Love</span> y  un poco de <span className="text-purple-600 dark:text-purple-400">IA 🤖</span>.</span>
        </p>
      </footer>

      {/* --- BOTÓN IR ARRIBA (BACK TO TOP) --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-purple-600 dark:bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}