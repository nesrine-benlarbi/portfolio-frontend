import ContactForm from '../components/ContactForm';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

// Centralisation des compétences de terrain pour un code lisible et pro
const SKILLS = [
  {
    title: "Gestion des infrastructures",
    description: "Mon expérience éprouvée en conduite de chantiers du second œuvre m'a formée au respect strict des cahiers des charges, à la gestion des imprévus techniques et à la livraison d'ouvrages conformes aux attentes."
  },
  {
    title: "Conception et design global",
    description: "Issue d'un parcours lié à la création textile et à la décoration d'intérieur, je possède une sensibilité naturelle pour l'ergonomie, l'harmonie visuelle et le soin millimétré apporté aux interfaces."
  },
  {
    title: "Analyse globale et écoute",
    description: "Mes années d'études rigoureuses en médecine traditionnelle et en gestion d'espaces équestres m'ont appris à écouter les besoins en profondeur, à poser des diagnostics précis et à concevoir des solutions globales personnalisées."
  }
];

const HomePage = () => {
  return (
    /* RESPONSIVE : On adapte les grands espaces verticaux (space-y-16 sur mobile, space-y-28 sur PC) pour un meilleur confort visuel */
    <div className="text-[#1c281b] space-y-16 md:space-y-28 pb-20 font-sans selection:bg-[#2c3e2b]/10">

      {/* 1. SECTION INTRODUCTIVE */}
      <header className="max-w-5xl mx-auto pt-10 md:pt-24 px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center text-[#2c3e2b]">

        {/* Texte principal */}
        <div className="md:col-span-7 space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8c6239]">
            Création de Sites & Applications Web
          </p>
          {/* RESPONSIVE : Titre fluide (text-3xl sur mobile, lg:text-5xl sur PC) pour éviter les césures laides sur smartphone */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2c3e2b] leading-tight">
            Donner une structure à vos idées, <br className="hidden sm:inline" />
            <span className="italic font-light text-[#8c6239]">du plan à la réalisation.</span>
          </h1>
          {/* RGAA : Remplacement de text-gray-600 par text-[#4a5549] pour garantir le ratio de contraste de 4.5:1 exigé */}
          <div className="space-y-4 text-sm text-[#4a5549] max-w-xl leading-relaxed">
            <p>
              Bonjour, je m'appelle Nesrine. Mon parcours est guidé par une double passion : le sens du détail graphique et la rigueur de la construction. Qu'il s'agisse de dessiner un vêtement, de piloter un chantier de rénovation, d'écouter un patient ou de concevoir un site web, la démarche reste la même.
            </p>
            <p>
              Je traduis vos besoins en outils numériques fluides, soignés et faciles à utiliser, en prenant en charge l'intégralité du projet, du design visuel jusqu'à la technique invisible.
            </p>
          </div>
          <div className="pt-2">
            <Button to="/projects" variant="primary">
              Découvrir le portfolio
            </Button>
          </div>
        </div>

        {/* Encadré d'intention */}
        {/* RGAA / Sémantique : Utilisation de la balise <aside> (contenu connexe) au lieu d'une div neutre */}
        <aside className="md:col-span-5 bg-white border border-[#e6e2da] rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#8c6239] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-xs font-bold text-[#8c6239] uppercase tracking-wider border-b border-[#e6e2da] pb-2">
            La philosophie de l'Atelier
          </div>
          {/* RGAA : Contraste corrigé de text-gray-600 vers text-[#4a5549] */}
          <p className="text-xs text-[#4a5549] leading-relaxed italic">
            "J'ai toujours aimé façonner les choses de mes mains et organiser les espaces. Pour moi, le code informatique est un artisanat moderne. On part d'une feuille blanche, on trace un plan rigoureux, on choisit les bonnes matières, et on assemble le tout pour créer un espace — cette fois-ci virtuel — où vos clients se sentent bien."
          </p>
          {/* RGAA : Contraste augmenté pour la signature (text-[#6b7264]) */}
          <div className="flex justify-between items-center text-[10px] text-[#6b7264] font-medium pt-2">
            <span>— Nesrine Benlarbi</span>
            <span>Lyon, France</span>
          </div>
        </aside>

      </header>

      {/* 2. VALEUR AJOUTÉE : Vos Compétences */}
      <section className="bg-[#faf9f5] border-t border-b border-[#e6e2da] py-12 md:py-16 px-6" aria-labelledby="skills-heading">
        <div className="max-w-5xl mx-auto space-y-12">
          <SectionHeading
            id="skills-heading"
            title="Une double culture de la structure et de la relation client"
          />

          {/* RESPONSIVE : grid-cols-1 par défaut sur mobile, et grid-cols-3 dès la taille 'md' (tablettes/PC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm">
            {SKILLS.map((skill, index) => (
              <Card key={index} hover className="space-y-2">
                <h3 className="font-serif font-medium text-base text-[#8c6239]">{skill.title}</h3>
                {/* RGAA : Contraste text-gray-600 -> text-[#4a5549] */}
                <p className="text-xs text-[#4a5549] leading-relaxed">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION CONTACT */}
      {/* RGAA : Identification claire de la section de contact grâce à l'aria-labelledby relié au titre */}
      <section id="contact" className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-24" aria-labelledby="contact-heading">
        <div className="lg:col-span-6 space-y-6 lg:pr-8">
          <div className="flex items-center gap-2">
            {/* RGAA (Critère 1.2) : L'élément purement décoratif (la puce animée) est masqué pour les lecteurs d'écran */}
            <span className="w-2 h-2 rounded-full bg-[#8c6239] animate-pulse" aria-hidden="true"></span>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8c6239]">
              Contact & Étude de besoins
            </p>
          </div>
          {/* RESPONSIVE : text-2xl sur mobile, lg:text-3xl sur écran large */}
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-serif text-[#2c3e2b] leading-tight">
            Planifions votre <br />prochain projet web
          </h2>
          {/* RGAA : Amélioration du contraste text-gray-600 -> text-[#4a5549] */}
          <p className="text-sm text-[#4a5549] leading-relaxed">
            Vous recherchez un profil technique mature, capable de s'approprier les logiques de votre secteur d'activité pour bâtir une interface ou une API sur mesure ?
          </p>
          {/* RGAA : Amélioration du contraste text-gray-500 -> text-[#5c665b] */}
          <p className="text-xs text-[#5c665b] leading-relaxed italic">
            Réponse sous 48h. L'échange initial permet de cadrer vos besoins sans engagement.
          </p>
        </div>

        {/* Conteneur du formulaire */}
        {/* RESPONSIVE : Ajustement fin des paddings (p-6 sur mobile, md:p-8 sur PC) pour que le formulaire respire */}
        <div className="lg:col-span-6 w-full bg-white border border-[#e6e2da] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[#dcd7ce] transition-all duration-500 transform hover:-translate-y-1">
          <ContactForm />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
