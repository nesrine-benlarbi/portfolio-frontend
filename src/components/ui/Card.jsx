const TONES = {
  sapin: "border-[#e6e2da]",
  clay: "border-[#e1dad0]",
};

/**
 * Carte blanche bordée, gabarit répété sur tout le site.
 * `tone` choisit la couleur de bordure selon la palette de la page.
 */
export default function Card({
  as: As = "div",
  tone = "sapin",
  hover = false,
  padding = "p-6",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "bg-white border rounded-xl",
    TONES[tone],
    padding,
    hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-md" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <As className={classes} {...props}>
      {children}
    </As>
  );
}
