import { useState, useMemo } from 'react';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
  // 1. Initialisation du state avec le token du localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 2. Déduction de l'état d'authentification
  const isAuthenticated = !!token;

  // 3. Récupération du payload du JWT (les infos utilisateur)
  const user = useMemo(() => {
    if (!token) return null;
    try {
      // Décodage de la partie centrale (payload) du JWT
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch (e) {
      console.error("Erreur de décodage du token", e);
      return null;
    }
  }, [token]);

  // 4. Fonction pour se connecter
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // 5. Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // On expose tout cela au reste de l'application
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};