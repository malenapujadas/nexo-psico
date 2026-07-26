import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const navigate = useNavigate();
  const [vista, setVista] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false); 
  
  const [error, setError] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // Expresión regular actualizada para permitir caracteres especiales
  const passwordSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(''); 
    setErrorEmail('');
    setErrorPassword('');
    setMensajeExito('');

    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpia = password.trim();

    let hayErrores = false;

    if (!emailLimpio) {
      setErrorEmail('Es obligatorio ingresar un correo válido.');
      hayErrores = true;
    }
    
    if (vista !== 'recuperar' && !passwordLimpia) {
      setErrorPassword('Es obligatorio ingresar una contraseña.');
      hayErrores = true;
    }

    if (hayErrores) return;

    setCargando(true); 

    try {
      if (vista === 'recuperar') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailLimpio, {
          //le decimos a q ruta ir
          redirectTo: `${window.location.origin}/#/actualizar-password`
        });
        if (resetError) throw resetError;
        setMensajeExito('Si el correo está registrado, te enviamos un enlace seguro. Revisá tu carpeta de Spam.');
      }
      else if (vista === 'registro') {
        if (!passwordSegura.test(password)) {
          setError('La contraseña no cumple con los requisitos de seguridad.');
          setCargando(false);
          return;
        }
        
        // 1. Guardamos la 'data' además del 'error'
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: emailLimpio,
          password: password,
        });
        
        if (signUpError) throw signUpError;

        // 2. NUEVA VALIDACIÓN GLOBAL: Revisamos si el correo ya existía en la base
        if (data?.user?.identities?.length === 0) {
          setError('Este correo ya se encuentra registrado. Por favor, iniciá sesión o recuperá tu contraseña.');
          setCargando(false);
          return;
        }

        setMensajeExito('¡Cuenta creada con éxito! Por favor, revisá tu correo para validar tu identidad.');
      } 
      else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: emailLimpio,
          password: password,
        });
        if (signInError) throw new Error('Correo o contraseña incorrectos.');
        navigate('/perfil');
      }
    } catch (err) {
      console.error("Error de Auth:", err.message);
      setError(err.message || 'Ocurrió un error. Por favor intentá de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setError('');
    setErrorEmail('');
    setErrorPassword('');
    setMensajeExito('');
    setPassword('');
    setMostrarPassword(false); 
  };

  return (
    <div className="min-h-screen bg-nexo-bg flex flex-col justify-center py-12 px-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-nexo-dark">
          {vista === 'login' && 'Iniciar sesión'}
          {vista === 'registro' && 'Crear una cuenta'}
          {vista === 'recuperar' && 'Recuperar contraseña'}
        </h2>
        <p className="mt-2 text-center text-sm text-nexo-dark/70">
          {vista === 'recuperar' 
            ? 'Ingresá tu correo y te enviaremos las instrucciones'
            : 'Para acceder a tus cuadernillos descargables'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-nexo-sand/30 rounded-2xl sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-nexo-dark">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorEmail) setErrorEmail('');
                  }}
                  disabled={cargando}
                  className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 transition-colors
                    ${errorEmail 
                      ? 'ring-red-500 focus:ring-red-500 text-red-900 bg-red-50/30' 
                      : 'text-nexo-dark ring-nexo-sand/50 focus:ring-nexo-blue'}`}
                  placeholder="hola@ejemplo.com"
                />
              </div>
              {errorEmail && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {errorEmail}
                </p>
              )}
            </div>

            {vista !== 'recuperar' && (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-nexo-dark">
                    Contraseña
                  </label>
                  {vista === 'login' && (
                    <button type="button" onClick={() => cambiarVista('recuperar')} className="text-sm font-medium text-nexo-blue hover:text-nexo-dark">
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                
                <div className="relative mt-2">
                  <input
                    id="password"
                    type={mostrarPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorPassword) setErrorPassword(''); 
                    }}
                    disabled={cargando}
                    className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 transition-colors
                      ${errorPassword 
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

                {errorPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {errorPassword}
                  </p>
                )}

                {vista === 'registro' && !errorPassword && (
                  <p className="mt-2 text-xs text-nexo-dark/60 font-medium">
                    La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}
            {mensajeExito && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg flex items-center gap-2 border border-green-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {mensajeExito}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={cargando}
                className="flex w-full justify-center rounded-xl bg-nexo-dark px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-nexo-blue transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {cargando ? 'Procesando...' : 
                 vista === 'login' ? 'Ingresar' : 
                 vista === 'registro' ? 'Registrarme de forma segura' : 
                 'Enviar enlace de recuperación'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2">
            {vista === 'recuperar' ? (
              <button onClick={() => cambiarVista('login')} className="text-sm font-medium text-nexo-blue hover:text-nexo-dark underline decoration-nexo-blue/30 underline-offset-4">
                Volver a Iniciar Sesión
              </button>
            ) : (
              <button onClick={() => cambiarVista(vista === 'login' ? 'registro' : 'login')} className="text-sm font-medium text-nexo-dark transition-colors focus:outline-none">
                {vista === 'login' ? (
                  <>¿No tenés cuenta? <span className="text-nexo-blue underline decoration-nexo-blue/30 hover:text-nexo-dark underline-offset-4">Registrate acá</span></>
                ) : (
                  <>¿Ya tenés cuenta? <span className="text-nexo-blue underline decoration-nexo-blue/30 hover:text-nexo-dark underline-offset-4">Iniciá sesión</span></>
                )}
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};