import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: 'Lun', usuarios: 120 },
    { name: 'Mar', usuarios: 98 },
    { name: 'Mie', usuarios: 150 },
    { name: 'Jue', usuarios: 100 },
    { name: 'Vie', usuarios: 180 },
    { name: 'Sab', usuarios: 140 },
    { name: 'Dom', usuarios: 160 }
];

const UserChart = () => {
    return (
        <div className="card glass h-[400px] w-full p-4 flex flex-col">
            <h3 className="text-[var(--text-main)] font-semibold text-lg mb-4">Actividad de Usuarios</h3>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-main)',
                                borderRadius: '8px'
                            }}
                            cursor={{ fill: 'var(--bg-body)', opacity: 0.3 }}
                        />
                        <Bar
                            dataKey="usuarios"
                            fill="var(--primary)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default UserChart;