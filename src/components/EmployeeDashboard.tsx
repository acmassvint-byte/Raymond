import React, { useState } from 'react';
import { Employee, User, LeaveRequest } from '../types';
import { UserCheck, Calendar, Briefcase, DollarSign, MapPin, Phone, Mail, FileText, CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';
import { PayslipModal } from './PayslipModal';
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
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-2xl flex items-center justify-center font-heading">
              {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                <span>Espace Collaborateur Sécurisé</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Atlantic Transport</span>
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

        {/* Core Employee Info Grid (Required by Prompt) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Matricule & Poste */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Poste & Département</span>
            </div>
            <div className="text-base font-bold text-white leading-tight">
              {employee.roleTitle}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Division : <span className="text-slate-200">{employee.department}</span>
            </div>
          </div>

          {/* Card 2: Contrat */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Type de Contrat</span>
            </div>
            <div className="text-lg font-bold text-emerald-400">
              {employee.contractType}
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Statut : En poste actif</span>
            </div>
          </div>

          {/* Card 3: Salaire Mensuel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Salaire Mensuel Brut</span>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono tabular-nums">
              {employee.monthlySalary.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} CAD
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Base annuelle : {(employee.monthlySalary * 12).toLocaleString()} CAD
            </div>
          </div>

          {/* Card 4: Date d'embauche */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold mb-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Date d'Embauche</span>
            </div>
            <div className="text-lg font-bold text-white">
              {employee.hireDate}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Lieu : Surrey Hub (BC V3T 2W1)
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
    </div>
  );
};
