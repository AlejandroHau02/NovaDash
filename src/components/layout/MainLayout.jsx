import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Settings, LogOut, X } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();

    const links = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: BarChart3, label: 'Estadísticas', to: '/stats' },
        { icon: Users, label: 'Usuarios', to: '/users' },
        { icon: Settings, label: 'Configuración', to: '/settings' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-body)] transition-colors duration-300">
            {/* Sidebar Desktop */}
            <Sidebar />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[hsl(225,14%,11%)] border-r border-[var(--border)] flex flex-col transition-transform duration-300 z-40 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)]">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">N</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">NovaDash</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-[var(--bg-body)] text-[var(--text-muted)]">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20'
                                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-body)] hover:text-[var(--text-main)]'
                                }`
                            }
                        >
                            <link.icon size={20} />
                            <span className="font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-[var(--border)]">
                    <button
                        onClick={() => { setSidebarOpen(false); logout(); }}
                        className="flex items-center gap-3 px-3 py-2 w-full text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen flex flex-col">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-6 animate-fadeIn">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;