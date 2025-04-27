"use client"

import { useEffect, useRef } from "react"
import { X, Calendar, MapPin, Mail, Phone, Clock, Award, BookOpen } from "lucide-react"

const Modal = ({ isOpen, onClose, student }) => {
  const modalRef = useRef(null)

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      // Prevenir scroll del body
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Cerrar al hacer clic fuera del modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen || !student) return null

  // Datos extendidos (simulados)
  const studentExtended = {
    ...student,
    availability: student.availability || "Lunes a Viernes, 15:00 - 19:00",
    location: student.location || "Campus Central UPSA",
    email: student.email || "estudiante@upsa.edu.bo",
    phone: student.phone || "+591 77712345",
    experience: student.experience || "2 años de experiencia",
    subjects: student.subjects || ["Algoritmos", "Estructuras de Datos", "Programación Orientada a Objetos"],
    rating: student.rating || 4.8,
    reviews: student.reviews || 12,
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden relative animate-modal"
      >
        {/* Cabecera con degradado */}
        <div className="relative h-32 bg-gradient-to-r from-upsa-verde to-upsa-verde-claro">
          {/* Patrón decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-white/20 -mr-10 -mt-10" />
            <div className="absolute left-20 bottom-0 w-20 h-20 rounded-full bg-white/20 -mb-10" />
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Imagen de perfil (superpuesta) */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img
                  src={studentExtended.image || "/placeholder.svg?height=128&width=128"}
                  alt={studentExtended.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Insignia de calificación */}
              <div className="absolute -right-2 -top-2 bg-upsa-verde-amarillo text-upsa-verde font-bold text-sm rounded-full w-10 h-10 flex items-center justify-center border-2 border-white shadow-md">
                {studentExtended.rating}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="pt-20 px-6 pb-6">
          {/* Información básica */}
          <div className="text-center mb-6">
            <h2 id="modal-title" className="text-2xl font-bold text-upsa-verde mb-1">
              {studentExtended.name}
            </h2>
            <div className="inline-block px-3 py-1 bg-upsa-verde-amarillo/20 text-upsa-verde rounded-full text-sm font-medium mb-2">
              {studentExtended.skill}
            </div>
            <p className="text-gray-600">{studentExtended.description}</p>

            {/* Reseñas */}
            <div className="mt-2 text-sm text-gray-500 flex items-center justify-center">
              <div className="flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(studentExtended.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>{studentExtended.reviews} reseñas</span>
            </div>
          </div>

          {/* Detalles y contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-upsa-verde flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Disponibilidad
              </h3>
              <div className="flex items-start text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 mt-0.5 text-upsa-verde-claro flex-shrink-0" />
                <span>{studentExtended.availability}</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-upsa-verde-claro flex-shrink-0" />
                <span>{studentExtended.location}</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <Award className="w-4 h-4 mr-2 mt-0.5 text-upsa-verde-claro flex-shrink-0" />
                <span>{studentExtended.experience}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-upsa-verde flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Materias
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {studentExtended.subjects.map((subject, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-upsa-verde-amarillo mr-2"></div>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`mailto:${studentExtended.email}`}
              className="flex items-center justify-center bg-white border border-upsa-verde-claro text-upsa-verde-claro hover:bg-upsa-verde-claro/10 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </a>
            <a
              href={`tel:${studentExtended.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center bg-upsa-verde-claro hover:bg-upsa-verde text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Llamar
            </a>
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}

export default Modal
