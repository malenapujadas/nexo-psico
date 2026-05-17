import React from 'react';

export const Contacto = () => {
  return (
    <div className="min-h-[85vh] bg-white pt-32 md:pt-40 pb-20 flex items-center">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full animate-fade-in-up">
        
        {/* Lado Izquierdo: Textos */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-medium text-nexo-dark mb-8 leading-tight">
            Demos el primer paso juntos.
          </h1>
          <p className="text-lg text-nexo-dark/80 leading-relaxed mb-6">
            Sabemos que buscar ayuda o hacer una consulta es un acto de <strong>valentía</strong>. Ya sea que quieras iniciar un proceso, tengas dudas sobre nuestros servicios o necesites coordinar una admisión, <strong>estamos</strong> acá para <strong>escucharte</strong>.
          </p>
          <p className="text-lg text-nexo-dark/80 leading-relaxed">
            <strong>Escribinos</strong> con total <strong>confianza</strong>: nos tomamos el tiempo de leer cada mensaje y te responderemos lo antes posible para empezar a construir ese nexo que estás buscando.
          </p>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="bg-white">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Campo: Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="text-sm font-medium text-nexo-dark italic">
                ¿Cómo te gustaría que te llamemos? *
              </label>
              <input 
                type="text" 
                id="nombre"
                placeholder="Nombre"
                required
                className="w-full bg-nexo-sand/20 border border-transparent focus:border-nexo-blue/40 rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic"
              />
            </div>

            {/* Campo: Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-nexo-dark italic">
                Tu correo electrónico *
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="ejemplo@gmail.com"
                required
                className="w-full bg-nexo-sand/20 border border-transparent focus:border-nexo-blue/40 rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic"
              />
            </div>

            {/* Campo: Select Motivo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="motivo" className="text-sm font-medium text-nexo-dark italic">
                Motivo de consulta *
              </label>
              <div className="relative">
                <select 
                  id="motivo"
                  required
                  defaultValue=""
                  className="w-full bg-nexo-sand/20 border border-transparent focus:border-nexo-blue/40 rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all appearance-none cursor-pointer italic"
                >
                  <option value="" disabled className="not-italic">Seleccioná una opción...</option>
                  <option value="psicoterapia" className="not-italic">Psicoterapia / Terapia</option>
                  <option value="evaluaciones" className="not-italic">Evaluaciones Psicológicas</option>
                  <option value="aptos" className="not-italic">Aptos Psicológicos</option>
                  <option value="orientacion" className="not-italic">Orientación Vocacional</option>
                  <option value="supervision" className="not-italic">Supervisión Profesional</option>
                  <option value="bienestar" className="not-italic">Programa de Bienestar</option>
                  <option value="trabajemos" className="not-italic">Sumarme al equipo (Postulación)</option>
                  <option value="otro" className="not-italic">Otro motivo</option>
                </select>
                {/* Flechita personalizada para el select */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-nexo-dark/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Campo: Mensaje */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="text-sm font-medium text-nexo-dark italic">
                Contanos brevemente qué te trae por acá...
              </label>
              <textarea 
                id="mensaje"
                rows="4"
                placeholder="Escribí tu mensaje..."
                className="w-full bg-nexo-sand/20 border border-transparent focus:border-nexo-blue/40 rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic resize-none"
              ></textarea>
            </div>

            {/* Botón de Enviar */}
            <button 
              type="submit"
              className="mt-2 bg-nexo-dark text-white w-full md:w-auto self-start px-10 py-3.5 rounded-lg font-semibold hover:bg-nexo-blue transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Enviar mensaje
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};