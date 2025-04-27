import { useState, useEffect } from "react"
import { Users, GraduationCap, TrendingUp, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Encuentra compañeros fácilmente",
      description: "Conecta rápido con otros estudiantes que comparten tus intereses y necesidades académicas.",
      stats: "500+ estudiantes activos",
      features: ["Búsqueda por materia", "Filtros avanzados", "Perfiles verificados"],
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Enseña y aprende al mismo tiempo",
      description: "Comparte tus conocimientos y fortalezas mientras aprendes nuevas habilidades de otros.",
      stats: "25+ áreas de conocimiento",
      features: ["Intercambio de conocimientos", "Sesiones flexibles", "Aprendizaje personalizado"],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Crece académicamente",
      description: "Mejora tus habilidades, expande tu red académica y prepárate para futuros retos profesionales.",
      stats: "30% mejor rendimiento",
      features: ["Seguimiento de progreso", "Certificaciones", "Recomendaciones"],
    },
  ]

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      if (!isAnimating) nextBenefit()
    }, 5000)
    return () => clearInterval(interval)
  }, [isMobile, activeIndex, isAnimating])

  const nextBenefit = () => {
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === benefits.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevBenefit = () => {
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? benefits.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-upsa-verde-claro rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-upsa-verde-amarillo rounded-full -ml-10 -mb-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Título */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-upsa-verde-amarillo/20 text-upsa-verde px-4 py-1 rounded-full text-sm font-medium mb-3">
            BENEFICIOS EXCLUSIVOS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir{" "}
            <span className="text-upsa-verde-claro relative">
              UPSAme
              <span className="absolute bottom-0 left-0 w-full h-1 bg-upsa-verde-amarillo"></span>
            </span>
            ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma está diseñada para potenciar tu experiencia universitaria a través del aprendizaje colaborativo entre estudiantes.
          </p>
        </div>

        {/* Mobile: Carrusel */}
        {isMobile && (
          <div className="md:hidden relative px-4">
            {/* Controles */}
            <button
              onClick={prevBenefit}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-upsa-verde-claro hover:text-white transition"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextBenefit}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-upsa-verde-claro hover:text-white transition"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Carrusel */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-6">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center flex flex-col items-center h-full">
                      <div className="bg-gradient-to-br from-upsa-verde to-upsa-verde-claro text-white p-4 rounded-xl mb-6 shadow-lg">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-upsa-verde mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 mb-5">{benefit.description}</p>
                      <div className="bg-upsa-verde-amarillo/10 text-upsa-verde font-semibold px-4 py-2 rounded-full text-sm mb-5">
                        {benefit.stats}
                      </div>
                      <ul className="space-y-2 text-gray-600 text-left w-full max-w-xs mx-auto">
                        {benefit.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-upsa-verde-claro mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 space-x-2">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true)
                    setActiveIndex(index)
                    setTimeout(() => setIsAnimating(false), 500)
                  }}
                  className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-upsa-verde-claro" : "w-2.5 bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop: Grid */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border border-gray-100 text-center flex flex-col items-center"
              >
                <div className="bg-gradient-to-br from-upsa-verde to-upsa-verde-claro text-white p-4 rounded-xl mb-6 shadow-md group-hover:scale-110 transform transition">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-upsa-verde mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-5">{benefit.description}</p>
                <div className="bg-upsa-verde-amarillo/10 text-upsa-verde font-semibold px-4 py-2 rounded-full text-sm mb-5">
                  {benefit.stats}
                </div>
                <ul className="space-y-2 text-gray-600 text-left w-full max-w-xs mx-auto">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-upsa-verde-claro mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href="/register"
            className="inline-block bg-upsa-verde-claro hover:bg-upsa-verde text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            Únete ahora
          </a>
          <p className="text-gray-500 text-sm mt-3">Más de 1,000 estudiantes ya están conectados</p>
        </div>
      </div>
    </section>
  )
}

export default Benefits
