import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* ♿ RGAA : Changement de la couleur du texte de base pour garantir un contraste suffisant (texte plus sombre pour lisibilité) */
    <footer className="bg-[#faf9f5] border-t border-[#e6e2da] text-[#1c281b] font-sans text-xs mt-24">
      
      {/* 📱 RESPONSIVE : Le padding vertical passe de py-16 à py-12 sur mobile (py-12 md:py-16) pour économiser le défilement inutile */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between gap-10 md:gap-4">
        
        {/* Colonne 1 : Concept simple */}
        <div className="space-y-4 text-left max-w-xs w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2c3e2b] text-[#fbfaf7] font-serif text-sm font-bold tracking-wider">
              NB
            </div>
            <div className="flex flex-col justify-center border-l border-[#e6e2da] pl-4 h-10">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#2c3e2b] leading-none mb-1.5">
                L'Atelier
              </span>
              <span className="text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-[#8c6239] leading-none">
                Conception & Structure
              </span>
            </div>
          </div>
          {/* ♿ RGAA : Passage du texte de text-gray-500 à text-[#4a5549] pour valider le taux de contraste de 4.5:1 exigé sur les petits textes */}
          <p className="text-[#4a5549] leading-relaxed text-[11px]">
            Développement d'applications web sur-mesure et gestion de bases de données. Un travail axé sur la clarté et la logique du code.
          </p>
        </div>

        {/* Colonne 2 : Les pages (Lien Connexion Supprimé) */}
        <div className="space-y-3 text-left w-full md:max-w-[200px]">
          {/* ♿ RGAA : Titre de liste plus sombre pour le contraste */}
          <div className="font-semibold uppercase tracking-wider text-[#6b7264] text-[10px]">
            Navigation
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/" className="hover:text-[#8c6239] hover:translate-x-0.5 transition-all inline-block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300">
                Accueil & Contact
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-[#8c6239] hover:translate-x-0.5 transition-all inline-block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-[#8c6239] hover:translate-x-0.5 transition-all inline-block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300">
                À propos
              </Link>
            </li>
            {/* 🎯 Le lien de connexion a été retiré proprement d'ici */}
          </ul>
        </div>

        {/* Colonne 3 : Les réseaux et la localisation */}
        <div className="space-y-3 text-left w-full md:max-w-[220px]">
          <div className="font-semibold uppercase tracking-wider text-[#6b7264] text-[10px]">
            Connexions
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              {/* ♿ RGAA (Critère 12.11) : Ajout d'un aria-label pour expliciter l'ouverture dans un nouvel onglet pour les synthèses vocales */}
              <a 
                href="https://www.linkedin.com/in/eglantine-u-303739314/"
                target="_blank"
                rel="noopener noreferrer" 
                aria-label="Visiter mon profil LinkedIn (s'ouvre dans un nouvel onglet)"
                className="hover:text-[#8c6239] hover:translate-x-0.5 transition-all inline-block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
              >
                LinkedIn
              </a>
            </li>
            <li>
              {/* ♿ RGAA (Critère 12.11) : Même chose ici pour GitHub */}
              <a 
                href="https://github.com/nesrine-benlarbi"
                target="_blank"
                rel="noopener noreferrer" 
                aria-label="Voir mon profil GitHub (s'ouvre dans un nouvel onglet)"
                className="hover:text-[#8c6239] hover:translate-x-0.5 transition-all inline-block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
              >
                GitHub
              </a>
            </li>
            <li className="text-[#6b7264] font-normal text-[11px] pt-2 border-t border-[#e6e2da]/60 mt-3">
              <span className="text-[#8c6239] font-medium block mb-0.5">Développement Full-Stack</span>
              <span className="text-[#4a5549] font-medium text-[10px] block">Basée à Lyon, France.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#e6e2da] bg-[#f5f3ed]">
        {/* 📱 RESPONSIVE : Alignement vertical centré sur mobile, horizontal espacé sur PC (text-center sm:text-left) */}
        <div className="max-w-5xl mx-auto px-6 h-auto sm:h-14 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#525a4f] text-[11px] py-4 sm:py-0 text-center sm:text-left">
          <div>&copy; {currentYear} L'Atelier — Nesrine Benlarbi. Tous droits réservés.</div>
          <div className="font-medium tracking-widest text-[9px] uppercase text-[#6b7264]">
            Rigueur · Structure · Autonomie
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;