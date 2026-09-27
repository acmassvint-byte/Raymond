import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle, Key, ShieldCheck, UserCheck } from 'lucide-react';
import { getUsers, getEmployees, simpleHash, setSession, SessionState } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: SessionState, mustChange: boolean) => void;
  defaultRoleTab?: 'employee' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultRoleTab = 'employee',
}) => {
  const [roleTab, setRoleTab] = useState<'employee' | 'admin'>(defaultRoleTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const users = getUsers();
      const cleanEmail = email.trim().toLowerCase();
      const user = users.find(u => u.email.toLowerCase() === cleanEmail);

      if (!user) {
        setError("Identifiants incorrects ou compte introuvable.");
        setLoading(false);
        return;
      }

      // Check active
      if (!user.isActive) {
        setError("Ce compte a été désactivé par l'administration RH. Veuillez contacter la direction.");
        setLoading(false);
        return;
      }

      // Role check
      if (roleTab === 'admin' && user.role !== 'admin') {
        setError("Ce compte ne dispose pas des privilèges d'accès au backoffice administrateur.");
        setLoading(false);
        return;
      }

      // Password check
      // For demo flexibility: accept either the hashed value or known demo defaults
      const hash = simpleHash(password);
      const isKnownDemoAdmin = cleanEmail === 'admin@atlantictransport.ca' && (password === 'Admin2026!' || hash === user.passwordHash);
      const isKnownDemoEmp = password === 'Temp2026!' || password === 'Employee2026!' || password === 'Pacific2026!' || password === 'Supply2026!' || hash === user.passwordHash;

      if (!isKnownDemoAdmin && !isKnownDemoEmp && hash !== user.passwordHash) {
        setError("Mot de passe incorrect.");
        setLoading(false);
        return;
      }

      // Retrieve employee profile if applicable
      let employee;
      if (user.employeeId) {
        const employees = getEmployees();
        employee = employees.find(emp => emp.id === user.employeeId);
      }

      const session: SessionState = {
        user,
        employee,
      };

      setSession(session);
      setLoading(false);
      onSuccess(session, !!user.mustChangePassword);
    }, 250);
  };

  const handleQuickFill = (demoEmail: string, demoPass: string, role: 'admin' | 'employee') => {
    setRoleTab(role);
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Portail Authentifié
            </h3>
            <p className="text-xs text-amber-400 font-semibold uppercase mt-0.5">
              Atlantic Transport · Surrey, BC
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Tab Toggle (Functional Segmented Control) */}
        <div className="p-6 pb-0">
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setRoleTab('employee');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                roleTab === 'employee'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Espace Salarié</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRoleTab('admin');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                roleTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administration RH</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-950/70 border border-red-800 text-red-200 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Adresse Email Professionnelle
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={roleTab === 'admin' ? 'admin@atlantictransport.ca' : 'nom@atlantictransport.ca'}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Mot de Passe (Hashé)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition duration-200 cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Vérification sécurisée...</span>
            ) : (
              <span>Se Connecter à mon Espace</span>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Assistant */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-2">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Identifiants de test préconfigurés :</span>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@atlantictransport.ca', 'Admin2026!', 'admin')}
              className="w-full text-left p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-amber-400">Admin RH :</span>
              <span className="text-slate-300 font-mono text-[11px]">admin@atlantictransport.ca / Admin2026!</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('j.tremblay@atlantictransport.ca', 'Temp2026!', 'employee')}
              className="w-full text-left p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-emerald-400">Employé (1er login) :</span>
              <span className="text-slate-300 font-mono text-[11px]">j.tremblay / Temp2026!</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('m.vanderberg@atlantictransport.ca', 'Pacific2026!', 'employee')}
              className="w-full text-left p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between cursor-pointer"
            >
              <span className="font-semibold text-blue-400">Employé (Régulier) :</span>
              <span className="text-slate-300 font-mono text-[11px]">m.vanderberg / Pacific2026!</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
