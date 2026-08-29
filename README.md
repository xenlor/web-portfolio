# web-portfolio

Portfolio personal de Esteban Castillo (xenlor), técnico de sistemas y
ciberseguridad. Publicado en [xenlor.dev](https://xenlor.dev).

## Stack

React 19 con Vite 7, Tailwind 3.4 y Framer Motion para las animaciones. Los
iconos son de Lucide, salvo los de marca, que van como SVG en línea en
`src/components/ui/IconosMarca.jsx` para no arrastrar una librería entera por
ocho rutas.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila a dist/
npm run lint
```

## Despliegue

La web se autoaloja en un contenedor propio con nginx, detrás de un proxy
inverso que pone el TLS. `scripts/deploy.sh` compila, empaqueta y sube:

```bash
bash scripts/deploy.sh
```

El destino se puede cambiar con las variables `DEPLOY_HOST` y `DEPLOY_CT`.

## Estructura

```
src/
├── components/     # secciones de la página y piezas de UI
├── data/           # el contenido: experiencia, formación, proyectos, stack
├── context/        # modo rendimiento
├── hooks/          # detección de aceleración por hardware
├── App.jsx         # composición y navegación
└── index.css       # estilos globales y capas de fondo
```

Casi todo lo que hay que tocar para actualizar la página vive en
`src/data/data.jsx`.

## Contacto

- contacto@xenlor.dev
- [GitHub](https://github.com/xenlor)
- [LinkedIn](https://www.linkedin.com/in/esteban-castillo-loren-595652303/)
