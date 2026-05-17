import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Actualizamos los href por las rutas reales (las que aún no existen quedan con "#")
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Servicios', 
      href: '#',
      dropdown: [
        { name: 'Terapia', href: '/terapia' },
        { name: 'Evaluaciones Psicológicas', href: '/evaluaciones-psicologicas' },
        { name: 'Aptos Psicológicos', href: '/aptos-psicologicos' },
        { name: 'Orientación Vocacional', href: '/orientacion-vocacional' },
        { name: 'Supervisiones', href: '/supervisiones' },
      ]
    },
    { name: 'Trabajemos', href: '/trabajemos' },
    { name: 'Programa Bienestar', href: '/programa' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 px-6 py-3 md:px-8 flex justify-between items-center bg-white/20 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 border border-white/30">
      
      <div className="flex items-center">
        {/* Reemplazamos la etiqueta 'a' por 'Link' */}
        <Link to="/">
          <img src={logo} alt="Nexo Logo" className="h-8 md:h-10 w-auto" />
        </Link>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <div key={link.name} className="relative group">
            <Link 
              to={link.href}
              className="text-nexo-dark text-sm font-semibold hover:text-nexo-green transition-colors duration-300 py-4"
            >
              {link.name}
              {link.dropdown && (
                <svg className="w-4 h-4 inline-block ml-1 -mt-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>

            {link.dropdown && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-3 w-64 flex flex-col border border-nexo-sand/20">
                  {link.dropdown.map((subLink) => (
                    <Link 
                      key={subLink.name} 
                      to={subLink.href}
                      className="px-4 py-3 text-sm font-medium text-nexo-dark/80 hover:text-nexo-dark hover:bg-nexo-bg/50 rounded-xl transition-colors duration-200"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-nexo-dark hover:text-nexo-green transition-colors focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-4 left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg md:hidden flex flex-col py-6 px-6 gap-4 border border-nexo-sand/20">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col w-full">
              <div 
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => {
                  if (link.dropdown) {
                    setIsServicesOpen(!isServicesOpen);
                  } else {
                    setIsOpen(false);
                  }
                }}
              >
                <Link 
                  to={link.href}
                  className="text-nexo-dark font-medium text-lg hover:text-nexo-green transition-colors py-2"
                  onClick={() => !link.dropdown && setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <svg className={`w-5 h-5 text-nexo-dark transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>

              {link.dropdown && isServicesOpen && (
                <div className="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-nexo-sand/30">
                  {link.dropdown.map((subLink) => (
                    <Link 
                      key={subLink.name} 
                      to={subLink.href}
                      className="text-nexo-dark/80 font-medium text-base hover:text-nexo-dark transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};