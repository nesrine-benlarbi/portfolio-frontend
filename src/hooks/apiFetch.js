/**
 * Utilitaires pour les appels API (Étape 9.1)
 * Centralise l'URL de base, le Token JWT et la gestion d'erreurs.
 */
export async function apiFetch(endpoint, options = {}) {
  const API_URL = import.meta.env.VITE_API_URL;
  
  // 1. Récupération du badge de sécurité (token)
  const token = localStorage.getItem('token');

  // 2. Préparation des headers (Type de contenu + Auth)
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 3. Configuration de la requête
  const config = {
    ...options,
    method: options.method || 'GET',
    headers,
  };

  // Si on envoie des données (POST/PUT), on les transforme en JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  // 4. L'appel au serveur
  const response = await fetch(`${API_URL}${endpoint}`, config);

  // 5. Cas spécial : suppression réussie (pas de contenu à lire)
  if (response.status === 204) return null;

  // 6. Extraction des données
  const data = await response.json();

  // 7. Si le serveur dit "Non" (Erreur 400, 401, 500...)
  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue.');
  }

  return data;
}