import React, { useState } from 'react';
import { Ship, Plane, Truck, Warehouse, ShieldCheck, FileCheck, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import imgMultimodal from '../assets/images/service_multimodal_1790544435185.jpg';
import imgWarehouse from '../assets/images/service_warehousing_1790544447448.jpg';
import imgCustoms from '../assets/images/service_customs_1790544457786.jpg';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  keyFeatures: string[];
  specs: { label: string; value: string }[];
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'multimodal',
    title: "Le Transport Multimodal Global",
    subtitle: "Maritime, Aérien, Routier & Ferroviaire International",
    image: imgMultimodal,
    description: "Une synchronisation millimétrée de vos cargaisons à travers les océans, les airs et les corridors terrestres transaméricains. Nous combinons la puissance du conteneur maritime (FCL/LCL) et la rapidité du fret aérien IATA avec un acheminement routier du dernier kilomètre garanti.",
    keyFeatures: [
      "Fret Maritime FCL (conteneurs complets 20'/40'/HQ) et LCL (groupage optimisé)",
      "Lignes régulières directes Port de Vancouver & Côtes Nord-Américaines vers Europe, Asie et Afrique",
      "Fret Aérien Express IATA avec affrètement cargo charter pour livraisons urgentes",
      "Corridors ferroviaires et routiers sécurisés entre le Canada, les USA et le Mexique (ALENA/CUSMA)",
      "Traçabilité GPS par balise connectée en temps réel avec température contrôlée (Reefer)"
    ],
    specs: [
      { label: "Capacité conteneurs", value: "+15 000 EVP / an" },
      { label: "Départs hebdomadaires", value: "18 liaisons régulières" },
      { label: "Transit moyen Atlantique", value: "9 à 12 jours" },
      { label: "Accréditation IATA", value: "Agent certifié Cargo" }
    ]
  },
  {
    id: 'warehousing',
    title: "Solutions d'Entreposage & Gestion de la Supply Chain",
    subtitle: "Stockage Haute Densité, WMS Temps Réel & Cross-Docking",
    image: imgWarehouse,
    description: "Implantée au cœur de la zone industrielle de Surrey (King George Blvd), notre plateforme logistique classe A offre une flexibilité totale pour vos marchandises. Du stockage grande hauteur à la préparation de commandes complexes en picking unitaire ou colis complet, notre système WMS connecté offre une visibilité instantanée sur vos inventaires.",
    keyFeatures: [
      "Plus de 120 000 m² d'espaces d'entreposage sécurisés 24/7 avec vidéosurveillance périmétrique",
      "Zones à température ambiante, fraîche (2°C-8°C) et cryo-conservée pour produits sensibles",
      "Opérations de cross-docking ultra-rapides pour reconditionnement et réexpédition immédiate",
      "Système WMS interconnectable par API / EDI avec votre ERP (SAP, Oracle, Shopify, etc.)",
      "Gestion complète de la logistique inverse (retours, reconditionnement, destruction certifiée)"
    ],
    specs: [
      { label: "Surface de stockage", value: "120 000 m² (Surrey, BC)" },
      { label: "Capacité palettes", value: "65 000 emplacements" },
      { label: "Taux de précision inventaire", value: "99.98% garanti" },
      { label: "Sécurité", value: "Gardiennage & badges biométriques" }
    ]
  },
  {
    id: 'customs',
    title: "Commission de Transport & Formalités Douanières",
    subtitle: "Dédouanement Rapide, Transitaire Agréé CBSA & Conformité",
    image: imgCustoms,
    description: "En tant que commissaire de transport agréé par l'Agence des services frontaliers du Canada (ASFC/CBSA) et certifié Opérateur Économique Agréé (OEA), nous sécurisons toutes vos démarches réglementaires. Dédouanement anticipé, classification tarifaire précise et optimisation des droits et taxes pour un passage frontalier sans accroc.",
    keyFeatures: [
      "Télé-déclaration en douane informatisée EDI directe 24/7 avec les douanes canadiennes et US (CBP)",
      "Classification tarifaire SH (Système Harmonisé) et audits de conformité d'origine",
      "Gestion des licences d'importation/exportation et contrôles sanitaires (Santé Canada, CFIA)",
      "Régimes douaniers économiques : perfectionnement actif, entrepôt sous douane, admission temporaire",
      "Conseil juridique en fiscalité du commerce international et accords de libre-échange (CETA/AECG, CUSMA)"
    ],
    specs: [
      { label: "Agrément ASFC/CBSA", value: "Courtier en douane accrédité" },
      { label: "Certification OEA", value: "Statut Sécurité & Sûreté" },
      { label: "Délai moyen de dédouanement", value: "< 2 heures (flux EDI)" },
      { label: "Audits de conformité", value: "0 litige réglementaire" }
    ]
  }
];

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wider uppercase">
            <span>Expertise Métier</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>3 Pôles Stratégiques</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Normes Internationales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 font-heading">
            Des solutions logistiques complètes et sur mesure pour vos flux mondiaux.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            De la prise en charge à l'usine d'origine jusqu'à la livraison finale en entrepôt, Atlantic Transport maîtrise l'ensemble de la chaîne de valeur du transport et de la logistique internationale.
          </p>
        </div>

        {/* 3 Large Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col group"
            >
              {/* Image Container with Fallback */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Number index */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-xs text-amber-400 font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-slate-700">
                  0{index + 1}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-medium text-amber-300 tracking-wide uppercase">
                    {service.subtitle}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug font-heading">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                    {service.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-blue-900 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Fiche technique</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectServiceForQuote(service.id)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Demander tarif
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Logistics Certifications Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-blue-950 text-white rounded-2xl border border-blue-900/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">Garantie Qualité & Réglementation</span>
            <h4 className="text-lg font-bold text-white font-heading">Transitaire International Agréé ASFC/CBSA & Certifié OEA</h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Toutes nos opérations de transport et de dédouanement respectent scrupuleusement les exigences des conventions internationales (CMR, Règles de La Haye, conventions IATA, code CUSMA).
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white text-blue-950 font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Contacter nos experts à Surrey
          </a>
        </div>

      </div>

      {/* Modal Detailed Technical Spec */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-48 bg-slate-900 shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{selectedService.subtitle}</span>
                <h3 className="text-2xl font-bold text-white font-heading mt-0.5">{selectedService.title}</h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-3">Caractéristiques Détaillées</h4>
                <div className="space-y-2">
                  {selectedService.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-3">Spécifications & Métriques</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedService.specs.map((sp, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                      <span className="text-[11px] text-slate-500 uppercase">{sp.label}</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{sp.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const sId = selectedService.id;
                  setSelectedService(null);
                  onSelectServiceForQuote(sId);
                }}
                className="px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition cursor-pointer shadow-sm"
              >
                Demander une cotation pour ce service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
