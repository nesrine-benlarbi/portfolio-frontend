import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../hooks/apiFetch';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pill from '../../components/ui/Pill';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';

const PROJECTS_PER_PAGE = 5;

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null); // { id, title } | null
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 1. Chargement initial de tous les projets
  useEffect(() => {
    const fetchAdminProjects = async () => {
      try {
        const response = await apiFetch('/projects');
        const cleanData = response?.data ? response.data : response;
        setProjects(Array.isArray(cleanData) ? cleanData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProjects();
  }, []);

  // 2. Gestion sécurisée de la suppression
  const requestDelete = (id, title) => setPendingDelete({ id, title });

  const confirmDelete = async () => {
    const { id } = pendingDelete;
    setPendingDelete(null);

    try {
      await apiFetch(`/projects/${id}`, {
        method: 'DELETE',
      });

      const nextProjects = projects.filter(project => project.id !== id);
      setProjects(nextProjects);

      // Si la suppression vide la dernière page, on recule d'une page
      const nextTotalPages = Math.max(1, Math.ceil(nextProjects.length / PROJECTS_PER_PAGE));
      setCurrentPage(page => Math.min(page, nextTotalPages));

      alert("Projet supprimé avec succès.");
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    }
  };

  // Pagination : découpage de la liste selon la page courante
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  if (loading) {
    return (
      <div className="text-center py-40 font-sans text-[10px] uppercase tracking-[0.5em] text-[#a39683] animate-pulse" role="status" aria-live="polite">
        Ouverture de l'atelier de tri...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 text-red-700 text-sm font-sans text-center border border-red-200 rounded-lg" role="alert">
        Erreur de connexion à l'inventaire : {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-10 mb-12">
      <Card tone="clay" padding="p-4 sm:p-8" className="shadow-sm">

        {/* En-tête de la console d'administration */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10 border-b border-[#f0ece6] pb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a39683] font-sans font-bold mb-1">Espace Sécurisé Atelier</p>
            <h1 className="text-3xl font-serif font-bold tracking-wide text-[#2e2a25]">Panel Admin</h1>
          </div>

          <Button to="/admin/projects/new" variant="emerald" size="lg">
            + Nouveau Projet
          </Button>
        </header>

        {/* Liste CRUD réadaptée */}
        {projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#e1dad0] bg-[#fcfbfa] rounded-xl">
            <p className="text-sm text-[#7a7165] italic font-sans">Aucune pièce enregistrée dans le catalogue pour le moment.</p>
          </div>
        ) : (
          <div>
            {/* VERSION TABLEAU : Visible UNIQUEMENT sur Ordinateur/Tablette (md:block) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse text-left font-sans" aria-label="Liste de contrôle et d'édition de vos projets">
                <thead>
                  <tr className="border-b border-[#2e2a25] text-[10px] uppercase tracking-[0.2em] text-[#a39683] font-bold">
                    <th scope="col" className="pb-4 pr-4 font-bold text-[#a39683]">Illustration</th>
                    <th scope="col" className="pb-4 font-bold text-[#a39683]">Projet</th>
                    <th scope="col" className="pb-4 font-bold text-[#a39683]">Technologies / Fibres</th>
                    <th scope="col" className="pb-4 text-right font-bold text-[#a39683]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece6] text-sm">
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="group hover:bg-[#fcfbfa] transition-colors">
                      <td className="py-5 pr-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#e1dad0] bg-[#f7f5f0]">
                          {project.image_url ? (
                            <img
                              src={project.image_url}
                              alt={`Illustration du projet ${project.title}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center text-[#a39683] text-[8px] uppercase tracking-wide text-center px-1"
                              aria-hidden="true"
                            >
                              Aucune image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-5 font-serif text-lg font-bold text-[#2e2a25] pr-4 group-hover:text-[#5b8266] transition-colors">
                        {project.title}
                      </td>
                      <td className="py-5 text-[#5c554e] text-xs tracking-wide pr-4 max-w-xs lg:max-w-md">
                        {project.technologies?.length ? (
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <Pill key={tech} tone="clay">{tech}</Pill>
                            ))}
                          </div>
                        ) : (
                          <span className="italic text-[#7a7165]">Aucune</span>
                        )}
                      </td>
                      <td className="py-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            variant="quiet"
                            size="sm"
                            onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                            aria-label={`Modifier ${project.title}`}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => requestDelete(project.id, project.title)}
                            aria-label={`Supprimer ${project.title}`}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VERSION SMARTPHONE : Structure en List-Items empilés, visible UNIQUEMENT sur Mobile (md:hidden) */}
            <div className="block md:hidden space-y-6" role="list" aria-label="Liste d'édition de vos projets (version mobile)">
              {paginatedProjects.map((project) => (
                <article 
                  key={project.id} 
                  className="border border-[#e1dad0] rounded-xl p-5 bg-[#fcfbfa]/50 flex flex-col space-y-4"
                  role="listitem"
                >
                  {/* Titre + illustration */}
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-[#e1dad0] bg-[#f7f5f0]">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={`Illustration du projet ${project.title}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[#a39683] text-[7px] uppercase tracking-wide text-center px-1"
                          aria-hidden="true"
                        >
                          Aucune image
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#2e2a25]">
                      {project.title}
                    </h2>
                  </div>

                  {/* Stack de badges responsives (ne cassent plus bizarrement) */}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Pill key={tech} tone="clay">{tech}</Pill>
                      ))}
                    </div>
                  )}

                  {/* Actions alignées proprement en bas et bien espacées */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#f0ece6]">
                    <Button
                      variant="quiet"
                      size="sm"
                      onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                      aria-label={`Modifier ${project.title}`}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => requestDelete(project.id, project.title)}
                      aria-label={`Supprimer ${project.title}`}
                    >
                      Supprimer
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Supprimer ce projet ?"
        message={`Êtes-vous sûr de vouloir définitivement supprimer la pièce "${pendingDelete?.title}" de l'inventaire ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminPage;