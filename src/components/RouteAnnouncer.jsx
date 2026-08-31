import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = "L'Atelier — Nesrine Benlarbi";

const TITLES = [
  { test: (path) => path === '/', title: `Accueil | ${SITE_NAME}` },
  { test: (path) => path === '/projects', title: `Portfolio | ${SITE_NAME}` },
  { test: (path) => /^\/projects\/[^/]+$/.test(path), title: `Détail du projet | ${SITE_NAME}` },
  { test: (path) => path === '/a-propos', title: `À propos | ${SITE_NAME}` },
  { test: (path) => path === '/login', title: `Connexion | ${SITE_NAME}` },
  { test: (path) => path === '/admin', title: `Panel Admin | ${SITE_NAME}` },
  { test: (path) => path === '/admin/projects/new', title: `Créer un projet | ${SITE_NAME}` },
  { test: (path) => /^\/admin\/projects\/[^/]+\/edit$/.test(path), title: `Modifier un projet | ${SITE_NAME}` },
];

function titleFor(pathname) {
  const match = TITLES.find(({ test }) => test(pathname));
  return match ? match.title : `Page introuvable | ${SITE_NAME}`;
}

/**
 * Centralise deux obligations RGAA à chaque navigation SPA (que React Router
 * ne gère pas nativement) : un <title> pertinent par page, et le déplacement
 * du focus clavier/lecteur d'écran vers le contenu principal — sans quoi la
 * navigation reste silencieuse pour les utilisateurs de lecteurs d'écran.
 */
const RouteAnnouncer = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titleFor(pathname);

    // Si on cible une ancre (ex: /#contact), ScrollToTop s'occupe déjà du
    // défilement ; on laisse le focus naturel plutôt que de le forcer sur <main>.
    if (hash) return;

    const main = document.getElementById('main-content');
    main?.focus();
  }, [pathname, hash]);

  return null;
};

export default RouteAnnouncer;
