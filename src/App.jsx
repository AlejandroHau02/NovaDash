import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/layout/MainLayout";

//placeholder pages
const Dashboard = () => (

  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-[var(--text-main)]">Bienvenido a NovaDash</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card glass h-40 flex items-center justify-center">
          <span className="text-lg font-medium text-[var(--text-muted)]">Tarjeta de Prueba {i}</span>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="stats" element={<h1 className="text-2xl font-bold">Estadísticas</h1>} />
            <Route path="users" element={<h1 className="text-2xl font-bold">Usuarios</h1>} />
            <Route path="settings" element={<h1 className="text-2xl font-bold">Configuración</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;