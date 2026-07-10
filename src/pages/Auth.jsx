import React, { useState } from 'react';
import { supabase } from '../supabase';

export const Auth = () => {
  // Manejamos 3 estados: 'login', 'registro', o 'recuperar'
  const [vista, setVista] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de feedback
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // Regex de Seguridad
  const passwordSegura = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setMensajeExito('');
    setCargando(true); 

    const emailLimpio = email.trim().toLowerCase();

    try {
      if (vista === 'recuperar') {
        // 1. Conexión Real: Recuperar contraseña
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailLimpio);
        if (resetError) throw resetError;
        
        setMensajeExito('Si el correo está registrado, te enviamos un enlace seguro. Revisá tu carpeta de Spam.');
      } 
      else if (vista === 'registro') {
        if (!passwordSegura.test(password)) {
          setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
          setCargando(false);
          return;
        }
        
        // 2. Conexión Real: Registrar nuevo usuario
        const { error: signUpError } = await supabase.auth.signUp({
          email: emailLimpio,
          password: password,
        });
        if (signUpError) throw signUpError;

        setMensajeExito('¡Cuenta creada con éxito! Por favor, revisá tu correo para validar tu identidad.');
      } 
      else {
        // 3. Conexión Real: Iniciar Sesión
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: emailLimpio,
          password: password,
        });
        
        if (signInError) throw new Error('Correo o contraseña incorrectos.');
        
        alert("¡Login exitoso! Ya estás conectada.");
        // Acá más adelante la redirigiremos al panel de "Mis Compras"
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
    setMensajeExito('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-nexo-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
        <div className="bg-white py-8 px-4 shadow-sm border border-nexo-sand/30 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Campo Email (Visible en todas las vistas) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-nexo-dark">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={cargando}
                  className="block w-full rounded-xl border-0 py-3 px-4 text-nexo-dark shadow-sm ring-1 ring-inset ring-nexo-sand/50 focus:ring-2 focus:ring-inset focus:ring-nexo-blue sm:text-sm sm:leading-6 disabled:opacity-50"
                  placeholder="hola@ejemplo.com"
                />
              </div>
            </div>

            {/* Campo Contraseña (Oculto en recuperación) */}
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
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    required={vista !== 'recuperar'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={cargando}
                    className="block w-full rounded-xl border-0 py-3 px-4 text-nexo-dark shadow-sm ring-1 ring-inset ring-nexo-sand/50 focus:ring-2 focus:ring-inset focus:ring-nexo-blue sm:text-sm sm:leading-6 disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Mensajes de Error y Éxito */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}
            {mensajeExito && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg flex items-center gap-2">
                ✅ {mensajeExito}
              </div>
            )}

            {/* Botón Principal Dinámico */}
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

          {/* Enlaces inferiores */}
          <div className="mt-6 flex flex-col items-center gap-2">
            {vista === 'recuperar' ? (
              <button onClick={() => cambiarVista('login')} className="text-sm font-medium text-nexo-blue hover:text-nexo-dark">
                Volver a Iniciar Sesión
              </button>
            ) : (
              <button onClick={() => cambiarVista(vista === 'login' ? 'registro' : 'login')} className="text-sm font-medium text-nexo-dark hover:text-nexo-dark transition-colors">
                {vista === 'login' ? '¿No tenés cuenta? Registrate acá' : '¿Ya tenés cuenta? Iniciá sesión'}
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};