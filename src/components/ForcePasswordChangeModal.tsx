import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SessionState, getUsers, saveUsers, simpleHash, setSession, getEmployees, saveEmployees } from '../services/storageService';

interface ForcePasswordChangeModalProps {
  session: SessionState;
  onSuccess: (updatedSession: SessionState) => void;
}

export const ForcePasswordChangeModal: React.FC<ForcePasswordChangeModalProps> = ({
  session,
  onSuccess,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit comporter au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe saisis ne correspondent pas.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === session.user.id);

      if (userIndex !== -1) {
        users[userIndex].passwordHash = simpleHash(newPassword);
        users[userIndex].mustChangePassword = false;
        saveUsers(users);
      }

      // Also update employee flag if present
      if (session.employee) {
        const employees = getEmployees();
        const empIndex = employees.findIndex(e => e.id === session.employee?.id);
        if (empIndex !== -1) {
          employees[empIndex].mustChangePassword = false;
          saveEmployees(employees);
        }
      }

      const updatedSession: SessionState = {
        ...session,
        user: {
          ...session.user,
          passwordHash: simpleHash(newPassword),
          mustChangePassword: false,
        },
        employee: session.employee ? { ...session.employee, mustChangePassword: false } : undefined,
      };

      setSession(updatedSession);
      setLoading(false);
      onSuccess(updatedSession);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-md shadow-2xl p-6 sm:p-8 text-white">
        
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/40">
          <KeyRound className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white font-heading">
          Changement de Mot de Passe Requis
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Bonjour <strong className="text-amber-400">{session.employee?.firstName || 'Employé'}</strong>, il s'agit de votre première connexion au portail <strong className="text-amber-400 font-semibold">ATLANTIC TRANSPORT LTD</strong> avec un mot de passe temporaire. Vous devez obligatoirement définir un mot de passe personnel avant d'accéder à vos informations.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Nouveau Mot de Passe Personnel (min. 8 car.) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Confirmer le Mot de Passe *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition duration-200 cursor-pointer shadow-lg mt-4 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Valider et Accéder à mon Espace</span>
          </button>
        </form>

      </div>
    </div>
  );
};
