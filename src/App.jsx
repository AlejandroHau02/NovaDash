import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from './pages/Login';

//placeholder pages
const Dashboard = () => (

  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-[var(--text-main)]">Bienvenido a NovaDash</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card glass h-40 flex items-center justify-center">
          <span className="text-lg font-medium text-[var(--text-muted)]">KPI Card{i}</span>
        </div>
      ))}
    </div>
  </div>
);

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