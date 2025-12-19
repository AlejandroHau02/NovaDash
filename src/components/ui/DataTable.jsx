import { Pencil, Trash2 } from "lucide-react";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--border)]">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider"
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`border-b border-[var(--border)] hover:bg-[var(--bg-body)] transition-colors ${index === data.length - 1 ? 'border-b-0' : ''
                                    }`}
                            >

                                {columns.map((col) => (
                                    <td
                                        key={col.key} className="py-3 px-4">
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}

                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
