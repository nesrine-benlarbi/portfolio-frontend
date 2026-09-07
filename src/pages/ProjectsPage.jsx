import { useState, useEffect } from 'react';
import { apiFetch } from '../hooks/apiFetch';
import ProjectCard from '../components/ProjectCard.jsx';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const PROJECTS_PER_PAGE = 3;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiFetch('/projects');

        // Sécurité : Si l'API renvoie les données enveloppées dans un objet
        const projectData = response?.data && Array.isArray(response.data)
          ? response.data
          : Array.isArray(response) ? response : [];

        setProjects(projectData);
      } catch (err) {
        // Une vraie erreur réseau/serveur : on l'affiche, on ne redirige pas en aveugle
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 1. ÉTAT DE CHARGEMENT (Loading) - Style Poétique & Atelier Conservé
  if (loading) {
    return (
      /* RGAA : role="status" + live polite pour informer les synthèses vocales du chargement asynchrone */
      <div className="max-w-7xl mx-auto mt-8 sm:mt-16 px-6 lg:px-10 text-center py-40" role="status" aria-live="polite">
        {/* CONTRASTE : text-[#7a6f5d] respecte le ratio d'accessibilité de 4.5:1 sur fond clair */}
        <div className="inline-block animate-pulse text-[10px] uppercase tracking-[0.5em] text-[#7a6f5d] font-sans font-bold">
          Inventaire de l'Atelier en cours...
        </div>
      </div>
    );
  }

  // 2. ÉTAT D'ERREUR (Fallback si la navigation 404 échoue)
  if (error) {
    return (
      /* RGAA : role="alert" pour notifier immédiatement l'utilisateur de l'échec du chargement */
      <div className="max-w-xl mx-auto mt-20 p-10 border border-rose-100 bg-rose-50/50 text-center rounded-xl" role="alert">
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-rose-700 mb-4">
          Une erreur est survenue
        </p>
        <p className="text-sm text-gray-700 font-sans">{error}</p>
      </div>
    );
  }

  // 3. ÉTAT DE SUCCÈS (Affichage de la Grille d'origine)
  // Pagination : on ne calcule et n'affiche que les projets de la page courante
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* RESPONSIVE : Marge haute réduite sur mobile (mt-8) et normale sur desktop (sm:mt-16) */
    <div className="max-w-7xl mx-auto mt-8 sm:mt-16 px-6 lg:px-10 mb-20">
      
      {/* En-tête de la page neutre et professionnel */}
      <section className="mb-16 space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8c6239] font-sans font-bold">
          Portfolio
        </p>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-wide text-[#2e2a25]">
          Projets réalisés
        </h1>
        {/* CONTRASTE : text-[#5c554c] assure une lisibilité impeccable pour les personnes malvoyantes */}
        <p className="text-sm text-[#5c554c] font-sans max-w-xl leading-relaxed">
          Découvrez une sélection d'applications web et de solutions numériques développées pour répondre à différents besoins et secteurs d'activité.
        </p>
        <div className="h-[1px] w-1/4 bg-[#e1dad0] mt-4" aria-hidden="true"></div>
      </section>

      {/* Grille de projets responsive fluide, ou état vide si aucun projet publié */}
      {/* RGAA : Ajout de rôles sémantiques pour la liste de composants */}
      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#e1dad0] bg-[#fcfbfa] rounded-xl" role="status">
          <p className="text-sm text-[#7a7165] italic font-sans">Aucun projet publié pour le moment.</p>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Liste des projets réalisés"
          >
            {paginatedProjects.map((project) => (
              <div key={project.id || project._id} role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Bouton de retour à l'accueil avec focus Vert Sapin */}
      <div className="mt-24 text-center">
        <div className="h-[1px] w-12 bg-[#e6e2da] mx-auto mb-8" aria-hidden="true"></div>
        <Button to="/" variant="quiet" size="sm">
          Retour à l'accueil
        </Button>
      </div>

    </div>
  );
};

export default ProjectsPage;