import Logo from '../assets/hero-image.png'

import { useState, useEffect, useRef } from "react"
import StudentCard from "./StudentCard"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Modal from "./Modal"

// Datos de prueba
const students = [
  {
    id: 1,
    name: "Mateo Soto",
    skill: "Programación en C++",
    description: "Te enseño estructuras de datos y lógica de programación.",
    image: Logo,
  },
  {
    id: 2,
    name: "Maria Fernanda Sanchez",
    skill: "Sistemas Digitales",
    description: "Te enseño estructuras de datos y lógica de programación.",
    image: Logo,
  },
  {
    id: 3,
    name: "Carlos Zambrana",
    skill: "Estadística",
    description: "Te enseño estructuras de datos y lógica de programación.",
    image: Logo,
  },
  {
    id: 4,
    name: "Flavia Lozada",
    skill: "Contabilidad de Costos",
    description: "Te enseño estructuras de datos y lógica de programación.",
    image: Logo,
  },
]

const StudentsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Extraer habilidades únicas
  const uniqueSkills = [...new Set(students.map((student) => student.skill))]

  // Filtro de estudiantes
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSkill = selectedSkill === "" || student.skill === selectedSkill
    return matchesSearch && matchesSkill
  })

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Autoplay en móvil
  useEffect(() => {
    if (!isMobile || !isAutoPlaying || filteredStudents.length === 0) return
    const play = () => {
      autoPlayRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === filteredStudents.length - 1 ? 0 : prevIndex + 1))
      }, 3000)
    }
    play()
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    }
  }, [currentIndex, isAutoPlaying, isMobile, filteredStudents.length])

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextStudent = () => {
    pauseAutoPlay()
    setCurrentIndex((prevIndex) => (prevIndex === filteredStudents.length - 1 ? 0 : prevIndex + 1))
  }

  const prevStudent = () => {
    pauseAutoPlay()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredStudents.length - 1 : prevIndex - 1))
  }

  const goToStudent = (index) => {
    pauseAutoPlay()
    setCurrentIndex(index)
  }

  // Modal funciones
  const handleOpenModal = (student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedStudent(null)
    setIsModalOpen(false)
  }

  return (
    <section className="py-12 md:py-20 bg-upsa-gris-claro">
      <div  className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2  className="text-3xl md:text-4xl font-bold text-upsa-verde mb-2 md:mb-4">
            Busca un compañero para aprender
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Conecta con otros estudiantes que pueden ayudarte a dominar nuevas habilidades.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 md:mb-10 flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o habilidad..."
              className="pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-upsa-verde-claro focus:border-upsa-verde-claro transition-all text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-upsa-verde-claro focus:border-upsa-verde-claro bg-white text-sm md:text-base"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">Todas las habilidades</option>
              {uniqueSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4 md:mb-6">
          <p className="text-sm md:text-base text-gray-600">
            {filteredStudents.length === 0
              ? "No se encontraron estudiantes con esos criterios"
              : `Mostrando ${filteredStudents.length} ${filteredStudents.length === 1 ? "estudiante" : "estudiantes"}`}
          </p>
        </div>

        {/* Carrusel / Grid */}
        {filteredStudents.length > 0 && (
          <>
            {/* Carrusel móvil */}
            <div className={`sm:hidden ${filteredStudents.length > 0 ? "block" : "hidden"}`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                  <button
                    onClick={prevStudent}
                    className="bg-white/80 hover:bg-white rounded-full p-1 shadow-md text-upsa-verde-claro"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>

                <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                  <button
                    onClick={nextStudent}
                    className="bg-white/80 hover:bg-white rounded-full p-1 shadow-md text-upsa-verde-claro"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div ref={carouselRef} className="overflow-hidden px-8">
                  <div
                    className="transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <div className="flex">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="w-full flex-shrink-0 px-1">
                          <StudentCard student={student} compact={true} onViewProfile={() => handleOpenModal(student)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                {filteredStudents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStudent(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? "w-6 bg-upsa-verde-claro" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Estudiante ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Grid en desktop */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeIn 0.5s ease-out forwards",
                  }}
                >
                  <StudentCard student={student} onViewProfile={() => handleOpenModal(student)} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* No resultados */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-10 md:py-16 bg-white rounded-lg shadow-sm">
            <p className="text-lg md:text-xl text-gray-600">No se encontraron estudiantes con esos criterios.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedSkill("")
              }}
              className="mt-3 md:mt-4 px-5 md:px-6 py-2 bg-upsa-verde-claro text-white rounded-lg hover:bg-upsa-verde transition-colors text-sm md:text-base"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Botón Ver más */}
        {filteredStudents.length > 0 && (
          <div className="text-center mt-8 md:mt-12">
            <button className="px-6 md:px-8 py-2 md:py-3 bg-upsa-verde-amarillo text-upsa-verde font-semibold rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 text-sm md:text-base">
              Ver más estudiantes
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} student={selectedStudent} />
      </div>

      {/* Animación fadeIn */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  )
}

export default StudentsGrid
