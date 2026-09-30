import { Student, Parent, Transaction, ParentalRule, Goal, CreditRequest, Course, Notification } from '../types';

export const mockParent: Parent = {
  id: 'parent-001',
  name: 'Maria Silva',
  email: 'maria@email.com',
  role: 'PARENT',
  createdAt: new Date('2024-01-15'),
  consentGivenAt: new Date('2024-01-15'),
  dataProcessingPurpose: ['ACCOUNT_MANAGEMENT', 'CHILD_SUPERVISION', 'COMPLIANCE'],
  linkedStudents: ['student-001'],
  parentalRules: [],
};

export const mockStudent: Student = {
  id: 'student-001',
  name: 'Lucas Silva',
  email: 'lucas@email.com',
  role: 'STUDENT',
  level: 'EXPLORADOR',
  xp: 2450,
  nextLevelXp: 5000,
  parentId: 'parent-001',
  createdAt: new Date('2024-02-01'),
  consentGivenAt: new Date('2024-02-01'),
  dataProcessingPurpose: ['EDUCATION', 'FINANCIAL_CONTROL'],
  guardianId: 'parent-001',
  account: {
    id: 'acc-001',
    userId: 'student-001',
    balance: 847.50,
    accountType: 'STUDENT',
    createdAt: new Date('2024-02-01'),
  },
  goals: [],
  coursesCompleted: ['course-001', 'course-002', 'course-003'],
  autonomyLevel: 65,
};

export const mockTransactions: Transaction[] = [
  { id: 'tx-001', accountId: 'acc-001', amount: 15.90, type: 'DEBIT', category: 'ALIMENTACAO', description: 'Cantina da Escola', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-10T12:30:00'), merchant: 'Cantina Central' },
  { id: 'tx-002', accountId: 'acc-001', amount: 4.40, type: 'DEBIT', category: 'TRANSPORTE', description: 'Metrô - Viagem', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-10T07:15:00'), merchant: 'Metrô SP' },
  { id: 'tx-003', accountId: 'acc-001', amount: 35.00, type: 'DEBIT', category: 'LAZER', description: 'Cinema + Pipoca', status: 'PENDING', parentApproved: false, createdAt: new Date('2024-12-10T18:00:00'), merchant: 'Cinépolis' },
  { id: 'tx-004', accountId: 'acc-001', amount: 5.00, type: 'CASHBACK', category: 'EDUCACAO', description: 'Recompensa: Curso Investimento 101', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-09T15:00:00') },
  { id: 'tx-005', accountId: 'acc-001', amount: 200.00, type: 'PIX_IN', category: 'OUTROS', description: 'Mesada Dezembro', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-01T08:00:00'), merchant: 'Maria Silva' },
  { id: 'tx-006', accountId: 'acc-001', amount: 89.90, type: 'DEBIT', category: 'EDUCACAO', description: 'Livro - Programação', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-08T14:20:00'), merchant: 'Livraria Cultura' },
  { id: 'tx-007', accountId: 'acc-001', amount: 22.50, type: 'DEBIT', category: 'ALIMENTACAO', description: 'Lanche pós-aula', status: 'COMPLETED', parentApproved: true, createdAt: new Date('2024-12-09T17:30:00'), merchant: 'Burger King' },
  { id: 'tx-008', accountId: 'acc-001', amount: 150.00, type: 'DEBIT', category: 'LAZER', description: 'Tênis Esportivo', status: 'PENDING', parentApproved: false, createdAt: new Date('2024-12-10T19:00:00'), merchant: 'Netshoes' },
];

export const mockParentalRules: ParentalRule[] = [
  { id: 'rule-001', parentId: 'parent-001', studentId: 'student-001', category: 'TRANSPORTE', dailyLimit: 20, monthlyLimit: 400, requiresApproval: false, isGeofenced: false },
  { id: 'rule-002', parentId: 'parent-001', studentId: 'student-001', category: 'ALIMENTACAO', dailyLimit: 30, monthlyLimit: 600, requiresApproval: false, isGeofenced: false },
  { id: 'rule-003', parentId: 'parent-001', studentId: 'student-001', category: 'LAZER', dailyLimit: 50, monthlyLimit: 300, requiresApproval: true, isGeofenced: true, safeZones: [{ id: 'zone-001', name: 'Escola', latitude: -23.5505, longitude: -46.6333, radius: 500 }, { id: 'zone-002', name: 'Casa', latitude: -23.5614, longitude: -46.6558, radius: 300 }] },
  { id: 'rule-004', parentId: 'parent-001', studentId: 'student-001', category: 'EDUCACAO', dailyLimit: 100, monthlyLimit: 1000, requiresApproval: false, isGeofenced: false },
];

export const mockGoals: Goal[] = [
  { id: 'goal-001', studentId: 'student-001', title: 'Notebook Novo', targetAmount: 3500, currentAmount: 1200, deadline: new Date('2025-06-01'), icon: '💻', color: '#FFB300' },
  { id: 'goal-002', studentId: 'student-001', title: 'Viagem Formatura', targetAmount: 2000, currentAmount: 850, deadline: new Date('2025-12-01'), icon: '✈️', color: '#4CAF50' },
  { id: 'goal-003', studentId: 'student-001', title: 'Curso de Inglês', targetAmount: 1500, currentAmount: 1350, deadline: new Date('2025-03-01'), icon: '🇬🇧', color: '#2196F3' },
];

export const mockCreditRequests: CreditRequest[] = [
  { id: 'credit-001', studentId: 'student-001', type: 'LUME_SETUP', amount: 3500, status: 'PENDING', score: 72, createdAt: new Date('2024-12-05'), description: 'Notebook para estudos - Dell Inspiron 15' },
];

export const mockCourses: Course[] = [
  { id: 'course-001', title: 'Investimento 101', description: 'Aprenda os fundamentos de como fazer seu dinheiro crescer', duration: '15 min', xpReward: 200, cashbackReward: 5, completed: true, category: 'Investimentos', thumbnail: '📈' },
  { id: 'course-002', title: 'Orçamento Inteligente', description: 'Como planejar seus gastos e nunca ficar no vermelho', duration: '12 min', xpReward: 150, cashbackReward: 3, completed: true, category: 'Planejamento', thumbnail: '📊' },
  { id: 'course-003', title: 'Pix com Segurança', description: 'Entenda como usar o Pix sem cair em golpes', duration: '8 min', xpReward: 100, cashbackReward: 2, completed: true, category: 'Segurança', thumbnail: '🔒' },
  { id: 'course-004', title: 'Cartão de Crédito: Aliado ou Vilão?', description: 'Use o cartão a seu favor e evite dívidas', duration: '20 min', xpReward: 300, cashbackReward: 8, completed: false, category: 'Crédito', thumbnail: '💳' },
  { id: 'course-005', title: 'Empreendedorismo Jovem', description: 'Transforme suas ideias em renda extra', duration: '25 min', xpReward: 400, cashbackReward: 10, completed: false, category: 'Negócios', thumbnail: '🚀' },
  { id: 'course-006', title: 'Criptomoedas: O Básico', description: 'Entenda o universo das moedas digitais', duration: '18 min', xpReward: 250, cashbackReward: 5, completed: false, category: 'Investimentos', thumbnail: '₿' },
];

export const mockNotifications: Notification[] = [
  { id: 'notif-001', title: 'Aprovação Necessária', message: 'Lucas quer gastar R$ 35,00 no Cinema', type: 'APPROVAL', read: false, createdAt: new Date('2024-12-10T18:00:00') },
  { id: 'notif-002', title: 'Aprovação Necessária', message: 'Lucas quer gastar R$ 150,00 na Netshoes', type: 'APPROVAL', read: false, createdAt: new Date('2024-12-10T19:00:00') },
  { id: 'notif-003', title: 'Meta Quase Atingida!', message: 'Lucas está a R$ 150 de completar a meta "Curso de Inglês"', type: 'INFO', read: true, createdAt: new Date('2024-12-09T10:00:00') },
  { id: 'notif-004', title: 'Novo Curso Completo', message: 'Lucas completou "Pix com Segurança" e ganhou R$ 2,00 de cashback', type: 'SUCCESS', read: true, createdAt: new Date('2024-12-08T16:00:00') },
  { id: 'notif-005', title: 'Alerta de Zona', message: 'Lucas saiu da zona segura "Escola" às 17:30', type: 'ALERT', read: true, createdAt: new Date('2024-12-10T17:30:00') },
];

export const weeklySpending = [
  { day: 'Seg', valor: 25 },
  { day: 'Ter', valor: 42 },
  { day: 'Qua', valor: 18 },
  { day: 'Qui', valor: 55 },
  { day: 'Sex', valor: 35 },
  { day: 'Sáb', valor: 89 },
  { day: 'Dom', valor: 12 },
];

export const monthlySpending = [
  { month: 'Jul', transporte: 120, alimentacao: 280, lazer: 150, educacao: 50 },
  { month: 'Ago', transporte: 135, alimentacao: 310, lazer: 200, educacao: 90 },
  { month: 'Set', transporte: 110, alimentacao: 260, lazer: 80, educacao: 120 },
  { month: 'Out', transporte: 140, alimentacao: 290, lazer: 250, educacao: 75 },
  { month: 'Nov', transporte: 125, alimentacao: 300, lazer: 180, educacao: 100 },
  { month: 'Dez', transporte: 80, alimentacao: 150, lazer: 35, educacao: 90 },
];
