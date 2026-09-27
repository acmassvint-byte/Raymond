import { Employee, User, ShipmentTracking, QuoteRequest, ContactMessage } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    email: 'admin@atlantictransport.ca',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'Admin2026!'
    role: 'admin',
    mustChangePassword: false,
    isActive: true,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'user-emp-1',
    email: 'j.tremblay@atlantictransport.ca',
    passwordHash: '202cb962ac59075b964b07152d234b70', // 'Temp2026!'
    role: 'employee',
    employeeId: 'emp-1',
    mustChangePassword: true, // Needs to change password on first login!
    isActive: true,
    createdAt: '2026-02-15T09:30:00Z',
  },
  {
    id: 'user-emp-2',
    email: 'm.vanderberg@atlantictransport.ca',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'Pacific2026!'
    role: 'employee',
    employeeId: 'emp-2',
    mustChangePassword: false,
    isActive: true,
    createdAt: '2025-06-01T08:00:00Z',
  },
  {
    id: 'user-emp-3',
    email: 's.diallo@atlantictransport.ca',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'Supply2026!'
    role: 'employee',
    employeeId: 'emp-3',
    mustChangePassword: false,
    isActive: true,
    createdAt: '2025-09-12T08:00:00Z',
  },
  {
    id: 'user-emp-4',
    email: 'c.dubois@atlantictransport.ca',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    role: 'employee',
    employeeId: 'emp-4',
    mustChangePassword: false,
    isActive: false, // Inactive employee demonstration
    createdAt: '2024-11-04T08:00:00Z',
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    matricule: 'EMP-2026-001',
    firstName: 'Jean-Marc',
    lastName: 'Tremblay',
    email: 'j.tremblay@atlantictransport.ca',
    phone: '+1 (506) 802-2226',
    department: 'Transport Multimodal',
    roleTitle: 'Responsable Affrètement Maritime & Conteneurs',
    contractType: 'CDI (Permanent)',
    monthlySalary: 6250.00,
    currency: 'CAD',
    hireDate: '2026-02-15',
    workLocation: 'Hub Logistique Surrey, King George Blvd',
    emergencyContact: {
      name: 'Isabelle Tremblay',
      phone: '+1 (506) 802-9942',
      relation: 'Épouse'
    },
    isActive: true,
    mustChangePassword: true,
    notes: 'Nouvelle recrue pôle maritime Asie-Pacifique / Amérique du Nord.'
  },
  {
    id: 'emp-2',
    matricule: 'EMP-2026-002',
    firstName: 'Martina',
    lastName: 'Vanderberg',
    email: 'm.vanderberg@atlantictransport.ca',
    phone: '+1 (506) 802-2226',
    department: 'Douanes & Transit',
    roleTitle: 'Inspectrice en Douanes Agréée CBSA / OEA',
    contractType: 'Cadre Logistique',
    monthlySalary: 7100.00,
    currency: 'CAD',
    hireDate: '2025-06-01',
    workLocation: 'Surrey Head Office & Terminal Vancouver',
    emergencyContact: {
      name: 'Lukas Vanderberg',
      phone: '+1 (506) 802-1129',
      relation: 'Frère'
    },
    isActive: true,
    mustChangePassword: false,
    notes: 'Spécialiste accréditée transit frontalier US-Canada et dédouanement maritime.'
  },
  {
    id: 'emp-3',
    matricule: 'EMP-2026-003',
    firstName: 'Souleymane',
    lastName: 'Diallo',
    email: 's.diallo@atlantictransport.ca',
    phone: '+1 (506) 802-2226',
    department: 'Entreposage & WMS',
    roleTitle: 'Superviseur Plateforme & Supply Chain',
    contractType: 'CDI (Permanent)',
    monthlySalary: 5450.00,
    currency: 'CAD',
    hireDate: '2025-09-12',
    workLocation: 'Entrepôt Grande Hauteur Surrey Nord',
    emergencyContact: {
      name: 'Aminata Diallo',
      phone: '+1 (506) 802-5521',
      relation: 'Conjointe'
    },
    isActive: true,
    mustChangePassword: false,
    notes: 'Gestion des flux cross-docking et intégration WMS radio-fréquence.'
  },
  {
    id: 'emp-4',
    matricule: 'EMP-2026-004',
    firstName: 'Claire',
    lastName: 'Dubois',
    email: 'c.dubois@atlantictransport.ca',
    phone: '+1 (506) 802-2226',
    department: 'Commercial & Devis',
    roleTitle: 'Chargée de Comptes Grands Comptes Internationaux',
    contractType: 'Temps Plein',
    monthlySalary: 5800.00,
    currency: 'CAD',
    hireDate: '2024-11-04',
    workLocation: 'Surrey Head Office',
    emergencyContact: {
      name: 'Marc Dubois',
      phone: '+1 (506) 802-9011',
      relation: 'Père'
    },
    isActive: false,
    mustChangePassword: false,
    notes: 'Compte désactivé pour congé sabbatique autorisé.'
  }
];

export const INITIAL_TRACKING: ShipmentTracking[] = [
  {
    trackingNumber: 'ATL-8924-CA',
    clientName: 'Nordic Forest Products Ltd',
    status: 'En transit maritime',
    origin: 'Surrey / Port de Vancouver (Canada)',
    destination: 'Port de Rotterdam (Pays-Bas)',
    mode: 'Maritime FCL',
    eta: '04 Octobre 2026',
    currentLocation: 'Océan Atlantique Nord (Cap Finisterre)',
    steps: [
      {
        title: 'Prise en charge & Scellé Conteneur',
        location: 'Surrey Hub (BC, Canada)',
        timestamp: '18 Sept 2026 · 09:15',
        completed: true,
        description: 'Conteneur 40HC sécurisé et scellé haute sécurité vérifié.'
      },
      {
        title: 'Dédouanement Export CBSA Validé',
        location: 'Port de Vancouver (Canada)',
        timestamp: '20 Sept 2026 · 14:40',
        completed: true,
        description: 'Formalités douanières export complétées et transmises au capitaine.'
      },
      {
        title: 'Chargement Navire Porte-Conteneurs',
        location: 'Navire ATL-PACIFIC LEADER',
        timestamp: '22 Sept 2026 · 02:30',
        completed: true,
        description: 'Embarquement à bord du navire amiral en route vers l\'Europe.'
      },
      {
        title: 'Navigation Océanique',
        location: 'Océan Atlantique Nord',
        timestamp: '27 Sept 2026 · 11:00',
        completed: true,
        current: true,
        description: 'Traversée à vitesse de croisière optimale (19.4 nœuds). Aucun retard.'
      },
      {
        title: 'Arrivée prévue au Port & Dédouanement Import',
        location: 'Rotterdam Maasvlakte (Pays-Bas)',
        timestamp: '04 Oct 2026 · 08:00 (estimé)',
        completed: false,
        description: 'Déchargement quai et transmission automatique au transporteur routier final.'
      }
    ]
  },
  {
    trackingNumber: 'ATL-5412-EU',
    clientName: 'BioPharma Solutions Corp',
    status: 'Dédouanement',
    origin: 'Aéroport Francfort FRA (Allemagne)',
    destination: 'Vancouver YVR & Surrey (Canada)',
    mode: 'Fret Aérien',
    eta: '28 Septembre 2026',
    currentLocation: 'Terminal Fret Aérien YVR Surrey Gateway',
    steps: [
      {
        title: 'Enlèvement Entrepôt Température Contrôlée',
        location: 'Francfort (Allemagne)',
        timestamp: '25 Sept 2026 · 16:00',
        completed: true,
        description: 'Palette thermo-isolée avec enregistreur de température cryo.'
      },
      {
        title: 'Vol Cargo Transatlantique IATA',
        location: 'Vol LH-Cargo 8240',
        timestamp: '26 Sept 2026 · 07:20',
        completed: true,
        description: 'Atterrissage confirmé à Vancouver YVR.'
      },
      {
        title: 'Inspection & Dédouanement Santé Canada / CBSA',
        location: 'Bureau des Douanes Surrey / YVR',
        timestamp: '27 Sept 2026 · 13:10',
        completed: true,
        current: true,
        description: 'En cours de libération douanière prioritaire par notre commissaire de transport.'
      },
      {
        title: 'Livraison Finale Camion Frigorifique',
        location: 'Surrey Hub (BC V3T 2W1)',
        timestamp: '28 Sept 2026 · 10:00 (estimé)',
        completed: false,
        description: 'Acheminement direct au client avec décharge de livraison certifiée.'
      }
    ]
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    reference: 'DEV-2026-089',
    companyName: 'Apex Timber Industries',
    contactName: 'David Miller',
    email: 'd.miller@apextimber.ca',
    phone: '+1 (604) 555-0199',
    serviceType: 'multimodal',
    transportMode: 'maritime_fcl',
    origin: 'Surrey, BC (Canada)',
    destination: 'Le Havre (France)',
    cargoType: 'Bois d\'œuvre et panneaux usinés',
    weightKg: 24000,
    volumeM3: 65,
    estimatedCostMin: 4850,
    estimatedCostMax: 5600,
    status: 'en_attente',
    createdAt: '2026-09-26T16:20:00Z',
    notes: 'Client requiert un conteneur ventilé 40ft HQ.'
  },
  {
    id: 'quote-102',
    reference: 'DEV-2026-090',
    companyName: 'Global Electrics SA',
    contactName: 'Nathalie Mercier',
    email: 'n.mercier@globalelectrics.fr',
    phone: '+33 1 42 68 00 12',
    serviceType: 'customs',
    origin: 'Shanghai (Chine)',
    destination: 'Surrey Entrepôt Central (Canada)',
    cargoType: 'Composants électroniques sensibles',
    weightKg: 3200,
    volumeM3: 14,
    estimatedCostMin: 1250,
    estimatedCostMax: 1650,
    status: 'chiffre',
    createdAt: '2026-09-25T11:05:00Z',
    notes: 'Demande de tarif préférentiel OEA / courtage douanier direct.'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Robert Zhang',
    company: 'Pacific Rim Trade Corp',
    email: 'rzhang@pacificrimtrade.com',
    phone: '+1 (604) 890-4411',
    subject: 'Partenariat annuel entreposage Surrey',
    message: 'Bonjour, nous cherchons une surface de 2500 m² dans votre entrepôt sécurisé de Surrey pour stocker des produits finis avec préparation de commande quotidienne. Pouvez-vous nous contacter ?',
    createdAt: '2026-09-27T10:14:00Z',
    isRead: false
  },
  {
    id: 'msg-2',
    name: 'Élodie Fontaine',
    company: 'Fontaine Logistique Europe',
    email: 'e.fontaine@fontaine-log.fr',
    phone: '+33 6 12 34 56 78',
    subject: 'Transit multimodal Canada -> France',
    message: 'Nous souhaiterions établir une convention de correspondance pour vos flux en provenance du port de Vancouver vers nos terminaux au Havre et à Marseille.',
    createdAt: '2026-09-26T18:40:00Z',
    isRead: true
  }
];
