import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { SiGnubash, SiN8N, SiOpenai, SiPython } from 'react-icons/si';


export const education = [
    {
        year: "2024 - 2025",
        degree: "CETI — Ciberseguridad",
        institution: "Curso de Especialización FP (Ministerio de Educación, España)",
        tags: ["Hacking Ético", "Hardening", "Análisis de Vulnerabilidades", "Respuesta a Incidentes"],
    },
    {
        year: "2022 - 2024",
        degree: "Grado Superior ASIR",
        institution: "Administración de Sistemas Informáticos en Red",
        tags: ["Linux", "Windows Server", "Virtualización", "Redes", "Scripting"],
    },
    {
        year: "2020 - 2022",
        degree: "Ingeniería Civil en Computación",
        institution: "Universidad de Talca, Chile — 5 semestres antes de emigrar a España",
        tags: ["Programación", "Algoritmos", "Arquitectura", "Álgebra Lineal"],
    },
];

export const languages = [
    { name: 'Español', level: 'Nativo', flag: '🇪🇸', percent: 100 },
    { name: 'Inglés',  level: 'B2',     flag: '🇬🇧', percent: 72  },
];

export const softSkills = [
    { icon: '🧠', label: 'Autodidacta',          desc: 'Me lanzo a aprender lo que necesito, cuando lo necesito. Al llegar a mi empresa, me adapté a las herramientas existentes y fui proponiendo mejoras de forma autónoma.' },
    { icon: '🔍', label: 'Curioso por naturaleza', desc: 'No me conformo con que algo "funcione". Necesito entender el porqué y el cómo detrás de cada sistema.' },
    { icon: '🤝', label: 'Trabajo en equipo',      desc: 'Colaboro bien y asumo el liderazgo cuando la situación lo requiere, sin necesitar que me lo pidan.' },
    { icon: '🔧', label: 'Amante del cacharreo',   desc: 'Si puedo desmontarlo, entenderlo y mejorarlo, lo haré. El laboratorio personal es mi segundo hogar.' },
];

export const projects = [
    {
        id: 1,
        title: "IDS IoT con Machine Learning",
        category: "Ciberseguridad & IA",
        description: "Sistema de detección de intrusiones para IoT desplegado en Raspberry Pi. Utiliza un modelo Random Forest entrenado con el dataset CICIoT2023 para clasificar tráfico en tiempo real, con un dashboard en Grafana para visualización de amenazas.",
        tech: ["Python", "Scikit-learn", "Raspberry Pi", "Grafana", "InfluxDB", "Suricata"],
        link: "https://github.com/xenlor/tfg-ceti"
    },
    {
        id: 2,
        title: "Infraestructura Homelab Segura",
        category: "Infraestructura & Redes",
        description: "Despliegue de servicios en contenedores Docker con acceso remoto seguro vía VPN WireGuard. Incluye proxy inverso, autenticación centralizada y monitorización de recursos.",
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

export const personalInfo = {
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

export const experience = [
    {
        period: "Marzo 2024 - Actualidad",
        role: "Técnico Administrador de Sistemas",
        company: "Norsol - Energía Solar",
        summary: "Responsable del área de soporte técnico y ciberseguridad para una empresa de 80 personas.",
        bullets: [
            "Administración de Active Directory, Microsoft 365 y políticas de seguridad corporativa",
            "Migración e implementación de Microsoft Dynamics 365 (ERP/CRM) desde cero",
            "Automatizaciones con Power Automate para optimizar procesos empresariales",
            "Soporte técnico integral como único responsable de IT para 80 empleados",
            "Formación en ciberseguridad y concienciación del personal",
        ],
        link: "https://norsol.es",
    },
    {
        period: "2020 - 2021",
        role: "Servicio Técnico a Domicilio",
        company: "Freelance / Autónomo",
        summary: "Soporte técnico especializado durante la pandemia COVID-19.",
        bullets: [
            "Diagnóstico y resolución de fallos hardware/software",
            "Configuración de redes domésticas y software empresarial",
            "Formateos, reinstalaciones y optimización de rendimiento",
        ],
    },
];

const PowerAutomateIcon = ({ className }) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <filter id="pa_filter0_f">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur" />
            </filter>
            <filter id="pa_filter1_f">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
            </filter>
            <linearGradient id="pa_paint0_linear" x1="43" y1="55" x2="29" y2="10" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0D36A5" />
                <stop offset="1" stopColor="#1152D4" />
            </linearGradient>
            <linearGradient id="pa_paint1_linear" x1="46" y1="10" x2="46" y2="86" gradientUnits="userSpaceOnUse">
                <stop stopColor="#84CAFF" />
                <stop offset="1" stopColor="#61B1FB" />
            </linearGradient>
            <linearGradient id="pa_paint2_linear" x1="37.5" y1="10" x2="37.5" y2="86" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B90F5" />
                <stop offset="1" stopColor="#2A78EE" />
            </linearGradient>
            <clipPath id="pa_clip0">
                <rect width="96" height="96" fill="white" />
            </clipPath>
            <clipPath id="pa_clip1">
                <rect width="96" height="96" fill="white" />
            </clipPath>
        </defs>
        <g clipPath="url(#pa_clip0)">
            <g clipPath="url(#pa_clip1)">
                <mask id="pa_mask0" maskType="alpha" maskUnits="userSpaceOnUse" x="-1" y="10" width="97" height="76">
                    <path d="M61.2116 10C62.3496 10 63.4337 10.4847 64.1925 11.3328L94.6136 45.3328C95.9723 46.8514 95.9723 49.1486 94.6136 50.6672L64.1925 84.6672C63.4337 85.5153 62.3496 86 61.2116 86H3.94634C0.488777 86 -1.34012 81.9095 0.965366 79.3328L29 48L0.965366 16.6672C-1.34012 14.0905 0.488777 10 3.94634 10H61.2116Z" fill="white" />
                </mask>
                <g mask="url(#pa_mask0)">
                    <path d="M63 10L29 48L-5 10H63Z" fill="url(#pa_paint0_linear)" />
                    <g filter="url(#pa_filter0_f)">
                        <path d="M63 10.4L-5 86.4H63L97 48.4L63 10.4Z" fill="black" fillOpacity="0.24" />
                    </g>
                    <g filter="url(#pa_filter1_f)">
                        <path d="M63 12L-5 88H63L97 50L63 12Z" fill="black" fillOpacity="0.32" />
                    </g>
                    <path d="M-5 86L63 10L97 48L63 86H-5Z" fill="url(#pa_paint1_linear)" />
                    <path d="M-5 86L63 10L80 29L29 86H-5Z" fill="url(#pa_paint2_linear)" />
                </g>
            </g>
        </g>
    </svg>
);

const DynamicsIcon = ({ className }) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <polygon fill="#002050" points="11,1 11,14 29,22 38,16" />
        <polygon fill="#0078D4" points="39,18 39,32 11,47 11,16 20,21 12,45" />
    </svg>
);

const BusinessCentralIcon = ({ className }) => (
    <svg width="1em" height="1em" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <filter id="bc_filter0_f" x="14" y="16" width="90" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
            </filter>
            <filter id="bc_filter1_f" x="21.24" y="21.62" width="75.52" height="53.52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.38" result="effect1_foregroundBlur" />
            </filter>
            <linearGradient id="bc_paint0_linear" x1="22.7027" y1="11.3514" x2="72.6487" y2="84.6487" gradientUnits="userSpaceOnUse">
                <stop stopColor="#009CA8" />
                <stop offset="1" stopColor="#007D85" />
            </linearGradient>
            <linearGradient id="bc_paint1_linear" x1="31.7838" y1="26.2703" x2="66.1622" y2="83.3514" gradientUnits="userSpaceOnUse">
                <stop stopColor="#36E3EE" />
                <stop offset="1" stopColor="#00B1BE" />
            </linearGradient>
            <linearGradient id="bc_paint2_linear" x1="31.1352" y1="24" x2="75.2433" y2="63.5676" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2F6F9" />
                <stop offset="1" stopColor="#82EBF1" />
                <stop offset="1" stopColor="#82EBF1" />
            </linearGradient>
            <linearGradient id="bc_paint3_linear" x1="96.9731" y1="50.919" x2="72.3244" y2="42.1622" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9AEEF3" />
                <stop offset="1" stopColor="#82EBF1" />
            </linearGradient>
            <clipPath id="bc_clip0">
                <rect width="96" height="96" fill="white" />
            </clipPath>
        </defs>
        <g clipPath="url(#bc_clip0)">
            <mask id="bc_mask0" maskType="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 48C0 52.2526 2.94943 55.8163 6.91426 56.7571C10.3435 72.9252 23.0749 85.6565 39.2429 89.0857C40.1837 93.0506 43.7474 96 48 96C52.2526 96 55.8163 93.0506 56.7571 89.0857C72.9251 85.6565 85.6565 72.9252 89.0857 56.7572C93.0505 55.8164 95.9999 52.2527 95.9999 48.0001C95.9999 43.7476 93.0506 40.1839 89.0858 39.243C85.6566 23.0749 72.9252 10.3435 56.7571 6.91426C55.8163 2.94943 52.2526 0 48 0C43.7474 0 40.1837 2.94943 39.2429 6.91426C23.0748 10.3435 10.3435 23.0749 6.91426 39.2429C2.94943 40.1837 0 43.7474 0 48Z" fill="#8DF7DB" />
            </mask>
            <g mask="url(#bc_mask0)">
                <circle cx="48" cy="48" r="48" fill="url(#bc_paint0_linear)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M52 17.0645C54.9634 15.5918 57 12.5337 57 9C57 4.02944 52.9706 0 48 0C43.0294 0 39 4.02944 39 9C39 12.5337 41.0365 15.5918 44 17.0645V23H52V17.0645Z" fill="#9DF3F9" />
                <path fillRule="evenodd" clipRule="evenodd" d="M44 78.9355C41.0366 80.4082 39 83.4663 39 87C39 91.9706 43.0294 96 48 96C52.9706 96 57 91.9706 57 87C57 83.4663 54.9634 80.4082 52 78.9355L52 73L44 73L44 78.9355Z" fill="#82EBF1" />
                <path fillRule="evenodd" clipRule="evenodd" d="M17.0645 44C15.5918 41.0366 12.5337 39 9 39C4.02944 39 -6.10673e-07 43.0294 -3.93402e-07 48C-1.76132e-07 52.9706 4.02944 57 9 57C12.5337 57 15.5918 54.9634 17.0645 52L23 52L23 44L17.0645 44Z" fill="#9DF3F9" />
                <g filter="url(#bc_filter0_f)">
                    <circle cx="48" cy="50" r="26" fill="black" fillOpacity="0.32" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M59.3172 54.0001C57.6698 58.6609 53.2249 62.0001 48 62.0001C41.3726 62.0001 36 56.6275 36 50.0001C36 43.3727 41.3726 38.0001 48 38.0001C53.2249 38.0001 57.6698 41.3394 59.3172 46.0001H80V54.0001H59.3172Z" fill="black" fillOpacity="0.32" />
                    <path d="M87 59.0001C82.0294 59.0001 78 54.9707 78 50.0001C78 45.0296 82.0294 41.0001 87 41.0001C91.9706 41.0001 96 45.0296 96 50.0001C96 54.9707 91.9706 59.0001 87 59.0001Z" fill="black" fillOpacity="0.32" />
                </g>
                <g filter="url(#bc_filter1_f)">
                    <circle cx="48" cy="48.38" r="26" fill="black" fillOpacity="0.24" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M59.3172 52.3801C57.6698 57.0409 53.2249 60.3801 48 60.3801C41.3726 60.3801 36 55.0075 36 48.3801C36 41.7527 41.3726 36.3801 48 36.3801C53.2249 36.3801 57.6698 39.7194 59.3172 44.3801H80V52.3801H59.3172Z" fill="black" fillOpacity="0.24" />
                    <path d="M87 57.3801C82.0294 57.3801 78 53.3507 78 48.3801C78 43.4096 82.0294 39.3801 87 39.3801C91.9706 39.3801 96 43.4096 96 48.3801C96 53.3507 91.9706 57.3801 87 57.3801Z" fill="black" fillOpacity="0.24" />
                </g>
                <circle cx="48" cy="48" r="26" fill="url(#bc_paint1_linear)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M59.3172 52.0001C57.6698 56.6609 53.2249 60.0001 48 60.0001C41.3726 60.0001 36 54.6275 36 48.0001C36 41.3727 41.3726 36.0001 48 36.0001C53.2249 36.0001 57.6698 39.3394 59.3172 44.0001H80V52.0001H59.3172Z" fill="url(#bc_paint2_linear)" />
                <path d="M87 57.0001C82.0294 57.0001 78 52.9707 78 48.0001C78 43.0296 82.0294 39.0001 87 39.0001C91.9706 39.0001 96 43.0296 96 48.0001C96 52.9707 91.9706 57.0001 87 57.0001Z" fill="url(#bc_paint3_linear)" />
            </g>
        </g>
    </svg>
);

const PowerShellIcon = ({ className }) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M23.181 2.974c.568 0 .923.463.792 1.035l-3.659 15.982c-.13.572-.697 1.035-1.265 1.035H.819c-.568 0-.923-.463-.792-1.035L3.686 4.009c.13-.572.697-1.035 1.265-1.035zm-8.375 9.346c.251-.394.227-.905-.09-1.243L9.122 5.125c-.38-.404-1.037-.407-1.466-.003-.429.402-.468 1.056-.088 1.46l4.662 4.96v.11l-7.42 5.374c-.45.327-.533.977-.187 1.453.346.476.991.597 1.44.27l8.229-5.91c.28-.196.438-.365.514-.52zm-2.796 4.399a.928.928 0 00-.934.923c0 .51.418.923.934.923h4.433a.928.928 0 00.934-.923.928.928 0 00-.934-.923z" />
    </svg>
);

const WindowsADIcon = ({ className }) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623" />
    </svg>
);

const Microsoft365Icon = ({ className }) => (
    <svg width="1em" height="1em" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 1h10v10H1z" fill="#F25022" />
        <path d="M12 1h10v10H12z" fill="#7FBA00" />
        <path d="M1 12h10v10H1z" fill="#00A4EF" />
        <path d="M12 12h10v10H12z" fill="#FFB900" />
    </svg>
);

export const stack = [
    { name: "Python", icon: <SiPython className="text-[#3776AB]" />, description: "Scripting y automatización de tareas complejas." },
    { name: "PowerShell", icon: <PowerShellIcon className="text-[#5391FE]" />, description: "Administración y automatización en entornos Windows." },
    { name: "Bash / Linux", icon: <SiGnubash className="text-[#4EAA25]" />, description: "Gestión de servidores y scripting en entornos Unix." },
    { name: "Admin M365", icon: <Microsoft365Icon />, description: "Gestión integral de tenants Microsoft 365." },
    { name: "Power Automate", icon: <PowerAutomateIcon />, description: "Creación de flujos de trabajo automatizados." },
    { name: "N8N", icon: <SiN8N className="text-[#EA4B71]" />, description: "Automatización de flujos de trabajo con integración de APIs." },
    { name: "Active Directory", icon: <WindowsADIcon className="text-[#0078D4]" />, description: "Gestión de identidades y accesos corporativos." },
    { name: "Dynamics 365", icon: <DynamicsIcon />, description: "Administración y personalización de soluciones ERP/CRM." },
    { name: "Business Central", icon: <BusinessCentralIcon />, description: "Gestión empresarial integral y finanzas." },
    { name: "GenAI Tools", icon: <SiOpenai className="text-[#10A37F]" />, description: "Integración de IA generativa en flujos de trabajo." }
];
