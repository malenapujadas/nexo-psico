import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export const ActualizarPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const passwordSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordSegura.test(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return;
    }

    setCargando(true);
    try {
      // Supabase ya sabe quién sos gracias al radar que pusimos en el Home
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      alert("¡Contraseña actualizada con éxito!");
      navigate('/perfil');

    } catch (err) {
      setError(err.message || 'Hubo un error al actualizar la contraseña. Intentá pedir otro link.');
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-nexo-dark">
                Nueva Contraseña
              </label>
              <div className="relative mt-2">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={cargando}
                  className="block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset ring-nexo-sand/50 focus:ring-2 focus:ring-inset focus:ring-nexo-blue sm:text-sm sm:leading-6 text-nexo-dark"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-nexo-dark/40 hover:text-nexo-dark"
                >
                  {mostrarPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="flex w-full justify-center rounded-xl bg-nexo-dark px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-nexo-blue transition-all disabled:opacity-70"
            >
              {cargando ? 'Guardando...' : 'Guardar nueva contraseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};