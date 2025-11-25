import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { personalInfo, projects } from '../data/data';

const Terminal = ({ onClose }) => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to xenlor terminal v1.0' },
        { type: 'output', text: 'Type "help" for available commands.' },
        { type: 'output', text: '' }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const addToHistory = (text, type = 'output') => {
        setHistory(prev => [...prev, { type, text }]);
    };

    const executeCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();

        // Add command to history
        addToHistory(`xenlor@dev:~$ ${cmd}`, 'command');

        if (!trimmed) return;

        // Save to command history for navigation
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        const args = trimmed.split(' ');
        const command = args[0];

        switch (command) {
            case 'help':
                addToHistory('Available commands:', 'output');
                addToHistory('  help                    - Show this help message', 'output');
                addToHistory('  clear                   - Clear terminal screen', 'output');
                addToHistory('  whoami                  - Display user information', 'output');
                addToHistory('  ls                      - List all projects', 'output');
                addToHistory('  cat <project-id>        - Show project details', 'output');
                addToHistory('  contact                 - Show contact information', 'output');
                addToHistory('', 'output');
                break;

            case 'clear':
                setHistory([]);
                break;

            case 'whoami':
                addToHistory(`Name: ${personalInfo.name}`, 'output');
                addToHistory(`Alias: @${personalInfo.alias}`, 'output');
                addToHistory(`Role: ${personalInfo.role}`, 'output');
                addToHistory(`Bio: ${personalInfo.bio}`, 'output');
                addToHistory('', 'output');
                break;

            case 'ls':
                addToHistory('Projects:', 'output');
                projects.forEach((project, idx) => {
                    addToHistory(`  [${idx}] ${project.title}`, 'output');
                });
                addToHistory('', 'output');
                addToHistory('Use "cat <project-id>" to view details', 'output');
                addToHistory('', 'output');
                break;

            case 'cat':
                if (args.length < 2) {
                    addToHistory('Usage: cat <project-id>', 'error');
                    addToHistory('', 'output');
                } else {
                    const projectId = parseInt(args[1]);
                    if (isNaN(projectId) || projectId < 0 || projectId >= projects.length) {
                        addToHistory(`Error: Project ${args[1]} not found`, 'error');
                        addToHistory('Use "ls" to see available projects', 'output');
                        addToHistory('', 'output');
                    } else {
                        const project = projects[projectId];
                        addToHistory(`=== ${project.title} ===`, 'output');
                        addToHistory(`Description: ${project.description}`, 'output');
                        addToHistory(`Technologies: ${project.tech.join(', ')}`, 'output');
                        if (project.github) addToHistory(`GitHub: ${project.github}`, 'output');
                        if (project.live) addToHistory(`Live: ${project.live}`, 'output');
                        addToHistory('', 'output');
                    }
                }
                break;


            case 'contact':
                addToHistory('Contact Information:', 'output');
                addToHistory(`Email: ${personalInfo.email}`, 'output');
                addToHistory(`LinkedIn: ${personalInfo.linkedin}`, 'output');
                addToHistory(`GitHub: ${personalInfo.github}`, 'output');
                addToHistory('', 'output');
                break;

            case 'sudo':
                addToHistory('Nice try! 😎', 'output');
                addToHistory('But you already have full access to this portfolio.', 'output');
                addToHistory('', 'output');
                break;

            case 'hack':
                addToHistory('Initializing hack sequence...', 'output');
                addToHistory('[████████████████] 100%', 'output');
                addToHistory('Access granted! Just kidding 😄', 'output');
                addToHistory('', 'output');
                break;

            default:
                addToHistory(`Command not found: ${command}`, 'error');
                addToHistory('Type "help" for available commands', 'output');
                addToHistory('', 'output');
                break;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-4xl h-[600px] bg-black border-2 border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden flex flex-col font-mono"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-green-950/30 border-b border-green-500/30 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-400">
                        <TerminalIcon size={18} />
                        <span className="font-bold">xenlor@terminal</span>
                        <span className="text-green-600">~</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-green-400 hover:text-green-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Terminal Output */}
                <div className="flex-1 overflow-y-auto p-4 text-sm bg-black/50">
                    {history.map((entry, idx) => (
                        <div
                            key={idx}
                            className={`
                                ${entry.type === 'command' ? 'text-green-400 font-bold' : ''}
                                ${entry.type === 'error' ? 'text-red-400' : ''}
                                ${entry.type === 'output' ? 'text-cyan-400' : ''}
                            `}
                        >
                            {entry.text}
                        </div>
                    ))}
                    <div ref={historyEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-green-500/30 p-4 flex items-center gap-2 bg-black/50">
                    <span className="text-green-400 font-bold select-none">xenlor@dev:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
                        autoFocus
                        spellCheck={false}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Terminal;
