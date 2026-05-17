import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Terapia } from './pages/Terapia';
import { Evaluaciones } from './pages/Evaluaciones';
import { Aptos } from './pages/Aptos';
import { Orientacion } from './pages/Orientacion';
import { Supervisiones } from './pages/Supervisiones';
import { Trabajemos } from './pages/Trabajemos';
import { Programa } from './pages/Programa';
import { Contacto } from './pages/Contacto';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* El Navbar queda fijo arriba */}
        <Navbar />
        
        {/* Este contenedor ocupa el espacio disponible y renderiza la ruta activa */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terapia" element={<Terapia />} />
            <Route path="/evaluaciones-psicologicas" element={<Evaluaciones />} />
            <Route path="/aptos-psicologicos" element={<Aptos />} />
            <Route path="/orientacion-vocacional" element={<Orientacion />} />
            <Route path="/supervisiones" element={<Supervisiones />} />
            <Route path="/trabajemos" element={<Trabajemos />} />
            <Route path="/programa" element={<Programa />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        
        {/* El Footer queda fijo abajo */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;