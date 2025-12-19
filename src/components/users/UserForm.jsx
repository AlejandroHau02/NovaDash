import { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Viewer',
        status: 'Activo'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'Viewer',
                status: user.status || 'Activo'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClass = "w-full bg-[var(--bg-body)] border border-[var(--border)] rounded-lg py-2 px-3 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Rol</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2 px-4 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-body)] transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 py-2 px-4 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
                >
                    {user ? 'Guardar Cambios' : 'Agregar Usuario'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;