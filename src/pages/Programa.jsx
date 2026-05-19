import React, { useRef, useState } from 'react';

export const Programa = () => {
  // Lógica para el carrusel de soluciones en mobile
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sincronizar los puntitos con el scroll manual del usuario
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
      // Multiplicamos por 3 porque hay 4 elementos (índices del 0 al 3)
      const index = Math.min(Math.round(scrollPercentage * 3), 3);
      if (!isNaN(index) && index >= 0) {
        setActiveIndex(index);
      }
    }
  };

  // Mover con las flechas
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Ir directo al tocar un puntito
  const scrollToTarget = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = (maxScroll / 3) * index;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32">
      
      {/* 1. HERO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-20 md:mb-32 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-nexo-dark mb-6 leading-tight">
          Recuperá el <span className="font-medium">mando</span> de tu vida: <br className="hidden md:block"/>
          <span className="font-medium">Programa de Bienestar Mental.</span>
        </h1>
        <p className="text-lg text-nexo-dark/80 leading-relaxed max-w-2xl">
          Un <strong>acompañamiento</strong> de <strong>8 semanas</strong> para salir del piloto automático, <strong>reducir</strong> el <strong>estrés</strong> y construir un <strong>bienestar</strong> que realmente puedas sostener.
        </p>
      </section>

      {/* 2. EL DOLOR (Identificación) */}
      <section className="w-full bg-nexo-sand/20 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-4 items-start md:items-end md:pr-10">
            <div className="bg-white border border-nexo-sand/50 px-6 py-3 rounded-full shadow-sm text-sm md:text-base text-nexo-dark font-medium transform transition hover:-translate-y-1">
              ¿Sentís que el trabajo avanza más rápido que vos?
            </div>
            <div className="bg-white border border-nexo-sand/50 px-6 py-3 rounded-full shadow-sm text-sm md:text-base text-nexo-dark font-medium transform transition hover:-translate-y-1">
              ¿Tu rendimiento es alto, pero a un costo muy caro?
            </div>
            <div className="bg-white border border-nexo-sand/50 px-6 py-3 rounded-full shadow-sm text-sm md:text-base text-nexo-dark font-medium transform transition hover:-translate-y-1">
              ¿Vivís en un estado de alerta que te agota?
            </div>
            <div className="bg-white border border-nexo-sand/50 px-6 py-3 rounded-full shadow-sm text-sm md:text-base text-nexo-dark font-medium transform transition hover:-translate-y-1">
              ¿Te cuesta frenar sin sentir culpa?
            </div>
          </div>

          <div>
            <p className="text-lg md:text-xl text-nexo-dark/80 leading-relaxed mb-6">
              A veces, el éxito tiene un costo demasiado alto. Si te <strong>cuesta descansar</strong> sin sentir culpa o sentís que tu <strong>energía</strong> se <strong>agota</strong> en urgencias ajenas, no estás fallando: estás <strong>saturada/o</strong>.
            </p>
            <p className="text-lg md:text-xl text-nexo-dark/80 leading-relaxed">
              El agotamiento físico y la desconexión emocional son señales de que el <strong>equilibrio</strong> se ha <strong>roto</strong>. Pero <strong>no tiene por qué ser así</strong>.
            </p>
          </div>

        </div>
        
        <div className="flex justify-center mt-16 md:mt-24">
          <svg className="w-8 h-8 text-nexo-dark/30 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 3. LA SOLUCIÓN */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-8 leading-tight">
            Volver a habitar tu<br />presente con claridad
          </h2>
          <p className="text-lg text-nexo-dark/80 leading-relaxed mb-6">
            No se trata de trabajar menos, sino de trabajar y vivir de una manera que <strong>no te desgaste</strong>.
          </p>
          <p className="text-lg text-nexo-dark/80 leading-relaxed mb-6">
            Imaginá un día a día donde puedas poner <strong>límites</strong> sin miedo, organizar tu tiempo desde la <strong>calma</strong> y recuperar la <strong>energía</strong> para disfrutar de lo que realmente importa.
          </p>
          <p className="text-lg text-nexo-dark/80 leading-relaxed">
            El <strong>equilibrio</strong> no es un ideal inalcanzable; es una habilidad que se entrena.
          </p>
        </div>

        {/* Carrusel en Mobile / Grilla en Desktop con Controles */}
        <div className="relative w-full">
          
          {/* Flecha Izquierda (Solo Mobile) */}
          <button
            onClick={() => scroll('left')}
            className="md:hidden absolute -left-2 top-[35%] -translate-y-1/2 z-10 bg-white border border-nexo-sand/30 p-2 rounded-full shadow-md text-nexo-blue focus:outline-none"
            aria-label="Ver anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Flecha Derecha (Solo Mobile) */}
          <button
            onClick={() => scroll('right')}
            className="md:hidden absolute -right-2 top-[35%] -translate-y-1/2 z-10 bg-white border border-nexo-sand/30 p-2 rounded-full shadow-md text-nexo-blue focus:outline-none"
            aria-label="Ver siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* AQUÍ ESTÁ EL CAMBIO: Reemplazamos px-6 por px-[10%] para un centrado matemático perfecto */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-[10%] md:mx-0 md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="text-center flex-none w-[80%] md:w-auto snap-center">
              <div className="w-16 h-16 bg-nexo-sand/30 rounded-full mx-auto mb-4 flex items-center justify-center text-nexo-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <p className="text-sm font-medium text-nexo-dark/80">Proceso psicológico y práctico, adaptado a tu realidad.</p>
            </div>
            <div className="text-center flex-none w-[80%] md:w-auto snap-center">
              <div className="w-16 h-16 bg-nexo-sand/30 rounded-full mx-auto mb-4 flex items-center justify-center text-nexo-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-sm font-medium text-nexo-dark/80">Combinamos la clínica con herramientas de acción.</p>
            </div>
            <div className="text-center flex-none w-[80%] md:w-auto snap-center">
              <div className="w-16 h-16 bg-nexo-sand/30 rounded-full mx-auto mb-4 flex items-center justify-center text-nexo-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-sm font-medium text-nexo-dark/80">8 semanas de acompañamiento profesional.</p>
            </div>
            <div className="text-center flex-none w-[80%] md:w-auto snap-center">
              <div className="w-16 h-16 bg-nexo-sand/30 rounded-full mx-auto mb-4 flex items-center justify-center text-nexo-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <p className="text-sm font-medium text-nexo-dark/80">Recursos personalizados para aplicar en tu día a día.</p>
            </div>
          </div>

          {/* Paginación / Dots (Solo Mobile) */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {[0, 1, 2, 3].map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => scrollToTarget(dotIndex)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === dotIndex
                    ? 'w-6 bg-nexo-blue'
                    : 'w-2 bg-nexo-blue/20 hover:bg-nexo-blue/40'
                }`}
                aria-label={`Ver paso ${dotIndex + 1}`}
              />
            ))}
          </div>

        </div>

      </section>

      {/* 4. LÍNEA DE TIEMPO (Desktop Intercalado / Mobile Vertical) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-32">
        
        {/* === VERSIÓN DESKTOP === */}
        <div className="hidden md:block relative w-full mt-10">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-nexo-sand/60 -translate-y-1/2 z-0"></div>
          <div className="flex justify-between relative z-10 w-full">
            
            <div className="w-1/4 flex flex-col items-center">
              <div className="h-24 w-full"></div>
              <div className="w-8 h-8 rounded-full bg-nexo-blue flex items-center justify-center border-4 border-white shadow-sm z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="h-24 w-full pt-6 px-4 text-center">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Entrevista de admisión</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Definimos tus objetivos y tu punto de partida.</p>
              </div>
            </div>

            <div className="w-1/4 flex flex-col items-center">
              <div className="h-24 w-full pb-6 px-4 text-center flex flex-col justify-end">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Sesiones semanales</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Acompañamiento profesional constante y enfocado.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-nexo-sand flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
              <div className="h-24 w-full"></div>
            </div>

            <div className="w-1/4 flex flex-col items-center">
              <div className="h-24 w-full"></div>
              <div className="w-8 h-8 rounded-full bg-nexo-sand flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
              <div className="h-24 w-full pt-6 px-4 text-center">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Recursos y ejercicios</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Herramientas concretas para aplicar entre encuentros.</p>
              </div>
            </div>

            <div className="w-1/4 flex flex-col items-center">
              <div className="h-24 w-full pb-6 px-4 text-center flex flex-col justify-end">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Cierre y proyección</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Evaluación de logros y pautas para tu futuro.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-nexo-green flex items-center justify-center border-4 border-white shadow-sm z-10">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="h-24 w-full"></div>
            </div>

          </div>
        </div>

        {/* === VERSIÓN MOBILE === */}
        <div className="md:hidden relative ml-4 mt-8">
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-nexo-sand/60"></div>
          
          <div className="flex flex-col gap-10 relative z-10">
            <div className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-nexo-blue flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Entrevista de admisión</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Definimos tus objetivos y tu punto de partida.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-nexo-sand border-4 border-white shadow-sm flex-shrink-0"></div>
              <div className="pt-1">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Sesiones semanales</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Acompañamiento profesional constante y enfocado.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-nexo-sand border-4 border-white shadow-sm flex-shrink-0"></div>
              <div className="pt-1">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Recursos y ejercicios</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Herramientas concretas para aplicar entre encuentros.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-nexo-green flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-nexo-dark text-sm mb-1">Cierre y proyección</h4>
                <p className="text-xs text-nexo-dark/70 leading-relaxed">Evaluación de logros y pautas para tu futuro.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 5. CTA (Call to Action) */}
      <section className="w-full bg-nexo-sand/30 text-center py-24 px-6 relative z-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-nexo-dark mb-6">
            Tu bienestar es tu mejor inversión.
          </h2>
          <p className="text-lg text-nexo-dark/70 mb-10">
            Para garantizar la profundidad de cada proceso, los cupos son limitados y abrimos solo unas pocas vacantes por mes.
          </p>
          <button className="bg-nexo-dark text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-nexo-blue transition-all shadow-lg transform hover:-translate-y-1 mb-6">
            Reservar mi entrevista de admisión
          </button>
          <p className="text-xs text-nexo-dark/50 max-w-sm mx-auto">
            Hablemos para ver si este programa es el nexo que estás necesitando hoy.
          </p>
        </div>
      </section>

    </div>
  );
};