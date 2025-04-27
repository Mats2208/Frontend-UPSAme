import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, CheckCircle, Mail } from 'lucide-react';

const BACKEND_URL = "http://127.0.0.1:5000"; // Servidor local Flask

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      identifier: activeTab === "email" ? email : studentId,
      password: password
    };
  
    if (!loginData.identifier || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Error de inicio de sesión.");
      }
    } catch (error) {
      alert("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-upsa-verde-claro to-upsa-verde-amarillo p-4 relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-upsa-verde-claro rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-upsa-verde-amarillo rounded-full -ml-10 -mb-10" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-0 w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-upsa-verde to-upsa-verde-claro rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-upsa-verde mt-4">Bienvenido de nuevo</h1>
          <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "email"
                ? "text-upsa-verde-claro border-b-2 border-upsa-verde-claro"
                : "text-gray-500 hover:text-upsa-verde"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Email
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "student"
                ? "text-upsa-verde-claro border-b-2 border-upsa-verde-claro"
                : "text-gray-500 hover:text-upsa-verde"
            }`}
            onClick={() => setActiveTab("student")}
          >
            Estudiante
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          {activeTab === "email" && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@upsa.edu.bo"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "student" && (
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-sm font-medium text-gray-700">Número de estudiante</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="studentId"
                  type="text"
                  placeholder="Ej: 2025111222"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Campo de contraseña común */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Recordarme */}
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-upsa-verde-claro focus:ring-upsa-verde-claro"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Recordar mi sesión
            </label>
          </div>

          <button
            type="submit"
            className={`w-full bg-upsa-verde-claro hover:bg-upsa-verde text-white py-2 rounded-md font-semibold transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-upsa-verde-claro hover:text-upsa-verde font-medium hover:underline">
              Regístrate
            </a>
          </div>
        </form>
      </div>

      {/* Beneficios */}
      <div className="hidden lg:block fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100 max-w-xs">
        <h3 className="text-sm font-bold text-upsa-verde flex items-center mb-2">
          <CheckCircle className="w-4 h-4 text-upsa-verde-claro mr-2" />
          Beneficios de UPSAme
        </h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li className="flex items-start">
            <CheckCircle className="w-3 h-3 text-upsa-verde-claro mr-1 mt-0.5" />
            <span>Encuentra compañeros de estudio fácilmente</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-3 h-3 text-upsa-verde-claro mr-1 mt-0.5" />
            <span>Enseña y aprende al mismo tiempo</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-3 h-3 text-upsa-verde-claro mr-1 mt-0.5" />
            <span>Mejora tu rendimiento académico</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
