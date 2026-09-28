import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Database, Key, ShieldCheck, Server, Terminal } from 'lucide-react';
import { PHP_PACK_FILES, PhpFileItem } from '../services/phpPackData';

interface PhpPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpPackModal: React.FC<PhpPackModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<PhpFileItem>(PHP_PACK_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = (file: PhpFileItem) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col h-[90vh] overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                Pack Déploiement PHP / MySQL (Prêt pour public_html)
              </h2>
              <p className="text-xs text-amber-400">
                ATLANTIC TRANSPORT LTD · Code source serveur & Schéma SQL pour hébergement cPanel / Apache
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownloadSingle(selectedFile)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Télécharger</span> {selectedFile.filename}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Temporary Credentials Bar (Requested in Prompt) */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">Identifiants Administrateur Temporaires :</span>
            <span className="font-mono bg-slate-950 text-amber-300 px-2 py-0.5 rounded border border-slate-800">
              admin@atlantictransport.ca
            </span>
            <span className="text-slate-400">/</span>
            <span className="font-mono bg-slate-950 text-amber-300 px-2 py-0.5 rounded border border-slate-800">
              Admin2026!
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Hash Bcrypt conforme PHP 8.x · Changement obligatoire au 1er login activé</span>
          </div>
        </div>

        {/* Workspace Body: File Tree (Left) + Code Viewer (Right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: File List */}
          <div className="w-full md:w-80 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-1.5 shrink-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              Fichiers du Projet ({PHP_PACK_FILES.length})
            </div>

            {PHP_PACK_FILES.map((file) => {
              const isSelected = selectedFile.filename === file.filename;
              return (
                <button
                  key={file.filename}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {file.filename.endsWith('.sql') ? (
                      <Database className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-blue-400'}`} />
                    ) : (
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                    )}
                    <span className="truncate font-mono">{file.filename}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-mono ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                    {file.filename.split('.').pop()}
                  </span>
                </button>
              );
            })}

            {/* Quick Deployment Guide Card */}
            <div className="mt-6 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span>Déploiement cPanel</span>
              </div>
              <p className="leading-relaxed">
                1. Importez <code className="text-amber-300">database.sql</code> dans phpMyAdmin.<br />
                2. Déposez tous les fichiers dans votre dossier <code className="text-amber-300">public_html</code>.<br />
                3. Renseignez vos accès MySQL dans <code className="text-amber-300">config.php</code>.
              </p>
            </div>
          </div>

          {/* Right Area: Code Viewer */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            
            {/* Viewer Toolbar */}
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-amber-400">
                  {selectedFile.path}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  — {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer text-slate-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-6 overflow-auto font-mono text-xs text-slate-200 leading-relaxed bg-[#0c1322]">
              <pre className="whitespace-pre">
                <code>{selectedFile.content}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
