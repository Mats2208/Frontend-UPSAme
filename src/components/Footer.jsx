"use client"

import { useState, useEffect } from "react"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ChevronDown, ChevronUp, Send } from "lucide-react"

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [email, setEmail] = useState("")

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para suscribir al newsletter
    alert(`Te has suscrito con el email: ${email}`)
    setEmail("")
  }

  // Datos para las secciones del footer
  const footerSections = [
    {
      id: "about",
      title: "Sobre UPSAme",
      links: [
        { text: "Quiénes somos", href: "#" },
        { text: "Nuestra misión", href: "#" },
        { text: "Cómo funciona", href: "#" },
        { text: "Testimonios", href: "#" },
      ],
    },
    {
      id: "resources",
      title: "Recursos",
      links: [
        { text: "Buscar alumnos", href: "#buscar" },
        { text: "Materias disponibles", href: "#" },
        { text: "Preguntas frecuentes", href: "#" },
        { text: "Blog educativo", href: "#" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        { text: "Términos de servicio", href: "#" },
        { text: "Política de privacidad", href: "#" },
        { text: "Política de cookies", href: "#" },
        { text: "Aviso legal", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-upsa-verde to-upsa-verde-claro text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-upsa-verde-amarillo opacity-5 rounded-full -ml-32 -mb-32" />

      <div className="relative z-10">
        {/* Sección principal */}
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo y descripción */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-upsa-verde-amarillo text-upsa-verde font-bold p-2 rounded-lg text-xl">U</div>
                <div>
                  <h2 className="text-2xl font-bold">UPSAme</h2>
                  <p className="text-sm text-upsa-verde-amarillo">Aprende y enseña con nosotros</p>
                </div>
              </div>
              <p className="text-gray-200 text-sm mt-4 max-w-md">
                Plataforma de aprendizaje colaborativo entre estudiantes de la Universidad Privada de Santa Cruz de la
                Sierra. Conectamos talentos y facilitamos el intercambio de conocimientos.
              </p>

              {/* Información de contacto */}
              <div className="space-y-2 mt-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-upsa-verde-amarillo mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Av. Paraguá y 4to. Anillo, Santa Cruz de la Sierra, Bolivia
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-upsa-verde-amarillo mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-200">+591 3 346 4000</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-upsa-verde-amarillo mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-200">contacto@upsame.edu.bo</span>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="bg-white/10 p-2.5 rounded-full hover:bg-upsa-verde-amarillo hover:text-upsa-verde transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-2.5 rounded-full hover:bg-upsa-verde-amarillo hover:text-upsa-verde transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-2.5 rounded-full hover:bg-upsa-verde-amarillo hover:text-upsa-verde transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Enlaces - Versión móvil (acordeón) */}
            {isMobile && (
              <div className="md:hidden space-y-2 col-span-1">
                {footerSections.map((section) => (
                  <div key={section.id} className="border-b border-white/10 pb-2">
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-medium"
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={expandedSection === section.id}
                    >
                      {section.title}
                      {expandedSection === section.id ? (
                        <ChevronUp className="h-5 w-5 text-upsa-verde-amarillo" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-upsa-verde-amarillo" />
                      )}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedSection === section.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2 pb-3">
                          {section.links.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link.href}
                                className="text-gray-300 hover:text-upsa-verde-amarillo transition-colors text-sm block py-1"
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enlaces - Versión desktop */}
            {!isMobile && (
              <>
                {footerSections.map((section) => (
                  <div key={section.id} className="hidden md:block md:col-span-2">
                    <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-gray-300 hover:text-upsa-verde-amarillo transition-colors text-sm"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} TECNOUPSA 2025 - Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-upsa-verde-amarillo transition-colors">
                Mapa del sitio
              </a>
              <span>|</span>
              <a href="#" className="hover:text-upsa-verde-amarillo transition-colors">
                Accesibilidad
              </a>
              <span>|</span>
              <a href="/login" className="hover:text-upsa-verde-amarillo transition-colors">
                Iniciar sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
