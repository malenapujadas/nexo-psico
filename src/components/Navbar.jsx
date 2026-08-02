import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png';
import { useAuth } from './AuthContext'; 

export const Navbar = () => {
  const { usuario } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Sacamos el login de acá para manejarlo por separado a la derecha
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Servicios', 
      href: '/servicios',
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
    { name: 'Cursos', href: '/cursos' },  
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 px-6 py-3 md:px-8 flex justify-between items-center bg-white/20 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 border border-white/30">
      
      {/* 1. IZQUIERDA: Logo */}
      <div className="flex w-1/4 justify-start items-center">
        <Link to="/">
          <img src={logo} alt="Nexo Logo" className="h-12 md:h-16 w-auto" />
        </Link>
      </div>

      {/* 2. CENTRO: Links principales */}
      <div className="hidden md:flex flex-grow justify-center gap-4 lg:gap-8 items-center">
        {navLinks.map((link) => (
          <div key={link.name} className="relative group">
            <Link 
              to={link.href}
              className={`whitespace-nowrap flex items-center text-sm font-semibold transition-colors duration-300 py-4 ${
                link.name === 'Mi Perfil' 
                  ? 'text-nexo-blue hover:text-nexo-dark' 
                  : 'text-nexo-dark hover:text-nexo-green'
              }`}
            >
              {link.name}
              {link.dropdown && (
                <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 3. DERECHA: Botón de Sesión y Hamburguesa (Cambiamos flex-1 por w-1/4) */}
      <div className="flex w-1/4 justify-end items-center gap-4">
        
        {/* Botón Desktop con Ícono */}
        <div className="hidden md:block">
          {usuario ? (
            <Link
              to="/perfil"
              className="flex items-center gap-2 text-sm font-semibold text-nexo-blue hover:text-nexo-dark transition-colors bg-white/60 border border-nexo-blue/20 px-4 py-2 rounded-full shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Mi Perfil
            </Link>
          ) : (
            <Link 
              to="/iniciar-sesion" 
              className="flex items-center gap-2 text-sm font-semibold text-nexo-dark hover:text-nexo-green transition-colors bg-white/40 border border-nexo-sand/50 px-4 py-2 rounded-full shadow-sm hover:bg-white/70 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Iniciar Sesión
            </Link>
          )}

        
        </div>

        {/* Botón Menú Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-nexo-dark hover:text-nexo-green transition-colors focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Menú Mobile Desplegable */}
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
                  className="font-medium text-lg text-nexo-dark hover:text-nexo-green transition-colors py-2"
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
          
          {/* Botón de Sesión en Mobile */}
          <div className="border-t border-nexo-sand/30 pt-4 mt-2">
            {usuario ? (
              <Link 
                to="/perfil" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-medium text-lg text-nexo-blue py-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Mi Perfil
              </Link>
            ) : (
              <Link 
                to="/iniciar-sesion" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-medium text-lg text-nexo-dark hover:text-nexo-green py-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Iniciar Sesión
              </Link>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};