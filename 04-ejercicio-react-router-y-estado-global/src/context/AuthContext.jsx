import { createContext, useState, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
    
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const login = () => {
        setIsLoggedIn(true);
      };

      const logout = () => {
        setIsLoggedIn(false);
    };
    
    const value = {
        isLoggedIn,
        login,
        logout
    };


    return <AuthContext value={{ isLoggedIn, login, logout }}>
            {children}
            </AuthContext> 
}

export function useAuth() {     

    const context = useContext(AuthContext); 
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    
    return context;
}
 