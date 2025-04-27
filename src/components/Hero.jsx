import buhosImage from '../assets/HERO-UPSA.png';


const Hero = () => {
    return (
      <section className="bg-gradient-to-b from-upsa-gris-claro to-white text-upsa-verde min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
  
          {/* Imagen de los búhos */}
          <img 
            src={buhosImage}
            alt="Búhos sobre libro UPSA" 
            className="mx-auto mb-8 max-w-xs md:max-w-md drop-shadow-lg" 
          />
  
          {/* Texto principal */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Aprende y enseña en <span className="text-upsa-verde-claro">UPSAme</span>
          </h1>
  
          {/* Subtítulo */}
          <p className="text-lg md:text-xl mb-8">
            Encuentra compañeros para compartir conocimientos, mejorar habilidades y crecer juntos.
          </p>
  
          {/* Botón de acción */}
          <a
            href="#BuscarAlumnos"
            id = "BuscarAlumnos" className="inline-block bg-upsa-verde-claro hover:bg-upsa-verde transition-colors px-8 py-3 rounded-lg font-medium text-white"
          >
            Empezar ahora
          </a>
  
        </div>
      </section>
    );
  };
  
  export default Hero;
  