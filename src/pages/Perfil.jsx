import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { supabase } from '../supabase';

export const Perfil = () => {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  // Estados para el cambio de contraseña interno
  const [mostrarFormClave, setMostrarFormClave] = useState(false);
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [cargandoClave, setCargandoClave] = useState(false);
  const [feedbackClave, setFeedbackClave] = useState({ tipo: '', mensaje: '' });
  const [mostrarOjito, setMostrarOjito] = useState(false);

  // Regex de Seguridad (la misma que en Auth)
  const passwordSegura = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // 🛡️ CIBERSEGURIDAD: Expulsar si no hay usuario
  useEffect(() => {
    if (!usuario) {
      navigate('/iniciar-sesion');
    }
  }, [usuario, navigate]);

  if (!usuario) return null; 

  const handleActualizarClave = async (e) => {
    e.preventDefault();
    setFeedbackClave({ tipo: '', mensaje: '' });

    const passwordLimpia = nuevaPassword.trim();

    if (!passwordSegura.test(passwordLimpia)) {
      setFeedbackClave({ 
        tipo: 'error', 
        mensaje: 'Debe tener al menos 8 caracteres, una mayúscula y un número.' 
      });
      return;
    }

    setCargandoClave(true);

    try {
      // 🔥 ACÁ ESTÁ LA MAGIA: Actualizamos directamente desde adentro
      const { error } = await supabase.auth.updateUser({
        password: passwordLimpia
      });

      if (error) throw error;

      setFeedbackClave({ 
        tipo: 'exito', 
        mensaje: '¡Tu contraseña se actualizó correctamente!' 
      });
      setNuevaPassword('');
      
      // Ocultamos el formulario después de 3 segundos
      setTimeout(() => {
        setMostrarFormClave(false);
        setFeedbackClave({ tipo: '', mensaje: '' });
      }, 3000);

    } catch (err) {
      setFeedbackClave({ tipo: 'error', mensaje: err.message });
    } finally {
      setCargandoClave(false);
    }
  };

  // Datos simulados de compras
  const misCuadernillos = []; 

  return (
    <div className="min-h-screen bg-nexo-bg pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Cabecera del Perfil */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-nexo-sand/30 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
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
            
            {/* Botones de Gestión (Alineados arriba a la derecha) */}
            <div className="flex flex-wrap md:flex-col gap-3 md:items-end">
              <button 
                onClick={() => setMostrarFormClave(!mostrarFormClave)}
                className="px-4 py-2.5 text-xs font-semibold text-nexo-dark bg-nexo-bg rounded-xl hover:bg-nexo-sand/40 transition-all border border-nexo-sand/30"
              >
                {mostrarFormClave ? 'Cancelar cambio' : 'Cambiar Contraseña'}
              </button>
              <button 
                onClick={cerrarSesion}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Formulario Desplegable para cambiar clave */}
          {mostrarFormClave && (
            <div className="mt-8 pt-6 border-t border-nexo-sand/30 animate-fade-in-up">
              <h3 className="text-sm font-bold text-nexo-dark mb-4">Ingresá tu nueva contraseña</h3>
              <form onSubmit={handleActualizarClave} className="max-w-sm" noValidate>
                <div className="relative mb-3">
                  <input
                    type={mostrarOjito ? "text" : "password"}
                    value={nuevaPassword}
                    onChange={(e) => {
                      setNuevaPassword(e.target.value);
                      if (feedbackClave.tipo === 'error') setFeedbackClave({ tipo: '', mensaje: '' });
                    }}
                    disabled={cargandoClave}
                    placeholder="••••••••"
                    className={`block w-full rounded-xl border-0 py-2.5 pl-4 pr-12 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors
                      ${feedbackClave.tipo === 'error' 
                        ? 'ring-red-500 focus:ring-red-500 text-red-900 bg-red-50/30' 
                        : 'text-nexo-dark ring-nexo-sand/50 focus:ring-nexo-blue'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarOjito(!mostrarOjito)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-nexo-dark/40 hover:text-nexo-dark focus:outline-none"
                  >
                    {mostrarOjito ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>

                {/* Feedback */}
                {feedbackClave.mensaje && (
                  <p className={`text-sm mb-3 flex items-center gap-1 ${feedbackClave.tipo === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {feedbackClave.tipo === 'error' ? '⚠️' : '✅'} {feedbackClave.mensaje}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cargandoClave || !nuevaPassword.trim()}
                  className="w-full justify-center rounded-xl bg-nexo-dark px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-nexo-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cargandoClave ? 'Guardando...' : 'Guardar nueva contraseña'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Sección de Materiales Adquiridos */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-nexo-sand/30 animate-fade-in-up delay-100">
          <h2 className="text-xl font-bold text-nexo-dark mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-nexo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Mis Cuadernillos Descargables
          </h2>

          {misCuadernillos.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-nexo-sand/40 rounded-2xl">
              <svg className="w-12 h-12 text-nexo-dark/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-nexo-dark/60 font-medium mb-2">Todavía no adquiriste ningún material</p>
              <p className="text-xs text-nexo-dark/40 max-w-sm mx-auto">Cuando compres un cuadernillo en nuestro catálogo, vas a poder descargarlo en formato PDF directamente desde acá las veces que quieras.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {/* Mapeo futuro de compras */}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};