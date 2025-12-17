import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //revisar secion guardada en la app
        const storedUser = localStorage.getItem('nova_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        //simulacion, aqui iria la peticion al backend
        const fakeUser = {
            id: '1',
            name: 'Admin user',
            email: email,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        };

        //guardar en el navegador
        localStorage.setItem('nova_user',
            JSON.stringify(fakeUser));
        setUser(fakeUser);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('nova_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);