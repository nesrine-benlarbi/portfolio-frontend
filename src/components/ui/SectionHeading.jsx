/**
 * En-tête de section (label + titre + description optionnelle),
 * répété identiquement sur Accueil et À propos.
 */
export default function SectionHeading({ eyebrow, title, description, align = "center", id }) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "text-center space-y-3" : "text-left space-y-3"}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#8c6239]">{eyebrow}</p>
      )}
      <h2 id={id} className="text-lg sm:text-xl lg:text-2xl font-serif text-[#2c3e2b] tracking-wide">
        {title}
      </h2>
      {description && (
        <p
          className={`text-xs text-[#4a5549] leading-relaxed ${
            isCentered ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
