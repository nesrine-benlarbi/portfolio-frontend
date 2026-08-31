/**
 * Icônes décoratives pour la page À propos.
 * aria-hidden évite qu'elles soient annoncées par un lecteur d'écran.
 */

export function ConstructionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 20h16" />
      <path d="M6 20V9l6-5 6 5v11" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function TextileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 6c4 0 4 12 8 12s4-12 8-12" />
      <path d="M4 18c4 0 4-12 8-12s4 12 8 12" />
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="20" cy="18" r="1.5" />
    </svg>
  );
}

export function ListeningIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M3 12v5a4 4 0 0 0 4 4h2" />
      <path d="M8 9a4 4 0 0 1 8 0c0 4-4 4-4 7" />
      <path d="M12 19h.01" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

export function AnalysisIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </svg>
  );
}

export function AccessibilityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M5 8h14" />
      <path d="m12 8-3 5" />
      <path d="m12 8 3 5" />
      <path d="m9 13-2 7" />
      <path d="m15 13 2 7" />
    </svg>
  );
}

export function QualityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}
