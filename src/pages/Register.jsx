import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Mail, ChevronLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  
    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          studentId: formData.studentId || null,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("¡Cuenta creada exitosamente!");
        navigate("/login"); // Después de registrar, lo mandas al login
      } else {
        alert(data.message || "Error al registrarse.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/login");
    }
  };

  const goNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Por favor completa todos los campos de este paso.");
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-upsa-verde-claro to-upsa-verde-amarillo p-4 relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-upsa-verde-claro rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-upsa-verde-amarillo rounded-full -ml-10 -mb-10" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border-0 w-full max-w-md mx-auto relative z-10">
        {/* Cabecera con botón de retroceso */}
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            aria-label="Volver"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-upsa-verde">Crear cuenta</h1>
          </div>
          <div className="w-8"></div> {/* Espacio para equilibrar el diseño */}
        </div>

        {/* Indicador de progreso */}
        <div className="flex justify-between mb-6">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-upsa-verde-claro' : 'bg-gray-200'}`}></div>
          <div className="w-1"></div>
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-upsa-verde-claro' : 'bg-gray-200'}`}></div>
          <div className="w-1"></div>
          <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-upsa-verde-claro' : 'bg-gray-200'}`}></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Paso 1: Información personal */}
          {step === 1 && (
            <>
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  Nombre <span className="text-upsa-rojo">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Apellido <span className="text-upsa-rojo">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Tu apellido"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico <span className="text-upsa-rojo">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tucorreo@upsa.edu.bo"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Usaremos tu correo para iniciar sesión</p>
              </div>
              
              <button
                type="button"
                onClick={goNext}
                className="w-full bg-upsa-verde-claro hover:bg-upsa-verde text-white py-3 rounded-md font-semibold transition-all"
              >
                Continuar
              </button>
            </>
          )}

          {/* Paso 2: Contraseña y datos de estudiante */}
          {step === 2 && (
            <>
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña <span className="text-upsa-rojo">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className={`text-xs ${formData.password.length >= 8 ? 'text-upsa-verde-claro' : 'text-gray-500'}`}>
                    <CheckCircle className={`inline w-3 h-3 mr-1 ${formData.password.length >= 8 ? 'text-upsa-verde-claro' : 'text-gray-400'}`} />
                    Mínimo 8 caracteres
                  </div>
                  <div className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-500'}`}>
                    <CheckCircle className={`inline w-3 h-3 mr-1 ${/[A-Z]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-400'}`} />
                    Una mayúscula
                  </div>
                  <div className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-500'}`}>
                    <CheckCircle className={`inline w-3 h-3 mr-1 ${/[0-9]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-400'}`} />
                    Un número
                  </div>
                  <div className={`text-xs ${/[!@#$%^&*]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-500'}`}>
                    <CheckCircle className={`inline w-3 h-3 mr-1 ${/[!@#$%^&*]/.test(formData.password) ? 'text-upsa-verde-claro' : 'text-gray-400'}`} />
                    Un símbolo
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmar contraseña <span className="text-upsa-rojo">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-upsa-rojo mt-1">Las contraseñas no coinciden</p>
                )}
              </div>
              
              <div className="space-y-1">
                <label htmlFor="studentId" className="text-sm font-medium text-gray-700">
                  Número de estudiante <span className="text-gray-400">(opcional)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    placeholder="Ej: 202312345"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro focus:border-transparent"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Si eres estudiante de UPSA, ingresa tu número</p>
              </div>
              
              <button
                type="button"
                onClick={goNext}
                className="w-full bg-upsa-verde-claro hover:bg-upsa-verde text-white py-3 rounded-md font-semibold transition-all"
                disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
              >
                Continuar
              </button>
            </>
          )}

          {/* Paso 3: Términos y condiciones, finalizar */}
          {step === 3 && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h3 className="text-sm font-medium text-upsa-verde mb-2">Resumen de tu información</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nombre:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  {formData.studentId && <p><span className="font-medium">Estudiante:</span> {formData.studentId}</p>}
                </div>
              </div>
              
              <div className="flex items-start space-x-2 mb-6">
                <div className="flex h-5 items-center">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-upsa-verde-claro focus:ring-upsa-verde-claro"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  Acepto los <a href="/terms" className="text-upsa-verde-claro hover:underline">Términos y Condiciones</a> y la <a href="/privacy" className="text-upsa-verde-claro hover:underline">Política de Privacidad</a> de UPSAme.
                </label>
              </div>
              
              <button
                type="submit"
                className={`w-full bg-upsa-verde-claro hover:bg-upsa-verde text-white py-3 rounded-md font-semibold transition-all ${
                  isLoading || !formData.acceptTerms ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !formData.acceptTerms}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Al registrarte, aceptas recibir comunicaciones de UPSAme relacionadas con tu cuenta y el servicio.
              </p>
            </>
          )}
        </form>

        {/* Enlace para volver al login */}
        <div className="text-center text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-upsa-verde-claro hover:text-upsa-verde font-medium hover:underline"
          >
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;