import ManifestCard from "./ManifestCard";
import Button from "../ui/Button";

export default function HeroAbout() {
  return (
    <header className="max-w-5xl mx-auto pt-10 md:pt-24 px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center text-[#2c3e2b]">
      <div className="md:col-span-7 space-y-6 order-2 md:order-1">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8c6239]">
          À propos
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2c3e2b] leading-tight">
          Construire. Concevoir. <br className="hidden sm:inline" />
          <span className="italic font-light text-[#8c6239]">développer avec exigence.</span>
        </h1>
        <p className="text-sm text-[#4a5549] max-w-xl leading-relaxed">
          Je transforme des besoins en solutions numériques utiles, accessibles et pensées pour durer. Mon parcours réunit la rigueur du bâtiment, la sensibilité de la création artisanale et la logique du développement web.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button to="/#contact" variant="primary">
            Me contacter
          </Button>
          <Button href="/cv.pdf" download="CV-Nesrine-Benlarbi.pdf" variant="outline">
            Télécharger mon CV
          </Button>
        </div>
      </div>

      {/* Carte manifeste : identité de L'Atelier, remplace la photo */}
      <div className="md:col-span-5 order-1 md:order-2">
        <ManifestCard />
      </div>
    </header>
  );
}
