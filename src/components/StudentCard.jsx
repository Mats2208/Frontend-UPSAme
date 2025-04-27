"use client"

import { useState } from "react"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

const StudentCard = ({ student, onViewProfile, compact = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Datos adicionales simulados para enriquecer la tarjeta
  const studentExtended = {
    ...student,
    availability: student.availability || "Lun-Vie, tardes",
    location: student.location || "Campus UPSA",
  }

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-xl transition-all duration-300 ${compact ? "p-3" : "p-4"} ${
        isHovered ? "shadow-lg transform translate-y-[-4px]" : "shadow"
      }`}
      style={{
        borderLeft: `4px solid ${isHovered ? "#A3C940" : "#00572D"}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full bg-upsa-verde-claro/5"
        style={{
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
      />

      <div className="relative z-10">
        {/* Cabecera con imagen y nombre */}
        <div className="flex items-center mb-3">
          <div className={`relative ${compact ? "mr-3" : "mr-4"}`}>
            <div
              className={`rounded-full overflow-hidden border-2 ${
                isHovered ? "border-upsa-verde-amarillo" : "border-upsa-verde-claro"
              } transition-colors`}
            >
              {typeof studentExtended.image === "string" ? (
                <img
                  src={studentExtended.image}
                  alt={studentExtended.name}
                  className={`object-cover ${compact ? "w-16 h-16" : "w-20 h-20"}`}
                />
              ) : (
                <div className={`flex items-center justify-center bg-gray-100 ${compact ? "w-16 h-16" : "w-20 h-20"}`}>
                  {studentExtended.image}
                </div>
              )}
            </div>

            {/* Indicador de estado (simulado) */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1">
            <h3 className={`font-bold text-upsa-verde ${compact ? "text-base" : "text-xl"} leading-tight`}>
              {studentExtended.name}
            </h3>
            <div
              className={`inline-block mt-1 px-2 py-0.5 bg-upsa-verde-amarillo/20 text-upsa-verde rounded-full ${
                compact ? "text-xs" : "text-sm"
              } font-medium`}
            >
              {studentExtended.skill}
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className={`text-gray-600 mb-3 ${compact ? "text-xs line-clamp-2" : "text-sm"}`}>
          {studentExtended.description}
        </p>

        {/* Detalles adicionales */}
        <div className={`grid ${compact ? "grid-cols-1 gap-1 mb-2" : "grid-cols-2 gap-2 mb-3"}`}>
          <div className="flex items-center">
            <Calendar className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-upsa-verde-claro mr-1.5`} />
            <span className={`text-gray-600 ${compact ? "text-xs" : "text-sm"}`}>{studentExtended.availability}</span>
          </div>
          <div className="flex items-center">
            <MapPin className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-upsa-verde-claro mr-1.5`} />
            <span className={`text-gray-600 ${compact ? "text-xs" : "text-sm"}`}>{studentExtended.location}</span>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={onViewProfile}
          className={`w-full flex items-center justify-center ${
            isHovered ? "bg-upsa-verde text-white" : "bg-white text-upsa-verde-claro border border-upsa-verde-claro"
          } ${compact ? "text-xs py-1.5" : "text-sm py-2"} px-4 rounded-lg font-medium transition-colors group`}
        >
          Ver Perfil
          <ArrowRight
            className={`ml-1.5 ${compact ? "w-3 h-3" : "w-4 h-4"} transition-transform group-hover:translate-x-1`}
          />
        </button>
      </div>

      {/* Barra de progreso (simulada) */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className="h-full bg-upsa-verde-amarillo transition-all duration-500 ease-out"
          style={{ width: isHovered ? "100%" : "0%" }}
        />
      </div>
    </div>
  )
}

export default StudentCard
