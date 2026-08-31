import {
  AnalysisIcon,
  CodeIcon,
  AccessibilityIcon,
  QualityIcon,
} from "./icons";
import Card from "../ui/Card";
import IconBadge from "../ui/IconBadge";
import SectionHeading from "../ui/SectionHeading";

const CONTRIBUTIONS = [
  {
    title: "Analyse du besoin",
    description:
      "Comprendre les objectifs, les utilisateurs et les contraintes avant d’écrire la première ligne de code.",
    icon: <AnalysisIcon />,
  },
  {
    title: "Développement Full Stack",
    description:
      "Créer une interface, une API, une base de données et les interactions qui permettent à l’ensemble de fonctionner.",
    icon: <CodeIcon />,
  },
  {
    title: "Expérience accessible",
    description:
      "Concevoir des interfaces lisibles, responsives, utilisables au clavier et pensées pour différents profils d’utilisateurs.",
    icon: <AccessibilityIcon />,
  },
  {
    title: "Qualité et sécurité",
    description:
      "Structurer le code, protéger les données sensibles et construire une application maintenable et évolutive.",
    icon: <QualityIcon />,
  },
];

export default function ContributionsSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 space-y-10" aria-labelledby="contributions-heading">
      <SectionHeading id="contributions-heading" title="Ce que j’apporte à un projet" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {CONTRIBUTIONS.map((c) => (
          <Card key={c.title} hover className="space-y-2">
            <div className="flex items-center gap-3">
              <IconBadge size="sm" tinted>{c.icon}</IconBadge>
              <h3 className="font-serif font-medium text-base text-[#2c3e2b]">{c.title}</h3>
            </div>
            <p className="text-xs text-[#4a5549] leading-relaxed pl-[52px]">{c.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
