import { useState } from 'react';

const aptosData = [
  {
    id: 'instituciones',
    title: "Institución Educativa",
    subtitle: "Tu ingreso académico, un paso más cerca",
    intro: "Evaluación breve y profesional para carreras docentes, técnicas o terciarias.",
    description: "Algunas instituciones solicitan un apto psicológico al momento del ingreso para constatar que te encontrás en condiciones emocionales y cognitivas adecuadas.\n\nEs una valoración respetuosa y centrada en vos, no un examen, diseñada para acompañar tu inicio académico con estabilidad. Contamos con amplia experiencia acompañando a estudiantes adultos en este proceso.",
    faqs: [
      { q: "¿Cómo es el proceso?", a: "Coordinamos un turno virtual por videollamada en un horario accesible. Te enviamos el enlace con anticipación junto con todas las indicaciones necesarias." },
      { q: "¿Cuánto dura y qué incluye?", a: "Es un encuentro único de 90 minutos que abarca una entrevista clínica breve y técnicas psicológicas adaptadas al formato digital, para evaluar recursos personales y motivación." },
      { q: "¿Cuándo me entregan el informe?", a: "El informe profesional en PDF se entrega rápido: dentro de las 24 horas posteriores a la evaluación, listo para presentar en tu institución." },
      { q: "¿Por qué elegir nuestro equipo?", a: "Ofrecemos turnos disponibles en pocos días sin esperas prolongadas, resolvemos todo en una sola sesión y cuidamos cada paso con total profesionalismo." }
    ]
  },
  {
    id: 'armas',
    title: "Portación de Armas",
    subtitle: "Rápido, confiable y con respaldo legal",
    intro: "Evaluaciones psicotécnicas exigidas para trámites ante la ANMaC.",
    description: "Contamos con profesionales habilitados y amplia experiencia en evaluaciones psicotécnicas con fines legales y administrativos. El servicio está a cargo de la Lic. Emilce Gauna (MN Nº 66806), Perito Psicóloga y Especialista en Evaluación Psicológica.\n\nEste apto está dirigido a quienes solicitan o renuevan permisos de uso civil, caza deportiva, personal de seguridad o empresas que requieren certificaciones para sus empleados.",
    faqs: [
      { q: "¿En qué consiste la evaluación?", a: "Incluye una entrevista clínica individual profunda y la aplicación de las técnicas de evaluación psicológicas específicas exigidas por la normativa." },
      { q: "¿Bajo qué modalidad se realiza?", a: "Este proceso se realiza exclusivamente de forma presencial en nuestro consultorio y tiene una duración estimada de entre 60 y 90 minutos." },
      { q: "¿En cuánto tiempo obtengo el certificado?", a: "El informe profesional firmado, cumpliendo con todos los requisitos, se entrega dentro de las 48 a 72 horas hábiles posteriores al encuentro." },
      { q: "¿Este apto garantiza mi autorización?", a: "No. El apto psicológico constituye uno de los requisitos obligatorios solicitados por la entidad, pero la aprobación y autorización final dependen de la ANMaC." }
    ]
  },
  {
    id: 'licencia',
    title: "Licencia de Conducir",
    subtitle: "Evaluación ágil cumpliendo normativas",
    intro: "Tu certificado psicológico para sacar o renovar tu licencia (Excepto CABA).",
    description: "Ofrecemos un servicio serio y ágil, cumpliendo con todos los requisitos legales vigentes para la obtención o renovación de la licencia de conducir.\n\nYa sea que tramites tu registro por primera vez, seas conductor profesional (clases C, D, E) o te hayan requerido una evaluación psicológica adicional por temas de salud o reincidencias, nuestros especialistas en psicotécnicos te acompañarán en el proceso.",
    faqs: [
      { q: "¿Qué incluye el servicio?", a: "Consta de una entrevista clínica estructurada y la evaluación con test psicológicos correspondientes, culminando con un informe firmado por un profesional matriculado." },
      { q: "¿Se puede hacer online o es presencial?", a: "Para mayor comodidad, ofrecemos ambas modalidades: presencial o virtual. El encuentro tiene una duración aproximada de 90 minutos." },
      { q: "¿Cuándo recibo el certificado?", a: "El informe final firmado se entrega en un plazo de 7 días hábiles tras haber concluido la evaluación." },
      { q: "¿Aplica para mi jurisdicción?", a: "El certificado es válido para trámites fuera de CABA. Siempre sugerimos consultar previamente los requisitos específicos de tu municipio para confirmar su validez en tu caso particular." }
    ]
  }
];

export const Aptos = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const currentApto = aptosData[activeTab];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SELECTOR DE TABS (Con toques en Verde y Línea Progresiva Interna) */}
        <div className="flex justify-center mb-16 md:mb-24 w-full">
          
          {/* Contenedor principal */}
          <div className="relative inline-flex flex-col bg-nexo-bg/40 p-1.5 pb-3 md:pb-1.5 rounded-3xl md:rounded-full border border-nexo-sand/30 shadow-sm max-w-full overflow-hidden">
            
            {/* El menú deslizable */}
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {aptosData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(index);
                    setOpenAccordion(null);
                  }}
                  className={`relative whitespace-nowrap px-6 py-3 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none z-10
                    ${activeTab === index 
                      ? 'bg-nexo-green text-white shadow-md' 
                      : 'text-nexo-dark/60 hover:text-nexo-dark hover:bg-white/50'
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* LÍNEA PROGRESIVA CONTINUA (Verde, pegada al borde inferior, solo en mobile) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-nexo-sand/40 md:hidden z-0">
              <div 
                className="absolute top-0 bottom-0 bg-nexo-green transition-all duration-500 ease-out"
                style={{ 
                  width: `${100 / aptosData.length}%`, 
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
            <h2 className="text-sm font-bold text-nexo-green uppercase tracking-widest mb-4">
              {currentApto.title}
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
              {currentApto.subtitle}
            </h1>
            <p className="text-xl text-nexo-dark/80 font-medium mb-8 italic">
              {currentApto.intro}
            </p>
            <div className="space-y-4 mb-10">
              {currentApto.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-nexo-dark/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <button className="bg-nexo-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-nexo-dark transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
              Solicitar turno
            </button>
          </div>

          {/* Lado Derecho: Acordeón Minimalista (Tono Verde) */}
          <div className="flex flex-col border-t border-nexo-sand/40 mt-2 lg:mt-12">
            {currentApto.faqs.map((faq, i) => (
              <div key={i} className="border-b border-nexo-sand/40">
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-medium transition-colors duration-300 pr-6 ${
                    openAccordion === i ? 'text-nexo-green' : 'text-nexo-dark group-hover:text-nexo-green'
                  }`}>
                    {faq.q}
                  </span>
                  
                  {/* Ícono animado */}
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    openAccordion === i 
                    ? 'border-nexo-green bg-nexo-green text-white rotate-45' 
                    : 'border-nexo-sand/60 text-nexo-dark/40 group-hover:border-nexo-green group-hover:text-nexo-green'
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