import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useUsers } from '../context/UsersContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import UserForm from '../components/users/UserForm';

const Users = () => {
    const { users, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const columns = [
        {
            key: 'name',
            label: 'Usuario',
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <img src={row.avatar} alt={value} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-[var(--text-main)]">{value}</span>
                </div>
            )
        },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Rol' },
        {
            key: 'status',
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Activo'
                    ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                    }`}>
                    {value}
                </span>
            )
        },
    ];

    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        setDeletingUser(user);
    };

    const handleFormSubmit = (formData) => {
        if (editingUser) {
            updateUser(editingUser.id, formData);
        } else {
            addUser(formData);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const confirmDelete = () => {
        if (deletingUser) {
            deleteUser(deletingUser.id);
            setDeletingUser(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">Usuarios</h1>
                    <p className="text-[var(--text-muted)] mt-1">Gestionar los usuarios del sistema</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                    <UserPlus size={20} />
                    Agregar Usuario
                </button>
            </div>

            <DataTable
                columns={columns}
                data={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal para Agregar/Editar */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                }}
                title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            >
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingUser(null);
                    }}
                />
            </Modal>

            {/* Modal de Confirmacion para eliminar */}
            <Modal
                isOpen={!!deletingUser}
                onClose={() => setDeletingUser(null)}
                title="Confirmar Eliminación"
            >
                <p className="text-[var(--text-muted)] mb-6">
                    ¿Estás seguro de que deseas eliminar a <strong className="text-[var(--text-main)]">{deletingUser?.name}</strong>?
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => setDeletingUser(null)}
                        className="flex-1 py-2 px-4 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-body)] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Users;