import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, Users, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
    const links = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: BarChart3, label: 'Estadísticas', to: '/stats' },
        { icon: Users, label: 'Usuarios', to: '/users' },
        { icon: Settings, label: 'Configuración', to: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[hsl(225,14%,11%)] border-r
        border-[var(--border)] hidden md:flex flex-col transition-colors duration-300 z-20">

            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
                <div className="h-8 w-8 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-bold tracking-tight">NovaDash</span>
            </div>

            {/* Navegación*/}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
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
                <button className="flex items-center gap-3 px-3 py-2 w-full text-[var(--text-muted)]
                hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;