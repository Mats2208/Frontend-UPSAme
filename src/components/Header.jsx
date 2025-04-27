import { useState } from 'react';
import { Menu, X, User, Home, Search, MessageSquare } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-upsa-verde text-white p-1.5 rounded-md">
            <span className="font-bold text-xl">U</span>
          </div>
          <h1 className="text-xl font-bold text-upsa-verde">UPSAme</h1>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="flex items-center gap-1.5 text-upsa-verde hover:text-upsa-verde-claro transition-colors">
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </a>
          <a href="#BuscarAlumnos" className="flex items-center gap-1.5 text-upsa-verde hover:text-upsa-verde-claro transition-colors">
            <Search className="w-4 h-4" />
            <span>Buscar Alumnos</span>
          </a>
          <a href="/login" className="flex items-center gap-1.5 text-upsa-verde hover:text-upsa-verde-claro transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>Mensajes</span>
          </a>
          <a href="/Profile" className="flex items-center gap-1.5 text-upsa-verde hover:text-upsa-verde-claro transition-colors">
            <User className="w-4 h-4" />
            <span>Perfil</span>
          </a>
        </nav>

        {/* Botón Mi cuenta */}
        <div className="hidden md:block">
          <a
            href="/login"
            className="bg-upsa-verde text-white px-5 py-2 rounded-lg hover:bg-upsa-verde-claro transition-colors flex items-center gap-2 font-medium"
          >
            <User className="w-4 h-4" />
            Mi cuenta
          </a>
        </div>

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md hover:bg-upsa-gris-claro transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-6 h-6 text-upsa-verde" /> : <Menu className="w-6 h-6 text-upsa-verde" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 pt-2 space-y-3 border-t border-upsa-gris-claro">
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-upsa-gris-claro text-upsa-verde hover:text-upsa-verde-claro transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Inicio</span>
          </a>
          <a
            href="#BuscarAlumnos"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-upsa-gris-claro text-upsa-verde hover:text-upsa-verde-claro transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Buscar Alumnos</span>
          </a>
          <a
            href="/login"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-upsa-gris-claro text-upsa-verde hover:text-upsa-verde-claro transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Mensajes</span>
          </a>
          <a
            href="/Profile"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-upsa-gris-claro text-upsa-verde hover:text-upsa-verde-claro transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </a>
          <a
            href="/login"
            className="w-full bg-upsa-verde text-white py-2.5 rounded-lg hover:bg-upsa-verde-claro transition-colors mt-4 flex items-center justify-center gap-2 font-medium"
          >
            <User className="w-4 h-4" />
            Mi cuenta
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
