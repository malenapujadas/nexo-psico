import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export const ActualizarPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  // estados de feedback
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const passwordSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  // funcion para traducir los errores de la bd
  const traducirError = (mensajeIngles) => {
    if (mensajeIngles.includes('New password should be different')) {
      return 'La nueva contraseña tiene que ser distinta a la que ya venías usando.';
    }
    if (mensajeIngles.includes('Auth session missing')) {
      return 'La sesión expiró o el link ya se usó. Por favor, volvé a pedir un enlace de recuperación.';
    }
    if (mensajeIngles.includes('Token has expired or is invalid')) {
      return 'El link que usaste ya expiró o es inválido. Pedí uno nuevo.';
    }
    if (mensajeIngles.includes('User not found')) {
      return 'No encontramos ninguna cuenta vinculada a esta solicitud.';
    }
    // mensaje de error x default
    return 'Ocurrió un error al actualizar la contraseña. Por favor, intentá de nuevo.';
  };

  useEffect(() => {
    const atraparToken = async () => {
      const hash = window.location.hash;
      if (hash.includes('access_token=')) {
        const tokenString = hash.substring(hash.indexOf('access_token='));
        const params = new URLSearchParams(tokenString);
        
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        
        if (access_token && refresh_token) {
          await supabase.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token
          });
          navigate('/actualizar-password', { replace: true });
        }
      }
    };

    atraparToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    if (!passwordSegura.test(password)) {
      setError('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }

    setCargando(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setMensajeExito('¡Contraseña actualizada con éxito! Redirigiendo a tu perfil...');
      
      setTimeout(() => {
        navigate('/perfil');
      }, 2500);

    } catch (err) {
      // traductor
      setError(traducirError(err.message));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexo-bg flex flex-col justify-center py-12 px-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-nexo-dark">
          Crear nueva contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-nexo-dark/70">
          Ingresá tu nueva clave para acceder a tu cuenta.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-nexo-sand/30 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-nexo-dark">
                Nueva Contraseña
              </label>
              
              <div className="relative mt-2">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={cargando || mensajeExito !== ''}
                  className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 transition-colors
                    ${error 
                      ? 'ring-red-500 focus:ring-red-500 text-red-900 bg-red-50/30' 
                      : 'text-nexo-dark ring-nexo-sand/50 focus:ring-nexo-blue'}`}
                  placeholder="••••••••"
                />
                
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-nexo-dark/40 hover:text-nexo-dark focus:outline-none transition-colors"
                >
                  {mostrarPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>

              {!error && !mensajeExito && (
                <p className="mt-2 text-xs text-nexo-dark/60 font-medium">
                  La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}

            {mensajeExito && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg flex items-center gap-2 border border-green-100 animate-fade-in-up">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {mensajeExito}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando || mensajeExito !== ''}
              className="flex w-full justify-center rounded-xl bg-nexo-dark px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-nexo-blue transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {cargando ? 'Guardando...' : (mensajeExito ? 'Redirigiendo...' : 'Guardar nueva contraseña')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};