import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

// 1. Creamos el satélite (Contexto)
const AuthContext = createContext({});

// 2. Creamos el Proveedor (Provider) que va a envolver a toda nuestra app
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoCtx, setCargandoCtx] = useState(true);

  useEffect(() => {
    // Apenas carga la app, le preguntamos a Supabase si hay una sesión activa guardada
    const obtenerSesionInicial = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user ?? null);
      setCargandoCtx(false);
    };

    obtenerSesionInicial();

    // 🛡️ CIBERSEGURIDAD: Dejamos un "escucha" activo. 
    // Si el usuario inicia sesión, cierra sesión o expira su token, esto se ejecuta al instante.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
      setCargandoCtx(false);
    });

    // Limpieza del escucha cuando el componente se destruye
    return () => subscription.unsubscribe();
  }, []);

  // Función global para cerrar sesión de forma segura en Supabase
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ usuario, cargandoCtx, cerrarSesion }}>
      {!cargandoCtx && children}
    </AuthContext.Provider>
  );
};

// 3. Creamos un Hook personalizado para usar este contexto de forma ultra rápida
export const useAuth = () => useContext(AuthContext);