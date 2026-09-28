import React, { useState } from 'react';
import { Employee, QuoteRequest, ContactMessage, User, EmployeeContractPdf } from '../types';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Search, 
  Filter, 
  Key, 
  Power, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  Download, 
  Building2,
  RefreshCw,
  Upload,
  FilePlus,
  Eye,
  FileCheck,
  Paperclip,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { ContractViewerModal } from './ContractViewerModal';
import { 
  getEmployees, 
  getUsers, 
  addEmployee, 
  updateEmployee, 
  toggleEmployeeActive, 
  resetEmployeePassword, 
  deleteEmployee, 
  getQuotes, 
  updateQuoteStatus, 
  getMessages, 
  markMessageRead, 
  generateNextMatricule 
} from '../services/storageService';

interface AdminDashboardProps {
  onLogout: () => void;
  onOpenPhpPack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onOpenPhpPack }) => {
  const [activeTab, setActiveTab] = useState<'employees' | 'quotes' | 'messages'>('employees');
  const [employees, setEmployees] = useState<Employee[]>(() => getEmployees());
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => getQuotes());
  const [messages, setMessages] = useState<ContactMessage[]>(() => getMessages());
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [createdNotification, setCreatedNotification] = useState<{ matricule: string; pass: string; name: string } | null>(null);
  const [resetPassNotification, setResetPassNotification] = useState<{ matricule: string; pass: string } | null>(null);

  // PDF Contract state
  const [employeeForPdfUpload, setEmployeeForPdfUpload] = useState<Employee | null>(null);
  const [employeeForContractView, setEmployeeForContractView] = useState<Employee | null>(null);
  const [formContractPdf, setFormContractPdf] = useState<EmployeeContractPdf | undefined>(undefined);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Add Form state
  const [nextMatricule, setNextMatricule] = useState(generateNextMatricule());
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+1 (506) 802-');
  const [formDepartment, setFormDepartment] = useState<Employee['department']>('Transport Multimodal');
  const [formRoleTitle, setFormRoleTitle] = useState('');
  const [formContractType, setFormContractType] = useState<Employee['contractType']>('CDI (Permanent)');
  const [formMonthlySalary, setFormMonthlySalary] = useState(6200);
  const [formHireDate, setFormHireDate] = useState(new Date().toISOString().split('T')[0]);
  const [formWorkLocation, setFormWorkLocation] = useState('Hub Logistique Surrey, King George Blvd');
  const [formEmergencyName, setFormEmergencyName] = useState('');
  const [formEmergencyPhone, setFormEmergencyPhone] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTempPassword, setFormTempPassword] = useState(`Atlantic${Math.floor(1000 + Math.random() * 9000)}!`);
  const [formPhotoUrl, setFormPhotoUrl] = useState<string>('');

  // Refresh lists
  const reloadData = () => {
    setEmployees(getEmployees());
    setQuotes(getQuotes());
    setMessages(getMessages());
  };

  const handlePdfUploadForEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !employeeForPdfUpload) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert("Veuillez sélectionner un document au format PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const pdfObj: EmployeeContractPdf = {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toLocaleDateString('fr-FR'),
        dataUrl,
      };

      updateEmployee(employeeForPdfUpload.id, { contractPdf: pdfObj });
      reloadData();
      setUploadSuccessMsg(`Contrat PDF « ${file.name} » rattaché avec succès au matricule ${employeeForPdfUpload.matricule}`);
      setEmployeeForPdfUpload(null);
      setTimeout(() => setUploadSuccessMsg(null), 6000);
    };
    reader.readAsDataURL(file);
  };

  const handleFormPdfChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert("Veuillez sélectionner un document au format PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const pdfObj: EmployeeContractPdf = {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toLocaleDateString('fr-FR'),
        dataUrl,
      };

      if (isEditing && editingEmployee) {
        setEditingEmployee({ ...editingEmployee, contractPdf: pdfObj });
      } else {
        setFormContractPdf(pdfObj);
      }
    };
    reader.readAsDataURL(file);
  };

  // KPIs
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.isActive).length;
  const totalMonthlyPayroll = employees
    .filter(e => e.isActive)
    .reduce((sum, e) => sum + e.monthlySalary, 0);
  const pendingQuotesCount = quotes.filter(q => q.status === 'en_attente').length;
  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  // Filtered employees
  const filteredEmployees = employees.filter(emp => {
    const matchSearch = (
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchDept = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && emp.isActive) || 
      (statusFilter === 'inactive' && !emp.isActive);

    return matchSearch && matchDept && matchStatus;
  });

  const handleOpenAddModal = () => {
    setNextMatricule(generateNextMatricule());
    setFormTempPassword(`Atlantic${Math.floor(1000 + Math.random() * 9000)}!`);
    setFormFirstName('');
    setFormLastName('');
    setFormEmail('');
    setFormRoleTitle('');
    setFormEmergencyName('');
    setFormEmergencyPhone('');
    setFormNotes('');
    setFormPhotoUrl('');
    setFormContractPdf(undefined);
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFirstName || !formLastName || !formEmail || !formRoleTitle) return;

    const { employee, tempPass } = addEmployee({
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      phone: formPhone,
      department: formDepartment,
      roleTitle: formRoleTitle,
      contractType: formContractType,
      monthlySalary: Number(formMonthlySalary) || 5000,
      currency: 'CAD',
      hireDate: formHireDate,
      workLocation: formWorkLocation,
      emergencyContact: {
        name: formEmergencyName || 'Contact Famille',
        phone: formEmergencyPhone || '+1 (506) 802-2226',
        relation: 'Proche'
      },
      isActive: true,
      mustChangePassword: true,
      notes: formNotes,
      photoUrl: formPhotoUrl || undefined,
      contractPdf: formContractPdf,
    }, formTempPassword);

    reloadData();
    setIsAddModalOpen(false);
    setCreatedNotification({
      matricule: employee.matricule,
      pass: tempPass,
      name: `${employee.firstName} ${employee.lastName}`
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;

    updateEmployee(editingEmployee.id, editingEmployee);
    reloadData();
    setEditingEmployee(null);
  };

  const handleToggleActive = (empId: string) => {
    toggleEmployeeActive(empId);
    reloadData();
  };

  const handleResetPassword = (empId: string, matricule: string) => {
    const newPass = resetEmployeePassword(empId);
    reloadData();
    setResetPassNotification({ matricule, pass: newPass });
  };

  const handleDelete = (empId: string, name: string) => {
    if (window.confirm(`Confirmez-vous la suppression définitive du dossier de ${name} ?`)) {
      deleteEmployee(empId);
      reloadData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Backoffice Administration RH & Exploitation</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Surrey Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
              Atlantic Transport Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Gestion centralisée des employés, génération de matricules EMP-2026-XXX et pilotage des flux.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition duration-150 cursor-pointer shadow-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Ajouter un Salarié</span>
            </button>

            <button
              onClick={onOpenPhpPack}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-semibold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Exporter PHP/MySQL</span>
            </button>
          </div>
        </div>

        {/* Notifications Banners */}
        {uploadSuccessMsg && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl flex items-center justify-between gap-4 text-xs text-emerald-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>{uploadSuccessMsg}</div>
            </div>
            <button onClick={() => setUploadSuccessMsg(null)} className="text-emerald-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {createdNotification && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl flex items-center justify-between gap-4 text-xs text-emerald-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong>Nouvel employé créé avec succès :</strong> {createdNotification.name} · Matricule auto : <span className="font-mono font-bold text-amber-300">{createdNotification.matricule}</span> · Mot de passe temporaire : <span className="font-mono bg-slate-950 px-2 py-0.5 rounded text-white">{createdNotification.pass}</span> (Changement obligatoire au 1er login).
              </div>
            </div>
            <button onClick={() => setCreatedNotification(null)} className="text-emerald-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {resetPassNotification && (
          <div className="p-4 bg-amber-950/80 border border-amber-800 rounded-xl flex items-center justify-between gap-4 text-xs text-amber-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Mot de passe réinitialisé pour {resetPassNotification.matricule} :</strong> Nouveau passe temporaire : <span className="font-mono bg-slate-900 px-2 py-0.5 rounded text-white">{resetPassNotification.pass}</span>. L'employé devra le renouveler à sa connexion.
              </div>
            </div>
            <button onClick={() => setResetPassNotification(null)} className="text-amber-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* KPI Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs uppercase text-slate-400 font-semibold">Effectif Total</span>
            <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
              {totalEmployees}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Salariés enregistrés</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs uppercase text-slate-400 font-semibold">Comptes Actifs</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1 tabular-nums">
              {activeEmployees}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Accès portail opérationnel</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs uppercase text-slate-400 font-semibold">Masse Salariale / Mois</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1 tabular-nums">
              {totalMonthlyPayroll.toLocaleString()} CAD
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Brut charges comprises</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs uppercase text-slate-400 font-semibold">Devis Fret en Attente</span>
            <div className="text-2xl font-black text-blue-400 font-mono mt-1 tabular-nums">
              {pendingQuotesCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Cotations à traiter</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs uppercase text-slate-400 font-semibold">Messages Contact</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1 tabular-nums">
              {unreadMessagesCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Non lus / formulaire public</div>
          </div>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            onClick={() => setActiveTab('employees')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'employees'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestion des Employés ({totalEmployees})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Demandes de Devis ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages Publics ({messages.length})</span>
          </button>
        </div>

        {/* TAB 1: EMPLOYEES CRUD */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Recherche par nom, matricule, poste..."
                  className="w-full bg-slate-950 border border-slate-700 pl-9 pr-4 py-2 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">Tous les Départements</option>
                  <option value="Transport Multimodal">Transport Multimodal</option>
                  <option value="Entreposage & WMS">Entreposage & WMS</option>
                  <option value="Douanes & Transit">Douanes & Transit</option>
                  <option value="Commercial & Devis">Commercial & Devis</option>
                  <option value="Direction">Direction</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="active">Actifs uniquement</option>
                  <option value="inactive">Désactivés uniquement</option>
                </select>
              </div>
            </div>

            {/* Employees Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[880px]">
                  <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Matricule</th>
                      <th className="py-3.5 px-4 font-semibold">Salarié</th>
                      <th className="py-3.5 px-4 font-semibold">Rôle & Département</th>
                      <th className="py-3.5 px-4 font-semibold">Contrat</th>
                      <th className="py-3.5 px-4 font-semibold">Contrat PDF</th>
                      <th className="py-3.5 px-4 font-semibold">Salaire Mensuel</th>
                      <th className="py-3.5 px-4 font-semibold">Date Embauche</th>
                      <th className="py-3.5 px-4 font-semibold">Statut</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions RH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-500">
                          Aucun employé ne correspond à vos critères de recherche.
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            {emp.matricule}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {emp.photoUrl ? (
                                <img
                                  src={emp.photoUrl}
                                  alt={`${emp.firstName} ${emp.lastName}`}
                                  className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 shadow-xs shrink-0"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                                  {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-white">{emp.firstName} {emp.lastName}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{emp.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-medium">{emp.roleTitle}</div>
                            <div className="text-[11px] text-slate-400">{emp.department}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-medium">
                            {emp.contractType}
                          </td>
                          <td className="py-3.5 px-4">
                            {emp.contractPdf ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded truncate max-w-[110px]" title={emp.contractPdf.fileName}>
                                  📄 {emp.contractPdf.fileName}
                                </span>
                                <button
                                  onClick={() => setEmployeeForContractView(emp)}
                                  title="Aperçu RH du contrat"
                                  className="p-1 hover:text-amber-400 text-slate-400 transition cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <label
                                  title="Remplacer le contrat PDF"
                                  className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                          const dataUrl = ev.target?.result as string;
                                          updateEmployee(emp.id, {
                                            contractPdf: {
                                              fileName: file.name,
                                              fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                                              uploadedAt: new Date().toLocaleDateString('fr-FR'),
                                              dataUrl,
                                            }
                                          });
                                          reloadData();
                                          setUploadSuccessMsg(`Contrat PDF « ${file.name} » rattaché avec succès au matricule ${emp.matricule}`);
                                          setTimeout(() => setUploadSuccessMsg(null), 5000);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            ) : (
                              <label className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[11px] font-semibold inline-flex items-center gap-1 transition cursor-pointer">
                                <FilePlus className="w-3 h-3" />
                                <span>+ Joindre PDF</span>
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        const dataUrl = ev.target?.result as string;
                                        updateEmployee(emp.id, {
                                          contractPdf: {
                                            fileName: file.name,
                                            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                                            uploadedAt: new Date().toLocaleDateString('fr-FR'),
                                            dataUrl,
                                          }
                                        });
                                        reloadData();
                                        setUploadSuccessMsg(`Contrat PDF « ${file.name} » rattaché avec succès au matricule ${emp.matricule}`);
                                        setTimeout(() => setUploadSuccessMsg(null), 5000);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white tabular-nums">
                            {emp.monthlySalary.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} CAD
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {emp.hireDate}
                          </td>
                          <td className="py-3.5 px-4">
                            {emp.isActive ? (
                              <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                Actif
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                                Désactivé
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {/* Toggle active / inactive */}
                            <button
                              onClick={() => handleToggleActive(emp.id)}
                              title={emp.isActive ? "Désactiver le compte" : "Réactiver le compte"}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                emp.isActive
                                  ? 'bg-red-950/40 border-red-800/80 text-red-400 hover:bg-red-900/60'
                                  : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/60'
                              }`}
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>

                            {/* Reset password */}
                            <button
                              onClick={() => handleResetPassword(emp.id, emp.matricule)}
                              title="Réinitialiser le mot de passe (Force changement)"
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-lg transition cursor-pointer"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditingEmployee(emp)}
                              title="Modifier la fiche"
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                              title="Supprimer définitivement"
                              className="p-1.5 bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-700 rounded-lg transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: QUOTES MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Demandes de Devis Soumises en Ligne
            </h3>

            <div className="divide-y divide-slate-800">
              {quotes.map((q) => (
                <div key={q.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-amber-400 text-sm">{q.reference}</span>
                      <span className="text-white font-bold">{q.companyName}</span>
                      <span className="text-slate-400 text-xs">· Contact : {q.contactName} ({q.email} / {q.phone})</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Trajet : <strong>{q.origin}</strong> &rarr; <strong>{q.destination}</strong> · Marchandise : {q.cargoType} · {q.weightKg} kg · {q.volumeM3} m³
                    </div>
                    <div className="text-xs text-amber-400/90 font-mono">
                      Estimation indicative : {q.estimatedCostMin?.toLocaleString()} - {q.estimatedCostMax?.toLocaleString()} CAD
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={q.status}
                      onChange={(e) => {
                        updateQuoteStatus(q.id, e.target.value as any);
                        reloadData();
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option value="en_attente">En attente</option>
                      <option value="chiffre">Chiffré / Envoyé</option>
                      <option value="valide">Validé par le client</option>
                      <option value="archive">Archivé</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Messages Reçus depuis le Site Public
            </h3>

            <div className="divide-y divide-slate-800">
              {messages.map((m) => (
                <div key={m.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-sm">{m.name}</span>
                      {m.company && <span className="text-xs text-amber-400">({m.company})</span>}
                      <span className="text-xs text-slate-400 font-mono">{m.email} · {m.phone}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(m.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    Objet : {m.subject}
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: AJOUT D'UN EMPLOYÉ (WITH AUTO-GENERATED MATRICULE) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 my-8 text-white">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Ajouter un Nouveau Salarié
                </h3>
                <p className="text-xs text-amber-400 font-semibold uppercase mt-0.5">
                  Enrôlement RH & Attribution Automatique du Matricule
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              
              {/* Matricule & Temp Pass Alert */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                <div>
                  <label className="block text-[11px] uppercase text-amber-400 font-bold mb-1">
                    Matricule Auto-Généré
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={nextMatricule}
                    className="w-full bg-slate-900 border border-amber-500/50 rounded-lg px-3 py-2 font-mono font-bold text-amber-400 text-sm cursor-not-allowed"
                  />
                  <span className="text-[10px] text-slate-400">Format normé : EMP-2026-XXX</span>
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-amber-400 font-bold mb-1">
                    Mot de Passe Provisoire
                  </label>
                  <input
                    type="text"
                    value={formTempPassword}
                    onChange={(e) => setFormTempPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white text-sm"
                  />
                  <span className="text-[10px] text-amber-400">Forcer changement au 1er login : Activé</span>
                </div>
              </div>

              {/* Photo d'identité officielle du salarié */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Photo d'identité du salarié</span>
                    <span className="text-[10px] lowercase font-normal text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      Recommandé RH
                    </span>
                  </label>
                  <span className="text-[10px] text-slate-400">Affichée sur ses informations d'embauche</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {formPhotoUrl ? (
                    <div className="relative shrink-0">
                      <img
                        src={formPhotoUrl}
                        alt="Aperçu photo d'identité"
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border-2 border-amber-500/70 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormPhotoUrl('')}
                        title="Supprimer la photo"
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white p-1 rounded-full shadow-lg transition cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/60 flex flex-col items-center justify-center text-slate-500 shrink-0">
                      <Camera className="w-6 h-6 text-slate-600 mb-1" />
                      <span className="text-[9px] text-center px-1 text-slate-400">Photo d'identité</span>
                    </div>
                  )}

                  <div className="flex-1 w-full space-y-2">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/50 rounded-xl font-semibold text-xs transition cursor-pointer w-full text-center">
                      <Upload className="w-4 h-4" />
                      <span>{formPhotoUrl ? "Remplacer la photo sélectionnée" : "Téléverser la photo d'identité du salarié"}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            alert("La taille de la photo ne doit pas dépasser 5 Mo.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string;
                            setFormPhotoUrl(dataUrl);
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Formats acceptés : JPG, PNG, WebP (max 5 Mo). Cette photo officielle sera intégrée à son dossier RH et visible par le salarié dans la section de ses informations d'embauche.
                    </p>
                  </div>
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={formFirstName}
                    onChange={(e) => setFormFirstName(e.target.value)}
                    placeholder="Ex: Jean-Marc"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={formLastName}
                    onChange={(e) => setFormLastName(e.target.value)}
                    placeholder="Ex: Tremblay"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Professionnel *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nom@atlantictransport.ca"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Téléphone de Service</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Department & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Département</label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Transport Multimodal">Transport Multimodal</option>
                    <option value="Entreposage & WMS">Entreposage & WMS</option>
                    <option value="Douanes & Transit">Douanes & Transit</option>
                    <option value="Commercial & Devis">Commercial & Devis</option>
                    <option value="Direction">Direction</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Intitulé du Poste / Titre *</label>
                  <input
                    type="text"
                    required
                    value={formRoleTitle}
                    onChange={(e) => setFormRoleTitle(e.target.value)}
                    placeholder="Ex: Chef de Quai & Transit"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Contract & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type de Contrat</label>
                  <select
                    value={formContractType}
                    onChange={(e) => setFormContractType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="CDI (Permanent)">CDI (Permanent)</option>
                    <option value="Cadre Logistique">Cadre Logistique</option>
                    <option value="Temps Plein">Temps Plein</option>
                    <option value="CDD">CDD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Salaire Mensuel Brut (CAD)</label>
                  <input
                    type="number"
                    step="50"
                    value={formMonthlySalary}
                    onChange={(e) => setFormMonthlySalary(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date d'Embauche</label>
                  <input
                    type="date"
                    value={formHireDate}
                    onChange={(e) => setFormHireDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Location & Emergency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lieu de Travail / Affectation</label>
                  <input
                    type="text"
                    value={formWorkLocation}
                    onChange={(e) => setFormWorkLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Contact d'Urgence (Nom & Tél)</label>
                  <input
                    type="text"
                    value={formEmergencyName}
                    onChange={(e) => setFormEmergencyName(e.target.value)}
                    placeholder="Nom du proche et téléphone"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition cursor-pointer shadow-md"
                >
                  Créer et Générer l'Accès Salarié
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: MODIFIER UN EMPLOYÉ */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl p-6 sm:p-8 my-8 text-white">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Modifier : {editingEmployee.firstName} {editingEmployee.lastName}
                </h3>
                <p className="text-xs font-mono text-amber-400 mt-0.5">
                  Matricule : {editingEmployee.matricule}
                </p>
              </div>
              <button onClick={() => setEditingEmployee(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              {/* Photo d'identité officielle du salarié */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Photo d'identité du salarié</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Affichée sur ses informations d'embauche</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {editingEmployee.photoUrl ? (
                    <div className="relative shrink-0">
                      <img
                        src={editingEmployee.photoUrl}
                        alt="Photo d'identité"
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border-2 border-amber-500/70 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingEmployee({ ...editingEmployee, photoUrl: undefined })}
                        title="Supprimer la photo"
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white p-1 rounded-full shadow-lg transition cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/60 flex flex-col items-center justify-center text-slate-500 shrink-0">
                      <Camera className="w-6 h-6 text-slate-600 mb-1" />
                      <span className="text-[9px] text-center px-1 text-slate-400">Aucune photo</span>
                    </div>
                  )}

                  <div className="flex-1 w-full space-y-2">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/50 rounded-xl font-semibold text-xs transition cursor-pointer w-full text-center">
                      <Upload className="w-4 h-4" />
                      <span>{editingEmployee.photoUrl ? "Remplacer la photo" : "Téléverser la photo d'identité"}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            alert("La taille de la photo ne doit pas dépasser 5 Mo.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string;
                            setEditingEmployee({ ...editingEmployee, photoUrl: dataUrl });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Mettre à jour la photo d'identité officielle pour le badge et les documents d'embauche du salarié.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.firstName}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, firstName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.lastName}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={editingEmployee.phone}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Département</label>
                  <select
                    value={editingEmployee.department}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Transport Multimodal">Transport Multimodal</option>
                    <option value="Entreposage & WMS">Entreposage & WMS</option>
                    <option value="Douanes & Transit">Douanes & Transit</option>
                    <option value="Commercial & Devis">Commercial & Devis</option>
                    <option value="Direction">Direction</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Intitulé du Poste</label>
                  <input
                    type="text"
                    required
                    value={editingEmployee.roleTitle}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, roleTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Salaire Mensuel Brut (CAD)</label>
                  <input
                    type="number"
                    step="50"
                    value={editingEmployee.monthlySalary}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, monthlySalary: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type de Contrat</label>
                  <select
                    value={editingEmployee.contractType}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, contractType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="CDI (Permanent)">CDI (Permanent)</option>
                    <option value="Cadre Logistique">Cadre Logistique</option>
                    <option value="Temps Plein">Temps Plein</option>
                    <option value="CDD">CDD</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition cursor-pointer shadow-md"
                >
                  Enregistrer les Modifications
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
