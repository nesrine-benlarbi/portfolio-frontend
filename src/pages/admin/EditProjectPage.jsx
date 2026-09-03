import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiFetch } from '../../hooks/apiFetch';
import ProjectFormFields from '../../components/admin/ProjectFormFields';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Initialisation de React Hook Form + watch pour récupérer le titre en temps réel
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const currentTitle = watch("title", "");
  const currentImageUrl = watch("image_url", "");

  // 1. Chargement initial du projet et pré-remplissage du formulaire
  useEffect(() => {
    const fetchProjectToEdit = async () => {
      try {
        const projectData = await apiFetch(`/projects/${id}`);
        // Si les données sont enveloppées dans un objet .data, on extrait, sinon on prend direct
        const cleanData = projectData?.data ? projectData.data : projectData;

        // L'API renvoie les technologies sous forme de tableau (relation N─N).
        // Le champ de saisie attend une chaîne : on la reconstitue ici.
        reset({
          ...cleanData,
          technologies: Array.isArray(cleanData.technologies)
            ? cleanData.technologies.join(', ')
            : '',
          category: cleanData.category ?? '',
        });
      } catch (err) {
        setServerError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectToEdit();
  }, [id, reset]);

  // 2. Fonction de modification (PUT) lors de la soumission du formulaire
  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      await apiFetch(`/projects/${id}`, {
        method: 'PUT',
        body: formData,
      });
      alert('Modifications enregistrées avec succès !');
      navigate('/admin');
    } catch (err) {
      setServerError(err.message || "Une erreur est survenue lors de la mise à jour.");
    }
  };

  // 3. TA FONCTION DE SUPPRESSION OPTIMISÉE ET INTÉGRÉE
  const confirmDelete = async () => {
    setConfirmOpen(false);
    try {
      await apiFetch(`/projects/${id}`, { method: 'DELETE' });
      alert('Le projet a été retiré de l’inventaire avec succès.');
      navigate('/admin');
    } catch (err) {
      alert(err.message || "Erreur de suppression");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-40 font-sans text-[10px] uppercase tracking-[0.5em] text-[#a39683] animate-pulse">
        Récupération de la fiche de l'atelier...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 sm:mt-12 px-4 sm:px-6 mb-12">
      <Card tone="clay" padding="p-5 sm:p-10" className="shadow-sm">

        {/* En-tête de la page — Vert Émeraude conforme à la Home */}
        <header className="mb-8 border-b border-[#f0ece6] pb-5 flex flex-row justify-between items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a39683] font-sans font-bold mb-1">Mise à jour</p>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#5b8266] tracking-wide">Modifier le Projet</h1>
          </div>
          <Link to="/admin" className="text-xs font-sans text-[#7a6e5d] hover:text-[#2e2a25] underline">
            Annuler
          </Link>
        </header>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-sans">
            <span className="font-bold">Erreur :</span> {serverError}
          </div>
        )}

        {/* Aperçu du média actuellement associé au projet en cours de modification */}
        <div className="mb-8 text-center">
          <p className="font-bold text-[#2e2a25] uppercase tracking-wider text-xs mb-2">Illustration actuelle</p>
          <div className="aspect-video max-w-xs mx-auto bg-[#f7f5f0] border border-[#e1dad0] overflow-hidden rounded-lg">
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt={`Illustration du projet ${currentTitle || ''}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#a39683] italic text-xs tracking-widest uppercase" aria-hidden="true">
                Aucune illustration
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans text-sm">
          <ProjectFormFields register={register} errors={errors} />

          {/* Zone de boutons d'actions — Totalement optimisée et cohérente */}
          <div className="pt-6 border-t border-[#f0ece6] flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
            <Button type="button" variant="danger" size="lg" onClick={() => setConfirmOpen(true)} className="min-h-[48px]">
              Supprimer la pièce
            </Button>

            <Button type="submit" variant="emerald" size="lg" className="min-h-[48px]">
              Sauvegarder les modifications
            </Button>
          </div>

        </form>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer ce projet ?"
        message={`Supprimer définitivement "${currentTitle}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default EditProjectPage;
