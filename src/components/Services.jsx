import { Link } from 'react-router-dom';
import servicioPsicoterapia from '../assets/servicio-psicoterapia.png';
import servicioVocacional from '../assets/servicio-vocacional.png';
import servicioPareja from '../assets/servicio-pareja.png';

export const Services = () => {
  const servicesList = [
    {
      title: "Psicoterapia Individual",
      image: servicioPsicoterapia,
      href: "/terapia"
    },
    {
      title: "Orientación Vocacional",
      image: servicioVocacional,
      href: "/orientacion-vocacional"
    },
    {
      title: "Terapia de Pareja",
      image: servicioPareja,
      href: "/terapia"
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-white">
      {/* Convertimos el contenedor en flex-col para usar la propiedad "order" */}
      <div className="max-w-6xl mx-auto flex flex-col">
        
        {/* Encabezado de la sección (Orden 1 siempre) */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 order-1">
          <h2 className="text-3xl md:text-4xl font-semibold text-nexo-dark mb-4">
            ¿Cómo podemos acompañarte hoy?
          </h2>
          <p className="text-lg text-nexo-dark/80">
            Desde procesos terapéuticos individuales hasta formación para profesionales, ofrecemos diversos caminos hacia el bienestar.
          </p>
        </div>

        {/* Grilla de Servicios (Orden 3 en mobile, Orden 2 en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-0 md:mb-12 order-3 md:order-2">
          {servicesList.map((service, index) => (
            <Link 
              key={index} 
              to={service.href}
              className="relative h-[400px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 block"
            >
              {/* Imagen con efecto Zoom al hacer hover */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradiente oscuro inferior para asegurar lectura del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-nexo-dark/90 via-nexo-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Texto posicionado abajo */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex items-end">
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón "Ver todos los servicios" (Orden 2 en mobile, Orden 3 en desktop) */}
        <div className="flex justify-center mb-10 md:mb-0 order-2 md:order-3">
          <Link 
            to="/servicios" 
            className="inline-block border-2 border-nexo-blue text-nexo-blue px-8 py-3 rounded-lg font-semibold hover:bg-nexo-blue hover:text-white transition-all duration-300"
          >
            Ver todos los servicios
          </Link>
        </div>

      </div>
    </section>
  );
};