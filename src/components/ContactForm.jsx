import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiFetch } from '../hooks/apiFetch';
import Button from './ui/Button';

const ContactForm = () => {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    setStatus({ type: null, message: '' });
    setIsSubmitting(true);
    try {
      await apiFetch('/contact', { method: 'POST', body: formData });
      setStatus({ type: 'success', message: 'Votre message a bien été transmis à l’atelier.' });
      reset();
    } catch (err) {
      setStatus({ type: 'error', message: err.message || "Une erreur est survenue." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Votre nom complet",
      placeholder: "Ex: Marie Dupont",
      rules: { required: "Ce champ est requis", minLength: { value: 2, message: "Minimum 2 caractères" } }
    },
    {
      name: "email",
      label: "Votre adresse email",
      type: "email",
      placeholder: "Ex: marie@exemple.fr",
      rules: { required: "Ce champ est requis", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email invalide" } }
    }
  ];

  return (
   <div className="w-full max-w-xl mx-auto border border-[#e6e2da] px-3.5 py-6 sm:p-8 lg:p-10 bg-[#faf9f5] rounded-xl shadow-sm font-sans text-[#1c281b] box-border">
      <h3 className="text-xl sm:text-2xl font-serif text-[#8c6239] mb-2">Construisons ensemble</h3>
      <p className="text-xs sm:text-sm text-[#5c665b] mb-8">Un projet de site web, une application ou une idée à façonner ? Décrivez-moi votre besoin.</p>
  {
    status.message && (
      <div
        role="alert"
        className={`mb-6 p-4 text-xs rounded-lg text-center font-medium ${status.type === 'success'
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
          : 'bg-rose-50 text-rose-800 border border-rose-100'
          }`}
      >
        {status.message}
      </div>
    )
  }

  {/* 📱 RESPONSIVE : flex flex-col w-full sur le form pour cadenasser la largeur des enfants */ }
  <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-5" noValidate>

    {/* Boucle dynamique pour les inputs */}
    {formFields.map((field) => {
      const hasError = !!errors[field.name];
      const errorId = `error-${field.name}`;
      const inputId = `contact-${field.name}`;

      return (
        /* 📱 RESPONSIVE : Sécurité w-full block sur le conteneur du champ */
        <div key={field.name} className="w-full block flex flex-col space-y-1.5">
          <label htmlFor={inputId} className="text-[10px] uppercase tracking-widest text-[#8c6239] font-sans font-bold cursor-pointer">
            {field.label} <span className="text-rose-600" aria-hidden="true">*</span>
          </label>

          <input
            id={inputId}
            type={field.type || "text"}
            {...register(field.name, field.rules)}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? errorId : undefined}

            /* ⚡ FORCE LA LARGEUR SANS PASSER PAR TAILWIND */
            style={{ width: '100%', minWidth: '0', boxSizing: 'border-box', display: 'block' }}

            className={`border bg-white rounded-md p-2.5 text-sm focus:outline-none transition-all focus:ring-1 ${hasError
              ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-400'
              : 'border-[#e6e2da] focus:border-[#8c6239] focus:ring-[#8c6239]'
              }`}
            placeholder={field.placeholder}
          />

          {hasError && (
            <span id={errorId} className="text-rose-600 text-[11px] font-medium pl-1" role="alert">
              ⚠️ {errors[field.name].message}
            </span>
          )}
        </div>
      );
    })}

    {/* Champ Message (Textarea séparé) */}
    {/* 📱 RESPONSIVE : Sécurité w-full block sur le conteneur du message */}
    <div className="w-full block flex flex-col space-y-1.5">
      <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest text-[#8c6239] font-sans font-bold cursor-pointer">
        Votre Message <span className="text-rose-600" aria-hidden="true">*</span>
      </label>

      <textarea
        id="contact-message"
        rows="4"
        {...register("message", { required: "Le message est requis", minLength: { value: 10, message: "Minimum 10 caractères" } })}
        aria-invalid={errors.message ? "true" : "false"}
        aria-describedby={errors.message ? "error-message" : undefined}

        /* ⚡ FORCE LA LARGEUR SANS PASSER PAR TAILWIND */
        style={{ width: '100%', minWidth: '0', boxSizing: 'border-box', display: 'block' }}

        className={`border bg-white rounded-md p-2.5 text-sm focus:outline-none transition-all resize-none focus:ring-1 ${errors.message
          ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-400'
          : 'border-[#e6e2da] focus:border-[#8c6239] focus:ring-[#8c6239]'
          }`}
        placeholder="Détails de votre projet, délais, inspirations..."
      />

      {errors.message && (
        <span id="error-message" className="text-rose-600 text-[11px] font-medium pl-1" role="alert">
          ⚠️ {errors.message.message}
        </span>
      )}
    </div>

    <Button type="submit" variant="ochre" fullWidth disabled={isSubmitting}>
      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
    </Button>
  </form>
    </div >
  );
};

export default ContactForm;