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
    <section className="w-full py-24 px-6 md:px-12 bg-nexo-bg">
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

        {/* Grilla de Tarjetas (Reemplaza al carrusel) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center group border border-nexo-sand/20"
            >
              {/* Contenedor del ícono con un leve fondo circular al hacer hover */}
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