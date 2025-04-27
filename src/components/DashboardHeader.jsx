import { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, User, Home, MessageSquare, 
  PanelsTopLeft,UserPen, LogOut, FileText, Calendar, Users 
} from 'lucide-react';

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUserString = sessionStorage.getItem('user');
      if (!storedUserString || storedUserString === "undefined") {
        setUser(null);
      } else {
        const storedUser = JSON.parse(storedUserString);
        setUser({
          ...storedUser,
          avatar: null // 🔥 No hay avatar, así mostramos ícono por defecto
        });
      }
    } catch (error) {
      console.error("Error parsing user from sessionStorage:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/'; // 🔥 Redirigir a raíz
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-[var(--upsa-verde)] text-white p-1.5 rounded-md">
            <span className="font-bold text-xl">U</span>
          </div>
          <h1 className="text-xl font-bold text-[var(--upsa-verde)]">
            UPSAme <span className="text-sm font-normal text-[var(--upsa-gris)]">Dashboard</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <NavLink href="/dashboard" Icon={PanelsTopLeft} label="Landing Page" />
          <NavLink href="/" Icon={Home} label="Home" />
          <NavLink href="/dashboard/calendar" Icon={Calendar} label="Calendario" />
          <NavLink href="/Profile" Icon={UserPen} label="Perfil" />
        </nav>

        {/* User controls */}
            <div className="hidden md:flex items-center gap-4">

            {/* Messages */}
            <a href="/dashboard/messages" className="p-1.5 rounded-full hover:bg-[var(--upsa-gris-claro)] transition-colors">
                <MessageSquare className="w-5 h-5 text-[var(--upsa-verde)]" />
            </a>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
                <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-[var(--upsa-gris-claro)] transition-colors"
                aria-label="User Menu"
                >
                {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-[var(--upsa-verde)]" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--upsa-verde-claro)] flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                    </div>
                )}
                <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-[var(--upsa-verde)]">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-[var(--upsa-gris)]">Estudiante</p>
                </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[var(--upsa-gris-medio)] z-50">
                    <div className="px-4 py-2 text-[var(--upsa-verde)] font-semibold">
                    {user.firstName} {user.lastName}
                    </div>
                    <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full text-left gap-2 px-4 py-2 text-sm text-[var(--upsa-rojo)] hover:bg-[var(--upsa-gris-claro)] transition-colors"
                    >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                    </button>
                </div>
                )}
            </div>
            </div>
        {/* Mobile User Controls */}
        <div className="flex items-center gap-4 md:hidden">

        {/* Messages */}
        <a href="/dashboard/messages" className="p-1.5 rounded-full hover:bg-[var(--upsa-gris-claro)] transition-colors">
            <MessageSquare className="w-5 h-5 text-[var(--upsa-verde)]" />
        </a>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
            <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[var(--upsa-gris-claro)] transition-colors"
            aria-label="User Menu"
            >
            {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-[var(--upsa-verde)]" />
            ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--upsa-verde-claro)] flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
                </div>
            )}
            </button>
                {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[var(--upsa-gris-medio)] z-50">
                    <div className="px-4 py-2 text-[var(--upsa-verde)] font-semibold">
                    {user.firstName} {user.lastName}
                    </div>
                    <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full text-left gap-2 px-4 py-2 text-sm text-[var(--upsa-rojo)] hover:bg-[var(--upsa-gris-claro)] transition-colors"
                    >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                    </button>
                </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

/* Componentes de apoyo */
const NavLink = ({ href, Icon, label }) => (
  <a href={href} className="flex items-center gap-1.5 text-[var(--upsa-verde)] hover:text-[var(--upsa-verde-claro)] transition-colors">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </a>
);

export default DashboardHeader;
