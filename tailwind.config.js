/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexo-bg': '#F6EFE6',    // Beige clarito (Fondo principal)
        'nexo-sand': '#D8B796',  // Arena
        'nexo-dark': '#3B312D',  // Marrón oscuro (Para textos principales)
        'nexo-blue': '#7E95A3',  // Azul acero (Para los botones)
        'nexo-green': '#7F9473', // Verde salvia
        'nexo-rose': '#A97868',  // Rosa viejo/Terracota
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Configuramos Inter como la fuente por defecto
      }
    },
  },
  plugins: [],
}