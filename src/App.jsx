import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';

// Import des composants
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import RouteAnnouncer from './components/RouteAnnouncer.jsx';

// Import des pages
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx'; // Page 404 dédiée, affichée pour toute URL inconnue
import AboutPage from "./pages/AboutPage";
import AdminPage from './pages/admin/AdminPage.jsx';
import CreateProjectPage from './pages/admin/CreateProjectPage.jsx';
import EditProjectPage from './pages/admin/EditProjectPage.jsx';

// Composant PrivateRoute pour protéger l'accès Admin
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Si pas connecté, redirection vers /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    // On passe sur une structure flexible avec notre fond crème doux de l'Atelier
    <div className="flex flex-col min-h-screen bg-[#fbfaf7] text-[#2c3e2b] font-sans">

      {/* Ramène en haut de page à chaque navigation, sauf vers une ancre (#contact) */}
      <ScrollToTop />
      {/* Titre d'onglet par page + focus clavier sur le contenu principal à chaque navigation */}
      <RouteAnnouncer />

      {/* RGAA : lien d'évitement, invisible tant qu'il n'a pas le focus clavier */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#2c3e2b] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      {/* Barre de navigation, avec le logo typographique NB */}
      <Navbar />

      {/* Le conteneur principal prend tout l'espace disponible */}
      <main id="main-content" tabIndex="-1" className="flex-grow focus:outline-none">
        <Routes>
          {/* --- ROUTES PUBLIQUES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/a-propos" element={<AboutPage />} />

          {/* --- ROUTES PRIVÉES (ADMIN) --- */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
          
          <Route path="/admin/projects/new" element={
            <PrivateRoute>
              <CreateProjectPage />
            </PrivateRoute>
          } />
          
          <Route path="/admin/projects/:id/edit" element={
            <PrivateRoute>
              <EditProjectPage />
            </PrivateRoute>
          } />

          {/* SÉCURITÉ 404 : Affichage de la pièce introuvable plutôt qu'une redirection brute */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Pied de page : contacts, liens externes et mentions */}
      <Footer />
      
    </div>
  );
}

export default App;