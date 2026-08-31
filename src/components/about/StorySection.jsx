import SectionHeading from "../ui/SectionHeading";

export default function StorySection() {
  return (
    <section className="max-w-3xl mx-auto px-6 space-y-6" aria-labelledby="histoire-heading">
      <SectionHeading id="histoire-heading" title="Mon histoire" />
      <div className="space-y-4 text-sm text-[#4a5549] leading-relaxed">
        <p>
          Mon parcours ne suit pas une ligne droite. Il est pourtant guidé par une même conviction : une réalisation de qualité commence toujours par la compréhension du besoin.
        </p>
        <p>
          Dans le second œuvre du bâtiment, j’ai appris à travailler avec méthode, à anticiper les contraintes et à coordonner les différentes étapes d’un projet. La création textile m’a transmis le goût du détail, de l’équilibre et du travail soigné.
        </p>
        <p>
          Mon intérêt pour la médecine traditionnelle chinoise a renforcé mon sens de l’écoute et mon approche globale des problématiques. Aujourd’hui, je transpose ces acquis dans le développement web.
        </p>
        <p className="border-l-4 border-[#8c6239] bg-[#faf9f5] px-5 py-4 font-serif text-base italic text-[#2c3e2b] rounded-r-md">
          Construire n’a jamais été uniquement une question de matériaux. Aujourd’hui, mes outils sont simplement différents.
        </p>
      </div>
    </section>
  );
}
