import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";

const TIMELINE = [
  {
    period: "Premières expériences",
    title: "Création et artisanat textile",
    description: "Développement de ma créativité, de ma patience et de mon attention aux détails.",
  },
  {
    period: "Parcours professionnel",
    title: "Second œuvre du bâtiment",
    description: "Organisation, gestion des contraintes et conduite de projets concrets.",
  },
  {
    period: "Le déclic",
    title: "Découverte du développement web",
    description: "Une nouvelle manière de réunir logique, créativité et résolution de problèmes.",
  },
  {
    period: "2025 – 2026",
    title: "Formation Développeur Web et Web Mobile",
    description: "Apprentissage du développement frontend, backend, des bases de données et de la gestion de projet.",
  },
  {
    period: "Aujourd’hui",
    title: "Développement d’applications Full Stack",
    description: "Conception de projets complets, accessibles, sécurisés et centrés sur les besoins réels.",
  },
  {
    period: "Demain",
    title: "Évoluer au sein d’une équipe",
    description: "Continuer à apprendre, contribuer à des projets utiles et progresser en tant que développeuse.",
  },
];

function TimelineItem({ period, title, description }) {
  return (
    <Card as="article" padding="p-5" className="shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">{period}</p>
      <h3 className="mt-1 font-serif text-lg text-[#2c3e2b]">{title}</h3>
      <p className="mt-2 text-xs text-[#4a5549] leading-relaxed">{description}</p>
    </Card>
  );
}

export default function TimelineSection() {
  return (
    <section className="bg-[#faf9f5] border-t border-b border-[#e6e2da] py-12 md:py-16 px-6" aria-labelledby="evolution-heading">
      <div className="max-w-4xl mx-auto space-y-10">
        <SectionHeading id="evolution-heading" title="Un parcours en construction" />

        <ol className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-2 bottom-2 w-px bg-[#e6e2da] md:left-1/2"
          />

          {TIMELINE.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li
                key={`${item.period}-${item.title}`}
                className="relative mb-8 last:mb-0 grid grid-cols-[32px_1fr] gap-4 md:grid-cols-[1fr_32px_1fr] md:gap-6"
              >
                {/* Colonne gauche sur ordinateur (auto-placée en 1re position du grid) */}
                <div className={`hidden md:block ${isLeft ? "text-right" : ""}`}>
                  {isLeft && <TimelineItem {...item} />}
                </div>

                {/* Point central (auto-placé au centre) */}
                <div className="relative z-10 flex justify-center">
                  <span className="mt-1.5 w-3 h-3 rounded-full bg-[#8c6239] ring-4 ring-[#faf9f5]" aria-hidden="true" />
                </div>

                {/* Colonne droite sur ordinateur (auto-placée en 3e position du grid) */}
                <div className="hidden md:block">
                  {!isLeft && <TimelineItem {...item} />}
                </div>

                {/* Contenu mobile : colonne unique à droite de la ligne */}
                <div className="md:hidden">
                  <TimelineItem {...item} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
