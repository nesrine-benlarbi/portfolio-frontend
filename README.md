# Portfolio Client — Front-end (React & Tailwind)

Ce dépôt contient le code source de l'interface utilisateur (Client) de votre portfolio de développeur. Conçue avec une approche esthétique "Chic & Tech", cette application React moderne communique de manière asynchrone avec l'API backend pour afficher vos réalisations et gérer l'ensemble des contenus via un espace d'administration sécurisé.

---

## ✨ Fonctionnalités majeures

* **Navigation Dynamique (SPA) :** Routage fluide géré par `react-router-dom` avec un système de routes publiques et de routes privées protégées (`PrivateRoute`).
* **Gestion Globale de l'Authentification :** Centralisation de l'état de connexion de l'admin grâce au mécanisme de Contexte React (`AuthContext` + `AuthProvider`) et persistance via le `localStorage`.
* **Formulaires Intelligents avec React Hook Form :** Validations robustes, instantanées et légères appliquées sur l'écran de connexion, les formulaires de création/édition de projets, et le formulaire de contact.
* **Consommation d'API Centralisée :** Abstraction complète des requêtes HTTP (`GET`, `POST`, `PUT`, `DELETE`) via un hook utilitaire réutilisable personnalisé `apiFetch`.
* **Design Éditorial & Fluide :** Interface minimaliste soignée, typographie inspirée des magazines de mode, et adaptabilité mobile totale (Responsive Design) propulsée par Tailwind CSS.

---

## 🛠️ Stack Technique

* **Framework :** React 19
* **Outil de Build :** Vite
* **Routing :** React Router v6
* **Gestion de formulaires :** React Hook Form
* **Design & Styles :** Tailwind CSS v4

---

## 📁 Structure des fichiers de l'interface

Le projet s'organise autour de composants modulaires et d'une séparation claire des rôles :

```text
portfolio-frontend/
├── src/
│   ├── hooks/           # Logique d'appels serveurs isolée (apiFetch.js)
│   ├── context/         # Centralisation de l'état d'authentification (Token, Login/Logout)
│   ├── components/      # Composants réutilisables (Navbar, ProjectCard, ContactForm)
│   ├── pages/           # Vues principales publiques (HomePage, ProjectsPage, Detail)
│   │   └── admin/       # Vues privées de gestion (Dashboard, Création, Édition)
│   ├── App.jsx          # Arbre des routes et configuration des barrières de sécurité
│   ├── main.jsx         # Point d'ancrage React de l'application
│   └── index.css        # Directives globales de Tailwind CSS