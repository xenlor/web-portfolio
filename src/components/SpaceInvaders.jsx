import React, { useState, useEffect, useRef, useCallback } from 'react';
import { XCircle, Play, RotateCcw, FastForward, ChevronDown } from 'lucide-react';

// Sintetizador de sonido simple usando Web Audio API
// Crear un único contexto de audio global para evitar problemas de límite
let audioContext = null;

const getAudioContext = () => {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioContext = new AudioContext();
        }
    }
    return audioContext;
};

const playSound = (type) => {
    const ctx = getAudioContext();
    if (!ctx) return;

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
    const [gameState, setGameState] = useState('start'); // inicio, jugando, gameover, victoria
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    const gameRef = useRef({
        player: { x: 0, y: 0, width: 40, height: 20, speed: 5, dx: 0 },
        bullets: [],
        aliens: [],
        particles: [],
        stars: [],
        alienDirection: 1,
        alienSpeed: 1,
        lastTime: 0
    });

    const initGame = useCallback((lvl, resetScore = false) => {
        if (resetScore) setScore(0);
        setLevel(lvl);

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Ajustar canvas al tamaño del contenedor con ancho mínimo
        const parent = canvas.parentElement;
        const idealWidth = Math.min(Math.max(parent.clientWidth, 800), 1200);
        canvas.width = idealWidth;
        canvas.height = Math.min(window.innerHeight * 0.7, 600);

        const g = gameRef.current;

        // Reiniciar Jugador
        g.player.x = canvas.width / 2 - 20;
        g.player.y = canvas.height - 40;
        g.player.dx = 0;
        g.bullets = [];
        g.particles = [];
        g.alienDirection = 1;
        g.alienSpeed = 1 + (lvl * 0.2); // Más rápido cada nivel

        // Crear Fondo de Estrellas
        if (g.stars.length === 0) {
            for (let i = 0; i < 50; i++) {
                g.stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.2
                });
            }
        }

        // Crear Cuadrícula de Aliens
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
                color: '#a855f7' // Láser morado
            });
        }
    }, [gameState]);

    const handleKeyUp = useCallback((e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            gameRef.current.player.dx = 0;
        }
    }, []);

    // Controles Táctiles para Móvil
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

            // Limpiamos Canvas
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- Actualizar y Dibujar Estrellas ---
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

            // Actualizar Jugador
            g.player.x += g.player.dx;
            if (g.player.x < 0) g.player.x = 0;
            if (g.player.x + g.player.width > canvas.width) g.player.x = canvas.width - g.player.width;

            // Dibujar Jugador
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.moveTo(g.player.x + g.player.width / 2, g.player.y);
            ctx.lineTo(g.player.x + g.player.width, g.player.y + g.player.height);
            ctx.lineTo(g.player.x, g.player.y + g.player.height);
            ctx.fill();

            // Actualizar Proyectiles
            g.bullets.forEach((b, i) => {
                b.y -= b.speed;
                if (b.y < 0) g.bullets.splice(i, 1);
                ctx.fillStyle = b.color;
                ctx.fillRect(b.x - b.width / 2, b.y, b.width, b.height);
            });

            // Actualizar Aliens
            let edgeReached = false;
            let lowestAlienY = 0;

            g.aliens.forEach(alien => {
                if (!alien.alive) return;

                alien.x += g.alienSpeed * g.alienDirection;
                lowestAlienY = Math.max(lowestAlienY, alien.y + alien.height);

                // Comprobar bordes
                if (alien.x + alien.width > canvas.width - 10 || alien.x < 10) {
                    edgeReached = true;
                }

                // Dibujar Alien
                ctx.fillStyle = alien.color;
                ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
                // Eyes
                ctx.fillStyle = '#000';
                ctx.fillRect(alien.x + 5, alien.y + 5, 5, 5);
                ctx.fillRect(alien.x + alien.width - 10, alien.y + 5, 5, 5);

                // Colisión con Jugador (Game Over)
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

            // Game Over if aliens reach bottom (con verificación de seguridad)
            const aliveAliensCheck = g.aliens.filter(a => a.alive);
            if (aliveAliensCheck.length > 0 && lowestAlienY > g.player.y - 10) {
                playSound('gameover');
                setGameState('gameover');
            }

            if (edgeReached) {
                g.alienDirection *= -1;
                g.aliens.forEach(a => a.y += 20);
                // Pequeño aumento de velocidad al bajar una línea
                g.alienSpeed += 0.1;
            }

            // Detección de Colisiones (Proyectiles vs Aliens)
            g.bullets.forEach((b, bIdx) => {
                g.aliens.forEach((a, aIdx) => {
                    if (a.alive &&
                        b.x > a.x &&
                        b.x < a.x + a.width &&
                        b.y > a.y &&
                        b.y < a.y + a.height) {
                        // ¡Impacto!
                        playSound('explosion');
                        a.alive = false;
                        g.bullets.splice(bIdx, 1);
                        setScore(prev => prev + 100);

                        // Partículas
                        for (let i = 0; i < 5; i++) {
                            g.particles.push({
                                x: a.x + a.width / 2,
                                y: a.y + a.height / 2,
                                vx: (Math.random() - 0.5) * 5,
                                vy: (Math.random() - 0.5) * 5,
                                life: 1.0,
                                color: a.color
                            });
                        }
                    }
                });
            });

            // Lógica de Victoria
            const aliveAliens = g.aliens.filter(a => a.alive).length;
            if (aliveAliens === 0 && g.aliens.length > 0) {
                playSound('victory');
                setGameState('victory');
            }

            // Lógica de partículas
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
            {/* Interfaz de Cabecera */}
            <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center text-white">
                <div className="font-mono text-xl flex gap-6">
                    <span>SCORE: <span className="text-purple-400">{score}</span></span>
                    <span className="text-gray-400 text-sm mt-1">NIVEL {level}</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XCircle size={32} /></button>
            </div>

            {/* Canvas del Juego */}
            <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                <canvas ref={canvasRef} className="bg-[#050505] max-w-full max-h-[70vh] touch-none" />

                {/* --- PANTALLA DE INICIO --- */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center p-4">
                        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">SYSTEM BREACH</h2>
                        <p className="mb-8 font-mono text-sm text-gray-300">Defiende el servidor de la intrusión.<br />Usa flechas para moverte, espacio para disparar.</p>
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

            {/* Controles Móviles */}
            {gameState === 'playing' && (
                <div className="md:hidden w-full max-w-[800px] mt-6 flex justify-between px-8 gap-4">
                    <div className="flex gap-4">
                        <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-purple-500/50"
                            onTouchStart={() => handleTouchStart('left')} onTouchEnd={handleTouchEnd}>
                            <ChevronDown className="rotate-90" size={32} color="white" />
                        </button>
                        <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-purple-500/50"
                            onTouchStart={() => handleTouchStart('right')} onTouchEnd={handleTouchEnd}>
                            <ChevronDown className="-rotate-90" size={32} color="white" />
                        </button>
                    </div>
                    <button className="w-20 h-20 bg-red-500/20 border-2 border-red-500/50 rounded-full flex items-center justify-center active:bg-red-500/80"
                        onTouchStart={() => handleTouchStart('shoot')} >
                        <div className="w-12 h-12 bg-red-500 rounded-full opacity-50" />
                    </button>
                </div>
            )}

            {/* Pista para Escritorio */}
            <div className="hidden md:block mt-4 text-gray-500 font-mono text-sm">
                [←][→] Move &nbsp; [SPACE] Shoot
            </div>
        </div>
    );
};

export default SpaceInvaders;
