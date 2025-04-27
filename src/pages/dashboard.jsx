import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboardHeader";
import Grid from "../components/Grid";
import LoadError from "../components/LoadError";

const BACKEND_URL = "http://127.0.0.1:5000"; // Tu backend Flask

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [misGigs, setMisGigs] = useState([]);
  const [otrosGigs, setOtrosGigs] = useState([]);
  const [materiasGigs, setMateriasGigs] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      // 🔥 Fetch de MIS gigs
      fetch(`${BACKEND_URL}/gigs?email=${storedUser.email}`)
        .then(response => response.json())
        .then(data => {
          setMisGigs(data.gigs || []);
        })
        .catch(error => {
          console.error("Error al cargar gigs del usuario:", error);
        });

      // 🔥 Fetch de TODOS los gigs
      fetch(`${BACKEND_URL}/gigs`)
        .then(response => response.json())
        .then(data => {
          const allGigs = data.gigs || [];

          // ⚡ Filtramos gigs que NO son del usuario logueado
          const gigsDeOtrosUsuarios = allGigs.filter(gig => gig.email !== storedUser.email);

          setOtrosGigs(gigsDeOtrosUsuarios);
        })
        .catch(error => {
          console.error("Error al cargar otros gigs:", error);
        });

      // 🔥 Simulamos materias favoritas mientras (después las podemos hacer dinámicas también)
      setMateriasGigs([
        { id: "201", title: "Programación en C++", description: "Desde cero hasta estructuras avanzadas", level: "Avanzado", availability: "Fines de semana" },
        { id: "202", title: "Bases de Datos", description: "Diseño y consultas SQL", level: "Intermedio", availability: "Noches" },
      ]);
    }
  }, []);

  if (!user) {
    return <LoadError />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto py-8">
        <Grid title="Mis Anuncios" gigs={misGigs} showEditOptions={true} />
        <Grid title="Otros Usuarios" gigs={otrosGigs} showEditOptions={false} />
        <Grid title="Materias que Quiero Aprender" gigs={materiasGigs} showEditOptions={false} />
      </div>
    </div>
  );
};

export default Dashboard;
