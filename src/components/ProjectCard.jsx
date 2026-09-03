import { Link, useNavigate } from 'react-router-dom';
import Pill from './ui/Pill';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  // Extraction des données au format MySQL
  const { id, title, description, image_url, github_url, demo_url } = project;

  // L'API renvoie déjà un tableau, issu de la table de liaison project_technologies
  const technologies = project.technologies ?? [];

  return (
    <article className="group border border-[#e1dad0] bg-white p-5 sm:p-6 transition-all duration-500 hover:border-[#5b8266] hover:shadow-lg flex flex-col justify-between h-full rounded-xl focus-within:ring-2 focus-within:ring-[#5b8266] focus-within:ring-offset-2">
      <div>
        
        {/* 1. Image du projet (Accessible) */}
        <div className="aspect-video bg-[#f7f5f0] border border-[#e1dad0] overflow-hidden mb-6 relative rounded-lg">
          {image_url ? (
            <img 
              src={image_url} 
              alt={`Capture d'écran du projet ${title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#a39683] italic text-xs tracking-widest uppercase" aria-hidden="true">
              Aucune illustration
            </div>
          )}
        </div>

        {/* 2. Titre du projet */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-[#2e2a25] mb-2 group-hover:text-[#5b8266] transition-colors duration-300">
          {title}
        </h3>

        {/* 3. Description (line-clamp-3 propre) */}
        <p className="text-sm text-[#5c554c] font-sans leading-relaxed mb-6 line-clamp-3">
          {description || <span className="italic text-[#7a6f5d]">Pas de description disponible.</span>}
        </p>
      </div>

      <div>
        
        {/* 4. Badges Technologies — Remplacement par <ul>/<li> natifs pour le RGAA */}
        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-x-2 gap-y-2.5 mb-6 list-none p-0" aria-label={`Technologies utilisées pour ${title}`}>
            {technologies.map((tech, index) => (
              <li key={index}>
                <Pill tone="clay">{tech}</Pill>
              </li>
            ))}
          </ul>
        )}

        {/* 5. Liens (GitHub, Live Demo et Détails) — RGAA : Remplacement des <button> par des <Link> */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f0ece6] text-[10px] uppercase tracking-widest font-sans font-bold">
          <div className="flex space-x-4 sm:space-x-5">
            
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7a6e5d] hover:text-[#2e2a25] py-2 transition-colors duration-300 relative after:absolute after:bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#2e2a25] hover:after:w-full after:transition-all after:duration-300 uppercase tracking-widest font-bold"
                aria-label={`Ouvrir le dépôt GitHub du projet ${title} (nouvel onglet)`}
              >
                GitHub
              </a>
            )}

            {demo_url && (
              <a
                href={demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5b8266] hover:text-[#3a6047] py-2 transition-colors duration-300 relative after:absolute after:bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#3a6047] hover:after:w-full after:transition-all after:duration-300 uppercase tracking-widest font-bold"
                aria-label={`Visiter la version en ligne du projet ${title} (nouvel onglet)`}
              >
                Live Demo
              </a>
            )}

          </div>

          <Link 
            to={`/projects/${id}`}
            className="text-[#2e2a25] hover:text-[#5b8266] py-2 transition-all duration-300 group-hover:translate-x-0.5 transform inline-block"
            aria-label={`Voir les détails du projet ${title}`}
          >
            Détails
          </Link>
        </div>

      </div>
    </article>
  );
};

export default ProjectCard;