import { useState } from "react";

export function AuthModal({ onClose, onLogin }: any) {
  const [tab, setTab] = useState<"employe" | "admin">("employe");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Si email admin -> espace admin, sinon espace employé
    const role = email === "admin@atlantictransport.ca"? "admin" : "employe";
    onLogin({ email, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{tab === "admin"? "Administration RH" : "Espace Employé"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("employe")}
            className={`flex-1 py-2 rounded-lg ${tab === "employe"? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Espace Employé
          </button>
          {/* Onglet admin masqué aux visiteurs - accessible uniquement via email admin */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
