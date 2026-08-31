/**
 * Pagination réutilisable (galerie publique + console d'administration).
 *
 * Props :
 *  - currentPage : page active (1-indexée)
 *  - totalPages  : nombre total de pages
 *  - onPageChange: (page) => void, appelé au changement de page
 *
 * Ne s'affiche pas s'il n'y a qu'une seule page.
 * Accessibilité : <nav aria-label>, aria-current="page" sur la page active,
 * boutons désactivés aux extrémités.
 */

// Construit la liste des pages à afficher, avec des points de suspension
// ("…") quand il y a beaucoup de pages, pour éviter une barre trop longue.
const buildPages = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("…");

  pages.push(total);
  return pages;
};

const BASE_BTN =
  "min-w-[40px] h-10 px-3 inline-flex items-center justify-center text-xs font-sans font-bold rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5b8266] disabled:opacity-40 disabled:cursor-not-allowed";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      className="mt-14 flex items-center justify-center gap-2 flex-wrap"
      aria-label="Pagination des projets"
    >
      {/* Précédent */}
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${BASE_BTN} border-[#e1dad0] text-[#7a6f5d] bg-white hover:enabled:text-[#2c3e2b] hover:enabled:border-[#2c3e2b]`}
        aria-label="Page précédente"
      >
        ‹
      </button>

      {/* Numéros de page */}
      {pages.map((page, index) =>
        page === "…" ? (
          <span
            key={`ellipsis-${index}`}
            className="min-w-[40px] h-10 inline-flex items-center justify-center text-xs text-[#a39683] select-none"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
            className={
              page === currentPage
                ? `${BASE_BTN} border-[#5b8266] bg-[#5b8266] text-white shadow-sm`
                : `${BASE_BTN} border-[#e1dad0] text-[#5c554c] bg-white hover:text-[#2c3e2b] hover:border-[#2c3e2b]`
            }
          >
            {page}
          </button>
        )
      )}

      {/* Suivant */}
      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${BASE_BTN} border-[#e1dad0] text-[#7a6f5d] bg-white hover:enabled:text-[#2c3e2b] hover:enabled:border-[#2c3e2b]`}
        aria-label="Page suivante"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
