import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Ship, Plane, Truck, HelpCircle } from 'lucide-react';
import { addQuote } from '../services/storageService';

interface QuoteCalculatorProps {
  preselectedService?: string;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ preselectedService }) => {
  const [serviceType, setServiceType] = useState<string>(preselectedService || 'maritime_fcl');
  const [origin, setOrigin] = useState('Surrey / Port de Vancouver (Canada)');
  const [destination, setDestination] = useState('Port de Rotterdam (Pays-Bas)');
  const [cargoType, setCargoType] = useState('Marchandises Générales / Équipements');
  const [weightKg, setWeightKg] = useState<number>(12000);
  const [volumeM3, setVolumeM3] = useState<number>(33);
  
  // Contact details
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Dynamic cost calculation formula
  const calculateEstimate = () => {
    let baseRate = 1800; // CAD
    if (serviceType === 'maritime_fcl') {
      baseRate = 3200 + (volumeM3 > 30 ? 1400 : 800);
    } else if (serviceType === 'maritime_lcl') {
      baseRate = 650 + (volumeM3 * 95) + (weightKg * 0.12);
    } else if (serviceType === 'aerien') {
      baseRate = 1200 + (weightKg * 3.8);
    } else if (serviceType === 'routier') {
      baseRate = 850 + (weightKg * 0.18) + (volumeM3 * 45);
    } else if (serviceType === 'douane') {
      baseRate = 380 + (volumeM3 > 20 ? 250 : 120);
    }

    const min = Math.round(baseRate * 0.95);
    const max = Math.round(baseRate * 1.15);
    return { min, max };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) return;

    let sType: 'multimodal' | 'warehousing' | 'customs' = 'multimodal';
    if (serviceType === 'douane') sType = 'customs';
    if (serviceType === 'entrepot') sType = 'warehousing';

    const created = addQuote({
      companyName,
      contactName,
      email,
      phone,
      serviceType: sType,
      transportMode: serviceType as any,
      origin,
      destination,
      cargoType,
      weightKg: Number(weightKg) || 1000,
      volumeM3: Number(volumeM3) || 10,
      estimatedCostMin: estimate.min,
      estimatedCostMax: estimate.max,
      notes,
    });

    setSubmittedRef(created.reference);
  };

  return (
    <section id="devis" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Tarification & Cotation Immédiate</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Sans Engagement</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Réseau Mondial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-heading">
            Simulateur & Demande de Devis de Fret International.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Obtenez une première estimation budgétaire en dollars canadiens (CAD) et transmettez votre dossier directement à nos affréteurs de Surrey.
          </p>
        </div>

        {submittedRef ? (
          <div className="bg-slate-800/90 border border-emerald-500/40 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">
              Demande de Devis Transmise avec Succès
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Votre dossier a été enregistré sous la référence officielle <strong className="text-amber-400 font-mono text-base">{submittedRef}</strong>. Nos commissaires de transport basés à Surrey traitent votre demande sous 4 heures ouvrées.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-xs text-slate-400 text-left space-y-1">
              <div><strong>Trajet :</strong> {origin} &rarr; {destination}</div>
              <div><strong>Mode :</strong> {serviceType.toUpperCase()} · Poids : {weightKg} kg · Volume : {volumeM3} m³</div>
              <div><strong>Fourchette indicative :</strong> {estimate.min.toLocaleString()} - {estimate.max.toLocaleString()} CAD</div>
              <div><strong>Contact :</strong> {contactName} ({companyName}) · {email}</div>
            </div>
            <button
              onClick={() => {
                setSubmittedRef(null);
                setCompanyName('');
                setContactName('');
                setEmail('');
                setPhone('');
              }}
              className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
            >
              Calculer une autre expédition
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xs">
              
              {/* Step 1: Mode selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Mode de transport & prestation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setServiceType('maritime_fcl')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      serviceType === 'maritime_fcl'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Ship className="w-5 h-5 mb-2" />
                    <span className="text-xs">Maritime FCL (Complet)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('maritime_lcl')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      serviceType === 'maritime_lcl'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Ship className="w-5 h-5 mb-2" />
                    <span className="text-xs">Maritime LCL (Groupage)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('aerien')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      serviceType === 'aerien'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Plane className="w-5 h-5 mb-2" />
                    <span className="text-xs">Fret Aérien Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('routier')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      serviceType === 'routier'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-2" />
                    <span className="text-xs">Routier Transcanadien</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Route */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    2. Lieu d'Enlèvement (Origine) *
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Ville, code postal, port ou aéroport"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Lieu de Livraison (Destination) *
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ville, code postal, pays"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Step 3: Cargo dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nature des marchandises
                  </label>
                  <input
                    type="text"
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                    placeholder="Ex: Pièces détachées, denrées..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Poids Total Estimé (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Volume Estimé (m³)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={volumeM3}
                    onChange={(e) => setVolumeM3(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Step 4: Company details */}
              <div className="border-t border-slate-700/80 pt-5 space-y-4">
                <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  3. Coordonnées de votre entreprise
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nom de la Société *"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Nom et Prénom du Responsable *"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Professionnel (ex: contact@societe.com) *"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Numéro de Téléphone"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>Envoyer ma demande de cotation prioritaire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Price Preview Card */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">
                  Estimation Budgétaire Immédiate
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Fourchette Indicative
                </h3>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Montant Estimé (CAD)</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1 tabular-nums">
                  {estimate.min.toLocaleString()} $ - {estimate.max.toLocaleString()} $
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Hors droits & taxes de douane à l'importation. Tarif ajusté selon les fluctuations BAF/CAF et surcharges carburant.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Délai de réponse sous 4 heures ouvrées</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Assurance marchandise ad valorem disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prise en charge intégrale des formalités CBSA</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Besoin d'un affrètement maritime complet ou d'une liaison dédiée ? Contactez directement notre bureau de Surrey au <strong>+1 (506) 802-2226</strong>.
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
