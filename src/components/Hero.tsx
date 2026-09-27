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
    <section className="relative bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Terminal logistique multimodal international Atlantic Transport"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/70" />
        <div className="absolute inset-0 bg-radial at-center from-transparent to-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Quiet Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Siège Social : Surrey (BC), Canada</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Hub Pacifique & Transatlantique</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Agrément Douanes CBSA</span>
            </div>

            {/* Slogan & Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance font-heading">
              Le monde sans frontières, <br />
              <span className="text-amber-400">votre logistique sans limites.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Atlantic Transport orchestre vos flux de marchandises à l'échelle internationale. 
              Transport multimodal global maritime et aérien, plateformes d'entreposage WMS haute capacité et courtage en douanes certifié.
            </p>

            {/* Interactive Live Tracking Searchbar */}
            <div className="pt-2 max-w-xl">
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 shadow-2xl backdrop-blur-md"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-amber-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="N° de suivi (ex: ATL-8924-CA ou ATL-5412-EU)"
                    className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Suivre mon fret</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                <span>Numéros d'essai :</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingInput('ATL-8924-CA');
                    onSearchTracking('ATL-8924-CA');
                  }}
                  className="text-amber-400/90 underline hover:text-amber-300 cursor-pointer font-mono"
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
                  className="text-amber-400/90 underline hover:text-amber-300 cursor-pointer font-mono"
                >
                  ATL-5412-EU
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDevis}
                className="px-6 py-3 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Calculer un devis de fret
              </button>
              <a
                href="#services"
                className="px-6 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Découvrir nos 3 pôles d'expertise
              </a>
            </div>
          </div>

          {/* Right Bento Overview Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">
                  Capacités Stratégiques
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Réseau Transcontinental & Océanique
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Fret Maritime Lignes Régulières</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Départs hebdomadaires FCL/LCL depuis le Port de Vancouver et terminaux atlantiques vers l'Europe, l'Asie et l'Afrique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Warehouse className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Entreposage King George Surrey</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      120 000 m² sous température contrôlée, gestion WMS radiofréquence et cross-docking 24/7.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-900/40 text-amber-400 border border-blue-800/50 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Courtage en Douane Agréé CBSA</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Dédouanement prioritaire EDI direct aux frontières canadiennes, américaines et européennes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantified Rigor Proof Row */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">+45</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pays connectés</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums">99.4%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">À l'heure</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">24/7</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Support dédié</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
