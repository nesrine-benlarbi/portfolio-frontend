import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router ne gère pas nativement le défilement lors des navigations :
 * par défaut, la page suivante s'affiche à l'endroit exact où on était resté.
 * Ici : retour en haut à chaque changement de route, sauf si l'URL cible une
 * ancre (#contact) — auquel cas on défile jusqu'à cette section précise.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      // Deux requestAnimationFrame : on laisse le temps à la page cible de
      // se monter (cas d'une navigation inter-pages) avant de mesurer sa position.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
