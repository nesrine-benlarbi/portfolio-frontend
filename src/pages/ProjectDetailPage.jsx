import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../hooks/apiFetch';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await apiFetch(`/projects/${id}`);
        const cleanData = response?.data ? response.data : response;
        setProject(cleanData);
      } catch (err) {
        setError(err.message || "Impossible de charger les détails du projet.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  // 1. ÉTAT DE CHARGEMENT
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-8 sm:mt-16 px-6 lg:px-10 text-center py-40" role="status" aria-live="polite">
        <div className="inline-block animate-pulse text-[10px] uppercase tracking-[0.5em] text-[#7a6f5d] font-sans font-bold">
          Analyse de la pièce d'archive...
        </div>
      </div>
    );
  }

  // 2. ÉTAT D'ERREUR
  if (error || !project) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-10 border border-rose-100 bg-rose-50/50 text-center rounded-xl" role="alert">
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-rose-700 mb-4">
          Contenu non trouvé
        </p>
        <p className="text-sm text-gray-700 font-sans mb-6">
          {error || "Ce projet n'existe pas ou a été déplacé."}
        </p>
        <Link 
          to="/projects" 
          className="inline-block border border-[#2e2a25] text-[#2e2a25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e2a25] focus-visible:ring-offset-2 px-6 py-3 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#2e2a25] hover:text-white transition-all rounded-lg"
        >
          Retour aux projets
        </Link>
      </div>
    );
  }

  // L'API renvoie déjà un tableau, issu de la table de liaison project_technologies
  const technologies = project.technologies ?? [];

  // 3. ÉTAT DE SUCCÈS
  return (
    <div className="max-w-6xl mx-auto mt-8 sm:mt-12 px-6 lg:px-10 mb-20">
      
      {/* Bouton Retour */}
      <div className="mb-8">
        <button 
          type="button"
          onClick={() => navigate('/projects')}
          className="inline-block border border-[#e1dad0] text-[#7a6f5d] hover:text-[#2c3e2b] hover:border-[#2c3e2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c3e2b] focus-visible:ring-offset-2 px-4 py-2 text-[10px] uppercase tracking-[0.25em] font-sans font-bold transition-all duration-300 rounded-md bg-white shadow-sm cursor-pointer"
        >
          Retour au catalogue
        </button>
      </div>

      {/* Titre global (Lecture en Z) */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide text-[#2e2a25] mb-4">
          {project.title}
        </h1>
        <div className="h-[2px] w-16 bg-[#c2a679] rounded-full" aria-hidden="true"></div>
      </header>

      {/* Grille asymétrique */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* COLONNE GAUCHE (Image + Histoire) */}
        <div className="lg:col-span-2 space-y-10">
          <div className="aspect-video bg-[#f7f5f0] border border-[#e1dad0] overflow-hidden relative rounded-xl shadow-sm">
            {project.image_url ? (
              <img 
                src={project.image_url} 
                alt={`Illustration globale de l'application ${project.title}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#7a6f5d] italic text-xs tracking-widest uppercase" aria-hidden="true">
                Aucune illustration disponible
              </div>
            )}
          </div>

          <article className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#7a6f5d] border-b border-[#f0ece6] pb-2">
              Spécifications & Histoire du projet
            </h2>
            <p className="text-base text-[#5c554c] font-sans leading-relaxed whitespace-pre-line max-w-none">
              {project.description || <span className="italic text-[#7a6f5d]">Aucune description détaillée.</span>}
            </p>
          </article>
        </div>

        {/* COLONNE DROITE (Fiche technique Sticky) */}
        <aside className="lg:col-span-1 space-y-8 bg-[#faf9f5] border border-[#e6e2da] p-6 rounded-xl lg:sticky lg:top-6">
          
          {/* Section Technologies */}
          {technologies.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#7a6f5d] tracking-widest">
                Fibre technique
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-[10px] uppercase tracking-widest border border-[#e1dad0] px-3 py-1.5 font-sans font-medium text-[#4a443c] bg-[#f2e7d5] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Section Liens : Boutons programmés pour appeler le routeur local */}
          {(project.github_url || project.demo_url) && (
            <div className="space-y-3 pt-6 border-t border-[#e6e2da]">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#7a6f5d] tracking-widest">
                Déploiement
              </h3>
              <div className="flex flex-col items-start space-y-4 text-[11px] font-sans font-bold uppercase tracking-widest">
                
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2e2a25] hover:text-[#2c3e2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c3e2b] rounded transition-colors duration-300 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#2c3e2b] hover:after:w-full after:transition-all after:duration-300 uppercase tracking-widest font-bold"
                    aria-label={`Ouvrir le dépôt GitHub du projet ${project.title} (nouvel onglet)`}
                  >
                    Dépôt GitHub
                  </a>
                )}

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2c3e2b] hover:text-[#1b261a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c3e2b] rounded transition-colors duration-300 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#1b261a] hover:after:w-full after:transition-all after:duration-300 uppercase tracking-widest font-bold"
                    aria-label={`Visiter la version en ligne du projet ${project.title} (nouvel onglet)`}
                  >
                    Application Live
                  </a>
                )}
                
              </div>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
};

export default ProjectDetailPage;