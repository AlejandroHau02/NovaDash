import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';
import { UsersProvider } from './context/UsersContext';
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
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
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<h1 className="text-2xl font-bold">Configuración</h1>} />
              </Route>

              {/**Catch all - redirigir al dashboard o login si no hay sesion */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;