import { useState } from 'react';

const evaluationsData = [
  {
    id: 'neuropsicologica',
    title: "Evaluación Neuropsicológica",
    subtitle: "Abordaje integral del funcionamiento cognitivo",
    intro: "Turnos rápidos y entrega de informe detallado en 7 días hábiles.",
    description: "La evaluación neuropsicológica permite un análisis preciso y personalizado de las funciones cerebrales y conductuales. Está dirigida a adultos y personas mayores que experimenten cambios o dificultades en la memoria, la atención, el lenguaje o el rendimiento cotidiano.\n\nNos destacamos por la agilidad en nuestra agenda. Para tu mayor comodidad, el proceso se realiza por lo general en una sola jornada presencial de 2 a 3 horas en nuestro consultorio, garantizando un marco técnico y humano de máxima calidad.",
    faqs: [
      { q: "¿Cómo es el proceso paso a paso?", a: "Inicia con una breve entrevista telefónica (10-15 min) para conocer el motivo de consulta. Luego coordinamos el encuentro presencial de 2 a 3 horas, donde realizamos la entrevista clínica profunda y la administración de las pruebas neuropsicológicas." },
      { q: "¿Qué funciones cognitivas se evalúan?", a: "Evaluamos de forma directa la atención, la memoria, el lenguaje, las funciones ejecutivas, las habilidades visuoespaciales, la velocidad de procesamiento y la capacidad de resolución de problemas." },
      { q: "¿Qué información incluye el informe final?", a: "Recibirás un PDF firmado por correo electrónico con el perfil cognitivo detallado, tus fortalezas y debilidades, conclusiones clínicas claros y recomendaciones personalizadas (tratamientos, apoyos laborales o académicos)." },
      { q: "¿Por qué realizar la evaluación con nuestro equipo?", a: "Porque ofrecemos turnos sin largas listas de espera, resolvemos la evaluación en un único encuentro cuando el caso lo permite, y garantizamos la entrega del informe en 7 días hábiles con profesionales de sólida trayectoria clínica." }
    ]
  },
  {
    id: 'psicodiagnostica',
    title: "Evaluaciones Psicodiagnósticas",
    subtitle: "Comprender lo que pasa para encontrar soluciones",
    intro: "Herramientas clave para entender el funcionamiento emocional y conductual.",
    description: "El psicodiagnóstico ofrece una visión clara y profunda de la estructura de personalidad y el estado emocional de una persona. Es fundamental para identificar trastornos, comprender comportamientos persistentes o tomar decisiones informadas.\n\nEste proceso está diseñado para personas de todas las edades y se adapta con absoluta flexibilidad a tus horarios y necesidades, ofreciéndose tanto en modalidad presencial como online bajo estricto secreto profesional.",
    faqs: [
      { q: "¿En qué áreas de aplicación se realizan?", a: "Trabajamos en tres campos: Área Clínica (diagnóstico de ansiedad, depresión o crisis emocionales), Área Laboral (selección de personal, evaluación de potencial y riesgos de burnout) y Área Forense (peritajes judiciales, evaluación de incapacidades o causas de custodia)." },
      { q: "¿Cómo funciona la modalidad Online?", a: "Se realiza mediante una videollamada segura para relevar los aspectos biográficos más importantes. Las pruebas psicométricas y de personalidad se aplican a través de plataformas virtuales confiables o guías digitales autónomas, manteniendo la misma rigurosidad y confidencialidad que la presencial." },
      { q: "¿Cómo es el formato Presencial?", a: "Nos encontramos cara a cara en el consultorio para la entrevista profunda. Las pruebas se administran en papel o formato digital, lo que permite al profesional realizar una observación directa de conductas, estilos de afrontamiento y tiempos de respuesta." },
      { q: "¿Qué contiene y cómo se entrega el informe?", a: "Se envía un documento PDF seguro por correo únicamente a la persona autorizada en un lapso de 7 días hábiles. Integra la síntesis biográfica, la descripción de los test aplicados, las conclusiones diagnósticas y recomendaciones terapéuticas, educativas o judiciales según el caso." }
    ]
  }
];

export const Evaluaciones = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const currentEval = evaluationsData[activeTab];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SELECTOR DE PASTILLA FLOTANTE MINIMALISTA */}
        <div className="flex justify-center mb-16 md:mb-24">
          <div className="inline-flex bg-nexo-bg/40 p-1.5 rounded-full border border-nexo-sand/30 shadow-sm max-w-full">
            {evaluationsData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(index);
                  setOpenAccordion(null);
                }}
                className={`px-6 py-3 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none
                  ${activeTab === index 
                    ? 'bg-white text-nexo-blue shadow-md' 
                    : 'text-nexo-dark/60 hover:text-nexo-dark hover:bg-white/50'
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start animate-fade-in-up">
          
          {/* Lado Izquierdo: Textos */}
          <div className="pr-0 lg:pr-8">
            <h2 className="text-sm font-bold text-nexo-blue uppercase tracking-widest mb-4">
              {currentEval.title}
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
              {currentEval.subtitle}
            </h1>
            <p className="text-xl text-nexo-dark/80 font-medium mb-8 italic">
              {currentEval.intro}
            </p>
            <div className="space-y-4 mb-10">
              {currentEval.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-nexo-dark/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <button className="bg-nexo-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-nexo-dark transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
              Solicitar evaluación
            </button>
          </div>

          {/* Lado Derecho: Acordeón Minimalista */}
          <div className="flex flex-col border-t border-nexo-sand/40 mt-2 lg:mt-12">
            {currentEval.faqs.map((faq, i) => (
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