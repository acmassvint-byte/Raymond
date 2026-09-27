import React from 'react';
import { X, Printer, Download, ShieldCheck, Building2 } from 'lucide-react';
import { Employee } from '../types';

interface PayslipModalProps {
  employee: Employee;
  month: string;
  onClose: () => void;
}

export const PayslipModal: React.FC<PayslipModalProps> = ({
  employee,
  month,
  onClose,
}) => {
  // Canadian payroll breakdown calculation simulation
  const gross = employee.monthlySalary;
  const cpp = Math.round(gross * 0.0595 * 100) / 100; // Canada Pension Plan
  const ei = Math.round(gross * 0.0163 * 100) / 100;  // Employment Insurance
  const fedTax = Math.round(gross * 0.125 * 100) / 100;
  const bcTax = Math.round(gross * 0.065 * 100) / 100;
  const totalDeductions = Math.round((cpp + ei + fedTax + bcTax) * 100) / 100;
  const netPay = Math.round((gross - totalDeductions) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Controls Header (Non-printable) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Bulletin de Paie Officiel</span>
            <span className="text-slate-400 text-xs">· {month}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Body */}
        <div id="printable-payslip" className="p-8 space-y-6 text-xs sm:text-sm">
          
          {/* Company & Employee Lockup */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight font-heading">ATLANTIC TRANSPORT</span>
                <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">INC.</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">King George Blvd, Surrey, BC V3T 2W1, Canada</p>
              <p className="text-xs text-slate-500">NEQ / Business No. : 89401 2341 RC0001 · CBSA Carrier A1948</p>
              <p className="text-xs text-slate-500">Email : hr@atlantictransport.ca · Tél : +1 (506) 802-2226</p>
            </div>

            <div className="sm:text-right bg-slate-50 p-4 rounded-xl border border-slate-200 sm:w-64">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Salarié Bénéficiaire</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{employee.firstName} {employee.lastName}</p>
              <p className="text-xs font-mono font-bold text-amber-600">{employee.matricule}</p>
              <p className="text-xs text-slate-600 mt-1">{employee.roleTitle}</p>
              <p className="text-[11px] text-slate-500">Embauche : {employee.hireDate}</p>
            </div>
          </div>

          {/* Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Période :</span>
              <p className="font-semibold text-slate-900">{month}</p>
            </div>
            <div>
              <span className="text-slate-500">Contrat :</span>
              <p className="font-semibold text-slate-900">{employee.contractType}</p>
            </div>
            <div>
              <span className="text-slate-500">Paiement :</span>
              <p className="font-semibold text-slate-900">Virement Bancaire</p>
            </div>
            <div>
              <span className="text-slate-500">Devise :</span>
              <p className="font-semibold text-slate-900">Dollars Canadiens (CAD)</p>
            </div>
          </div>

          {/* Earnings & Deductions Table */}
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-slate-300 text-xs uppercase text-slate-600 font-bold">
                <th className="py-2">Rubrique</th>
                <th className="py-2 text-right">Base</th>
                <th className="py-2 text-right">Taux</th>
                <th className="py-2 text-right">Gains</th>
                <th className="py-2 text-right">Retenues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-mono">
              <tr>
                <td className="py-2.5 font-sans font-medium text-slate-900">Salaire de Base Mensuel</td>
                <td className="py-2.5 text-right">{gross.toFixed(2)}</td>
                <td className="py-2.5 text-right">100%</td>
                <td className="py-2.5 text-right font-bold text-slate-900">{gross.toFixed(2)} $</td>
                <td className="py-2.5 text-right text-slate-400">-</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-600 font-sans">Régime de Pensions du Canada (RPC / CPP)</td>
                <td className="py-2 text-right">{gross.toFixed(2)}</td>
                <td className="py-2 text-right">5.95%</td>
                <td className="py-2 text-right text-slate-400">-</td>
                <td className="py-2 text-right text-red-600 font-semibold">{cpp.toFixed(2)} $</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-600 font-sans">Assurance-Emploi Fédérale (AE / EI)</td>
                <td className="py-2 text-right">{gross.toFixed(2)}</td>
                <td className="py-2 text-right">1.63%</td>
                <td className="py-2 text-right text-slate-400">-</td>
                <td className="py-2 text-right text-red-600 font-semibold">{ei.toFixed(2)} $</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-600 font-sans">Impôt sur le Revenu Fédéral (Canada)</td>
                <td className="py-2 text-right">{gross.toFixed(2)}</td>
                <td className="py-2 text-right">12.5%</td>
                <td className="py-2 text-right text-slate-400">-</td>
                <td className="py-2 text-right text-red-600 font-semibold">{fedTax.toFixed(2)} $</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-600 font-sans">Impôt Provincial (Colombie-Britannique)</td>
                <td className="py-2 text-right">{gross.toFixed(2)}</td>
                <td className="py-2 text-right">6.5%</td>
                <td className="py-2 text-right text-slate-400">-</td>
                <td className="py-2 text-right text-red-600 font-semibold">{bcTax.toFixed(2)} $</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 font-bold text-xs">
                <td colSpan={3} className="py-3 uppercase text-slate-700">Totaux des rubriques</td>
                <td className="py-3 text-right font-mono text-slate-900">{gross.toFixed(2)} $</td>
                <td className="py-3 text-right font-mono text-red-600">{totalDeductions.toFixed(2)} $</td>
              </tr>
            </tfoot>
          </table>

          {/* Net Pay Box */}
          <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">Net à Payer (Virement Effectué)</span>
              <p className="text-[11px] text-slate-600 mt-0.5">Valeur libératoire officielle émise par le service comptabilité.</p>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
              {netPay.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} CAD
            </div>
          </div>

          {/* Legal mentions */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Bulletin de paie généré électroniquement par Atlantic Transport HR Portal · Surrey (BC).</span>
            <span>Document à conserver sans limitation de durée.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
