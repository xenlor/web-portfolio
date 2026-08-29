import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PerformanceProvider } from './context/PerformanceContext'

// Se quitaron @vercel/analytics y @vercel/speed-insights el 29/08/2026: la web
// dejo de estar en Vercel y se autoaloja en el homelab (nginx en el LXC 114),
// asi que esos scripts se cargaban contra un servicio que ya no se usa.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </StrictMode>,
)
