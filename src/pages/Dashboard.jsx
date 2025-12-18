import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import UserChart from "../components/dashboard/UserChart";

const Dashboard = () => {
    const stats = [
        { title: 'Ingresos Totales', value: '$45,231', icon: DollarSign, trend: '+20.1%', trendUp: true, color: 250 },
        { title: 'Usuarios Activos', value: '2,350', icon: Users, trend: '+15.3%', trendUp: true, color: 160 },
        { title: 'Ventas del Mes', value: '1,234', icon: ShoppingCart, trend: '-5.2%', trendUp: false, color: 30 },
        { title: 'Tasa de Crecimiento', value: '+12.5%', icon: TrendingUp, trend: '+8.1%', trendUp: true, color: 280 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[var(--text-main)]">Dashboard</h1>
                <p className="text-[var(--text-muted)] mt-1">Bienvenido de vuelta, aquí tienes un resumen.</p>
            </div>

            {/*KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>
                <div className="lg:col-span-1">
                    <UserChart />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;