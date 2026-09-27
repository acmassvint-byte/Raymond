import React, { useState } from 'react';
import { Search, PackageCheck, Ship, Plane, Truck, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, Printer, FileText } from 'lucide-react';
import { ShipmentTracking } from '../types';
import { findTracking, getTrackingList } from '../services/storageService';

interface TrackingSectionProps {
  searchedCode?: string;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ searchedCode }) => {
  const [query, setQuery] = useState(searchedCode || 'ATL-8924-CA');
  const [result, setResult] = useState<ShipmentTracking | null>(() => findTracking(searchedCode || 'ATL-8924-CA') || null);
  const [hasSearched, setHasSearched] = useState(false);

  // Sync if searchedCode changes from Hero
  React.useEffect(() => {
    if (searchedCode) {
      setQuery(searchedCode);
      const res = findTracking(searchedCode);
      setResult(res || null);
      setHasSearched(true);
    }
  }, [searchedCode]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const found = findTracking(query.trim());
    if (found) {
      setResult(found);
    } else {
      // Create a dynamic simulated shipment tracking for realistic UX
      const generated: ShipmentTracking = {
        trackingNumber: query.trim().toUpperCase(),
        clientName: 'Client Certifié Atlantic',
        status: 'En transit maritime',
        origin: 'Port de Vancouver / Surrey Hub (Canada)',
        destination: 'Terminal International de Destination',
        mode: 'Maritime FCL',
        eta: '10 Octobre 2026',
        currentLocation: 'Corridor International Atlantique',
        steps: [
          {
            title: 'Enregistrement & Prise en Charge Hub Surrey',
            location: 'King George Blvd, Surrey BC',
            timestamp: '24 Sept 2026 · 10:30',
            completed: true,
            description: 'Scellé vérifié et intégration EDI dans le manifeste.'
          },
          {
            title: 'Dédouanement Export Validé',
            location: 'Bureau CBSA Surrey / Vancouver',
            timestamp: '25 Sept 2026 · 15:45',
            completed: true,
            description: 'Autorisation de sortie de territoire délivrée.'
          },
          {
            title: 'En cours d\'acheminement vers la destination',
            location: 'En mer / Transit international',
            timestamp: '27 Sept 2026 · 08:20',
            completed: true,
            current: true,
            description: 'Flux régulier selon le plan de transport.'
          },
          {
            title: 'Arrivée terminal & Livraison finale',
            location: 'Destination finale',
            timestamp: '10 Oct 2026 (Estimé)',
            completed: false,
            description: 'Remise au destinataire contre signature certifiée.'
          }
        ]
      };
      setResult(generated);
    }
    setHasSearched(true);
  };

  const getModeIcon = (mode: string) => {
    if (mode.includes('Maritime')) return <Ship className="w-5 h-5 text-blue-600" />;
    if (mode.includes('Aérien')) return <Plane className="w-5 h-5 text-amber-500" />;
    return <Truck className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <section id="tracking" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wider uppercase">
            <span>Traçabilité Totale</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Système EDI 24/7</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Données Télématiques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 font-heading">
            Suivi d'expédition et géolocalisation en temps réel.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Consultez le statut exact de vos conteneurs maritimes, palettes aériennes et convois routiers. Historique des passages en douane et prévisions d'arrivée fiables.
          </p>
        </div>

        {/* Tracking Search Input Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Entrez votre numéro de bordereau ou conteneur (ex: ATL-8924-CA)"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Consulter le statut</span>
            </button>
          </form>

          {/* Quick selection chips (functional buttons) */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Expéditions de démonstration :</span>
            <button
              type="button"
              onClick={() => {
                setQuery('ATL-8924-CA');
                setResult(findTracking('ATL-8924-CA') || null);
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-md font-mono text-slate-800 transition cursor-pointer"
            >
              ATL-8924-CA (Maritime Vancouver &rarr; Rotterdam)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery('ATL-5412-EU');
                setResult(findTracking('ATL-5412-EU') || null);
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-md font-mono text-slate-800 transition cursor-pointer"
            >
              ATL-5412-EU (Aérien Francfort &rarr; Surrey BC)
            </button>
          </div>
        </div>

        {/* Live Tracking Result Display */}
        {result && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
            {/* Header info */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
                    {result.trackingNumber}
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md border border-amber-500/40">
                    {result.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Client destinataire : <strong className="text-slate-200 font-semibold">{result.clientName}</strong> · Mode : {result.mode}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le bordereau</span>
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-sm">
              <div className="p-4 sm:p-5">
                <span className="text-xs text-slate-500 uppercase font-semibold">Origine</span>
                <p className="font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{result.origin}</span>
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-xs text-slate-500 uppercase font-semibold">Destination Finale</span>
                <p className="font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{result.destination}</span>
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-xs text-slate-500 uppercase font-semibold">Date d'Arrivée Estimée (ETA)</span>
                <p className="font-bold text-amber-600 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{result.eta}</span>
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-xs text-slate-500 uppercase font-semibold">Position Actuelle</span>
                <p className="font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{result.currentLocation}</span>
                </p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-6 sm:p-10">
              <h3 className="text-base font-bold text-slate-900 mb-8 font-heading">
                Historique des Jalons & Dédouanements
              </h3>

              <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 group">
                    {/* Step Icon Indicator */}
                    <div
                      className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.current
                          ? 'bg-amber-500 border-white text-slate-950 shadow-md ring-4 ring-amber-400/20'
                          : step.completed
                          ? 'bg-blue-900 border-white text-white shadow-xs'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-mono font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                          <span>{step.timestamp}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-blue-900 font-semibold">{step.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
