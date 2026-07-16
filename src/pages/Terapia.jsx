import { useState } from 'react';

const servicesData = [
  {
    id: 'individual',
    title: "Psicoterapia Individual",
    subtitle: "Un tiempo para vos",
    intro: "Recuperar la calma y el sentido en compañía de un profesional.",
    description: "A veces, el ritmo del día a día nos deja con una sensación de estancamiento, ansiedad o una exigencia interna que parece no darnos tregua. En Nexo Psico, entendemos que pedir ayuda es el primer paso para transformar ese malestar en una oportunidad de crecimiento.\n\nLa psicoterapia individual es un espacio de refugio y confidencialidad. Aquí, el objetivo es fortalecer tus propios recursos y construir una vida con mayor bienestar emocional.",
    faqs: [
      { q: "¿Cómo saber si es momento de empezar?", a: "Si sentís que estás llegando al límite de tus fuerzas, te cuesta establecer prioridades o estás atravesando un duelo o cambio vital que te desborda. No hace falta esperar a una crisis total; la búsqueda de autoconocimiento ya es un motivo válido." },
      { q: "¿Qué vas a encontrar en este espacio?", a: "Un lugar seguro, libre de juicios y completamente confidencial, donde un profesional te acompaña a desarmar nudos emocionales." },
      { q: "¿En qué problemáticas podemos ayudarte?", a: "Ansiedad, estrés, depresión, crisis vitales, problemas de autoestima, vínculos tóxicos, duelos, entre otras." },
      { q: "¿Cómo es el proceso?", a: "Comienza con una entrevista de admisión para conocerte. Luego, te derivamos al profesional de nuestro equipo que mejor se adapte a tu perfil." }
    ]
  },
  {
    id: 'pareja',
    title: "Terapia de Pareja",
    subtitle: "Un espacio para reencontrarse",
    intro: "Comprenderse y reconstruir el vínculo a través del diálogo.",
    description: "Estar en pareja no siempre es fácil. Las rutinas y los malentendidos pueden ir apagando la conexión. La terapia de pareja es un espacio profesional donde ambos pueden hablar y ser escuchados.\n\nNo buscamos señalar culpables, sino comprender qué está pasando en el vínculo y qué desean para adelante. Ya sea para reconectar o para separarse en buenos términos.",
    faqs: [
      { q: "¿Cuándo es recomendable consultar?", a: "Discusiones frecuentes, tensión en la convivencia, problemas de comunicación, celos, desconfianza o crisis tras eventos vitales." },
      { q: "¿Qué trabajamos en las sesiones?", a: "Exploramos la historia del vínculo, mejoramos la comunicación, identificamos necesidades emocionales y construimos acuerdos saludables." },
      { q: "¿Cómo es el primer paso?", a: "Realizamos una Entrevista de Admisión en pareja. Luego, los derivamos al profesional experto en vínculos de nuestro equipo." },
   ]
  },
  {
    id: 'infantil',
    title: "Psicoterapia Infantil",
    subtitle: "Acompañamos a tu hijo/a",
    intro: "Un abordaje desde el juego, el vínculo y la escucha respetuosa.",
    description: "La infancia es una etapa de descubrimientos, pero también pueden aparecer miedos o angustias que los chicos no siempre pueden poner en palabras.\n\nBrindamos un espacio seguro donde, a través del juego y el arte, expresan su mundo interno espontáneamente. Trabajamos en conjunto con las familias para generar una red de contención vital.",
    faqs: [
      { q: "¿Cuándo deberíamos consultar?", a: "Cambios repentinos de comportamiento, dificultad para regular emociones, problemas escolares, duelos o miedos excesivos." },
      { q: "¿Cómo se trabaja con los niños?", a: "Utilizamos el juego simbólico, el dibujo y la narración como herramientas principales para fortalecer sus recursos y autoestima." },
      { q: "¿Cómo es el proceso de admisión?", a: "El primer paso es una Entrevista de Admisión con los adultos para entender el contexto familiar." },
      { q: "¿Qué rol tienen los padres?", a: "Fundamental. Mantenemos un diálogo constante para orientarlos, ya que el acompañamiento en casa es clave." }
    ]
  },
  {
    id: 'orientacion',
    title: "Orientación a Padres",
    subtitle: "Criar con mayor claridad",
    intro: "Un espacio para comprender, reflexionar y encontrar nuevas herramientas.",
    description: "Criar no siempre es fácil. La orientación a padres es un espacio profesional de escucha donde podés hablar de tus inquietudes y recibir herramientas prácticas.\n\nAcompañar también es pedir ayuda. Validar tus emociones te permitirá sostener el vínculo en momentos de desafío con más conciencia y tranquilidad.",
    faqs: [
      { q: "¿Cuándo solicitar orientación?", a: "Dudas sobre límites, situaciones familiares difíciles, transiciones evolutivas o diferencias de crianza entre adultos." },
      { q: "¿Qué voy a encontrar en este espacio?", a: "Comprensión del momento de tu hijo, recursos para poner límites con respeto y apoyo emocional para tu bienestar." },
      { q: "¿Me hace mal padre pedir ayuda?", a: "¡Al contrario! Pedir ayuda significa que te importa hacer lo mejor para tus hijos y para vos." },
      { q: "¿Cómo comenzamos?", a: "Tendremos una Entrevista de Admisión inicial para escucharte sin juicios y entender qué necesitás." }
    ]
  }
];

export const Terapia = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const currentService = servicesData[activeTab];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SELECTOR DE TABS ADAPTADO CON LÍNEA PROGRESIVA INTERNA */}
        <div className="flex justify-center mb-16 md:mb-24 w-full">
          
          {/* Contenedor principal (relative y overflow-hidden para contener la línea) */}
          <div className="relative inline-flex flex-col bg-nexo-bg/40 p-1.5 pb-3 md:pb-1.5 rounded-3xl md:rounded-full border border-nexo-sand/30 shadow-sm max-w-full overflow-hidden">
            
            {/* El menú deslizable */}
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {servicesData.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveTab(index);
                    setOpenAccordion(null); 
                  }}
                  className={`relative whitespace-nowrap px-6 py-3 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none z-10
                    ${activeTab === index 
                      ? 'bg-white text-nexo-blue shadow-md' 
                      : 'text-nexo-dark/60 hover:text-nexo-dark hover:bg-white/50'
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* LÍNEA PROGRESIVA CONTINUA (Pegada al borde inferior interno, solo en mobile) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-nexo-sand/40 md:hidden z-0">
              <div 
                className="absolute top-0 bottom-0 bg-nexo-blue transition-all duration-500 ease-out"
                style={{ 
                  width: `${100 / servicesData.length}%`, 
                  transform: `translateX(${activeTab * 100}%)` 
                }}
              />
            </div>

          </div>

        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start animate-fade-in-up">
          
          {/* Lado Izquierdo: Textos */}
          <div className="pr-0 lg:pr-8">
            <h2 className="text-sm font-bold text-nexo-blue uppercase tracking-widest mb-4">
              {currentService.title}
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
              {currentService.subtitle}
            </h1>
            <p className="text-xl text-nexo-dark/80 font-medium mb-8 italic">
              {currentService.intro}
            </p>
            <div className="space-y-4 mb-10">
              {currentService.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-nexo-dark/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <a 
              className="bg-nexo-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-nexo-dark transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
              href="https://wa.me/5491156158104" >
              Solicitar entrevista
            </a>
          </div>

          {/* Lado Derecho: Acordeón Minimalista & Editorial */}
          <div className="flex flex-col border-t border-nexo-sand/40 mt-2 lg:mt-12">
            {currentService.faqs.map((faq, i) => (
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
                  
                  {/* Ícono + / x animado */}
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
                
                {/* Contenido desplegable */}
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