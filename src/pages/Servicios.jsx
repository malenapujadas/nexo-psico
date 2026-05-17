import React from 'react';
import { Link } from 'react-router-dom';

const allServices = [
  {
    title: "Psicoterapia",
    description: "Espacios de contención individual, de pareja, infantil y orientación a padres. Un lugar seguro para desarmar nudos emocionales.",
    href: "/terapia",
    color: "border-nexo-blue text-nexo-blue",
    bgHover: "hover:bg-nexo-blue/5"
  },
  {
    title: "Evaluaciones Psicológicas",
    description: "Abordajes neurocognitivos y psicodiagnósticos profundos. Diagnósticos precisos con entrega de informes en 7 días hábiles.",
    href: "/evaluaciones-psicologicas",
    color: "border-nexo-blue text-nexo-blue",
    bgHover: "hover:bg-nexo-blue/5"
  },
  {
    title: "Aptos Psicológicos",
    description: "Certificaciones rápidas y profesionales para ingreso a instituciones educativas, portación de armas y licencias de conducir.",
    href: "/aptos-psicologicos",
    color: "border-nexo-green text-nexo-green",
    bgHover: "hover:bg-nexo-green/5"
  },
  {
    title: "Orientación Vocacional",
    description: "Procesos individuales y 100% online de 6 a 8 encuentros. Herramientas clave para decidir tu futuro con confianza y autonomía.",
    href: "/orientacion-vocacional",
    color: "border-nexo-blue text-nexo-blue",
    bgHover: "hover:bg-nexo-blue/5"
  },
  {
    title: "Supervisiones",
    description: "Espacios clínicos y técnico-periciales para profesionales y peritos. Pensá tus casos con el respaldo y la experiencia que necesitás.",
    href: "/supervisiones",
    color: "border-nexo-dark text-nexo-dark",
    bgHover: "hover:bg-nexo-dark/5"
  }
];

export const Servicios = () => {
  return (
    <div className="min-h-screen bg-white pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Encabezado de la página */}
        <div className="max-w-3xl mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="text-sm font-bold text-nexo-blue uppercase tracking-widest mb-4">
            Nuestras Especialidades
          </h2>
          <h1 className="text-4xl md:text-5xl font-semibold text-nexo-dark mb-6 leading-tight">
            ¿En qué podemos acompañarte hoy?
          </h1>
          <p className="text-xl text-nexo-dark/70 leading-relaxed">
            Explorá los diferentes espacios clínicos, de evaluación y acompañamiento que ofrece nuestro equipo. Diseñamos cada propuesta para brindar claridad, rigor profesional y contención humana.
          </p>
        </div>

        {/* Grilla de Tarjetas de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {allServices.map((service, index) => (
            <Link 
              key={index}
              to={service.href}
              className={`group bg-white p-8 rounded-2xl border border-nexo-sand/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${service.bgHover}`}
            >
              <div>
                {/* Indicador de categoría con el color correspondiente */}
                <div className={`inline-block border-l-2 pl-3 mb-6 ${service.color}`}>
                  <h3 className="text-xl md:text-2xl font-semibold text-nexo-dark group-hover:text-nexo-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="text-nexo-dark/70 leading-relaxed text-base mb-8">
                  {service.description}
                </p>
              </div>

              {/* Botón sutil de llamada a la acción */}
              <div className="flex items-center gap-2 text-sm font-bold text-nexo-dark/60 group-hover:text-nexo-dark transition-colors duration-300">
                <span>Conocé más detalles</span>
                <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};