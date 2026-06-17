import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const DynamicTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Diccionario de títulos según la ruta
    const titles = {
      '/': 'Inicio - NexoPsico',
      '/servicios': 'Servicios - NexoPsico',
      '/terapia': 'Psicoterapia - NexoPsico',
      '/evaluaciones-psicologicas': 'Evaluaciones Psicológicas - NexoPsico',
      '/aptos-psicologicos': 'Aptos Psicológicos - NexoPsico',
      '/orientacion-vocacional': 'Orientación Vocacional - NexoPsico',
      '/supervisiones': 'Supervisiones - NexoPsico',
      '/trabajemos': 'Trabaja con nosotras - NexoPsico',
      '/programa': 'Programa de Bienestar - NexoPsico',
      '/contacto': 'Contacto - NexoPsico',
    };

    // Cambia el título de la pestaña. Si escriben una ruta rara, muestra "NexoPsico" por defecto.
    document.title = titles[pathname] || 'NexoPsico';
    
  }, [pathname]);

  return null; // No dibuja nada, solo hace el trabajo sucio en el navegador
};