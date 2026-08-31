import Card from "../ui/Card";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="max-w-5xl mx-auto px-6 space-y-6">
      <Card padding="p-8 md:p-10" className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-serif text-[#2c3e2b]">
          Et maintenant ?
        </h2>
        <p className="text-sm text-[#4a5549] leading-relaxed max-w-2xl">
          Je souhaite rejoindre un environnement où je pourrai renforcer mes compétences, collaborer avec une équipe et participer à la création d’applications répondant à de véritables besoins.
        </p>
        <p className="text-sm text-[#4a5549] leading-relaxed max-w-2xl">
          Je porte une attention particulière à l’accessibilité, à la qualité du code, à la sécurité et à l’expérience proposée aux utilisateurs.
        </p>
        <div className="pt-2">
          <Button to="/projects" variant="primary">
            Découvrir mes projets
          </Button>
        </div>
      </Card>

      <Card
        padding="p-8 md:p-10"
        hover
        className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#2c3e2b]">
            Un projet ou une opportunité ?
          </h2>
          <p className="mt-2 text-sm text-[#4a5549] leading-relaxed">
            N’hésitez pas à me contacter, je serai ravie d’échanger avec vous.
          </p>
        </div>

        <Button to="/#contact" variant="primary" className="whitespace-nowrap">
          Me contacter
        </Button>
      </Card>
    </section>
  );
}
