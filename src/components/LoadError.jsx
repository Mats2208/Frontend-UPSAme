import Error from '../assets/Error.png';

export default function LoadError(){
    return (
      <section className="bg-gradient-to-b from-upsa-gris-claro to-white text-upsa-verde min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
  
          {/* Imagen de los búhos */}
          <img 
            src={Error}
            alt="Búhos sobre libro UPSA" 
            className="mx-auto mb-8 max-w-xs md:max-w-md drop-shadow-lg" 
          />
  
          {/* Mensaje de carga */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cargando datos de <span className="text-upsa-verde-claro">usuario...</span>
          </h1>
  
          {/* Subtítulo */}
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Parece que no has iniciado sesión. ¡Únete a nosotros para empezar a aprender y enseñar!
          </p>
  
          {/* Botón de Iniciar Sesión */}
          <a
            href="/login"
            className="inline-block bg-upsa-verde-claro hover:bg-upsa-verde transition-colors px-8 py-3 rounded-lg font-medium text-white"
          >
            Iniciar Sesión
          </a>
  
        </div>
      </section>
    );
}