import { useState } from 'react';

const supervisionesData = [
  {
    id: 'judicial',
    title: "Evaluación Judicial",
    subtitle: "Acompañamiento en contextos periciales y jurídicos",
    intro: "Precisión, solidez técnica y ética clara para tu práctica forense.",
    description: "Las evaluaciones psicológicas en el ámbito judicial requieren un altísimo nivel de rigurosidad. Si trabajás o estás comenzando a dar tus primeros pasos en el campo forense, este espacio de supervisión está diseñado para acompañarte con seguridad en cada etapa del proceso.\n\nTrabajamos en la selección, análisis e interpretación de entrevistas y tests en contextos judiciales, integración diagnóstica, redacción de dictámenes periciales y preparación para exposición oral en audiencias.",
    faqs: [
      { q: "¿En qué tipos de casos me pueden orientar?", a: "Supervisamos evaluaciones en el fuero de familia, penal, laboral y casos de violencia, abarcando tanto el rol del perito oficial o de oficio, como el del consultor técnico." },
      { q: "¿A quién está dirigido este espacio?", a: "A psicólogos/as que ya trabajan en el ámbito judicial, profesionales que intervienen como consultores, o estudiantes avanzados con interés en formarse en el área forense." },
      { q: "¿Cómo es la modalidad de trabajo?", a: "Los encuentros son individuales y 100% virtuales (por Zoom o Meet). Podés supervisar informes en curso o solicitar acompañamiento para procesos completos." },
      { q: "¿Con qué frecuencia nos encontramos?", a: "La frecuencia es completamente flexible y se adapta a tu volumen de trabajo: puede ser mensual, quincenal o simplemente por un caso puntual que te genere dudas." }
    ]
  },
  {
    id: 'psicodiagnostica',
    title: "Evaluación Psicodiagnóstica",
    subtitle: "Profundizá y afiná tu mirada clínica",
    intro: "Un espacio profesional para pensar casos complejos e informes difíciles.",
    description: "¿Te encontrás frente a un caso complejo o un informe que te cuesta construir? ¿Querés fortalecer tu lectura diagnóstica y afianzar el uso de técnicas proyectivas o cognitivas? Este espacio de supervisión está pensado exactamente para eso.\n\nNos enfocamos en la selección y justificación de las técnicas adecuadas, el análisis de los resultados, la articulación teórico-clínica, y la redacción del informe final, asegurando una devolución clara y ética a los pacientes.",
    faqs: [
      { q: "¿Qué técnicas se supervisan?", a: "Trabajamos sobre todo tipo de herramientas: entrevistas clínicas, tests psicométricos, pruebas proyectivas y evaluaciones cognitivas, aplicadas a adultos, adolescentes e infancias." },
      { q: "¿Para qué ámbitos aplica?", a: "Supervisamos evaluaciones de todo tipo: clínicas (para iniciar un tratamiento), laborales (psicotécnicos) o institucionales." },
      { q: "¿A quiénes está dirigido?", a: "Es ideal para psicólogos/as clínicos, profesionales en áreas periciales o institucionales, y estudiantes avanzados o en formación de posgrado." },
      { q: "¿Cómo nos organizamos?", a: "La modalidad es virtual e individual. Podés elegir un esquema regular (semanal o quincenal) o contactarnos a demanda para supervisar un caso puntual." }
    ]
  },
  {
    id: 'clinica',
    title: "Supervisión Clínica",
    subtitle: "Porque no tenés que sostenerlo todo sola/o",
    intro: "Supervisar no es un lujo, es parte de tu práctica ética y tu salud mental.",
    description: "A veces la clínica nos sobrepasa. Hay casos que nos tocan emocionalmente, nos generan inseguridad o nos dejan agotados. No saber si cambiar el encuadre o sentir miedo a repetir intervenciones sin fundamento no significa que no sepas hacer tu trabajo; significa que no tendrías por qué hacerlo en soledad.\n\nEl riesgo de no supervisar es el estancamiento, la hiperresponsabilidad y el desgaste emocional (burnout). Este espacio está creado para vos: para darte sostén real, nuevas perspectivas y seguridad en tus decisiones.",
    faqs: [
      { q: "¿Cuándo es momento de pedir supervisión?", a: "Cuando sentís que un caso te estanca, dudás de tus intervenciones, te sentís agotado/a tras las sesiones o simplemente necesitás pensar tu práctica en profundidad con otro profesional." },
      { q: "¿Qué genera concretamente este espacio?", a: "Te aporta claridad en la lectura clínica, sostén profesional, coherencia en tus decisiones y un mejor vínculo terapéutico con tus pacientes, cuidando al mismo tiempo tu propia energía." },
      { q: "¿Qué temas se analizan en los encuentros?", a: "Analizamos el caso en sí, revisamos el encuadre, evaluamos las intervenciones realizadas y, muy especialmente, trabajamos sobre la contratransferencia (lo que el paciente te genera a vos)." },
      { q: "¿Cómo funciona la dinámica?", a: "Son encuentros individuales, en un marco seguro, ético y contenedor, donde te brindamos herramientas prácticas aplicables a tu día a día en el consultorio." }
    ]
  }
];

export const Supervisiones = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const currentSup = supervisionesData[activeTab];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SELECTOR DE PASTILLA (Tono Oscuro / Seniority con Línea Progresiva Interna) */}
        <div className="flex justify-center mb-16 md:mb-24 w-full">
          
          {/* Contenedor principal */}
          <div className="relative inline-flex flex-col bg-nexo-bg/40 p-1.5 pb-3 md:pb-1.5 rounded-3xl md:rounded-full border border-nexo-sand/30 shadow-sm max-w-full overflow-hidden">
            
            {/* El menú deslizable */}
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {supervisionesData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(index);
                    setOpenAccordion(null);
                  }}
                  className={`relative whitespace-nowrap px-6 py-3 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none z-10
                    ${activeTab === index 
                      ? 'bg-nexo-dark text-white shadow-md' 
                      : 'text-nexo-dark/60 hover:text-nexo-dark hover:bg-white/50'
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* LÍNEA PROGRESIVA CONTINUA (Oscura, pegada al borde inferior, solo en mobile) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-nexo-sand/40 md:hidden z-0">
              <div 
                className="absolute top-0 bottom-0 bg-nexo-dark transition-all duration-500 ease-out"
                style={{ 
                  width: `${100 / supervisionesData.length}%`, 
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
            <h2 className="text-sm font-bold text-nexo-dark/60 uppercase tracking-widest mb-4">
              {currentSup.title}
            </h2>
            <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
              {currentSup.subtitle}
            </h1>
            <p className="text-xl text-nexo-dark/80 font-medium mb-8 italic">
              {currentSup.intro}
            </p>
            <div className="space-y-4 mb-10">
              {currentSup.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg text-nexo-dark/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            
            <button className="bg-nexo-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-nexo-dark/80 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
              Coordinar encuentro
            </button>
          </div>

          {/* Lado Derecho: Acordeón Minimalista (Tono Oscuro) */}
          <div className="flex flex-col border-t border-nexo-sand/40 mt-2 lg:mt-12">
            {currentSup.faqs.map((faq, i) => (
              <div key={i} className="border-b border-nexo-sand/40">
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-medium transition-colors duration-300 pr-6 ${
                    openAccordion === i ? 'text-nexo-dark' : 'text-nexo-dark/80 group-hover:text-nexo-dark'
                  }`}>
                    {faq.q}
                  </span>
                  
                  {/* Ícono animado */}
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    openAccordion === i 
                    ? 'border-nexo-dark bg-nexo-dark text-white rotate-45' 
                    : 'border-nexo-sand/60 text-nexo-dark/40 group-hover:border-nexo-dark group-hover:text-nexo-dark'
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