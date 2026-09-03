import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/apiFetch";

const FIELD_CLASS =
  "w-full border border-[#e1dad0] bg-[#fcfbfa] px-4 py-3 rounded-lg text-base text-[#2e2a25] transition-all focus:outline-none focus:border-[#5b8266] focus:ring-1 focus:ring-[#5b8266] placeholder-[#a39683]/60";
const LABEL_CLASS = "font-bold text-[#2e2a25] uppercase tracking-wider text-xs";
const ERROR_CLASS = "text-red-500 text-xs font-bold mt-1";
const HINT_CLASS = "text-[#7a6e5d] text-xs";

const urlValidation = {
  validate: (value) => !value || value.startsWith("https://") || "L'URL doit commencer par https://",
};

/**
 * Champs du formulaire projet, partagés entre CreateProjectPage et EditProjectPage.
 *
 * Les catégories et les technologies proviennent désormais de leurs propres
 * tables : la liste des catégories alimente le menu déroulant, et celle des
 * technologies sert de suggestions à la saisie.
 */
export default function ProjectFormFields({ register, errors }) {
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    let actif = true;

    const chargerListes = async () => {
      try {
        const [cats, techs] = await Promise.all([
          apiFetch("/categories"),
          apiFetch("/technologies"),
        ]);
        if (!actif) return;
        setCategories(cats || []);
        setTechnologies(techs || []);
      } catch {
        // Les listes ne sont qu'une aide à la saisie : en cas d'échec, le
        // formulaire reste utilisable, la catégorie sera simplement vide.
        if (actif) {
          setCategories([]);
          setTechnologies([]);
        }
      }
    };

    chargerListes();
    return () => {
      actif = false;
    };
  }, []);

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
        <label htmlFor="category" className={LABEL_CLASS}>Catégorie</label>
        <input
          type="text"
          id="category"
          list="liste-categories"
          {...register("category")}
          className={FIELD_CLASS}
          placeholder="Ex: Application web"
          aria-describedby="aide-categorie"
        />
        <datalist id="liste-categories">
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.name} />
          ))}
        </datalist>
        <span id="aide-categorie" className={HINT_CLASS}>
          Choisissez une catégorie existante ou saisissez-en une nouvelle : elle sera créée automatiquement.
        </span>
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
        <label htmlFor="technologies" className={LABEL_CLASS}>Technologies (Séparées par des virgules)</label>
        <input
          type="text"
          id="technologies"
          list="liste-technologies"
          {...register("technologies")}
          className={FIELD_CLASS}
          placeholder="Ex: React, Tailwind CSS, Node.js, MySQL"
          aria-describedby="aide-technologies"
        />
        <datalist id="liste-technologies">
          {technologies.map((techno) => (
            <option key={techno.id} value={techno.name} />
          ))}
        </datalist>
        <span id="aide-technologies" className={HINT_CLASS}>
          {technologies.length > 0
            ? `${technologies.length} technologies déjà enregistrées. Une technologie inconnue est créée automatiquement.`
            : "Une technologie inconnue est créée automatiquement."}
        </span>
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
