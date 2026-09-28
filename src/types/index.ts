export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  employeeId?: string;
  mustChangePassword?: boolean;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface EmployeeContractPdf {
  fileName: string;
  fileSize?: string;
  uploadedAt: string;
  dataUrl?: string;
}

export interface Employee {
  id: string;
  matricule: string; // e.g. EMP-2026-001
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: 'Direction' | 'Transport Multimodal' | 'Entreposage & WMS' | 'Douanes & Transit' | 'Commercial & Devis' | 'Ressources Humaines';
  roleTitle: string;
  contractType: 'CDI (Permanent)' | 'CDD' | 'Temps Plein' | 'Cadre Logistique';
  monthlySalary: number; // in CAD
  currency: string; // CAD
  hireDate: string;
  workLocation: string; // Surrey Hub (BC)
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  isActive: boolean;
  mustChangePassword: boolean;
  avatarUrl?: string;
  photoUrl?: string; // Photo d'identité officielle du salarié (téléversée par l'admin)
  notes?: string;
  contractPdf?: EmployeeContractPdf;
}

export interface QuoteRequest {
  id: string;
  reference: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: 'multimodal' | 'warehousing' | 'customs';
  transportMode?: 'maritime_fcl' | 'maritime_lcl' | 'aerien' | 'routier';
  origin: string;
  destination: string;
  cargoType: string;
  weightKg: number;
  volumeM3: number;
  estimatedCostMin?: number;
  estimatedCostMax?: number;
  status: 'en_attente' | 'chiffre' | 'valide' | 'archive';
  createdAt: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface ShipmentTracking {
  trackingNumber: string;
  clientName: string;
  status: 'Collecte' | 'En transit maritime' | 'Dédouanement' | 'En livraison' | 'Livré';
  origin: string;
  destination: string;
  mode: 'Maritime FCL' | 'Fret Aérien' | 'Routier Express';
  eta: string;
  currentLocation: string;
  steps: {
    title: string;
    location: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
    description: string;
  }[];
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Congés Payés' | 'RTT' | 'Maladie' | 'Formation';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'En attente' | 'Approuvé' | 'Refusé';
  createdAt: string;
}
