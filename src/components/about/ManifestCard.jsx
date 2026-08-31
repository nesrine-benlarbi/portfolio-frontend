/**
 * Carte manifeste "L'Atelier" — remplace la photo dans le hero.
 */
export default function ManifestCard() {
  return (
    <aside className="relative overflow-hidden bg-white border border-[#e6e2da] rounded-xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500 text-center">
      {/* Fond décoratif : quadrillage léger, cercles techniques, repères de plan */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#2c3e2b 1px, transparent 1px), linear-gradient(90deg, #2c3e2b 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-[#2c3e2b]/10" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-10 w-32 h-32 rounded-full border border-[#8c6239]/15" aria-hidden="true" />
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#2c3e2b]/25" aria-hidden="true" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#2c3e2b]/25" aria-hidden="true" />
      <p className="absolute bottom-3 right-4 text-[9px] font-mono tracking-widest text-[#2c3e2b]/30" aria-hidden="true">
        45.7640° N — 4.8357° E
      </p>

      <div className="relative z-10 space-y-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8c6239]">
          L’Atelier
        </p>
        <p className="font-serif text-lg text-[#2c3e2b] leading-snug">
          Construire avec méthode.<br />
          Concevoir avec sens.<br />
          Développer avec exigence.
        </p>
        <p className="text-xs text-[#4a5549] leading-relaxed italic border-t border-[#e6e2da] pt-4">
          "Chaque projet commence par une écoute attentive, se construit avec méthode et se termine par une solution utile et durable."
        </p>
        <div className="pt-1">
          <p className="font-serif text-xl text-[#2c3e2b]">Nesrine Benlarbi</p>
          <p className="text-xs text-[#8c6239] uppercase tracking-wider mt-1">Développeuse Web Full Stack</p>
        </div>
      </div>
    </aside>
  );
}
