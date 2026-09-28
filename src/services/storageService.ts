import { Employee, User, ShipmentTracking, QuoteRequest, ContactMessage, LeaveRequest } from '../types';
import { INITIAL_USERS, INITIAL_EMPLOYEES, INITIAL_TRACKING, INITIAL_QUOTES, INITIAL_MESSAGES } from '../data/initialData';

const STORAGE_KEYS = {
  USERS: 'atlantic_users_v2',
  EMPLOYEES: 'atlantic_employees_v2',
  TRACKING: 'atlantic_tracking_v2',
  QUOTES: 'atlantic_quotes_v2',
  MESSAGES: 'atlantic_messages_v2',
  LEAVES: 'atlantic_leaves_v2',
  SESSION: 'atlantic_session_v2',
};

// Deterministic string hash helper for browser demo
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Return hex format
  return Math.abs(hash).toString(16).padStart(8, '0');
}

export function initStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRACKING)) {
    localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(INITIAL_TRACKING));
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUOTES)) {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(INITIAL_QUOTES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
  }
}

// User & Auth Management
export function getUsers(): User[] {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : INITIAL_USERS;
}

export function getEmployees(): Employee[] {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  if (!data) return INITIAL_EMPLOYEES;
  const parsed: Employee[] = JSON.parse(data);
  let updated = false;
  parsed.forEach(emp => {
    if (!emp.photoUrl) {
      const match = INITIAL_EMPLOYEES.find(ie => ie.id === emp.id);
      if (match?.photoUrl) {
        emp.photoUrl = match.photoUrl;
        updated = true;
      }
    }
    if (!emp.contractPdf) {
      const match = INITIAL_EMPLOYEES.find(ie => ie.id === emp.id);
      if (match?.contractPdf) {
        emp.contractPdf = match.contractPdf;
        updated = true;
      }
    }
  });
  if (updated) {
    saveEmployees(parsed);
  }
  return parsed;
}

export function saveEmployees(employees: Employee[]): void {
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Generate automatic matricule like EMP-2026-005
export function generateNextMatricule(): string {
  const employees = getEmployees();
  const currentYear = new Date().getFullYear();
  const yearPrefix = `EMP-${currentYear}-`;

  let maxNum = 0;
  employees.forEach(emp => {
    if (emp.matricule && emp.matricule.startsWith(yearPrefix)) {
      const numPart = parseInt(emp.matricule.replace(yearPrefix, ''), 10);
      if (!isNaN(numPart) && numPart > maxNum) {
        maxNum = numPart;
      }
    }
  });

  const nextNum = maxNum + 1;
  const formattedNum = nextNum.toString().padStart(3, '0');
  return `EMP-${currentYear}-${formattedNum}`;
}

// Add new employee
export function addEmployee(
  employeeData: Omit<Employee, 'id' | 'matricule'>,
  tempPassword?: string
): { employee: Employee; tempPass: string } {
  const employees = getEmployees();
  const users = getUsers();

  const id = `emp-${Date.now()}`;
  const matricule = generateNextMatricule();
  const generatedPassword = tempPassword || `Atlantic${Math.floor(1000 + Math.random() * 9000)}!`;

  const newEmployee: Employee = {
    ...employeeData,
    id,
    matricule,
    isActive: true,
    mustChangePassword: true, // Required by prompt: force change on first login
  };

  const newUser: User = {
    id: `user-${id}`,
    email: newEmployee.email.toLowerCase().trim(),
    passwordHash: simpleHash(generatedPassword),
    role: 'employee',
    employeeId: id,
    mustChangePassword: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  employees.unshift(newEmployee);
  users.push(newUser);

  saveEmployees(employees);
  saveUsers(users);

  return { employee: newEmployee, tempPass: generatedPassword };
}

// Update employee
export function updateEmployee(id: string, updates: Partial<Employee>): Employee | null {
  const employees = getEmployees();
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updates };
  saveEmployees(employees);

  // Sync user status if active changed
  if (updates.isActive !== undefined || updates.email !== undefined) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.employeeId === id);
    if (userIndex !== -1) {
      if (updates.isActive !== undefined) {
        users[userIndex].isActive = updates.isActive;
      }
      if (updates.email !== undefined) {
        users[userIndex].email = updates.email.toLowerCase().trim();
      }
      saveUsers(users);
    }
  }

  return employees[index];
}

// Toggle employee active status
export function toggleEmployeeActive(id: string): Employee | null {
  const employees = getEmployees();
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) return null;

  const newStatus = !employees[index].isActive;
  employees[index].isActive = newStatus;
  saveEmployees(employees);

  // Sync user
  const users = getUsers();
  const userIndex = users.findIndex(u => u.employeeId === id);
  if (userIndex !== -1) {
    users[userIndex].isActive = newStatus;
    saveUsers(users);
  }

  return employees[index];
}

// Reset employee password
export function resetEmployeePassword(id: string): string {
  const users = getUsers();
  const employees = getEmployees();
  const newTempPass = `Atlantic${Math.floor(1000 + Math.random() * 9000)}!`;

  const userIndex = users.findIndex(u => u.employeeId === id);
  if (userIndex !== -1) {
    users[userIndex].passwordHash = simpleHash(newTempPass);
    users[userIndex].mustChangePassword = true;
    saveUsers(users);
  }

  const empIndex = employees.findIndex(e => e.id === id);
  if (empIndex !== -1) {
    employees[empIndex].mustChangePassword = true;
    saveEmployees(employees);
  }

  return newTempPass;
}

// Delete employee
export function deleteEmployee(id: string): boolean {
  const employees = getEmployees().filter(e => e.id !== id);
  const users = getUsers().filter(u => u.employeeId !== id);
  saveEmployees(employees);
  saveUsers(users);
  return true;
}

// Quotes
export function getQuotes(): QuoteRequest[] {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
  return data ? JSON.parse(data) : INITIAL_QUOTES;
}

export function addQuote(quote: Omit<QuoteRequest, 'id' | 'reference' | 'status' | 'createdAt'>): QuoteRequest {
  const quotes = getQuotes();
  const ref = `DEV-2026-${(quotes.length + 90).toString().padStart(3, '0')}`;
  const newQuote: QuoteRequest = {
    ...quote,
    id: `quote-${Date.now()}`,
    reference: ref,
    status: 'en_attente',
    createdAt: new Date().toISOString(),
  };
  quotes.unshift(newQuote);
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  return newQuote;
}

export function updateQuoteStatus(id: string, status: QuoteRequest['status']): void {
  const quotes = getQuotes();
  const q = quotes.find(item => item.id === id);
  if (q) {
    q.status = status;
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }
}

// Messages
export function getMessages(): ContactMessage[] {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return data ? JSON.parse(data) : INITIAL_MESSAGES;
}

export function addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
  const messages = getMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };
  messages.unshift(newMsg);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return newMsg;
}

export function markMessageRead(id: string): void {
  const messages = getMessages();
  const m = messages.find(item => item.id === id);
  if (m) {
    m.isRead = true;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }
}

// Tracking
export function getTrackingList(): ShipmentTracking[] {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.TRACKING);
  return data ? JSON.parse(data) : INITIAL_TRACKING;
}

export function findTracking(trackingNumber: string): ShipmentTracking | undefined {
  const list = getTrackingList();
  const normalized = trackingNumber.trim().toUpperCase();
  return list.find(t => t.trackingNumber.toUpperCase() === normalized);
}

// Session state
export interface SessionState {
  user: User;
  employee?: Employee;
}

export function getCurrentSession(): SessionState | null {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setSession(session: SessionState | null): void {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

// Leave requests
export function getLeaveRequests(employeeId?: string): LeaveRequest[] {
  const data = localStorage.getItem(STORAGE_KEYS.LEAVES);
  const all: LeaveRequest[] = data ? JSON.parse(data) : [
    {
      id: 'leave-1',
      employeeId: 'emp-1',
      employeeName: 'Jean-Marc Tremblay',
      type: 'Congés Payés',
      startDate: '2026-10-15',
      endDate: '2026-10-22',
      reason: 'Congés d\'automne en famille.',
      status: 'Approuvé',
      createdAt: '2026-09-20'
    }
  ];
  if (employeeId) {
    return all.filter(l => l.employeeId === employeeId);
  }
  return all;
}

export function addLeaveRequest(req: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>): LeaveRequest {
  const current = getLeaveRequests();
  const newReq: LeaveRequest = {
    ...req,
    id: `leave-${Date.now()}`,
    status: 'En attente',
    createdAt: new Date().toISOString().split('T')[0]
  };
  current.unshift(newReq);
  localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(current));
  return newReq;
}
