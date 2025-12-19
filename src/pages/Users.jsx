import { useState, useMemo } from 'react';
import { UserPlus, Search } from 'lucide-react';
import { useUsers } from '../context/UsersContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import UserForm from '../components/users/UserForm';

const ITEMS_PER_PAGE = 5;

const Users = () => {
    const { users, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrar usuarios por búsqueda
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Paginación
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

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

    // Reset a página 1 cuando cambia la búsqueda
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">Usuarios</h1>
                    <p className="text-[var(--text-muted)] mt-1">Gestiona los usuarios del sistema</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                    <UserPlus size={20} />
                    Agregar Usuario
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
            </div>

            <DataTable
                columns={columns}
                data={paginatedUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-[var(--text-muted)]">
                        Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} de {filteredUsers.length}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-body)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-lg transition-colors ${currentPage === page
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-body)]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-body)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para Agregar/Editar */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
                title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            >
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setIsModalOpen(false); setEditingUser(null); }}
                />
            </Modal>

            {/* Modal de Confirmación para Eliminar */}
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