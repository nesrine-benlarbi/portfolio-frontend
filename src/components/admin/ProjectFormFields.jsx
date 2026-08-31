const FIELD_CLASS =
  "w-full border border-[#e1dad0] bg-[#fcfbfa] px-4 py-3 rounded-lg text-base text-[#2e2a25] transition-all focus:outline-none focus:border-[#5b8266] focus:ring-1 focus:ring-[#5b8266] placeholder-[#a39683]/60";
const LABEL_CLASS = "font-bold text-[#2e2a25] uppercase tracking-wider text-xs";
const ERROR_CLASS = "text-red-500 text-xs font-bold mt-1";

const urlValidation = {
  validate: (value) => !value || value.startsWith("https://") || "L'URL doit commencer par https://",
};

/**
 * Champs du formulaire projet, partagés entre CreateProjectPage et EditProjectPage.
 */
export default function ProjectFormFields({ register, errors }) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className={LABEL_CLASS}>
          Titre du projet
          <span className="text-red-500 ml-1" title="Ce champ est obligatoire" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Le titre est requis" })}
          aria-required="true"
          className={FIELD_CLASS}
          placeholder="Ex: Atelier de Médecine Chinoise"
        />
        {errors.title && <span className={ERROR_CLASS}>{errors.title.message}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className={LABEL_CLASS}>Description / Spécifications</label>
        <textarea
          id="description"
          rows="4"
          {...register("description")}
          className={FIELD_CLASS}
          placeholder="Décrivez les fibres techniques du projet..."
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="image_url" className={LABEL_CLASS}>Lien de l'image (URL)</label>
        <input
          type="text"
          id="image_url"
          {...register("image_url", urlValidation)}
          className={FIELD_CLASS}
          placeholder="https://mon-stockage.com/image.jpg"
        />
        {errors.image_url && <span className={ERROR_CLASS}>{errors.image_url.message}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="tech_stack" className={LABEL_CLASS}>Technologies (Séparées par des virgules)</label>
        <input
          type="text"
          id="tech_stack"
          {...register("tech_stack")}
          className={FIELD_CLASS}
          placeholder="Ex: React, Tailwind CSS, Node.js, MySQL"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="github_url" className={LABEL_CLASS}>Lien GitHub</label>
          <input
            type="text"
            id="github_url"
            {...register("github_url", urlValidation)}
            className={FIELD_CLASS}
            placeholder="https://github.com/..."
          />
          {errors.github_url && <span className={ERROR_CLASS}>{errors.github_url.message}</span>}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="demo_url" className={LABEL_CLASS}>Lien Live Demo</label>
          <input
            type="text"
            id="demo_url"
            {...register("demo_url", urlValidation)}
            className={FIELD_CLASS}
            placeholder="https://ma-demo.com/..."
          />
          {errors.demo_url && <span className={ERROR_CLASS}>{errors.demo_url.message}</span>}
        </div>
      </div>
    </>
  );
}
