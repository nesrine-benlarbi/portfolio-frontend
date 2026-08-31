import { ConstructionIcon, TextileIcon, ListeningIcon } from "./icons";
import Card from "../ui/Card";
import IconBadge from "../ui/IconBadge";
import Pill from "../ui/Pill";
import SectionHeading from "../ui/SectionHeading";

const EXPERIENCES = [
  {
    title: "Second œuvre",
    subtitle: "Construire avec méthode",
    description:
      "La conduite de projets dans le bâtiment m’a appris à organiser, anticiper les contraintes, respecter les étapes et mener un travail jusqu’à sa réalisation.",
    skills: ["Organisation", "Rigueur", "Coordination", "Contraintes techniques"],
    icon: <ConstructionIcon />,
  },
  {
    title: "Création textile",
    subtitle: "Concevoir avec sens",
    description:
      "La création textile a développé mon regard sur les couleurs, les matières, les proportions et les détails qui rendent une réalisation cohérente et singulière.",
    skills: ["Créativité", "Patience", "Précision", "Sens esthétique"],
    icon: <TextileIcon />,
  },
  {
    title: "Approche traditionnelle",
    subtitle: "Comprendre dans sa globalité",
    description:
      "Mon intérêt pour la médecine traditionnelle chinoise m’a appris l’importance de l’écoute, de l’observation et d’une approche globale avant de proposer une réponse.",
    skills: ["Écoute", "Analyse", "Adaptation", "Approche humaine"],
    icon: <ListeningIcon />,
  },
];

export default function ExperienceSection() {
  return (
    <section className="bg-[#faf9f5] border-t border-b border-[#e6e2da] py-12 md:py-16 px-6" aria-labelledby="experiences-heading">
      <div className="max-w-5xl mx-auto space-y-10">
        <SectionHeading
          id="experiences-heading"
          title="Des expériences devenues des forces"
          description="Chacune de mes expériences nourrit aujourd’hui ma manière d’analyser, de concevoir et de développer."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {EXPERIENCES.map((experience) => (
            <Card key={experience.title} hover className="space-y-3">
              <IconBadge>{experience.icon}</IconBadge>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">
                {experience.subtitle}
              </p>
              <h3 className="font-serif font-medium text-base text-[#2c3e2b]">
                {experience.title}
              </h3>
              <p className="text-xs text-[#4a5549] leading-relaxed">
                {experience.description}
              </p>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {experience.skills.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
