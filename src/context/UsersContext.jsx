import { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();

const initialUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'Activo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Editor', status: 'Activo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Viewer', status: 'Inactivo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Editor', status: 'Activo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Viewer', status: 'Activo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro' },
];

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('nova_users');
        return saved ? JSON.parse(saved) : initialUsers;
    });

    useEffect(() => {
        localStorage.setItem('nova_users', JSON.stringify(users));
    }, [users]);

    const addUser = (user) => {
        const newUser = {
            ...user,
            id: Date.now(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(' ', '')}`
        };
        setUsers([...users, newUser]);
    };

    const updateUser = (id, updatedData) => {
        setUsers(users.map(user => user.id === id ? { ...user, ...updatedData } : user));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => useContext(UsersContext);