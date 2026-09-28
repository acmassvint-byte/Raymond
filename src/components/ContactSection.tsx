import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { addMessage } from '../services/storageService';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Demande générale d\'information');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addMessage({
      name,
      company,
      email,
      phone,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wider uppercase">
            <span>Nous Contacter</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Surrey, BC</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Réponse sous 24h</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 font-heading">
            Prenez contact avec nos spécialistes en logistique internationale.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Nos bureaux et entrepôts de Surrey (Colombie-Britannique) sont à votre entière disposition pour vos projets d'affrètement, de stockage et de formalités douanières.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details & Interactive Map Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact cards */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900 text-white rounded-xl shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Adresse Principale</h4>
                  <p className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                    King George Blvd, Surrey, BC V3T 2W1, Canada
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Grand Vancouver · Corridor Maritime & Transfrontalier</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/80">
                <div className="p-3 bg-blue-900 text-white rounded-xl shrink-0 shadow-xs">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs uppercase font-bold text-slate-500">Téléphone / WhatsApp</h4>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    +1 (506) 802-2226
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <a
                      href="https://wa.me/15068022226"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 hover:bg-emerald-100 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WhatsApp : +1 (506) 802-2226</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/80">
                <div className="p-3 bg-blue-900 text-white rounded-xl shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Email Officiel</h4>
                  <p className="text-sm font-bold text-blue-900 mt-1">
                    <a href="mailto:atlantictransport.int@ik.me" className="hover:underline">
                      atlantictransport.int@ik.me
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Service cotations, transit & opérations</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-slate-200/80">
                <div className="p-3 bg-slate-200 text-slate-700 rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500">Horaires d'Ouverture</h4>
                  <p className="text-xs text-slate-700 mt-1">
                    Lundi - Vendredi : <strong>07h00 - 19h00 (PST)</strong>
                  </p>
                  <p className="text-xs text-slate-700">
                    Permanence Douanes & Urgences AOP : <strong>24h/24 · 7j/7</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Simulation */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-900 relative">
              <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold font-mono">Surrey, BC V3T 2W1 · 49.1913° N, 122.8490° W</span>
                </div>
                <a
                  href="https://maps.google.com/?q=King+George+Blvd+Surrey+BC+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Canvas Graphic */}
              <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                {/* SVG Stylized Road & Port Map Grid */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 400 240" fill="none">
                  {/* Fraser river blue curves */}
                  <path d="M0 60 C120 40, 200 90, 400 50 L400 0 L0 0 Z" fill="#0f2b5c" />
                  {/* Major Highway & Road Arteries (King George Blvd / Fraser Hwy / Trans-Canada) */}
                  <line x1="200" y1="0" x2="200" y2="240" stroke="#f59e0b" strokeWidth="6" />
                  <line x1="0" y1="120" x2="400" y2="150" stroke="#334155" strokeWidth="5" />
                  <line x1="60" y1="240" x2="320" y2="0" stroke="#475569" strokeWidth="4" />
                  <line x1="0" y1="190" x2="400" y2="190" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Industrial & Logistics Zone Blocks */}
                  <rect x="220" y="80" width="70" height="50" rx="4" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
                  <rect x="90" y="140" width="80" height="40" rx="4" fill="#0f172a" fillOpacity="0.8" stroke="#334155" strokeWidth="1" />
                  <rect x="230" y="160" width="110" height="55" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                  {/* Pin Pulse Marker on Surrey Hub */}
                  <circle cx="200" cy="115" r="16" fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="200" cy="115" r="8" fill="#f59e0b" />
                  <circle cx="200" cy="115" r="3" fill="#ffffff" />
                </svg>

                {/* Floating Map Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 bg-slate-950/95 border border-amber-500/50 rounded-lg p-2.5 text-center shadow-xl backdrop-blur-md">
                  <p className="text-xs font-bold text-white">ATLANTIC TRANSPORT LTD Headquarters</p>
                  <p className="text-[10px] text-amber-400 font-mono">King George Blvd · Surrey Terminal</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/90 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span>Accès camions lourds & quais niveleurs</span>
                <span className="text-emerald-400 font-medium">✓ Dépôt sous douane ouvert</span>
              </div>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">
                Envoyez-nous un Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Remplissez ce formulaire pour toute question commerciale, partenariat ou demande d'assistance logistique.
              </p>

              {submitted ? (
                <div className="p-8 bg-white border border-emerald-500/40 rounded-xl text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Message Transmis avec Succès</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Merci <strong>{name}</strong>. Votre message a été enregistré dans notre boîte de réception prioritaire. Notre équipe vous répondra par email à <strong>{email}</strong> sous 24 heures.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-bold text-blue-900 hover:underline pt-2 cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Alexandre Dubois"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Entreprise / Organisation
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ex: Groupe Logistique Nord"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Email Professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@societe.com"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (506) ..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Objet de la demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Demande générale d'information">Demande générale d'information</option>
                      <option value="Renseignement Transport Multimodal (Maritime / Aérien)">Renseignement Transport Multimodal (Maritime / Aérien)</option>
                      <option value="Projet d'Entreposage & Gestion Stock Surrey">Projet d'Entreposage & Gestion Stock Surrey</option>
                      <option value="Formalités Douanières & Accompagnement CBSA">Formalités Douanières & Accompagnement CBSA</option>
                      <option value="Partenariat transporteur ou transitaire">Partenariat transporteur ou transitaire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Votre Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Précisez votre demande, les volumes envisagés ou toute question technique..."
                      className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer mon message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
