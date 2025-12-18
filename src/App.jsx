import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/** Ruta publica */}
            <Route path="/login" element={<Login />} />

            {/**Rutas protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="stats" element={<h1 className="text-2xl font-bold">Estadísticas</h1>} />
              <Route path="users" element={<h1 className="text-2xl font-bold">Usuarios</h1>} />
              <Route path="settings" element={<h1 className="text-2xl font-bold">Configuración</h1>} />
            </Route>

            {/**Catch all - redirigir al dashboard o login si no hay sesion */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;