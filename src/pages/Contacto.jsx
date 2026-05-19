import React, { useState } from 'react';

export const Contacto = () => {
  // 1. Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: '',
    mensaje: ''
  });

  // 2. Estado para guardar los mensajes de error
  const [errors, setErrors] = useState({});

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    // Si el usuario empieza a escribir, borramos el error de ese campo para que no le siga gritando
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  // 3. Lógica central de Validación
  const validateForm = () => {
    let newErrors = {};

    // Validar Nombre
    const nombreTrimmed = formData.nombre.trim();
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
    if (!nombreTrimmed) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (nombreTrimmed.length < 2) {
      newErrors.nombre = 'Ingresá un nombre válido.';
    } else if (!nombreRegex.test(nombreTrimmed)) {
      newErrors.nombre = 'El nombre solo puede contener letras.';
    }

    // Validar Email
    const emailTrimmed = formData.email.trim();
    // Expresión regular robusta para emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (/\s/.test(formData.email)) {
      newErrors.email = 'El correo no puede tener espacios en blanco.';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Ingresá un formato de correo electrónico válido.';
    }

    // Validar Motivo
    if (!formData.motivo) {
      newErrors.motivo = 'Por favor, seleccioná el motivo de tu consulta.';
    }

    // Validar Mensaje
    const mensajeTrimmed = formData.mensaje.trim();
    if (!mensajeTrimmed) {
      newErrors.mensaje = 'El mensaje no puede estar vacío.';
    } else if (mensajeTrimmed.length < 10) {
      newErrors.mensaje = 'Por favor, contanos un poquito más de detalle (mínimo 10 letras).';
    }

    setErrors(newErrors);
    
    // Si el objeto de errores está vacío, significa que el formulario es 100% válido
    return Object.keys(newErrors).length === 0;
  };

  // 4. Función al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    const isValid = validateForm();

    if (isValid) {
      // Acá iría la conexión real con EmailJS o Formspree
      console.log('Formulario perfecto. Datos listos para enviar:', formData);
      alert("¡Formulario validado con éxito! Mirá la consola.");
      
      // Opcional: Limpiar el formulario después del envío exitoso
      /* setFormData({ nombre: '', email: '', motivo: '', mensaje: '' }); */
    } else {
      console.log('Hay errores en el formulario.');
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

        {/* Lado Derecho: Formulario */}
        <div className="bg-white">
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
                className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic
                  ${errors.nombre ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}`}
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
                className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic
                  ${errors.email ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}`}
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
                  className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all appearance-none cursor-pointer italic
                    ${errors.motivo ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}`}
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
                rows="4"
                placeholder="Escribí tu mensaje..."
                className={`w-full bg-nexo-sand/20 border rounded-xl px-4 py-3 text-nexo-dark outline-none transition-all placeholder-nexo-dark/30 italic resize-none
                  ${errors.mensaje ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-transparent focus:border-nexo-blue/40'}`}
              ></textarea>
              {errors.mensaje && <span className="text-red-500 text-xs font-medium pl-1">{errors.mensaje}</span>}
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