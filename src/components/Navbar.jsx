import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from './ui/Button';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // État pour ouvrir/fermer le menu burger sur mobile
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Ferme le menu mobile en se déconnectant
    navigate('/');
  };

  return (
    <nav className="bg-[#faf9f5] border-b border-[#e6e2da] sticky top-0 z-50 font-sans text-[#2c3e2b]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* L'Enseigne épurée */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group text-[#2c3e2b] cursor-pointer">
          {/* LOGO */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2c3e2b] text-[#fbfaf7] font-serif text-sm font-bold tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-sm">
            NB
          </div>

          {/* LE TEXTE */}
          <div className="flex flex-col justify-center border-l border-[#e6e2da] pl-4 h-10">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#2c3e2b] leading-none mb-1.5">
              L'Atelier
            </span>
            <span className="text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-[#8c6239] leading-none">
              Conception & Structure
            </span>
          </div>
        </Link>

        {/* BOUTON BURGER (Visible uniquement sur mobile - hidden md:flex) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-11 h-11 rounded-md border border-[#e6e2da] gap-1.5 md:hidden cursor-pointer"
          aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className={`h-[2px] w-5 bg-[#2c3e2b] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`h-[2px] w-5 bg-[#2c3e2b] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-5 bg-[#2c3e2b] transition-all duration-300 ${isOpen ? '-rotate-45 translate-y-[-8px]' : ''}`} />
        </button>

        {/* MENU ORDINATEUR (Caché sur mobile - hidden md:flex) */}
        <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
          <Link 
            to="/" 
            className="text-[#2c3e2b] hover:text-[#8c6239] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
          >
            Accueil
          </Link>
          
          <Link
            to="/projects"
            className="text-[#2c3e2b] hover:text-[#8c6239] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
          >
            Portfolio
          </Link>

          <Link
            to="/a-propos"
            className="text-[#2c3e2b] hover:text-[#8c6239] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
          >
            À propos
          </Link>

          {/* Condition : On affiche Dashboard + Déconnexion UNIQUEMENT si connecté, sinon RIEN */}
          {isAuthenticated && (
            <>
              <Link
                to="/admin"
                className="text-[#8c6239] hover:text-[#2c3e2b] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8c6239] hover:after:w-full after:transition-all after:duration-300"
              >
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          )}
        </div>
      </div>

      {/* MENU MOBILE RÉTRACTABLE (S'ouvre sous la barre au clic) */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#faf9f5] border-t border-[#e6e2da] ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 flex flex-col space-y-4 text-xs uppercase tracking-widest font-medium">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="text-[#2c3e2b] hover:text-[#8c6239] py-1 transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/projects"
            onClick={() => setIsOpen(false)}
            className="text-[#2c3e2b] hover:text-[#8c6239] py-1 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            to="/a-propos"
            onClick={() => setIsOpen(false)}
            className="text-[#2c3e2b] hover:text-[#8c6239] py-1 transition-colors"
          >
            À propos
          </Link>

          {isAuthenticated && (
            <div className="flex flex-col space-y-3 pt-2 border-t border-[#e6e2da]">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-[#8c6239] hover:text-[#2c3e2b] py-1 transition-colors"
              >
                Dashboard
              </Link>
              <Button variant="outline" size="sm" fullWidth onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;