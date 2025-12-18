import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend, trendUp, color }) => {
    return (
        <div className="card glass hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[var(--text-muted)] text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-[var(--text-main)]">{value}</h3>
                </div>

                <div
                    className="p-2 rounded-lg"
                    style={{
                        backgroundColor: `hsl(${color}, 70%, 96%)`,
                        color: `hsl(${color}, 70%, 50%)`
                    }}
                >
                    {Icon && <Icon size={24} />}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <span className={`flex items-center text-sm font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trend}
                </span>
                <span className="text-[var(--text-muted)] text-sm"> vs mes anterior</span>
            </div>
        </div>
    );
};

export default StatCard;