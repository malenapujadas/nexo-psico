import React, { useState } from 'react';

export const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  
  // NUEVOS ESTADOS PARA EL ENVÍO
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    const nombreTrimmed = formData.nombre.trim();
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
    if (!nombreTrimmed) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (nombreTrimmed.length < 2) {
      newErrors.nombre = 'Ingresá un nombre válido.';
    } else if (!nombreRegex.test(nombreTrimmed)) {
      newErrors.nombre = 'El nombre solo puede contener letras.';
    }

    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (/\s/.test(formData.email)) {
      newErrors.email = 'El correo no puede tener espacios en blanco.';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Ingresá un formato de correo electrónico válido.';
    }

    if (!formData.motivo) {
      newErrors.motivo = 'Por favor, seleccioná el motivo de tu consulta.';
    }

    const mensajeTrimmed = formData.mensaje.trim();
    if (!mensajeTrimmed) {
      newErrors.mensaje = 'El mensaje no puede estar vacío.';
    } else if (mensajeTrimmed.length < 10) {
      newErrors.mensaje = 'Por favor, contanos un poquito más de detalle (mínimo 10 letras).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // LÓGICA DE ENVÍO REAL ADAPTADA PARA FORMSPREE
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true); // Cambiamos el botón a "Enviando..."

      try {
        // ACÁ REEMPLAZÁS "TU_ID_DE_FORMSPREE" POR EL TUYO (ej: xxyzabcd)
        const response = await fetch("https://formspree.io/f/xqejvajp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setIsSuccess(true); // Mostramos el mensaje de éxito
          setFormData({ nombre: '', email: '', motivo: '', mensaje: '' }); // Limpiamos
        } else {
          alert("Hubo un problema al enviar el mensaje. Por favor, intentá de nuevo.");
        }
      } catch (error) {
        alert("Error de conexión. Revisá tu internet e intentá nuevamente.");
      } finally {
        setIsSubmitting(false); // Volvemos el botón a la normalidad
      }
    }
  };

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

        {/* Lado Derecho: Formulario o Mensaje de Éxito */}
        <div className="bg-white">
          
          {isSuccess ? (
            // MENSAJE DE ÉXITO (Reemplaza al formulario)
            <div className="h-full flex flex-col items-center justify-center text-center bg-nexo-sand/10 p-10 rounded-2xl border border-nexo-sand/30 animate-fade-in-up">
              <div className="w-16 h-16 bg-nexo-green/20 text-nexo-green rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-nexo-dark mb-2">¡Mensaje enviado!</h3>
              <p className="text-nexo-dark/80">
                Gracias por escribirnos, {formData.nombre}. Recibimos tu consulta y te vamos a estar respondiendo muy pronto.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-sm font-semibold text-nexo-blue hover:text-nexo-dark transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            // FORMULARIO
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              
              {/* Campo: Nombre */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="nombre" className="text-sm font-medium text-nexo-dark italic">
                  ¿Cómo te gustaría que te llamemos? *
                </label>
                <input 
                  type="text" 
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  disabled={isSubmitting}
                  className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic
                    ${errors.nombre ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.nombre && <span className="text-red-500 text-xs font-medium pl-1">{errors.nombre}</span>}
              </div>

              {/* Campo: Email */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-sm font-medium text-nexo-dark italic">
                  Tu correo electrónico *
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                  disabled={isSubmitting}
                  className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic
                    ${errors.email ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.email && <span className="text-red-500 text-xs font-medium pl-1">{errors.email}</span>}
              </div>

              {/* Campo: Select Motivo */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="motivo" className="text-sm font-medium text-nexo-dark italic">
                  Motivo de consulta *
                </label>
                <div className="relative">
                  <select 
                    id="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all appearance-none cursor-pointer italic
                      ${errors.motivo ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-nexo-dark/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.motivo && <span className="text-red-500 text-xs font-medium pl-1">{errors.motivo}</span>}
              </div>

              {/* Campo: Mensaje */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="mensaje" className="text-sm font-medium text-nexo-dark italic">
                  Contanos brevemente qué te trae por acá...
                </label>
                <textarea 
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows="4"
                  placeholder="Escribí tu mensaje..."
                  className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic resize-none
                    ${errors.mensaje ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                ></textarea>
                {errors.mensaje && <span className="text-red-500 text-xs font-medium pl-1">{errors.mensaje}</span>}
              </div>

              {/* Botón de Enviar */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 bg-nexo-dark text-white w-full md:w-auto self-start px-10 py-3.5 rounded-lg font-semibold shadow-md transition-all duration-300
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-nexo-blue hover:shadow-lg transform hover:-translate-y-1'}`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};