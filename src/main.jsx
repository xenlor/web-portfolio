import { StrictMode } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PerformanceProvider } from './context/PerformanceContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PerformanceProvider>
      <App />
      <SpeedInsights />
    </PerformanceProvider>
  </StrictMode>,
)
