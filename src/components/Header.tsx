import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, ShieldCheck, UserCheck, LogOut, Code } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs backdrop-blur-md">
      {/* Top Corporate Strip with Direct Contact Info */}
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
            <button
              onClick={onOpenPhpPack}
              className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
              title="Consulter le code source PHP & base de données SQL pour cPanel"
            >
              <Code className="w-3 h-3 text-amber-400" />
              <span>Livrable PHP/MySQL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={onNavigateHome}
          className="text-left focus-visible:outline-none cursor-pointer"
        >
          <Logo />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={onNavigateHome}
            className={`hover:text-blue-900 transition-colors cursor-pointer ${
              currentView === 'home' ? 'text-blue-900 font-semibold border-b-2 border-amber-500 py-1' : ''
            }`}
          >
            Accueil
          </button>
          <a
            href="#services"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Services
          </a>
          <a
            href="#tracking"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Suivi d'expédition
          </a>
          <a
            href="#apropos"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            À propos
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-blue-900 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2">
              {session.user.role === 'admin' ? (
                <button
                  onClick={onOpenAdmin}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'admin'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-blue-950 text-white hover:bg-blue-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Backoffice Admin</span>
                </button>
              ) : (
                <button
                  onClick={onOpenEmployee}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'employee'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-blue-950 text-white hover:bg-blue-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Mon Espace ({session.employee?.matricule || 'Employé'})</span>
                </button>
              )}
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-900" />
                <span>Espace Collaborateur</span>
              </button>
              <a
                href="#devis"
                onClick={(e) => {
                  if (currentView !== 'home') {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                Demander un devis
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
