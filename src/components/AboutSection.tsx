import React from 'react';
import { Award, Compass, ShieldCheck, Globe2, Building2, CheckCircle2 } from 'lucide-react';
import hqImage from '../assets/images/about_headquarters_1790544467481.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="apropos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Headquarters Spotlight */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-900">
              <img
                src={hqImage}
                alt="Siège social d'ATLANTIC TRANSPORT LTD à Surrey, Colombie-Britannique, Canada"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">
                  Siège Social & Plateforme Logistique Ouest
                </span>
                <h4 className="text-lg font-bold font-heading">
                  King George Blvd, Surrey, BC V3T 2W1, Canada
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Position stratégique sur le corridor Pacifique, à 35 minutes du Port de Vancouver et 20 minutes de la frontière US.
                </p>
              </div>
            </div>

            {/* Quick Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-lg font-bold text-blue-950 font-mono">15+</div>
                <div className="text-[11px] text-slate-500">Années d'expertise</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-lg font-bold text-amber-500 font-mono">120k m²</div>
                <div className="text-[11px] text-slate-500">Entrepôts sécurisés</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-lg font-bold text-blue-950 font-mono">45+</div>
                <div className="text-[11px] text-slate-500">Pays desservis</div>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-lg font-bold text-emerald-600 font-mono">99.4%</div>
                <div className="text-[11px] text-slate-500">Ponctualité</div>
              </div>
            </div>
          </div>

          {/* Text Presentation Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wider uppercase">
                <span>Identité d'Entreprise</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span>Surrey, Colombie-Britannique</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Une vision logistique sans frontières, ancrée au Canada et rayonnant dans le monde.
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fondée avec la volonté d'offrir aux exportateurs et importateurs une fluidité opérationnelle absolue, <strong className="text-slate-900 font-semibold">ATLANTIC TRANSPORT LTD</strong> est devenue une référence nord-américaine de la commission de transport et de la supply chain.
            </p>

            <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-slate-800 font-medium italic text-sm">
              « Le monde sans frontières, votre logistique sans limites. »
            </blockquote>

            <p className="text-slate-600 text-sm leading-relaxed">
              Depuis notre centre névralgique de Surrey (BC), nous pilotons le fret maritime vers l'Asie-Pacifique et l'Europe, les ponts aériens prioritaires et le transit douanier transfrontalier avec une rigueur absolue.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-900 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-900">Conformité CBSA & OEA</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Courtage en douane certifié et sécurisation douanière sans risque de blocage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-900">Réseau d'Affrètement Mondial</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Partenariats maritimes exclusifs garantissant des slots réservés toute l'année.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
