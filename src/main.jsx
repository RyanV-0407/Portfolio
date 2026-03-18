import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { NotFound } from './pages/NotFound.jsx';

const Router = () => {
  const path = window.location.pathname;

  if (path === '/') return <App />;
  return <NotFound />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
