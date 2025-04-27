"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, User, BookOpen, Clock, ChevronDown, X, Edit, Trash, Settings, Bell, Search } from "lucide-react"

const BACKEND_URL = "http://127.0.0.1:5000" // Servidor local Flask

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [gigs, setGigs] = useState([])
  const [newGig, setNewGig] = useState({
    title: "",
    description: "",
    level: "",
    availability: "",
  })
  const [showGigForm, setShowGigForm] = useState(false)
  const [editingGig, setEditingGig] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [gigToDelete, setGigToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("gigs")

  // Cargar usuario y gigs al entrar
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"))
    if (!userData) {
      navigate("/login") // Si no hay sesión, redirigir a login
      return
    }
    setUser(userData)
    fetchUserGigs(userData.email) // O por studentId
  }, [navigate])

  const fetchUserGigs = async (email) => {
    try {
      const response = await fetch(`${BACKEND_URL}/gigs?email=${email}`)
      const data = await response.json()
      setGigs(data.gigs || []) // data.gigs es un array
    } catch (error) {
      console.error("Error al cargar gigs:", error)
    }
  }

  const handleCreateGig = async (e) => {
    e.preventDefault()

    if (!newGig.title || !newGig.description) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/gigs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // o studentId si prefieres
          ...newGig,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        fetchUserGigs(user.email)
        setShowGigForm(false)
        setNewGig({ title: "", description: "", level: "", availability: "" })
      } else {
        alert(data.message || "Error al crear el anuncio.")
      }
    } catch (error) {
      console.error(error)
      alert("Error de conexión.")
    } finally {
      setIsLoading(false)
    }
  }

const handleEditGig = async (e) => {
    e.preventDefault()

    if (!editingGig.title?.trim() || !editingGig.description?.trim()) {
      alert("Por favor completa todos los campos antes de guardar.")
      return
    }
  
    setIsLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/gigs/${editingGig.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGig),
      })
      const data = await res.json()
  
      if (res.ok) {
        // Refrescar lista y cerrar modal
        fetchUserGigs(user.email)
        setShowEditForm(false)
        setEditingGig(null)
      } else {
        alert(data.message || "Error al editar el anuncio.")
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err)
      alert("Error de conexión.")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Eliminar un anuncio
  const handleDeleteGig = async () => {
    if (!gigToDelete) return
  
    // Opcional: pregunta de confirmación extra
    if (!window.confirm("¿Estás seguro de eliminar este anuncio?")) return
  
    setIsLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/gigs/${gigToDelete}`, {
        method: "DELETE",
      })
      const data = await res.json()
  
      if (res.ok) {
        fetchUserGigs(user.email)
        setGigToDelete(null)
      } else {
        alert(data.message || "Error al eliminar el anuncio.")
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err)
      alert("Error de conexión.")
    } finally {
      setIsLoading(false)
    }
  }
 
  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/login")
  }

  const handDashboard = () => {
    navigate("/Dashboard")
  }

  const getLevelColor = (level) => {
    if (!level) return "bg-gray-100 text-gray-600"

    level = level.toLowerCase()
    if (level.includes("básico") || level.includes("basico") || level.includes("principiante")) {
      return "bg-green-100 text-green-700"
    } else if (level.includes("intermedio") || level.includes("medio")) {
      return "bg-blue-100 text-blue-700"
    } else if (level.includes("avanzado")) {
      return "bg-purple-100 text-purple-700"
    }
    return "bg-gray-100 text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <div className="max-w-6xl mx-auto">
          {/* Header moderno */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="text-upsa-verde-claro font-bold text-xl">UPSAme</div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-upsa-verde-claro/10 flex items-center justify-center text-upsa-verde-claro">
                    <User className="w-4 h-4" />
                  </div>
                  <button
                    onClick={handDashboard}
                    className="ml-2 text-gray-600 hover:text-upsa-rojo text-sm font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-gray-600 hover:text-upsa-rojo text-sm font-medium"
                  >
                    Salir
                  </button>
                </div>
                <div className="md:hidden flex items-center">
                  <button className="p-2 text-gray-500 hover:text-upsa-verde-claro hover:bg-gray-100 rounded-full">
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Contenido principal */}
          <main className="px-4 sm:px-6 py-6">
            {/* Perfil del usuario */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-upsa-verde-claro to-upsa-verde-amarillo flex items-center justify-center text-white shadow-md">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => setShowGigForm(true)}
                    className="flex items-center gap-2 bg-upsa-verde-claro hover:bg-upsa-verde text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow"
                  >
                    <Plus className="w-4 h-4" /> Crear Anuncio
                  </button>
                </div>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en mis anuncios..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tabs de navegación */}
            <div className="flex mb-6 bg-white rounded-xl shadow-sm p-1">
              <button
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "gigs"
                    ? "bg-upsa-verde-claro/10 text-upsa-verde-claro"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("gigs")}
              >
                Mis Anuncios
              </button>

              {/* No tengo tiempo para conectar la configuracion de la cuenta con el backend LMAO */}
              {/* <button
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "settings"
                    ? "bg-upsa-verde-claro/10 text-upsa-verde-claro"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Configuración
              </button> */}
            </div>

            {/* Formulario de nuevo gig */}
            {showGigForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-lg font-bold text-gray-900">Crear nuevo anuncio</h2>
                    <button
                      onClick={() => setShowGigForm(false)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateGig} className="p-6 space-y-5">
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-700">
                        Título del Anuncio <span className="text-upsa-rojo">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro/50 focus:border-transparent"
                        value={newGig.title}
                        onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                        placeholder="¿Qué materia enseñas?"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-700">
                        Descripción <span className="text-upsa-rojo">*</span>
                      </label>
                      <textarea
                        className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro/50 focus:border-transparent"
                        value={newGig.description}
                        onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                        placeholder="Describe tu clase, experiencia, metodología, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-700">Nivel</label>
                        <select
                          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro/50 focus:border-transparent appearance-none bg-white"
                          value={newGig.level}
                          onChange={(e) => setNewGig({ ...newGig, level: e.target.value })}
                        >
                          <option value="">Seleccionar nivel</option>
                          <option value="Básico">Básico</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Todos los niveles">Todos los niveles</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-700">Disponibilidad</label>
                        <input
                          type="text"
                          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-upsa-verde-claro/50 focus:border-transparent"
                          value={newGig.availability}
                          onChange={(e) => setNewGig({ ...newGig, availability: e.target.value })}
                          placeholder="Ej: Lunes a viernes, tardes"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowGigForm(false)}
                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-upsa-verde-claro hover:bg-upsa-verde text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 shadow-sm hover:shadow"
                      >
                        {isLoading ? "Guardando..." : "Publicar"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Contenido de la pestaña activa */}
            {activeTab === "gigs" && (
            <>
                {/* Listado de gigs */}
                {gigs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gigs.map((gig) => (
                    <div
                        key={gig.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group"
                    >
                        <div className="h-2 bg-gradient-to-r from-upsa-verde-claro to-upsa-verde-amarillo"></div>
                        <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-upsa-verde-claro transition-colors">
                            {gig.title}
                            </h2>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                                onClick={() => {
                                setEditingGig(gig);
                                setShowEditForm(true);
                                }}
                                className="p-1.5 text-gray-500 hover:text-upsa-verde-claro hover:bg-gray-100 rounded-full"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setGigToDelete(gig.id)}
                                className="p-1.5 text-gray-500 hover:text-upsa-rojo hover:bg-gray-100 rounded-full"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{gig.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {gig.level && (
                            <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getLevelColor(
                                gig.level
                                )}`}
                            >
                                <BookOpen className="w-3 h-3 mr-1" />
                                {gig.level}
                            </span>
                            )}
                            {gig.availability && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                <Clock className="w-3 h-3 mr-1" />
                                {gig.availability}
                            </span>
                            )}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                    <div className="w-16 h-16 mx-auto bg-upsa-verde-amarillo/20 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-upsa-verde-claro" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No has creado ningún anuncio aún</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Crea tu primer anuncio para que otros estudiantes puedan encontrarte y conectar contigo
                    </p>
                    <button
                    onClick={() => setShowGigForm(true)}
                    className="inline-flex items-center gap-2 bg-upsa-verde-claro hover:bg-upsa-verde text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow"
                    >
                    <Plus className="w-4 h-4" /> Crear mi primer anuncio
                    </button>
                </div>
                )}

                {/* Modal de editar */}
                {showEditForm && editingGig && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <form
                    onSubmit={handleEditGig}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-5"
                    >
                    <div className="flex items-center justify-between border-b pb-3">
                        <h2 className="text-lg font-bold text-gray-900">Editar anuncio</h2>
                        <button
                        type="button"
                        onClick={() => setShowEditForm(false)}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                        <X className="w-5 h-5" />
                        </button>
                    </div>
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-3"
                        value={editingGig.title}
                        onChange={(e) => setEditingGig({ ...editingGig, title: e.target.value })}
                        placeholder="Título del Anuncio"
                    />
                    <textarea
                        className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px]"
                        value={editingGig.description}
                        onChange={(e) => setEditingGig({ ...editingGig, description: e.target.value })}
                        placeholder="Descripción"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                        className="w-full border border-gray-200 rounded-lg p-3 appearance-none"
                        value={editingGig.level}
                        onChange={(e) => setEditingGig({ ...editingGig, level: e.target.value })}
                        >
                        <option value="">Seleccionar nivel</option>
                        <option value="Básico">Básico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                        <option value="Todos los niveles">Todos los niveles</option>
                        </select>
                        <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-3"
                        value={editingGig.availability}
                        onChange={(e) => setEditingGig({ ...editingGig, availability: e.target.value })}
                        placeholder="Disponibilidad"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                        type="button"
                        onClick={() => setShowEditForm(false)}
                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        >
                        Cancelar
                        </button>
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-upsa-verde-claro hover:bg-upsa-verde text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 shadow-sm hover:shadow"
                        >
                        Guardar
                        </button>
                    </div>
                    </form>
                </div>
                )}

                {/* Modal de eliminar */}
                {gigToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">¿Eliminar anuncio?</h2>
                    <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
                    <div className="flex justify-center gap-4">
                        <button
                        onClick={() => setGigToDelete(null)}
                        className="px-5 py-2 border border-gray-300 rounded-lg"
                        >
                        Cancelar
                        </button>
                        <button
                        onClick={handleDeleteGig}
                        className="px-5 py-2 border bg-red-500 border-red-300 rounded-lg text-white"
                        >
                        Eliminar
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </>
            )}

            {/* Despues conecto al backend las configuraciones */}
            {/* {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Configuración de la cuenta</h2>
                <p className="text-gray-500 mb-6">Aquí podrás modificar la información de tu perfil y preferencias.</p>

                <div className="space-y-1">
                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Información personal</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Actualiza tu nombre y datos de contacto</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Contraseña</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Cambia tu contraseña de acceso</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Notificaciones</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Configura tus preferencias de notificaciones</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-upsa-rojo">Eliminar cuenta</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Elimina permanentemente tu cuenta y datos</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </main>
        </div>
      )}
    </div>
  )
}

export default Profile
