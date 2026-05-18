import { useRef, useState } from 'react';
import imgEmilce from '../assets/foto-emilce.png';
import imgPatricia from '../assets/foto-patricia.png';
import imgNatalia from '../assets/foto-natalia.png';

export const Team = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const teamList = [
    {
      name: "Lic. Emilce Gauna",
      role: "Psicóloga Clínica",
      description: "Especialización en área clínica, psicodiagnóstico y evaluación Neurocognitiva. Perito de oficio.",
      image: imgEmilce
    },
    {
      name: "Lic. Patricia Bodo",
      role: "Psicóloga Clínica",
      description: "Especialización en psicodiagnóstico y área clínica. Formación Hospitalaria.",
      image: imgPatricia
    },
    {
      name: "Lic. Natalia Bilancieri",
      role: "Psicóloga Laboral y Clínica",
      description: "Especialización en Psicología Laboral, área clínica. Formación Hospitalaria.",
      image: imgNatalia
    }
  ];

  // Lógica de arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Lógica de Paginación
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    // Ancho de la tarjeta + el espacio (gap-6 = 24px)
    const cardWidth = sliderRef.current.children[0].offsetWidth + 24; 
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[0].offsetWidth + 24;
    sliderRef.current.scrollTo({ 
      left: index * cardWidth, 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      {/* Contenedor principal: alinea los elementos arriba (items-start) */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center lg:items-start px-6 md:px-12 gap-12 lg:gap-16">
        
        {/* COLUMNA 1: TEXTOS (Ahora alineada a la izquierda, ocupando aprox 40% en compu) */}
        <div className="w-full lg:w-5/12 flex-shrink-0 text-center lg:text-left animate-fade-in-up mt-0 lg:mt-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-6 leading-tight">
            Tres miradas,<br className="hidden lg:block" /> un mismo compromiso
          </h2>
          <p className="text-lg text-nexo-dark/80 max-w-md mx-auto lg:mx-0">
            Conocé a las profesionales que dan vida a Nexo y te acompañarán en cada paso de tu proceso.
          </p>
        </div>

        {/* COLUMNA 2: CARRUSEL Y PAGINACIÓN (Ahora ocupa el 60% restante) */}
        <div className="w-full lg:w-7/12 flex-shrink-0 relative animate-fade-in-up animation-delay-200">
          
          {/* Contenedor deslizable (solo esto hace scroll) */}
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
              ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
          >
            {teamList.map((member, index) => (
              <div 
                key={index}
                // Ancho ajustado para que entre mejor en el nuevo layout
                className="flex-none w-[85%] md:w-[60%] lg:w-[50%] snap-start flex flex-col group transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Imagen */}
                <div className="w-full aspect-[4/5] mb-6 rounded-[2.5rem] overflow-hidden shadow-lg border border-nexo-sand/10">
                  <img 
                    src={member.image} 
                    alt={`Foto de ${member.name}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" 
                  />
                </div>

                {/* Info */}
                <div className="px-2 text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-nexo-dark mb-1">
                    {member.name}
                  </h3>
                  <h4 className="text-xs md:text-sm font-semibold text-nexo-blue tracking-wide uppercase mb-3">
                    {member.role}
                  </h4>
                  <p className="text-sm md:text-base text-nexo-dark/70 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center lg:justify-start lg:pl-4 gap-3 mt-6">
            {teamList.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-[3px] rounded-full transition-all duration-300 focus:outline-none
                  ${activeIndex === index 
                    ? 'w-10 bg-nexo-dark' 
                    : 'w-6 bg-nexo-dark/20 hover:bg-nexo-dark/40'}`}
                aria-label={`Ir a profesional ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};