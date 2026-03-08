import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SdcPrivacyPolicy from './pages/SdcPrivacyPolicy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sdcprivacypolicy" element={<SdcPrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
