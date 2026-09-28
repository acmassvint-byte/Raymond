import React, { useState } from 'react';
import { Employee, User, LeaveRequest } from '../types';
import { 
  UserCheck, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Eye, 
  Lock, 
  FileCheck,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { PayslipModal } from './PayslipModal';
import { ContractViewerModal } from './ContractViewerModal';
import { getLeaveRequests, addLeaveRequest } from '../services/storageService';

interface EmployeeDashboardProps {
  employee: Employee;
  user: User;
  onLogout: () => void;
  onOpenPasswordChange: () => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  employee,
  user,
  onLogout,
  onOpenPasswordChange,
}) => {
  const [selectedPayslipMonth, setSelectedPayslipMonth] = useState<string | null>(null);
  const [isContractViewerOpen, setIsContractViewerOpen] = useState(false);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => getLeaveRequests(employee.id));
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('Congés Payés');
  const [leaveStart, setLeaveStart] = useState('2026-11-02');
  const [leaveEnd, setLeaveEnd] = useState('2026-11-06');
  const [leaveReason, setLeaveReason] = useState('Repos annuel autorisé.');

  const handleAddLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addLeaveRequest({
      employeeId: employee.id,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      type: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
    });
    setLeaves([created, ...leaves]);
    setShowLeaveForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            {employee.photoUrl ? (
              <img
                src={employee.photoUrl}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-2xl flex items-center justify-center font-heading shrink-0">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                <span>Espace Employé Sécurisé</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>ATLANTIC TRANSPORT LTD</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                {employee.roleTitle} · <span className="text-slate-200">{employee.department}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Matricule Badge */}
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Matricule Salarié</span>
              <div className="text-lg font-mono font-bold text-amber-400">{employee.matricule}</div>
            </div>

            <button
              onClick={onOpenPasswordChange}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
            >
              Modifier mot de passe
            </button>
          </div>
        </div>

        {/* Contrat de Travail Confidentiel (Consultation sécurisée, non téléchargeable) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white font-heading">
                    Contrat de Travail Salarié (Fichier PDF officiel)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {employee.contractPdf ? 'Fichier PDF Enregistré' : 'Contrat Numérique Actif'}
                  </span>
                  <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Non téléchargeable
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {employee.contractPdf?.fileName ? (
                    <>Fichier : <strong className="text-amber-400 font-mono">{employee.contractPdf.fileName}</strong> {employee.contractPdf.fileSize ? `(${employee.contractPdf.fileSize})` : ''} · </>
                  ) : null}
                  Type : <strong className="text-slate-200 font-medium">{employee.contractType}</strong> · Rôle : {employee.roleTitle} · ATLANTIC TRANSPORT LTD
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsContractViewerOpen(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <Eye className="w-4 h-4" />
              <span>Consulter mon Contrat en Ligne</span>
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Document RH officiel — Consultation intégrale en ligne sécurisée (Téléchargement, impression et extraction désactivés par la direction).</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">{employee.matricule}</span>
          </div>
        </div>

        {/* Section Informations d'Embauche & Photo d'Identité */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Dossier d'Embauche Officiel</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
                Informations d'Embauche & Photo d'Identité
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Embauche Validée & Active</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Colonne Photo d'Identité du Salarié (Badge RH Conforme) */}
            <div className="lg:col-span-4 xl:col-span-3 flex">
              <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
                
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Photo d'Identité Salarié
                </span>

                <div className="relative mb-3">
                  {employee.photoUrl ? (
                    <img
                      src={employee.photoUrl}
                      alt={`Photo d'identité de ${employee.firstName} ${employee.lastName}`}
                      className="w-32 h-40 sm:w-36 sm:h-44 object-cover rounded-xl border-2 border-amber-500/60 shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-3 text-slate-500">
                      <Camera className="w-8 h-8 text-slate-600 mb-2" />
                      <span className="text-xs text-slate-300 font-medium">Photo d'identité</span>
                      <span className="text-[10px] text-slate-500 mt-1">En attente versement RH</span>
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md" title="Photo vérifiée et conforme">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-heading font-bold text-sm text-white">
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400">
                    {employee.matricule}
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 w-full">
                  Accréditation ATLANTIC TRANSPORT LTD
                </div>
              </div>
            </div>

            {/* Grille des informations d'embauche */}
            <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Poste & Département */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>Poste & Département</span>
                  </div>
                  <div className="text-base font-bold text-white leading-snug">
                    {employee.roleTitle}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-850">
                  Division : <span className="text-slate-200 font-medium">{employee.department}</span>
                </div>
              </div>

              {/* Date d'Embauche */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Date d'Embauche Officielle</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {employee.hireDate}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-850">
                  Lieu d'affectation : <span className="text-slate-200 font-medium">{employee.workLocation}</span>
                </div>
              </div>

              {/* Type de Contrat */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Type de Contrat d'Embauche</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-400">
                    {employee.contractType}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-850 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Statut : En poste actif / Confirmé</span>
                </div>
              </div>

              {/* Salaire convenu à l'embauche */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Rémunération Contractuelle</span>
                  </div>
                  <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
                    {employee.monthlySalary.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} CAD <span className="text-xs font-normal text-slate-400">/ mois</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-850">
                  Base annuelle convenue : <strong className="text-slate-200">{(employee.monthlySalary * 12).toLocaleString()} CAD</strong>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Secondary Information & Payslips Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal File & Emergency */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white font-heading">
              Fiche Administrative & Coordonnées
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Email professionnel :</span>
                <span className="font-mono text-slate-200">{employee.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Ligne directe / Service :</span>
                <span className="font-mono text-slate-200">{employee.phone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Affectation principale :</span>
                <span className="text-right text-slate-200">{employee.workLocation}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Contact d'urgence :</span>
                <span className="text-slate-200">{employee.emergencyContact.name} ({employee.emergencyContact.relation})</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Tél. d'urgence :</span>
                <span className="font-mono text-amber-400">{employee.emergencyContact.phone}</span>
              </div>
            </div>

            {employee.notes && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200 font-semibold block mb-0.5">Note RH de service :</strong>
                {employee.notes}
              </div>
            )}
          </div>

          {/* Right Column: Payslips & Documents */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Bulletins de Salaire Récents
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Consultez, imprimez ou exportez vos fiches de paie certifiées.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                Année 2026
              </span>
            </div>

            <div className="space-y-3">
              {[
                { month: 'Septembre 2026', net: employee.monthlySalary * 0.7342, date: '30/09/2026' },
                { month: 'Août 2026', net: employee.monthlySalary * 0.7342, date: '31/08/2026' },
                { month: 'Juillet 2026', net: employee.monthlySalary * 0.7342, date: '31/07/2026' },
              ].map((slip, i) => (
                <div
                  key={i}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 text-amber-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{slip.month}</p>
                      <p className="text-xs text-slate-400 font-mono">
                        Net versé : {slip.net.toLocaleString('fr-CA', { maximumFractionDigits: 2 })} CAD · {slip.date}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPayslipMonth(slip.month)}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer shadow-xs"
                  >
                    Voir le bulletin
                  </button>
                </div>
              ))}
            </div>

            {/* Leave Requests Sub-Section */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Demandes de Congés & Absences
                  </h4>
                  <p className="text-xs text-slate-400">Solde acquis : 18.5 jours ouvrés</p>
                </div>
                <button
                  onClick={() => setShowLeaveForm(!showLeaveForm)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Poser un congé</span>
                </button>
              </div>

              {showLeaveForm && (
                <form onSubmit={handleAddLeave} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 uppercase">Type</label>
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="Congés Payés">Congés Payés</option>
                        <option value="RTT">RTT</option>
                        <option value="Maladie">Maladie</option>
                        <option value="Formation">Formation</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 uppercase">Du</label>
                      <input
                        type="date"
                        value={leaveStart}
                        onChange={(e) => setLeaveStart(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 uppercase">Au</label>
                      <input
                        type="date"
                        value={leaveEnd}
                        onChange={(e) => setLeaveEnd(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 uppercase">Motif / Commentaire</label>
                    <input
                      type="text"
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowLeaveForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
                    >
                      Transmettre à la direction
                    </button>
                  </div>
                </form>
              )}

              <div className="divide-y divide-slate-800">
                {leaves.map((l) => (
                  <div key={l.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">{l.type}</span>
                      <span className="text-slate-400 ml-2 font-mono">du {l.startDate} au {l.endDate}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{l.reason}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      l.status === 'Approuvé'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Payslip Generator Modal */}
      {selectedPayslipMonth && (
        <PayslipModal
          employee={employee}
          month={selectedPayslipMonth}
          onClose={() => setSelectedPayslipMonth(null)}
        />
      )}

      {/* Contract Viewer Modal (Non-downloadable) */}
      {isContractViewerOpen && (
        <ContractViewerModal
          employee={employee}
          onClose={() => setIsContractViewerOpen(false)}
        />
      )}
    </div>
  );
};
