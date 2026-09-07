import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { apiFetch } from '../hooks/apiFetch';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour l'icône de l'œil
  
  // Validation requise par l'atelier via React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: data,
      });

      login(response.token);
      navigate('/admin');
    } catch (err) {
      setServerError(err.message || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#faf9f5] flex items-center justify-center px-6 py-12 font-sans text-[#2c3e2b]">
      <Card tone="clay" padding="p-6 md:p-8" className="w-full max-w-md shadow-sm space-y-6">
        
        {/* En-tête Style Atelier Épuré */}
        <div className="space-y-2 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8c6239] font-sans font-bold">
            Espace Privé
          </p>
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wide text-[#2e2a25]">
            Connexion Administration
          </h1>
          <p className="text-xs text-[#a39683] font-medium italic">
            Gestion des pièces et archives du portfolio
          </p>
          <div className="h-[1px] w-12 bg-[#e1dad0] mx-auto mt-3"></div>
        </div>

        {/* Message d'erreur dynamique */}
        {serverError && (
          <div className="p-3 bg-red-50/50 border border-red-100 text-red-600 text-xs rounded-lg text-center font-medium">
            {serverError}
          </div>
        )}

        {/* Formulaire avec blocage de l'auto-complétion globale */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
          
          {/* Champ E-mail */}
          <div className="flex flex-col space-y-1.5">
            {/* CORRECTION RGAA : Le htmlFor cible précisément l'id de l'input */}
            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[#a39683] font-sans font-bold cursor-pointer">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email" /* id unique, cible du htmlFor du label */
              {...register('email', { 
                required: "L'adresse e-mail est requise",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Format d'e-mail invalide" }
              })}
              autoComplete="new-password"
              className={`border rounded-md p-2.5 text-sm bg-[#faf9f5] focus:outline-none focus:bg-white transition-all ${
                errors.email 
                  ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                  : 'border-[#e1dad0] focus:border-[#5b8266] focus:ring-1 focus:ring-[#5b8266]'
              }`}
              placeholder="admin@portfolio.fr"
            />
            {errors.email && (
              <span className="text-red-600 text-[11px] font-medium mt-0.5 pl-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="flex flex-col space-y-1.5">
            {/* CORRECTION RGAA : Le htmlFor cible précisément l'id de l'input */}
            <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-[#a39683] font-sans font-bold cursor-pointer">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password" /* id unique, cible du htmlFor du label */
                {...register('password', { required: "Le mot de passe est requis" })}
                autoComplete="new-password"
                className={`w-full border rounded-md p-2.5 pr-10 text-sm bg-[#faf9f5] focus:outline-none focus:bg-white transition-all ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                    : 'border-[#e1dad0] focus:border-[#5b8266] focus:ring-1 focus:ring-[#5b8266]'
                }`}
                placeholder="••••••••"
              />
              
              {/* Bouton Œil */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a39683] hover:text-[#2e2a25] transition-colors cursor-pointer select-none p-1"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
            
            {errors.password && (
              <span className="text-red-600 text-[11px] font-medium mt-0.5 pl-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Bouton d'envoi principal */}
          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Vérification...' : 'Se connecter'}
            </Button>
          </div>
        </form>

        {/* Lien vers la page d'accueil public */}
        <div className="text-center pt-4 border-t border-[#f0ece6]">
          <Link
            to="/"
            className="inline-block text-[10px] uppercase tracking-widest font-sans font-bold text-[#a39683] hover:text-[#5b8266] transition-colors duration-300"
          >
            Retour au site public
          </Link>
        </div>

      </Card>
    </div>
  );
};

export default LoginPage;