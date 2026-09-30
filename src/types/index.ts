// ==========================================
// LUME - Types & Interfaces
// ==========================================

export type UserRole = 'STUDENT' | 'PARENT' | 'ADMIN';
export type StudentLevel = 'INICIANTE' | 'EXPLORADOR' | 'AVANÇADO' | 'MESTRE';
export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export type TransactionCategory = 'TRANSPORTE' | 'ALIMENTACAO' | 'LAZER' | 'EDUCACAO' | 'SAUDE' | 'OUTROS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  consentGivenAt: Date;
  dataProcessingPurpose: string[];
  guardianId?: string;
}

export interface Student extends User {
  role: 'STUDENT';
  level: StudentLevel;
  xp: number;
  nextLevelXp: number;
  parentId: string;
  account: Account;
  goals: Goal[];
  coursesCompleted: string[];
  autonomyLevel: number; // 0-100
}

export interface Parent extends User {
  role: 'PARENT';
  linkedStudents: string[];
  parentalRules: ParentalRule[];
}

export interface Account {
  id: string;
  userId: string;
  balance: number;
  accountType: 'STUDENT' | 'PARENT';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT' | 'PIX_IN' | 'PIX_OUT' | 'CASHBACK';
  category: TransactionCategory;
  description: string;
  status: TransactionStatus;
  parentApproved: boolean;
  createdAt: Date;
  merchant?: string;
}

export interface ParentalRule {
  id: string;
  parentId: string;
  studentId: string;
  category: TransactionCategory;
  dailyLimit: number;
  monthlyLimit: number;
  requiresApproval: boolean;
  isGeofenced: boolean;
  safeZones?: GeoZone[];
}

export interface GeoZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // meters
}

export interface Goal {
  id: string;
  studentId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  icon: string;
  color: string;
}

export interface CreditRequest {
  id: string;
  studentId: string;
  type: 'LUME_SETUP' | 'LUME_SALTO';
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  score: number;
  createdAt: Date;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  cashbackReward: number;
  completed: boolean;
  category: string;
  thumbnail: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  timestamp: Date;
  details: string;
  ipAddress: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'APPROVAL' | 'ALERT' | 'INFO' | 'SUCCESS';
  read: boolean;
  createdAt: Date;
}
