import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";

const PROCESS_STEPS = [
  { number: "01", title: "Écouter", description: "Identifier le besoin et les attentes." },
  { number: "02", title: "Analyser", description: "Définir les utilisateurs et les contraintes." },
  { number: "03", title: "Concevoir", description: "Structurer les parcours, les données et l’interface." },
  { number: "04", title: "Développer", description: "Transformer la conception en fonctionnalités." },
  { number: "05", title: "Tester", description: "Vérifier le fonctionnement, la sécurité et l’accessibilité." },
  { number: "06", title: "Livrer", description: "Mettre à disposition une solution utile et durable." },
];

export default function WorkMethodSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 space-y-10" aria-labelledby="methode-heading">
      <SectionHeading
        id="methode-heading"
        title="De l’idée à la solution"
        description="Une démarche structurée pour avancer avec clarté et livrer une solution qui répond réellement au besoin."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 text-center">
        {PROCESS_STEPS.map((step) => (
          <Card key={step.number} hover padding="p-4" className="space-y-2">
            <p className="text-[9px] font-mono text-[#8c6239]/60">{step.number}</p>
            <p className="text-xs font-medium text-[#2c3e2b] uppercase tracking-wide">{step.title}</p>
            <p className="text-[11px] text-[#4a5549] leading-snug">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
