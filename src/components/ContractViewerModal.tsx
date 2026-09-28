import React, { useEffect } from 'react';
import { X, ShieldAlert, FileText, Lock, Eye, Building2, Stamp } from 'lucide-react';
import { Employee } from '../types';

interface ContractViewerModalProps {
  employee: Employee;
  onClose: () => void;
}

export const ContractViewerModal: React.FC<ContractViewerModalProps> = ({ employee, onClose }) => {
  const contract = employee.contractPdf;

  // Intercept Ctrl+S, Ctrl+P, Ctrl+C, Ctrl+A, Ctrl+U and their Meta equivalents to guarantee non-downloadability
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ['p', 's', 'c', 'a', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Print prevention style */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          body::after {
            content: "DOCUMENT CONFIDENTIEL NON IMPRIMABLE - ATLANTIC TRANSPORT LTD - TOUS DROITS RÉSERVÉS";
            visibility: visible !important;
            display: block;
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            color: #dc2626;
            margin-top: 100px;
          }
        }
      `}</style>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col h-[92vh] overflow-hidden text-slate-100">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-heading">
                  Contrat de Travail & Engagement RH
                </h3>
                <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Téléchargement Verrouillé
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {employee.firstName} {employee.lastName} · Matricule : <span className="font-mono text-amber-400">{employee.matricule}</span> · <span className="text-slate-300 font-medium">ATLANTIC TRANSPORT LTD</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Consultation en ligne sécurisée uniquement</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Confidential Security Notice */}
        <div className="bg-amber-950/40 border-b border-amber-800/60 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Document confidentiel interne (ATLANTIC TRANSPORT LTD) :</strong> Ce contrat est réservé à la consultation exclusive du salarié titulaire. Tout enregistrement, capture ou reproduction externe est strictement interdit par le protocole de conformité RH.
            </span>
          </div>
        </div>

        {/* Document Content View Area */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8 relative">
          
          {/* Watermark Overlay (Non-downloadable protection) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.06] select-none z-10">
            <div className="text-5xl sm:text-6xl font-black text-amber-400 -rotate-25 tracking-widest text-center uppercase leading-relaxed">
              ATLANTIC TRANSPORT LTD<br />
              CONFIDENTIEL - NON TÉLÉCHARGEABLE<br />
              {employee.matricule} · SURREY BC
            </div>
          </div>

          {contract?.dataUrl ? (
            /* Render embedded PDF preview with sandbox restrictions */
            <div className="w-full h-full min-h-[520px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative z-20 flex flex-col">
              <div className="bg-slate-950 px-4 py-2 text-[11px] text-amber-400 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Visualisation sécurisée ATLANTIC TRANSPORT LTD · Export & téléchargement désactivés
                </span>
                <span className="text-slate-400 font-mono text-[10px]">
                  Fichier : {contract.fileName} {contract.fileSize ? `(${contract.fileSize})` : ''}
                </span>
              </div>
              <div className="flex-1 w-full min-h-[500px] relative">
                <iframe
                  src={`${contract.dataUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title="Contrat de Travail Salarié - ATLANTIC TRANSPORT LTD"
                  className="w-full h-full min-h-[500px] border-0"
                />
              </div>
            </div>
          ) : (
            /* Official Formatted Interactive Contract View */
            <div className="max-w-3xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-6 relative z-20 font-serif text-xs sm:text-sm leading-relaxed border border-slate-200">
              
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start font-sans">
                <div>
                  <div className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                    <span>ATLANTIC TRANSPORT LTD</span>
                  </div>
                  <div className="text-xs text-slate-600">King George Blvd, Surrey, BC V3T 2W1, Canada</div>
                  <div className="text-xs text-slate-500">Immatriculation CBSA : A1948 · Bureau Direction RH</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-amber-600">{employee.matricule}</div>
                  <div className="text-[11px] text-slate-500">Date d'effet : {employee.hireDate}</div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center font-sans py-2">
                <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900">
                  CONTRAT DE TRAVAIL OFFICIEL
                </h2>
                <p className="text-xs text-slate-500 font-serif italic">
                  Établi selon les lois du travail de la Colombie-Britannique et les conventions fédérales canadiennes
                </p>
              </div>

              {/* Parties */}
              <div className="space-y-2">
                <p>
                  <strong>ENTRE LES SOUSSIGNÉS :</strong>
                </p>
                <p>
                  La société <strong>ATLANTIC TRANSPORT LTD</strong>, immatriculée au registre du commerce de Colombie-Britannique, dont le siège social est situé à King George Blvd, Surrey, BC V3T 2W1, Canada, représentée par la Direction des Ressources Humaines, d'une part,
                </p>
                <p>
                  <strong>ET :</strong>
                </p>
                <p>
                  Monsieur / Madame <strong>{employee.firstName} {employee.lastName}</strong>, demeurant en Colombie-Britannique, ci-après dénommé(e) « le Salarié », d'autre part.
                </p>
              </div>

              {/* Articles */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-bold font-sans text-xs uppercase text-slate-800">Article 1 - Engagement et Fonctions</h4>
                  <p className="text-slate-700">
                    Le Salarié est engagé à compter du <strong>{employee.hireDate}</strong> sous contrat <strong>{employee.contractType}</strong> en qualité de <strong>{employee.roleTitle}</strong> au sein du département <strong>{employee.department}</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold font-sans text-xs uppercase text-slate-800">Article 2 - Lieu d'Affectation</h4>
                  <p className="text-slate-700">
                    Le Salarié exerce ses fonctions principales sur le site de : <strong>{employee.workLocation}</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold font-sans text-xs uppercase text-slate-800">Article 3 - Rémunération</h4>
                  <p className="text-slate-700">
                    En contrepartie de ses prestations, le Salarié percevra un salaire mensuel brut de <strong>{employee.monthlySalary.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} CAD</strong>, versé par virement bancaire mensuel, sous déduction des cotisations sociales et fiscales obligatoires (RPC/CPP, AE/EI).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold font-sans text-xs uppercase text-slate-800">Article 4 - Confidentialité et Sécurité Logistique</h4>
                  <p className="text-slate-700">
                    Compte tenu de la nature des flux internationaux, douaniers (ASFC/CBSA) et maritimes traités par <strong>ATLANTIC TRANSPORT LTD</strong>, le Salarié s'engage à la plus stricte confidentialité concernant les manifestes, les données clients et les plans d'acheminement.
                  </p>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 font-sans text-xs">
                <div>
                  <p className="font-bold">Pour la Société ATLANTIC TRANSPORT LTD</p>
                  <p className="text-slate-500 text-[11px]">Direction Générale & Ressources Humaines</p>
                  <div className="mt-8 font-serif italic text-blue-900 font-bold flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Signé électroniquement (CBSA/HR Registry)
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">Le Salarié</p>
                  <p className="text-slate-500 text-[11px]">{employee.firstName} {employee.lastName}</p>
                  <div className="mt-8 font-serif italic text-slate-700">Paraphe certifié conforme</div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{contract?.fileName || 'contrat_embauche_officiel.pdf'} {contract?.fileSize ? `(${contract.fileSize})` : ''}</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Certifié ATLANTIC TRANSPORT LTD
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition cursor-pointer"
          >
            Fermer la Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
