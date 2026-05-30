import heroImage from '../assets/hero-bg.png';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex pt-40 md:pt-48 lg:pt-56">
      {/* Imagen de fondo y Capa de opacidad */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={heroImage} 
          alt="Equipo de profesionales de Nexopsico" 
          className="w-full h-full object-cover object-[center_top]"
        />
        {/* NUEVA CAPA BLANCA TRANSPARENTE (Overlay) */}
        {/* En mobile tiene 60% de opacidad, en desktop 20%. Podés ajustarlo a tu gusto. */}
        <div className="absolute inset-0 bg-white/60 md:bg-white/20"></div>
      </div>

      {/* Contenedor del texto */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-3xl">
        
        {/* H1 con animación */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-nexo-dark leading-tight mb-6 drop-shadow-md animate-fade-in-up">
          El punto de encuentro <br className="hidden md:block" /> con tu Salud Mental
        </h1>
        
        {/* Párrafo con animación y delay */}
        <p className="text-base md:text-lg text-nexo-dark/90 mb-8 max-w-xl font-medium leading-relaxed drop-shadow-sm animate-fade-in-up animation-delay-200">
          Somos <strong className="font-bold">Nexopsico</strong>, un grupo de profesionales Licenciadas en Psicología, especializadas en psicodiagnósticos, psicología organizacional y atención clínica.
        </p>
        
        {/* Botón con animación, delay y sombra mejorada */}
        <a className="bg-nexo-blue text-white px-8 py-3 rounded-lg font-semibold 
          hover:bg-nexo-dark transition-all duration-300 transform hover:-translate-y-1
          animate-fade-in-up animation-delay-400
          shadow-[0_10px_20px_-5px_rgba(126,149,163,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(126,149,163,0.5)]"
          href="https://wa.me/1156158104" >
          Contactanos
        </a>
      </div>
    </section>
  );
};