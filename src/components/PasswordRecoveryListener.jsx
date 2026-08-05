import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

// Escucha el evento de recuperación de contraseña en un lugar que siempre está
// montado (fuera de <Routes>). Con HashRouter, el link que manda Supabase trae
// el token en un hash que no matchea ninguna ruta (ej. "#access_token=..."),
// así que si este listener viviera dentro de una página como Home, nunca
// llegaría a dispararse porque esa página no se monta.
export const PasswordRecoveryListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/actualizar-password');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return null;
};
