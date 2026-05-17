import { useState } from 'react';

export const Orientacion = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const vocacionalData = {
    title: "Orientación Vocacional",
    subtitle: "Un espacio para descubrir, decidir y proyectar",
    intro: "Nuestra propuesta es 100% online, flexible y personalizada para que elijas con confianza.",
    description: "Elegir una carrera o camino laboral no siempre es fácil. Ya sea al finalizar la secundaria, en medio de una carrera que no te convence, o ante dudas sobre tu futuro, te ofrecemos un acompañamiento profesional para explorar tus verdaderos intereses, habilidades y motivaciones.\n\nEste espacio es ideal si tenés dudas sobre qué estudiar, sentís inseguridad al momento de elegir, tenés intereses muy dispersos o estás evaluando un cambio de dirección hacia oficios o nuevas formaciones.",
    faqs: [
      { 
        q: "¿Cómo es la modalidad y duración?", 
        a: "El proceso consta de 6 a 8 encuentros virtuales de 50 minutos cada uno (vía Zoom o Meet). Es una propuesta 100% online, con horarios flexibles adaptados a tu rutina y guiada siempre por un profesional en psicología vocacional." 
      },
      { 
        q: "¿Cuáles son las etapas del proceso?", 
        a: "Iniciamos con una entrevista para conocer tu historia. Luego pasamos a la exploración personal (intereses, habilidades, valores), seguida de la etapa de información, donde vinculamos lo descubierto con el mundo académico y laboral actual." 
      },
      { 
        q: "¿Qué me llevo al finalizar?", 
        a: "En el último encuentro integramos todo lo trabajado para que puedas tomar una elección consciente y posible. Te entregamos una devolución por escrito con las principales conclusiones y orientaciones claras para tu próximo paso." 
      },
      { 
        q: "¿Por qué elegir este espacio?", 
        a: "Porque no hacemos un simple 'test vocacional'. Trabajamos con un enfoque integral que te da espacio para pensar y sentir sin presiones. Conocemos el sistema educativo actual y, sobre todo, decidimos con vos, no por vos." 
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PASTILLA ESTÁTICA (Para mantener el diseño) */}
        <div className="flex justify-center mb-16 md:mb-24 animate-fade-in-up">
          <div className="inline-flex bg-nexo-blue text-white px-8 py-3 rounded-full text-base font-semibold shadow-md">
            {vocacionalData.title}
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start animate-fade-in-up animation-delay-200">
          
          {/* Lado Izquierdo: Textos */}
          <div className="pr-0 lg:pr-8">
            <h2 className="text-sm font-bold text-nexo-blue uppercase tracking-widest mb-4">
              Tu futuro
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
              {vocacionalData.subtitle}
            </h1>
            <p className="text-xl text-nexo-dark/80 font-medium mb-8 italic">
              {vocacionalData.intro}
            </p>
            <div className="space-y-4 mb-10">
              {vocacionalData.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-nexo-dark/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <button className="bg-nexo-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-nexo-dark transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
              Comenzar mi orientación
            </button>
          </div>

          {/* Lado Derecho: Acordeón Minimalista */}
          <div className="flex flex-col border-t border-nexo-sand/40 mt-2 lg:mt-12">
            {vocacionalData.faqs.map((faq, i) => (
              <div key={i} className="border-b border-nexo-sand/40">
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-medium transition-colors duration-300 pr-6 ${
                    openAccordion === i ? 'text-nexo-blue' : 'text-nexo-dark group-hover:text-nexo-blue'
                  }`}>
                    {faq.q}
                  </span>
                  
                  {/* Ícono animado */}
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    openAccordion === i 
                    ? 'border-nexo-blue bg-nexo-blue text-white rotate-45' 
                    : 'border-nexo-sand/60 text-nexo-dark/40 group-hover:border-nexo-blue group-hover:text-nexo-blue'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openAccordion === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pb-8 pt-2 text-nexo-dark/70 leading-relaxed text-base md:text-lg pr-12">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};