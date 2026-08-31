import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    /* ♿ RGAA : pas de <main> ici — celui d'App.jsx fait déjà office de repère unique de la page */
    <div
      className="max-w-2xl mx-auto min-h-[75vh] flex flex-col items-center justify-center px-6 py-12 text-center"
    >
      <div className="space-y-6 sm:space-y-8 flex flex-col items-center w-full">
        
        {/* 👁️ VISUALISATION DE L'ERREUR : Enorme 404 hautement contrasté et lisible */}
        <div 
          className="text-7xl sm:text-8xl lg:text-9xl font-serif font-black tracking-widest text-[#8c6239] select-none leading-none animate-fade-in"
          aria-hidden="true"
        >
          404
        </div>

        <h1
          id="notfound-title"
          className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-wide text-[#2e2a25] px-2 py-1"
        >
          Pièce introuvable dans l'inventaire
        </h1>

        {/* Trait de séparation de la charte graphique */}
        <div className="h-[2px] w-16 bg-[#c2a679] rounded-full" aria-hidden="true"></div>

        {/* Texte explicatif fluide avec des couleurs conformes aux ratios de contraste RGAA (#5c554c) */}
        <p className="text-sm sm:text-base text-[#5c554c] font-sans leading-relaxed max-w-md px-2">
          Le contenu que vous recherchez n'est pas répertorié à cette adresse ou a été déplacé vers une autre étagère de l'atelier.
        </p>

        {/* 🏗️ BOUTONS RESPONSIVES : Côte à côte sur PC, empilés proprement sur Mobile */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 px-4">
          
          {/* Bouton Principal : Retour à l'accueil (Vert Sapin #2c3e2b robuste) */}
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => navigate('/')}
            aria-label="Retourner à la page d'accueil de l'Atelier"
          >
            Retour à l'Atelier
          </Button>

          {/* Bouton Secondaire : Revenir en arrière */}
          <Button
            variant="quiet"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
            aria-label="Retourner à la page précédente"
          >
            Page précédente
          </Button>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;