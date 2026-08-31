import { useContext } from 'react';
import AuthContext from './AuthContext';

// Hook personnalisé pour utiliser le contexte d'authentification facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
