import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Parent, Transaction, Notification, ParentalRule, Goal, Course } from '../types';
import { mockStudent, mockParent, mockTransactions, mockNotifications, mockParentalRules, mockGoals, mockCourses } from '../data/mockData';

type AppView = 'landing' | 'student-home' | 'student-goals' | 'student-clareira' | 'student-credit' | 'parent-dashboard' | 'parent-controls' | 'parent-approvals' | 'face-check';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  student: Student;
  parent: Parent;
  transactions: Transaction[];
  notifications: Notification[];
  parentalRules: ParentalRule[];
  goals: Goal[];
  courses: Course[];
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
  markNotificationRead: (id: string) => void;
  updateRule: (id: string, updates: Partial<ParentalRule>) => void;
  faceCheckComplete: boolean;
  setFaceCheckComplete: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [student] = useState<Student>(mockStudent);
  const [parent] = useState<Parent>(mockParent);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [parentalRules, setParentalRules] = useState<ParentalRule[]>(mockParentalRules);
  const [goals] = useState<Goal[]>(mockGoals);
  const [courses] = useState<Course[]>(mockCourses);
  const [faceCheckComplete, setFaceCheckComplete] = useState(false);

  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(tx =>
      tx.id === id ? { ...tx, status: 'APPROVED' as const, parentApproved: true } : tx
    ));
    setNotifications(prev => prev.filter(n => !n.message.includes(transactions.find(t => t.id === id)?.description || '')));
  };

  const rejectTransaction = (id: string) => {
    setTransactions(prev => prev.map(tx =>
      tx.id === id ? { ...tx, status: 'REJECTED' as const, parentApproved: false } : tx
    ));
    setNotifications(prev => prev.filter(n => !n.message.includes(transactions.find(t => t.id === id)?.description || '')));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const updateRule = (id: string, updates: Partial<ParentalRule>) => {
    setParentalRules(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      student, parent, transactions, notifications,
      parentalRules, goals, courses,
      approveTransaction, rejectTransaction,
      markNotificationRead, updateRule,
      faceCheckComplete, setFaceCheckComplete,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
