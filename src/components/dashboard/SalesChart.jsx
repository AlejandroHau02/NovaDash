import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Ene', ventas: 4000 },
    { name: 'Feb', ventas: 3000 },
    { name: 'Mar', ventas: 5000 },
    { name: 'Abr', ventas: 2780 },
    { name: 'May', ventas: 1890 },
    { name: 'Jun', ventas: 4000 },
    { name: 'Jul', ventas: 3490 },
];

const SalesChart = () => {
    return (
        <div className="card glass h-[400px] w-full p-4 flex flex-col">
            <h3 className="text-[var(--text-main)] font-semibold text-lg mb-4">Ingresos Generales</h3>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />

                        <XAxis
                            datakey="name"
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-main)',
                                borderRadius: '8px'
                            }}
                            itemStyle={{ color: 'var(--primary)' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="ventas"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorVentas)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>
        </div>
    )
}

export default SalesChart;