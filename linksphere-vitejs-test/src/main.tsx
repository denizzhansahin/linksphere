import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/* App bileşeni artık context'e erişebilir */}
      <App />

  </StrictMode>
);
