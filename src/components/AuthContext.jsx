import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

// 1. Creamos el satélite (Contexto)
const AuthContext = createContext({});

// 2. Creamos el Proveedor (Provider) que va a envolver a toda nuestra app
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [cargandoCtx, setCargandoCtx] = useState(true);

  // Consulta el rol del usuario en la tabla de perfiles (no confiamos en nada guardado en el cliente)
  const verificarRolAdmin = async (userId) => {
    if (!userId) {
      setEsAdmin(false);
      return;
    }
    const { data: perfil, error } = await supabase
      .from('perfiles_clientes')
      .select('rol')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error al verificar rol de usuario:', error.message);
    }
    setEsAdmin(perfil?.rol === 'admin');
  };

  useEffect(() => {
    // Apenas carga la app, le preguntamos a Supabase si hay una sesión activa guardada
    const obtenerSesionInicial = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user ?? null);
      setCargandoCtx(false);
      verificarRolAdmin(session?.user?.id);
    };

    obtenerSesionInicial();

    // 🛡️ CIBERSEGURIDAD: Dejamos un "escucha" activo.
    // Si el usuario inicia sesión, cierra sesión o expira su token, esto se ejecuta al instante.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
      setCargandoCtx(false);
      verificarRolAdmin(session?.user?.id);
    });

    // Limpieza del escucha cuando el componente se destruye
    return () => subscription.unsubscribe();
  }, []);

  // Función global para cerrar sesión de forma segura en Supabase
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, cargandoCtx, cerrarSesion }}>
      {!cargandoCtx && children}
    </AuthContext.Provider>
  );
};

// 3. Creamos un Hook personalizado para usar este contexto de forma ultra rápida
export const useAuth = () => useContext(AuthContext);