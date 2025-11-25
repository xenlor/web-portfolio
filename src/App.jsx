import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ArrowUpRight, Github, Linkedin, Mail, Layers, GraduationCap, Terminal, ChevronDown, Server, Shield, Menu, X, ArrowUp, Rocket, XCircle, Play, RotateCcw, FastForward } from 'lucide-react';

// --- IMPORTAR IMAGEN ---
// 1. Cuando estés en tu PC, descomenta la siguiente línea:
import avatarImage from './assets/avatar.png';

// --- DATOS ---

const personalInfo = {
  name: "Esteban",
  alias: "xenlor",
  role: "SysAdmin & Ciberseguridad",
  tagline: "Pasión por la tecnología, vocación por la seguridad.",
  bio: "Desde Chile hasta España, mi carrera se define por la curiosidad. No solo administro sistemas; los estudio, los protejo y los optimizo. Usuario avanzado de IA y eterno estudiante de cómo funciona internet.",
  email: "contacto@xenlor.dev",
  socials: [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/xenlor' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/esteban-castillo-loren-595652303/' },
  ]
};

const education = [
  {
    year: "2024 - 2025",
    degree: "Máster FP Ciberseguridad (CETI)",
    institution: "Especialización en ciberseguridad en entornos TI"
  },
  {
    year: "2022 - 2024",
    degree: "Grado Superior ASIR",
    institution: "Administración de Sistemas Informáticos en Red"
  },
  {
    year: "2020 - 2022",
    degree: "Ingeniería Civil Informática",
    institution: "Universidad de Talca, Chile (Inconcluso)"
  }
];

const experience = [
  {
    period: "Marzo 2024 - Actualidad",
    role: "Área IT",
    company: "Norsol - Energía Solar ",
    description: "Administración de usuarios y Active Directory. Apoyando en la digitalización e implantación de nuevo software (ERP/CRM Dynamics 365, automatizaciones, optimización de flujos). Formación en ciberseguridad."
  },
  {
    period: "2020 - 2021",
    role: "Servicio Técnico a Domicilio",
    company: "Freelance / Autónomo",
    description: "Soporte técnico de ordenadores a domicilio durante la pandemia. Diagnóstico de fallos de hardware, formateos, puestas a punto, instalación de software y optimización de equipos."
  }
];

const projects = [
  {
    id: 1,
    title: "IDS IoT con Machine Learning",
    category: "Ciberseguridad & IA",
    description: "Sistema de detección de intrusiones para redes IoT (MQTT). Utiliza Suricata para la captura y un modelo Random Forest entrenado con el dataset TON-IoT para clasificar ataques en tiempo real. Incluye respuesta activa (bloqueo de IPs) vía bot de Telegram y análisis forense con ELK Stack.",
    tech: ["Python", "Suricata", "ELK Stack", "Random Forest", "MQTT", "Telegram API"],
    link: "https://github.com/xenlor/TFG-CETI"
  },
  {
    id: 2,
    title: "Servidor NAS & Homelab Seguro",
    category: "Sistemas & Docker",
    description: "Infraestructura de nube privada desplegada en Raspberry Pi 5. Arquitectura basada en microservicios Docker con almacenamiento redundante (RAID 1). Integra VPN WireGuard, Proxy Inverso con SSL, autenticación 2FA con Authelia, bloqueo de anuncios (PiHole) y monitorización completa con Grafana.",
    tech: ["Docker", "Raspberry Pi", "WireGuard", "Nginx Proxy Manager", "Authelia", "Grafana"],
    link: "https://github.com/xenlor/tfg"
  },
  {
    id: 3,
    title: "Linux Automation Tools",
    category: "Scripting & Bash",
    description: "Suite de herramientas CLI para administración de sistemas Linux. Destaca una implementación segura de 'Papelera de Reciclaje' para terminal (con recuperación y logging) y un gestor automatizado para la creación masiva de usuarios y grupos.",
    tech: ["Bash", "Shell Scripting", "Linux CLI", "Automation"],
    link: "https://github.com/xenlor/scrip-papelera"
  }
];

const stack = [
  "Python (Tools)", 
  "PowerShell", 
  "Bash / Linux", 
  "Admin M365", 
  "PowerAutomate", 
  "N8N", 
  "Active Directory",
  "Dynamics 365",
  "GenAI Tools"
];

// --- EASTER EGG: SPACE INVADERS ---

// Sintetizador de sonido simple usando Web Audio API
const playSound = (type) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'shoot') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'explosion') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'gameover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0, now + 1);
        osc.start(now);
        osc.stop(now + 1);
    } else if (type === 'victory') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        osc.frequency.setValueAtTime(1000, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    }
};

const SpaceInvaders = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start'); // start, playing, gameover, victory
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  
  // Game Refs to avoid closures in loop
  const gameRef = useRef({
    player: { x: 0, y: 0, width: 30, height: 20, speed: 5, dx: 0 },
    bullets: [],
    aliens: [],
    particles: [],
    stars: [], 
    lastTime: 0,
    alienDirection: 1,
    alienSpeed: 0.5, // Velocidad base inicial más lenta
    frames: 0
  });

  const initGame = useCallback((currentLevel = 1, resetScore = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set dimensions responsive
    canvas.width = Math.min(window.innerWidth, 800);
    canvas.height = Math.min(window.innerHeight, 600);
    
    const g = gameRef.current;
    g.player.x = canvas.width / 2 - g.player.width / 2;
    g.player.y = canvas.height - 50;
    g.bullets = [];
    g.particles = [];
    
    // Dificultad basada en el nivel
    g.alienSpeed = 0.5 + (currentLevel - 1) * 0.5; 
    
    g.frames = 0;
    
    if (resetScore) {
        setScore(0);
        setLevel(1);
    } else {
        setLevel(currentLevel);
    }

    // Init Stars
    if (g.stars.length === 0) {
        for(let i=0; i<60; i++) {
            g.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    // Create Aliens Grid
    g.aliens = [];
    const rows = 4;
    const cols = 8;
    const alienWidth = 30;
    const alienHeight = 20;
    const padding = 15;
    const offsetTop = 50;
    const offsetLeft = (canvas.width - (cols * (alienWidth + padding))) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        g.aliens.push({
          x: c * (alienWidth + padding) + offsetLeft,
          y: r * (alienHeight + padding) + offsetTop,
          width: alienWidth,
          height: alienHeight,
          alive: true,
          color: r === 0 ? '#ef4444' : r === 1 ? '#f59e0b' : r === 2 ? '#10b981' : '#3b82f6'
        });
      }
    }
  }, []);

  const handleNextLevel = () => {
      initGame(level + 1, false);
      setGameState('playing');
  };

  const handleRestart = () => {
      initGame(1, true);
      setGameState('playing');
  };

  const handleKeyDown = useCallback((e) => {
    if (gameState !== 'playing') return;
    if (e.key === 'ArrowLeft') gameRef.current.player.dx = -gameRef.current.player.speed;
    if (e.key === 'ArrowRight') gameRef.current.player.dx = gameRef.current.player.speed;
    if (e.key === ' ' || e.key === 'ArrowUp') {
      playSound('shoot');
      gameRef.current.bullets.push({
        x: gameRef.current.player.x + gameRef.current.player.width / 2,
        y: gameRef.current.player.y,
        width: 4,
        height: 10,
        speed: 7,
        color: '#a855f7' // Purple laser
      });
    }
  }, [gameState]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      gameRef.current.player.dx = 0;
    }
  }, []);

  // Touch Controls for Mobile
  const handleTouchStart = (dir) => {
    if (dir === 'left') gameRef.current.player.dx = -gameRef.current.player.speed;
    if (dir === 'right') gameRef.current.player.dx = gameRef.current.player.speed;
    if (dir === 'shoot') {
       playSound('shoot');
       gameRef.current.bullets.push({
        x: gameRef.current.player.x + gameRef.current.player.width / 2,
        y: gameRef.current.player.y,
        width: 4,
        height: 10,
        speed: 7,
        color: '#a855f7'
      });
    }
  };
  const handleTouchEnd = () => {
    gameRef.current.player.dx = 0;
  };

  useEffect(() => {
    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (gameState === 'start') {
       initGame(1, true);
    }
    
    if (gameState !== 'playing') return;

    let animationFrameId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current;

    const render = (time) => {
      if (!g.lastTime) g.lastTime = time;
      g.lastTime = time;
      
      // Clear Canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // --- Update and Draw Stars ---
      ctx.fillStyle = '#ffffff';
      g.stars.forEach(star => {
          star.y += star.speed;
          if (star.y > canvas.height) {
              star.y = 0;
              star.x = Math.random() * canvas.width;
          }
          ctx.globalAlpha = Math.random() * 0.3 + 0.3; 
          ctx.fillRect(star.x, star.y, star.size, star.size);
          ctx.globalAlpha = 1.0;
      });

      // Update Player
      g.player.x += g.player.dx;
      if (g.player.x < 0) g.player.x = 0;
      if (g.player.x + g.player.width > canvas.width) g.player.x = canvas.width - g.player.width;

      // Draw Player
      ctx.fillStyle = '#a855f7'; 
      ctx.beginPath();
      ctx.moveTo(g.player.x + g.player.width/2, g.player.y);
      ctx.lineTo(g.player.x + g.player.width, g.player.y + g.player.height);
      ctx.lineTo(g.player.x, g.player.y + g.player.height);
      ctx.fill();

      // Update Bullets
      g.bullets.forEach((b, i) => {
        b.y -= b.speed;
        if (b.y < 0) g.bullets.splice(i, 1);
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - b.width/2, b.y, b.width, b.height);
      });

      // Update Aliens
      let edgeReached = false;
      let lowestAlienY = 0;

      g.aliens.forEach(alien => {
        if (!alien.alive) return;
        
        alien.x += g.alienSpeed * g.alienDirection;
        lowestAlienY = Math.max(lowestAlienY, alien.y + alien.height);

        // Check edges
        if (alien.x + alien.width > canvas.width - 10 || alien.x < 10) {
          edgeReached = true;
        }

        // Draw Alien
        ctx.fillStyle = alien.color;
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(alien.x + 5, alien.y + 5, 5, 5);
        ctx.fillRect(alien.x + alien.width - 10, alien.y + 5, 5, 5);
        
        // Collision with Player (Game Over)
        if (
          g.player.x < alien.x + alien.width &&
          g.player.x + g.player.width > alien.x &&
          g.player.y < alien.y + alien.height &&
          g.player.height + g.player.y > alien.y
        ) {
          playSound('gameover');
          setGameState('gameover');
        }
      });

      // Game Over if aliens reach bottom
      if (lowestAlienY > g.player.y) {
          playSound('gameover');
          setGameState('gameover');
      }

      if (edgeReached) {
        g.alienDirection *= -1;
        g.aliens.forEach(a => a.y += 20);
        // Pequeño aumento de velocidad al bajar una línea
        g.alienSpeed += 0.1; 
      }
      
      // Collision Detection (Bullets vs Aliens)
      g.bullets.forEach((b, bIdx) => {
        g.aliens.forEach((a, aIdx) => {
           if (a.alive && 
               b.x > a.x && 
               b.x < a.x + a.width && 
               b.y > a.y && 
               b.y < a.y + a.height) {
                 // Hit!
                 playSound('explosion');
                 a.alive = false;
                 g.bullets.splice(bIdx, 1);
                 setScore(prev => prev + 100);
                 
                 // Particles
                 for(let i=0; i<5; i++) {
                    g.particles.push({
                        x: a.x + a.width/2,
                        y: a.y + a.height/2,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        life: 1.0,
                        color: a.color
                    });
                 }
           }
        });
      });

      // Win Condition Logic
      const aliveAliens = g.aliens.filter(a => a.alive).length;
      if (aliveAliens === 0 && g.aliens.length > 0) {
         playSound('victory');
         setGameState('victory');
      }

      // Particles logic
      g.particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05;
          if (p.life <= 0) g.particles.splice(i, 1);
          
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 3, 3);
          ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, initGame]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
       {/* Header UI */}
       <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center text-white">
          <div className="font-mono text-xl flex gap-6">
              <span>SCORE: <span className="text-purple-400">{score}</span></span>
              <span className="text-gray-400 text-sm mt-1">NIVEL {level}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XCircle size={32} /></button>
       </div>

       {/* Game Canvas */}
       <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
          <canvas ref={canvasRef} className="bg-[#050505] max-w-full max-h-[70vh] touch-none" />
          
          {/* --- PANTALLA DE INICIO --- */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center p-4">
               <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">SYSTEM BREACH</h2>
               <p className="mb-8 font-mono text-sm text-gray-300">Defiende el servidor de la intrusión.<br/>Usa flechas para moverte, espacio para disparar.</p>
               <button onClick={() => setGameState('playing')} className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all hover:scale-105">
                  <Play size={20} /> INICIAR PROTOCOLO
               </button>
            </div>
          )}
          
          {/* --- PANTALLA GAME OVER --- */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 text-white text-center p-4">
               <h2 className="text-5xl font-bold mb-2 text-red-200 animate-pulse">GAME OVER</h2>
               <p className="mb-6 font-mono text-xl">Puntaje Final: <span className="text-white font-bold">{score}</span></p>
               <div className="flex gap-4">
                  <button onClick={handleRestart} className="flex items-center gap-2 px-6 py-3 bg-white text-red-900 hover:bg-gray-200 rounded-lg font-bold transition-all transform hover:scale-105">
                      <RotateCcw size={20} /> REINICIAR
                  </button>
                  <button onClick={onClose} className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-bold transition-all">
                      SALIR
                  </button>
               </div>
            </div>
          )}

          {/* --- PANTALLA VICTORIA (NIVEL COMPLETADO) --- */}
          {gameState === 'victory' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900/90 text-white text-center p-4">
               <h2 className="text-4xl font-bold mb-2 text-green-200">AMENAZA NEUTRALIZADA</h2>
               <p className="text-lg mb-6">Nivel {level} Completado</p>
               <p className="mb-8 font-mono text-2xl border-b border-green-500/50 pb-2">Score Total: <span className="font-bold">{score}</span></p>
               <div className="flex gap-4">
                  <button onClick={handleNextLevel} className="flex items-center gap-2 px-8 py-3 bg-white text-green-900 hover:bg-gray-100 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105">
                      <FastForward size={20} /> SIGUIENTE NIVEL
                  </button>
               </div>
               <p className="mt-4 text-xs text-green-300/80">Advertencia: Los enemigos serán más rápidos.</p>
            </div>
          )}
       </div>

       {/* Mobile Controls */}
       {gameState === 'playing' && (
          <div className="md:hidden w-full max-w-[800px] mt-6 flex justify-between px-8 gap-4">
              <div className="flex gap-4">
                 <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-purple-500/50" 
                    onTouchStart={() => handleTouchStart('left')} onTouchEnd={handleTouchEnd}>
                    <ChevronDown className="rotate-90" size={32} color="white"/>
                 </button>
                 <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-purple-500/50"
                    onTouchStart={() => handleTouchStart('right')} onTouchEnd={handleTouchEnd}>
                    <ChevronDown className="-rotate-90" size={32} color="white"/>
                 </button>
              </div>
              <button className="w-20 h-20 bg-red-500/20 border-2 border-red-500/50 rounded-full flex items-center justify-center active:bg-red-500/80"
                 onTouchStart={() => handleTouchStart('shoot')} >
                 <div className="w-12 h-12 bg-red-500 rounded-full opacity-50" />
              </button>
          </div>
       )}

       {/* Desktop Hint */}
       <div className="hidden md:block mt-4 text-gray-500 font-mono text-sm">
          [←][→] Move &nbsp; [SPACE] Shoot
       </div>
    </div>
  );
};

// --- VARIANTS DE ANIMACIÓN ---

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

// --- COMPONENTES UI ---

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

// Componente Wrapper para secciones principales
const RevealSection = ({ children, id, className = "" }) => (
  <section id={id} className={`py-20 md:py-32 relative z-10 ${className}`}>
    {children}
  </section>
);

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


// --- SECCIONES PRINCIPALES ---

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
          Hola, soy <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">{personalInfo.name}.</span>
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

    {/* Scroll Indicator */}
    <motion.div 
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 z-10"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <ChevronDown size={24} />
    </motion.div>
  </motion.section>
);

// Constante para estilo glassmorphism por defecto
const glassClass = "bg-white/60 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50";

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

// --- APP COMPONENT ---

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