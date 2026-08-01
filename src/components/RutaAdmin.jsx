/* import { Navigate } from 'react-router-dom';

export const RutaAdmin = ({ children, usuarioActual }) => {
  // Si no hay usuario, o si el usuario no es admin, lo pateamos al inicio
  if (!usuarioActual || usuarioActual.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si es admin, lo dejamos ver el panel (children)
  return children;
}; */