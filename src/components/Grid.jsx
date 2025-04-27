import StudentCard from "./StudentCard";
import { User } from "lucide-react";

const Grid = ({ title, gigs, showEditOptions = false }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gigs.length === 0 ? (
          <p className="text-gray-500">No hay anuncios disponibles.</p>
        ) : (
          gigs.map((gig) => (
            <StudentCard
              key={gig.id}
              student={{
                name: gig.title,
                skill: gig.level,
                description: gig.description,
                availability: gig.availability,
                location: gig.location || "Campus UPSA",
                image: <User className="w-12 h-12" /> // Icono aplicado correctamente
              }}
              onViewProfile={() => {
                alert(`Ver perfil de ${gig.title}`);
              }}
              compact={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
