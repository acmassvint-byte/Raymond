import React, { useState } from 'react';
import { Search, ArrowRight, Shield, Anchor, Plane, Truck, Warehouse } from 'lucide-react';
import heroImg from '../assets/images/hero_logistics_hub_1790544422741.jpg';

interface HeroProps {
  onSearchTracking: (code: string) => void;
  onOpenDevis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchTracking, onOpenDevis }) => {
  const [trackingInput, setTrackingInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onSearchTracking(trackingInput.trim());
    }
  };

  return (
    <section className="relative bg-slate-950 text-white min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Terminal logistique multimodal international Atlantic Transport"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-blue-950/75" />
        <div className="absolute inset-0 bg-radial at-center from-transparent to-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Unboxed Quiet Kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-bold text-amber-400 tracking-wider uppercase">
              <span>Siège Social : Surrey (BC), Canada</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Hub Pacifique</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Douanes CBSA</span>
            </div>

            {/* Slogan & Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] font-heading">
              Le monde sans frontières, <br className="hidden sm:inline" />
              <span className="text-amber-400">votre logistique sans limites.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              <strong className="text-white font-semibold">ATLANTIC TRANSPORT LTD</strong> orchestre vos flux de fret à l'échelle internationale : transport multimodal mondial (maritime, aérien, routier), plateformes d'entreposage logistique sécurisées à Surrey et courtage en douanes certifié.
            </p>

            {/* Interactive Live Tracking Searchbar */}
            <div className="pt-1 max-w-xl">
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-1.5 sm:p-2.5 flex flex-col sm:flex-row gap-2 shadow-2xl backdrop-blur-md"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 ml-2.5 sm:ml-3 shrink-0" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="N° de suivi (ex: ATL-8924-CA)"
                    className="w-full bg-transparent px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Suivre mon fret</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-[11px] sm:text-xs text-slate-400 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>Numéros d'essai :</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingInput('ATL-8924-CA');
                    onSearchTracking('ATL-8924-CA');
                  }}
                  className="text-amber-400 underline hover:text-amber-300 cursor-pointer font-mono font-medium"
                >
                  ATL-8924-CA
                </button>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingInput('ATL-5412-EU');
                    onSearchTracking('ATL-5412-EU');
                  }}
                  className="text-amber-400 underline hover:text-amber-300 cursor-pointer font-mono font-medium"
                >
                  ATL-5412-EU
                </button>
              </div>
            </div>

            {/* CTA Buttons (Responsive on mobile) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenDevis}
                className="px-6 py-3 text-center text-xs sm:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Calculer un devis de fret
              </button>
              <a
                href="#services"
                className="px-5 py-3 text-center text-xs sm:text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors"
              >
                Découvrir nos 3 services
              </a>
            </div>
          </div>

          {/* Right Bento Overview Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-7 shadow-2xl backdrop-blur-md space-y-5 sm:space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] sm:text-xs uppercase text-amber-400 font-bold tracking-wider">
                  Capacités Stratégiques
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Réseau Transcontinental & Océanique
                </h3>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Anchor className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Fret Maritime FCL / LCL</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Liaisons maritimes directes Port de Vancouver vers Rotterdam, Le Havre, Shanghai et Singapour.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Fret Aérien Express IATA</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Départs quotidiens fret cargo au départ de l'aéroport international de Vancouver (YVR).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Warehouse className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Entrepôt Logistique Surrey</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      120 000 m² de stockage sécurisé, cross-docking et plateforme sous douane sur King George Blvd.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Agréé ASFC / CBSA # A1948</span>
                </span>
                <span className="text-emerald-400 font-medium">Opérations 24/7</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
