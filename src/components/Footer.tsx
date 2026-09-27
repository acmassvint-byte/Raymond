import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, ShieldCheck, Lock, Code, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  onOpenPhpPack: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onOpenAdmin,
  onOpenPhpPack,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <button onClick={onNavigateHome} className="text-left focus:outline-none cursor-pointer">
              <Logo variant="dark" />
            </button>
            <p className="text-amber-400 font-semibold text-sm italic font-heading">
              « Le monde sans frontières, votre logistique sans limites. »
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commissaire de transport international et opérateur d'entreposage stratégique basé à Surrey, Colombie-Britannique, Canada. Connectant les corridors transcanadiens aux principales routes maritimes et aériennes mondiales.
            </p>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              ASFC / CBSA # A1948 · IATA Cargo # 01-4-8921
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">
              Nos Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Le Transport Multimodal Global (Maritime, Aérien, Routier)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Solutions d'Entreposage & Gestion de la Supply Chain
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Commission de Transport & Formalités Douanières
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-amber-400 transition-colors">
                  Suivi d'expédition en direct (EDI)
                </a>
              </li>
              <li>
                <a href="#devis" className="hover:text-amber-400 transition-colors">
                  Simulateur de cotation fret
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">
              Siège Social & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>King George Blvd, Surrey, BC V3T 2W1, Canada.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (506) 802-2226 · WhatsApp : +1 (506) 802-2226</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:atlantictransport.int@ik.me" className="hover:text-amber-400 transition-colors">
                  atlantictransport.int@ik.me
                </a>
              </div>
            </div>
          </div>

          {/* Portails & Livrables */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">
              Accès & Livrables
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenLogin}
                className="w-full text-left px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Portail Employé</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full text-left px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Backoffice Admin</span>
              </button>

              <button
                onClick={onOpenPhpPack}
                className="w-full text-left px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg text-xs text-amber-300 font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Code className="w-3.5 h-3.5 text-amber-400" />
                <span>Pack PHP/MySQL (public_html)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Atlantic Transport. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <span>Surrey, BC · Canada</span>
            <span aria-hidden="true">·</span>
            <span>Conditions Générales de Transport</span>
            <span aria-hidden="true">·</span>
            <span>Sécurité des Données</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
