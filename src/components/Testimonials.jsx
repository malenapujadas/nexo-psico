import { useRef, useState, useEffect } from 'react';

export const Testimonials = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Estados para la lógica de arrastre (Drag) con el mouse
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);

  const testimonialsList = [
    {
      name: "MARILINA",
      age: "32 años",
      service: "Estudio Neuropsicológico",
      text: "Acudí a Nexopsico para realizar un estudio Neuropsicológico que me había solicitado el neurólogo. Quedé muy conforme con la experiencia. Me dieron turno rápidamente y en una semana tenía el informe completo. Súper recomendable."
    },
    {
      name: "ESTEBAN",
      age: "27 años",
      service: "Psicoterapia Individual",
      text: "El equipo me contactó rápidamente con mi terapeuta que me ayudó a encontrar herramientas para manejar mi estrés laboral. Recomendable."
    },
    {
      name: "MÓNICA",
      age: "54 años",
      service: "Psicoterapia Individual",
      text: "Estaba pasando un momento difícil de mi vida y la terapia me ayudó a darme cuenta de todo lo que tenía alrededor y lo que podía hacer con eso. Eternamente agradecida."
    },
    {
      name: "M. y J.",
      age: "7 años de pareja",
      service: "Terapia de Pareja",
      text: "Estábamos al borde de separarnos. Gracias a la terapia pudimos volver a escucharnos y entender lo que cada uno necesitaba."
    },
    {
      name: "PAULA",
      age: "29 años",
      service: "Psicoterapia Individual",
      text: "La terapia me ayudó a entenderme y dejar de exigirme tanto. Me siento mucho más liviana."
    },
    {
      name: "DIEGO",
      age: "papá de L., 9 años",
      service: "Orientación a Padres",
      text: "Nos ayudó a entender lo que le pasaba a nuestra hija después de la separación. Fue un proceso muy valioso para ella y para nosotros como familia."
    }
  ];

  // 1. Detectar si la sección está en pantalla para activar el Autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Autoplay: Movimiento automático paso a paso
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        // Si llegó al final, vuelve al principio, sino avanza el ancho de una tarjeta aproximado
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 4000); // Se mueve automáticamente cada 4 segundos

    return () => clearInterval(interval);
  }, [isInView]);

  // 3. Controlar la paginación activa leyendo el scroll real
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
      const index = Math.min(
        Math.round(scrollPercentage * (testimonialsList.length - 1)),
        testimonialsList.length - 1
      );
      if (!isNaN(index) && index >= 0) {
        setActiveIndex(index);
      }
    }
  };

  // Ir a un testimonio específico al hacer click en los puntitos
  const scrollToTarget = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = (maxScroll / (testimonialsList.length - 1)) * index;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  // Funciones originales para mover el carrusel con las flechas
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 4. Lógica para arrastrar con el Mouse (Desktop Drag to Scroll)
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftState.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiplicador de velocidad de arrastre
    scrollRef.current.scrollLeft = scrollLeftState.current - walk;
  };

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-nexo-bg overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-4">
            Experiencias que transforman
          </h2>
          <p className="text-lg text-nexo-dark/80">
            Voces de quienes confiaron en Nexo para transitar su propio camino hacia el bienestar.
          </p>
        </div>

        {/* Controles y Carrusel */}
        <div className="relative group animate-fade-in-up animation-delay-200">
          
          {/* Flecha Izquierda (Visible solo en desktop al hacer hover) */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-nexo-dark hover:text-nexo-blue hover:scale-110 transition-all hidden md:flex opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Contenedor del Carrusel (Con eventos de arrastre por mouse agregados) */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-4 -mx-4 
            cursor-grab active:cursor-grabbing select-none
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonialsList.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-none w-[85%] md:w-[45%] lg:w-[30%] snap-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between border border-nexo-sand/10"
              >
                {/* Ícono de Comillas */}
                <svg className="absolute top-4 right-4 w-12 h-12 text-nexo-sand/10 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div className="relative z-10 mb-8">
                  <p className="text-nexo-dark/80 italic leading-relaxed text-base">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="relative z-10 border-t border-nexo-bg pt-4 mt-auto">
                  <p className="font-bold text-nexo-dark">
                    {testimonial.name}, <span className="font-normal text-nexo-dark/70 text-sm">{testimonial.age}</span>
                  </p>
                  <p className="text-sm font-semibold text-nexo-blue mt-1">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Flecha Derecha */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-nexo-dark hover:text-nexo-blue hover:scale-110 transition-all hidden md:flex opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* COMPONENTE NUEVO: Pagination dots agregados abajo al centro */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsList.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => scrollToTarget(dotIndex)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                activeIndex === dotIndex 
                  ? 'w-6 bg-nexo-blue' 
                  : 'w-2 bg-nexo-dark/20 hover:bg-nexo-dark/40'
              }`}
              aria-label={`Ir al testimonio ${dotIndex + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};