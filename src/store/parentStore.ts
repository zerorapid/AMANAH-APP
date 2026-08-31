import { create } from 'zustand'
import type { Parent, Child, Transaction, ApprovalRequest } from './types'

interface ParentState {
  parent: Parent
  children: Child[]
  transactions: Transaction[]
  approvalRequests: ApprovalRequest[]
  // Actions
  updateBalance: (amount: number) => void
  addChild: (child: Child) => void
  updateChild: (id: string, updates: Partial<Child>) => void
  approveRequest: (requestId: string) => void
  declineRequest: (requestId: string) => void
  addTransaction: (tx: Transaction) => void
}

export const useParentStore = create<ParentState>((set) => ({
  parent: {
    id: 'p1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=parent',
    balance: 2450,
    email: 'john@example.com',
    isVerified: true,
  },

  children: [
    {
      id: 'c1',
      name: 'Alex',
      avatar: 'https://i.pravatar.cc/150?u=child1',
      balance: 45,
      monthlyLimit: 150,
      dailyLimit: 20,
      perTransactionLimit: 30,
      spent: 55,
      paymentMode: 'auto',
      status: 'active',
      restrictedCategories: ['gaming', 'adult'],
    },
    {
      id: 'c2',
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?u=child2',
      balance: 30,
      monthlyLimit: 100,
      dailyLimit: 15,
      perTransactionLimit: 20,
      spent: 70,
      paymentMode: 'approval_required',
      status: 'active',
      restrictedCategories: ['gaming', 'adult', 'gambling'],
    },
  ],

  transactions: [
    { id: 't1', merchant: 'Amazon', amount: -12.5, date: 'Today, 10:42 AM', status: 'completed', category: 'shopping', childId: 'c1', icon: '🛒' },
    { id: 't2', merchant: 'Steam Games', amount: -20, date: 'Aug 24', status: 'blocked', category: 'gaming', childId: 'c1', icon: '🎮' },
    { id: 't3', merchant: 'Allowance', amount: 50, date: 'Aug 20', status: 'completed', category: 'allowance', childId: 'c2', icon: '💰' },
    { id: 't4', merchant: "McDonald's", amount: -8, date: 'Aug 22', status: 'completed', category: 'food', childId: 'c1', icon: '🍔' },
  ],

  approvalRequests: [
    { id: 'r1', childId: 'c1', childName: 'Alex', merchant: 'Steam Games', amount: 15, reason: 'Game purchase', status: 'pending', createdAt: 'Just now' },
  ],

  updateBalance: (amount) =>
    set((s) => ({ parent: { ...s.parent, balance: s.parent.balance + amount } })),

  addChild: (child) =>
    set((s) => ({ children: [...s.children, child] })),

  updateChild: (id, updates) =>
    set((s) => ({ children: s.children.map((c) => (c.id === id ? { ...c, ...updates } : c)) })),

  approveRequest: (requestId) =>
    set((s) => ({
      approvalRequests: s.approvalRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'approved' as const } : r
      ),
    })),

  declineRequest: (requestId) =>
    set((s) => ({
      approvalRequests: s.approvalRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'declined' as const } : r
      ),
    })),

  addTransaction: (tx) =>
    set((s) => ({ transactions: [tx, ...s.transactions] })),
}))
