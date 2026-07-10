import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { supabase } from '../supabase';

export const Perfil = () => {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  // CIBERSEGURIDAD: Si no hay usuario logueado, lo expulsamos al login
  useEffect(() => {
    if (!usuario) {
      navigate('/iniciar-sesion'); // Ajustá esta ruta según tu App.jsx
    }
  }, [usuario, navigate]);

  if (!usuario) return null; // Evita un "parpadeo" visual de la página antes de redirigir

  const handleRestablecerClave = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(usuario.email);
      if (error) throw error;
      alert(`Te enviamos un correo seguro a ${usuario.email} para cambiar tu contraseña.`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Datos simulados de compras por ahora (luego vendrán de la base de datos)
  const misCuadernillos = []; 

  return (
    <div className="min-h-screen bg-nexo-bg pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Cabecera del Perfil */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-nexo-sand/30 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-nexo-blue tracking-wide uppercase bg-nexo-sand/20 px-3 py-1 rounded-full">
                Cuenta Verificada
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-nexo-dark mt-3">
                Mi Perfil
              </h1>
              <p className="text-nexo-dark/70 text-sm mt-1">
                Conectada como: <span className="font-semibold text-nexo-dark">{usuario.email}</span>
              </p>
            </div>
            
            {/* Botones de Gestión de Cuenta */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleRestablecerClave}
                className="px-4 py-2.5 text-xs font-semibold text-nexo-dark bg-nexo-bg rounded-xl hover:bg-nexo-sand/40 transition-all border border-nexo-sand/30"
              >
                Cambiar Contraseña
              </button>
              <button 
                onClick={cerrarSesion}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Materiales Adquiridos */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-nexo-sand/30 animate-fade-in-up delay-100">
          <h2 className="text-xl font-bold text-nexo-dark mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-nexo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Mis Cuadernillos Descargables
          </h2>

          {misCuadernillos.length === 0 ? (
            // Estado vacío (UX: Qué pasa si todavía no compró nada)
            <div className="text-center py-12 border-2 border-dashed border-nexo-sand/40 rounded-2xl">
              <svg className="w-12 h-12 text-nexo-dark/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-nexo-dark/60 font-medium mb-2">Todavía no adquiriste ningún material</p>
              <p className="text-xs text-nexo-dark/40 max-w-sm mx-auto">Cuando compres un cuadernillo en nuestro catálogo, vas a poder descargarlo en formato PDF directamente desde acá las veces que quieras.</p>
            </div>
          ) : (
            // Lista de cuadernillos comprados (La armaremos cuando tengamos la BD de compras)
            <div className="grid grid-cols-1 gap-4">
              {/* Mapeo futuro de compras */}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};