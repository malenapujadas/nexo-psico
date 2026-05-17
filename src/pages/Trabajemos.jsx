import React from 'react';
import heroTrabajemos from '../assets/hero-trabajemos.jpg'; 

export const Trabajemos = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO Y TEXTO INTRODUCTORIO */}
      <section className="w-full relative">
        
        {/* Arco Superior (Imagen) - Le subimos un poco la intensidad al fondo arena para que mezcle bien */}
        <div className="w-full h-[50vh] min-h-[400px] max-h-[600px] bg-nexo-sand/60 rounded-b-[4rem] md:rounded-b-[8rem] overflow-hidden relative shadow-inner mb-16 md:mb-24">
          
          <img 
            src={heroTrabajemos} 
            alt="Colegas trabajando en red" 
            className="w-full h-full object-cover object-bottom opacity-[0.85]" 
          />
          
        </div>

        {/* Textos */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
            Expandí tu red,<br className="hidden md:block" /> potenciá tu práctica.
          </h1>
          <p className="text-lg md:text-xl text-nexo-dark/80 leading-relaxed max-w-3xl">
            En Nexo Psico estamos convencidas de que la mejor forma de cuidar la salud mental es <strong>trabajando en comunidad</strong>. Creemos en la fuerza del tejido profesional para brindar respuestas de calidad; por eso, abrimos las puertas de nuestra red de <strong>derivación</strong> a <strong>colegas</strong> comprometidos que deseen conectar con nuevos pacientes y formar parte de un espacio basado en la <strong>ética</strong>, el <strong>intercambio</strong> y el <strong>respaldo profesional</strong>.
          </p>
        </div>
      </section>

      {/* 2. ¿POR QUÉ SUMARSE? */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark text-center mb-16">
          ¿Por qué sumarse?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-nexo-sand/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-nexo-blue group-hover:text-white transition-colors duration-300 text-nexo-blue">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-nexo-dark mb-3">Derivaciones con propósito.</h3>
            <p className="text-sm text-nexo-dark/70 leading-relaxed">
              Recibí pacientes que se alineen realmente con tu especialidad y experiencia clínica.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-nexo-sand/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-nexo-blue group-hover:text-white transition-colors duration-300 text-nexo-blue">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-nexo-dark mb-3">Visibilidad Estratégica.</h3>
            <p className="text-sm text-nexo-dark/70 leading-relaxed">
              Formá parte de una red en constante crecimiento que potencia tu alcance profesional.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-nexo-sand/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-nexo-blue group-hover:text-white transition-colors duration-300 text-nexo-blue">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-nexo-dark mb-3">Comunidad y Colaboración.</h3>
            <p className="text-sm text-nexo-dark/70 leading-relaxed">
              Accedé a espacios de intercambio, supervisión y diálogo constante entre colegas.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-nexo-sand/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-nexo-blue group-hover:text-white transition-colors duration-300 text-nexo-blue">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-nexo-dark mb-3">Marco de Excelencia.</h3>
            <p className="text-sm text-nexo-dark/70 leading-relaxed">
              Desarrollá tu práctica dentro de un entorno que prioriza el rigor científico y el compromiso ético.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EL PERFIL QUE BUSCAMOS */}
      <section className="w-full bg-nexo-sand/10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-6">
              El perfil que buscamos
            </h2>
            <p className="text-lg text-nexo-dark/80 leading-relaxed mb-10">
              Para garantizar la excelencia en nuestra red, buscamos profesionales con <strong>título habilitante</strong> y <strong>matrícula vigente</strong>, que sostengan una <strong>formación continua</strong> y una <strong>visión responsable</strong> de la clínica. Valoramos especialmente la <strong>disposición</strong> para el trabajo interdisciplinario y el <strong>compromiso</strong> con los valores humanos que nos definen.
            </p>
            <button className="bg-nexo-dark text-white px-10 py-3.5 rounded-lg font-semibold hover:bg-nexo-blue transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Enviar mi postulación
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-nexo-blue shadow-sm border border-nexo-sand/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-nexo-dark font-medium pt-2">Título habilitante y matrícula vigente.</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-nexo-blue shadow-sm border border-nexo-sand/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-nexo-dark font-medium pt-2">Compromiso ético y responsabilidad en la práctica clínica.</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-nexo-blue shadow-sm border border-nexo-sand/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-nexo-dark font-medium pt-2">Actualización continua y disposición al trabajo en red.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};