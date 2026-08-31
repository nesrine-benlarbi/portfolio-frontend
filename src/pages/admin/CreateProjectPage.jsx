import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../hooks/apiFetch';
import ProjectFormFields from '../../components/admin/ProjectFormFields';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const currentImageUrl = watch("image_url", "");

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      await apiFetch('/projects', {
        method: 'POST',
        body: formData,
      });

      alert('Nouvelle création ajoutée avec succès à l’inventaire !');
      navigate('/admin');
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors du tissage de la fiche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 sm:mt-12 px-4 sm:px-6 mb-12">
      <Card tone="clay" padding="p-5 sm:p-10" className="shadow-sm">

        {/* En-tête du formulaire — Couleur Vert Émeraude Signature */}
        <header className="mb-8 border-b border-[#f0ece6] pb-5 flex flex-row justify-between items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a39683] font-sans font-bold mb-1">Nouvelle Pièce</p>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#5b8266] tracking-wide">Enregistrer un projet</h1>
          </div>
          <Link
            to="/admin"
            className="text-xs font-sans text-[#7a6e5d] hover:text-[#2e2a25] underline whitespace-nowrap min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8266] rounded"
            aria-label="Annuler l'enregistrement et retourner à la console"
          >
            Annuler
          </Link>
        </header>

        {/* Message d'erreur sémantique RGAA */}
        {error && (
          <div
            id="form-error-msg"
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-sans flex items-center"
            role="alert"
            aria-live="assertive"
          >
            <span className="font-bold mr-1">Erreur :</span> {error}
          </div>
        )}

        {/* Aperçu du média que vous vous apprêtez à ajouter, à partir du lien collé */}
        <div className="mb-8 text-center">
          <p className="font-bold text-[#2e2a25] uppercase tracking-wider text-xs mb-2">Aperçu de l'image</p>
          <div className="aspect-video max-w-xs mx-auto bg-[#f7f5f0] border border-[#e1dad0] overflow-hidden rounded-lg">
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="Aperçu de l'illustration du nouveau projet"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#a39683] italic text-xs tracking-widest uppercase text-center px-4" aria-hidden="true">
                Collez un lien d'image ci-dessous
              </div>
            )}
          </div>
        </div>

        {/* Formulaire accessible — géré par React Hook Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 font-sans text-sm"
          aria-describedby={error ? "form-error-msg" : undefined}
        >
          <ProjectFormFields register={register} errors={errors} />

          {/* Zone de Validation (Vert Émeraude Signature) */}
          <div className="pt-6 border-t border-[#f0ece6] flex flex-col sm:flex-row sm:justify-end gap-4">
            <Button type="submit" variant="emerald" size="lg" disabled={loading} className="min-h-[48px]">
              {loading ? "Tissage en cours..." : "Enregistrer le projet"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default CreateProjectPage;
