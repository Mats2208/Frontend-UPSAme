// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "upsa-verde": "#00572D",          // Verde institucional principal
        "upsa-verde-claro": "#007A33",     // Verde para botones y detalles
        "upsa-verde-amarillo": "#A3C940",  // Detalles más llamativos
        "upsa-blanco": "#FFFFFF",          // Fondo general
        "upsa-gris-claro": "#F5F5F5",      // Fondo de secciones
      },
    },
  },
  plugins: [],
}
