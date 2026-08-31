const TONES = {
  quiet: "bg-[#faf9f5] border border-[#e6e2da] text-[#4a5549]",
  clay: "bg-[#f2e7d5] border border-[#e1dad0]/60 text-[#7a6e5d]",
};

/**
 * Étiquette arrondie (compétence, technologie) — répétée sur À propos, Portfolio et Admin.
 */
export default function Pill({ tone = "quiet", className = "", children }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wide rounded-full px-2.5 py-1 font-medium whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
