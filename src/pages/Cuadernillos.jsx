import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export const Cuadernillos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [comprandoId, setComprandoId] = useState(null);
  const [mostrarErrorLogin, setMostrarErrorLogin] = useState(false);
  
  //memoria para guardar los cuadernillos que ya se compraron
  const [cuadernillosComprados, setCuadernillosComprados] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // traigo productos del back
        const respuesta = await fetch('https://nexo-psico-backend.onrender.com/api/productos');
        const datos = await respuesta.json();
        setProductos(datos.filter(producto => producto.activo !== false));

        // reviso si hay alguien logueado para chequear sus compras
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: compras } = await supabase
            .from('compras')
            .select('producto_id')
            .eq('cliente_id', session.user.id)
            .eq('estado_pago', 'completado');

          if (compras) {
            // guardo solo los id
            const idsComprados = compras.map(compra => compra.producto_id);
            setCuadernillosComprados(idsComprados);
          }
        }
      } catch (error) {
        console.error("Hubo un error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const manejarCompra = async (producto) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setMostrarErrorLogin(true);
        setTimeout(() => {
          setMostrarErrorLogin(false);
          navigate('/iniciar-sesion');
        }, 7000);
        return; 
      }

      setComprandoId(producto.id);

      const { data, error } = await supabase.functions.invoke('crear-pago', {
        body: { 
          titulo: producto.title,
          precio: Number(producto.price),
          usuario_id: session.user.id,
          producto_id: producto.id
        }
      });

      if (error) throw error;
      if (data && data.sandbox_init_point) window.location.href = data.sandbox_init_point;

    } catch (error) {
      console.error('Error al conectar con Mercado Pago:', error);
      alert('Hubo un problema al generar el pago. Intentá de nuevo más tarde.');
      setComprandoId(null);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 flex justify-center items-center">
        <p className="text-xl text-nexo-dark animate-pulse">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="max-w-3xl mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="text-sm font-bold text-nexo-green uppercase tracking-widest mb-4">
            Nuestros Materiales
          </h2>
          <h1 className="text-3xl md:text-5xl font-semibold text-nexo-dark mb-6">
            Materiales Descargables
          </h1>
          <p className="text-lg text-nexo-dark/80 leading-relaxed">
            Herramientas prácticas diseñadas por nuestro equipo para acompañarte en tu desarrollo personal y profesional, estés donde estés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {productos.map((producto) => {
            // chequeo si el id esta en el listado de compras
            const yaComprado = cuadernillosComprados.includes(producto.id);

            return (
              <div 
                key={producto.id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-nexo-sand/30 flex flex-col group animate-fade-in-up"
              >
                <div className="w-full aspect-[4/3] bg-nexo-sand/20 relative overflow-hidden flex items-center justify-center">
                  {producto.image_url ? (
                    <img 
                      src={producto.image_url} 
                      alt={`Portada de ${producto.title}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-nexo-dark/40 italic text-sm">Espacio para imagen</span>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-nexo-blue tracking-wide uppercase shadow-sm">
                    {producto.tipo || 'PDF'}
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-nexo-dark mb-4 leading-tight">
                    {producto.title}
                  </h3>
                  
                  <p className="text-nexo-dark/70 text-base leading-relaxed mb-8 flex-grow">
                    {producto.description}
                  </p>
                  
                  <div className="flex flex-col gap-6 mt-auto pt-6 border-t border-nexo-sand/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-nexo-dark/60 uppercase tracking-wide flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Archivo PDF
                      </span>
                      <span className="text-3xl font-bold text-nexo-dark">
                        ${Number(producto.price).toLocaleString('es-AR')}
                      </span>
                    </div>
                    
                    {/* Botón Dinámico: Cambia si ya lo compró */}
                    <button 
                      onClick={() => yaComprado ? navigate('/perfil') : manejarCompra(producto)}
                      disabled={comprandoId === producto.id}
                      className={`w-full text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 transform disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                        ${yaComprado 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-nexo-dark hover:bg-nexo-blue group-hover:-translate-y-1'}`}
                    >
                      {comprandoId === producto.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Conectando...
                        </>
                      ) : yaComprado ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Material adquirido (Ir a Perfil)
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          Adquirir cuadernillo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-up de error visual */}
      {mostrarErrorLogin && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md transition-all duration-300">
          <div className="bg-red-50 border border-red-300 shadow-2xl rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-full flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="text-red-800 font-bold text-sm md:text-base mb-1">Iniciá sesión primero</h4>
              <p className="text-red-600/90 text-xs md:text-sm leading-relaxed mb-2">
                Para poder comprar y que el material quede guardado en tu cuenta, es necesario que te registres o inicies sesión.
              </p>
              <p className="text-red-800 font-semibold text-xs animate-pulse">
                ⏳ Redirigiendo a inicio de sesión...
              </p>
            </div>
            <button 
              onClick={() => {
                setMostrarErrorLogin(false);
                navigate('/iniciar-sesion');
              }}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};