import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-[#2c3e2b] hover:bg-[#1e2b1d] text-white shadow-sm hover:shadow-md focus-visible:ring-[#2c3e2b]",
  outline: "border border-[#2c3e2b] text-[#2c3e2b] hover:bg-[#2c3e2b] hover:text-white bg-transparent focus-visible:ring-[#2c3e2b]",
  ochre: "bg-[#8c6239] hover:bg-[#734f2d] text-white shadow-sm hover:shadow-md focus-visible:ring-[#8c6239]",
  emerald: "bg-[#5b8266] hover:bg-[#3a6047] text-white shadow-sm focus-visible:ring-[#5b8266]",
  quiet: "border border-[#e1dad0] text-[#7a6f5d] hover:text-[#2c3e2b] hover:border-[#2c3e2b] bg-white shadow-sm focus-visible:ring-[#2c3e2b]",
  danger: "border border-red-200 text-red-600 hover:bg-red-50 bg-transparent focus-visible:ring-red-500",
};

const SIZES = {
  sm: "px-4 py-1.5 text-[10px] uppercase tracking-widest rounded-md",
  md: "py-3 px-6 hover:px-7 text-sm font-medium tracking-wide rounded-md",
  lg: "px-8 py-3.5 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-bold rounded-lg",
};

/**
 * Bouton polymorphe : rendu en <Link> si `to`, en <a> si `href`, sinon en <button>.
 * `variant` porte la couleur, `size` porte le gabarit (padding, casse, arrondi).
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={props.type || "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
