import { Link } from 'react-router-dom';

export const Footer = () => {
  const internalLinks = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Servicios', 
      href: '/servicios',
      dropdown: [
        { name: 'Terapia', href: '/terapia' },
        { name: 'Evaluaciones Psicológicas', href: '#' },
        { name: 'Aptos Psicológicos', href: '#' },
        { name: 'Orientación Vocacional', href: '#' },
        { name: 'Supervisiones', href: '#' },
      ]
    },
    { name: 'Trabajemos', href: '/trabajemos' },
    { name: 'Programa Bienestar', href: '/programa' },
    { name: 'Cuadernillos', href: '/cuadernillos' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <footer className="bg-nexo-dark text-nexo-bg pt-16 pb-8 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-nexo-sand/20">
        
        {/* Lado Izquierdo: Ocupa 1/4 del espacio en Desktop */}
        <div className="w-full md:w-1/4 text-center md:text-left">
          <a href="#" className="text-2xl font-bold tracking-widest text-nexo-sand block mb-2">
            NEXO
          </a>
          <p className="text-sm text-nexo-bg/60 max-w-xs mx-auto md:mx-0">
            El punto de encuentro con tu Salud Mental.
          </p>
        </div>

        {/* Centro: Ocupa el espacio restante y prohíbe el salto de línea en Desktop */}
        <div className="w-full md:flex-grow flex flex-wrap md:flex-nowrap justify-center gap-4 lg:gap-6">
          {internalLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className="whitespace-nowrap text-sm font-medium text-nexo-bg/80 hover:text-nexo-sand transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Lado Derecho: Ocupa 1/4 del espacio en Desktop y tira los íconos a la derecha */}
        <div className="w-full md:w-1/4 flex justify-center md:justify-end gap-3">
          
          {/* WhatsApp */}
          <a 
            href="https://wa.me/5491156158104" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 text-nexo-bg hover:text-nexo-sand rounded-full transition-all duration-300 transform hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.122.548 4.195 1.594 6.02L.03 24l6.096-1.597A11.96 11.96 0 0012.031 24c6.646 0 12.03-5.386 12.03-12.031S18.677 0 12.031 0zm0 21.996c-1.84 0-3.645-.494-5.234-1.437l-.375-.222-3.89 1.018 1.036-3.794-.244-.388a9.98 9.98 0 01-1.528-5.342c0-5.518 4.49-10.007 10.007-10.007 5.518 0 10.007 4.49 10.007 10.007 0 5.518-4.49 10.008-10.008 10.008zm5.48-7.513c-.301-.151-1.782-.881-2.059-.982-.276-.1-.478-.151-.678.151-.201.302-.779.982-.955 1.183-.176.201-.352.226-.653.076a8.214 8.214 0 01-2.42-1.498 9.07 9.07 0 01-1.678-2.083c-.176-.302-.019-.465.132-.615.135-.135.301-.352.452-.528.151-.176.201-.302.301-.503.1-.201.05-.377-.025-.528-.075-.151-.678-1.636-.928-2.24-.245-.588-.493-.508-.678-.517-.175-.008-.377-.008-.578-.008-.201 0-.528.075-.804.377-.276.302-1.054 1.031-1.054 2.515 0 1.484 1.08 2.918 1.231 3.12.151.201 2.129 3.251 5.16 4.556.72.31 1.281.495 1.718.634.723.23 1.382.197 1.898.119.58-.088 1.782-.729 2.033-1.434.251-.705.251-1.309.176-1.434-.076-.126-.277-.201-.578-.352z" />
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/nexopsico/?hl=es" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 text-nexo-bg hover:text-nexo-sand rounded-full transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/share/1BCF3FB5pB/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 text-nexo-bg hover:text-nexo-sand rounded-full transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/company/nexopsico/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 text-nexo-bg hover:text-nexo-sand rounded-full transition-all duration-300 transform hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          
        </div>

      </div>

      {/* Barra Inferior de Derechos Autorales */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-nexo-bg/40 gap-4">
        <p>© {new Date().getFullYear()} Nexo Psico. Todos los derechos reservados.</p>
        <p>Diseñado & Desarrollado con ❤️</p>
      </div>
    </footer>
  );
};