import React, { useState, useEffect } from 'react';

export const Cuadernillos = () => {
  // 1. Creamos la "memoria" del componente
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 2. El "cadete" que va a buscar los datos al Backend cuando carga la página
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Hacemos el pedido a nuestro propio servidor Node.js
        const respuesta = await fetch('https://nexo-psico-backend.onrender.com/api/productos');
        const datos = await respuesta.json();
        
        // Guardamos los datos reales que vinieron de Supabase
        setProductos(datos);
      } catch (error) {
        console.error("Hubo un error al traer los productos:", error);
      } finally {
        // Ya terminamos de buscar, dejamos de mostrar el estado de "cargando"
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []); // Los corchetes vacíos significan: "Hacé esto solo una vez al inicio"

  // Pantalla de carga mientras esperamos al servidor
  if (cargando) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 flex justify-center items-center">
        <p className="text-xl text-nexo-dark animate-pulse">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-semibold text-nexo-dark mb-6">
            Materiales Descargables
          </h1>
          <p className="text-lg text-nexo-dark/80 leading-relaxed">
            Herramientas prácticas diseñadas por nuestro equipo para acompañarte en tu desarrollo personal y profesional, estés donde estés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* 3. Ahora recorremos los productos reales que trajimos de la base de datos */}
          {productos.map((producto) => (
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
                  {producto.tipo}
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
                  
                  {/* Botón preparado para Mercado Pago más adelante */}
                  <button className="w-full bg-nexo-dark text-white py-4 rounded-xl font-semibold text-lg hover:bg-nexo-blue transition-all duration-300 shadow-md flex items-center justify-center gap-2 transform group-hover:-translate-y-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Adquirir cuadernillo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};