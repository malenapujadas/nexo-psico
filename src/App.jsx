import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { DynamicTitle } from './components/DynamicTitle';
import { PasswordRecoveryListener } from './components/PasswordRecoveryListener';
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
import { Cursos } from './pages/Cursos';
import { Contacto } from './pages/Contacto';
import { Servicios } from './pages/Servicios';
import { Auth } from './pages/Auth';
import { AuthProvider } from './components/AuthContext';
import { Perfil } from './pages/Perfil';
import { ActualizarPassword } from './pages/ActualizarPassword';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <DynamicTitle />
        <PasswordRecoveryListener />
        <div className="min-h-screen flex flex-col">
          {/* El Navbar queda fijo arriba */}
          <Navbar />
          
          {/* Este contenedor ocupa el espacio disponible y renderiza la ruta activa */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/terapia" element={<Terapia />} />
              <Route path="/evaluaciones-psicologicas" element={<Evaluaciones />} />
              <Route path="/aptos-psicologicos" element={<Aptos />} />
              <Route path="/orientacion-vocacional" element={<Orientacion />} />
              <Route path="/supervisiones" element={<Supervisiones />} />
              <Route path="/trabajemos" element={<Trabajemos />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/cuadernillos" element={<Navigate to="/cursos" replace />} />
              <Route path="/programa" element={<Programa />} />
              <Route path="/iniciar-sesion" element={<Auth />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/actualizar-password" element={<ActualizarPassword />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          
          {/* El Footer queda fijo abajo */}
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;