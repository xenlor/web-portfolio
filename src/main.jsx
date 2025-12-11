import { StrictMode } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { inject } from '@vercel/analytics'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PerformanceProvider } from './context/PerformanceContext'

// Initialize Vercel Web Analytics
inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PerformanceProvider>
      <App />
      <SpeedInsights />
    </PerformanceProvider>
  </StrictMode>,
)
