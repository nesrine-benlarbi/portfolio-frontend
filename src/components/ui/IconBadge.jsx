const SIZES = {
  sm: "w-10 h-10",
  md: "w-11 h-11",
};

/**
 * Icône dans un cercle bordé — motif des cartes "expérience" et "contribution" d'À propos.
 */
export default function IconBadge({ children, size = "md", tinted = false, className = "" }) {
  const bg = tinted ? "bg-[#faf9f5]" : "bg-white";

  return (
    <div
      className={`${SIZES[size]} shrink-0 rounded-full ${bg} border border-[#e6e2da] flex items-center justify-center text-[#8c6239] ${className}`}
    >
      {children}
    </div>
  );
}
