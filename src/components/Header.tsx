import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, ShieldCheck, UserCheck, LogOut, Code, Menu, X, ChevronRight } from 'lucide-react';
import { SessionState } from '../services/storageService';

interface HeaderProps {
  session: SessionState | null;
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  onOpenEmployee: () => void;
  onOpenPhpPack: () => void;
  onLogout: () => void;
  currentView: 'home' | 'admin' | 'employee';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onOpenLogin,
  onOpenAdmin,
  onOpenEmployee,
  onOpenPhpPack,
  onLogout,
  currentView,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navigateToSection = (sectionId: string) => {
    closeMobileMenu();
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs backdrop-blur-md">
      {/* Top Corporate Strip with Direct Contact Info (Hidden on small mobile screens to save space) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>King George Blvd, Surrey, BC V3T 2W1, Canada</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+1 (506) 802-2226</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>atlantictransport.int@ik.me</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400/90 font-medium">Transitaire & Douanes Agréés CBSA / OEA</span>
            {session?.user.role === 'admin' && (
              <button
                onClick={onOpenPhpPack}
                className="text-amber-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-mono text-[11px] bg-slate-800/90 px-2.5 py-0.5 rounded border border-amber-500/50"
                title="Consulter le code source PHP & base de données SQL pour cPanel"
              >
                <Code className="w-3 h-3 text-amber-400" />
                <span>Pack PHP/MySQL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Mark (Logo) */}
        <button
          onClick={() => {
            onNavigateHome();
            closeMobileMenu();
          }}
          className="text-left focus-visible:outline-none cursor-pointer shrink-0"
        >
          <Logo />
        </button>

        {/* Desktop Navigation Links (4-6 clean links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={() => {
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`hover:text-blue-900 transition-colors cursor-pointer py-1 ${
              currentView === 'home' ? 'text-blue-900 font-bold border-b-2 border-amber-500' : ''
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => navigateToSection('services')}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => navigateToSection('tracking')}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Suivi d'expédition
          </button>
          <button
            onClick={() => navigateToSection('devis')}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Devis Express
          </button>
          <button
            onClick={() => navigateToSection('apropos')}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            À propos
          </button>
          <button
            onClick={() => navigateToSection('contact')}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {session ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {session.user.role === 'admin' ? (
                <>
                  <button
                    onClick={onOpenAdmin}
                    className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      currentView === 'admin'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-blue-950 text-white hover:bg-blue-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                    <span>Backoffice RH</span>
                  </button>

                  <button
                    onClick={onOpenPhpPack}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 transition cursor-pointer"
                    title="Code source PHP/MySQL pour cPanel"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Pack PHP</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenEmployee}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'employee'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-blue-950 text-white hover:bg-blue-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="truncate max-w-[100px] sm:max-w-none">
                    Espace ({session.employee?.matricule || 'Employé'})
                  </span>
                </button>
              )}
              <button
                onClick={onLogout}
                className="p-1.5 sm:p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Only Espace Employé is shown to visitors (NO admin RH link) */}
              <button
                onClick={onOpenLogin}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-900 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Espace Employé</span>
              </button>
              <button
                onClick={() => navigateToSection('devis')}
                className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Demander un devis
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Menu de navigation mobile"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 text-white border-b border-slate-800 px-4 py-5 shadow-2xl animate-fade-in space-y-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigateHome();
                closeMobileMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-200 flex items-center justify-between"
            >
              <span>Accueil</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => navigateToSection('services')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-200 flex items-center justify-between"
            >
              <span>Services de Logistique</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => navigateToSection('tracking')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-200 flex items-center justify-between"
            >
              <span>Suivi d'expédition (EDI)</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => navigateToSection('devis')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-amber-400 flex items-center justify-between"
            >
              <span>Calculer un devis de fret</span>
              <ChevronRight className="w-4 h-4 text-amber-500" />
            </button>
            <button
              onClick={() => navigateToSection('apropos')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-200 flex items-center justify-between"
            >
              <span>À propos d'ATLANTIC TRANSPORT LTD</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => navigateToSection('contact')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-200 flex items-center justify-between"
            >
              <span>Contact & Siège Surrey</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>+1 (506) 802-2226</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>atlantictransport.int@ik.me</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>King George Blvd, Surrey, BC Canada</span>
            </div>
          </div>

          {!session && (
            <div className="pt-2">
              <button
                onClick={() => {
                  closeMobileMenu();
                  onOpenLogin();
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Accès Espace Employé</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
