import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// SERVICE WORKER KAYIT İŞLEMİ
// Tarayıcı bu teknolojiyi destekliyor mu diye kontrol ediyoruz
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker başarıyla arka plana yerleştirildi!', registration);
      })
      .catch(err => {
        console.log('❌ Service Worker kaydı başarısız:', err);
      });
  });
}
