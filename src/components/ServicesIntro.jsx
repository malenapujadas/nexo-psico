import iconChat from '../assets/icon-chat.png';
import iconLaptop from '../assets/icon-laptop.png';
import iconBrain from '../assets/icon-brain.png';

export const ServicesIntro = () => {
  const pillars = [
    {
      title: "Admisión Personalizada",
      text: "Una primera entrevista para conocerte y encontrar tu nexo ideal.",
      icon: iconChat
    },
    {
      title: "Abordaje Integral",
      text: "Especialistas en TCC y Psicoanálisis para adaptarnos a tu proceso único.",
      icon: iconBrain
    },
    {
      title: "Flexibilidad Total",
      text: "Elegí el espacio que te sea más cómodo: atención presencial o virtual.",
      icon: iconLaptop
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-nexo-bg overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Bloque Introductorio */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-6">
            Construyendo vínculos sólidos
          </h2>
          <p className="text-lg text-nexo-dark/80 leading-relaxed mb-4">
            En Nexo Psico, entendemos la <strong className="font-bold">salud mental</strong> como un <strong className="font-bold">camino integral</strong>. Nuestro propósito es ser ese <strong className="font-bold">puente</strong> vital entre el malestar, la duda o los desafíos que atravesás hoy y las <strong className="font-bold">herramientas profesionales</strong> necesarias para transformarlos en bienestar.
          </p>
        </div>

        {/* Carrusel en Mobile / Grilla en Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              // En mobile: flex-none, 85% de ancho y snap-center. En desktop: ancho auto.
              className="flex-none w-[85%] md:w-auto snap-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform md:hover:-translate-y-2 flex flex-col items-center text-center group border border-nexo-sand/20"
            >
              {/* Contenedor del ícono */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full group-hover:bg-nexo-bg transition-colors duration-300">
                <img 
                  src={pillar.icon} 
                  alt={pillar.title} 
                  className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-nexo-dark mb-4">
                {pillar.title}
              </h3>
              
              <p className="text-base text-nexo-dark/70 leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};