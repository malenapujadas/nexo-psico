import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  // useLocation nos avisa en qué ruta estamos parados actualmente
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambia el pathname, le decimos a la ventana que haga scroll a (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no dibuja nada en pantalla, es puro comportamiento
  return null;
};