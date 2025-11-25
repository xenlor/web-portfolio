import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const socials = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/xenlor' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/esteban-castillo-loren-595652303/' },
];

export const education = [
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
        degree: "Grado Medio SMR",
        institution: "Sistemas Microinformáticos y Redes"
    }
];

export const projects = [
    {
        id: 1,
        title: "IDS IoT con Machine Learning",
        category: "Ciberseguridad & IA",
        description: "Sistema de detección de intrusiones para IoT desplegado en Raspberry Pi. Utiliza un modelo Random Forest entrenado con el dataset CICIoT2023 para clasificar tráfico en tiempo real, con un dashboard en Grafana para visualización de amenazas.",
        tech: ["Python", "Scikit-learn", "Raspberry Pi", "Grafana", "InfluxDB", "Suricata"],
        link: "https://github.com/xenlor/ids-iot-ml"
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

export const stack = [
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
