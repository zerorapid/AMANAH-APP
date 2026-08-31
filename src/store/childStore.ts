import { create } from 'zustand'
import type { Child, Transaction, ApprovalRequest } from './types'

interface ChildState {
  child: Child
  transactions: Transaction[]
  requests: ApprovalRequest[]
  // Validation Engine
  validatePayment: (amount: number, category: string) => 'approved' | 'blocked' | 'approval_required' | 'insufficient_balance'
  addTransaction: (tx: Transaction) => void
  sendRequest: (request: ApprovalRequest) => void
}

export const useChildStore = create<ChildState>((set, get) => ({
  child: {
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

  transactions: [
    { id: 't1', merchant: 'Amazon', amount: -12.5, date: 'Today, 10:42 AM', status: 'completed', category: 'shopping', icon: '🛒' },
    { id: 't2', merchant: 'Allowance from Dad', amount: 50, date: 'Yesterday', status: 'completed', category: 'allowance', icon: '💰' },
    { id: 't3', merchant: "McDonald's", amount: -8, date: 'Aug 24', status: 'completed', category: 'food', icon: '🍔' },
    { id: 't4', merchant: 'Steam Games', amount: -20, date: 'Aug 23', status: 'blocked', category: 'gaming', icon: '🎮' },
  ],

  requests: [],

  // Core validation logic (mirrors the IA payment control flow)
  validatePayment: (amount, category) => {
    const { child } = get()
    if (child.restrictedCategories.includes(category.toLowerCase())) return 'blocked'
    if (child.balance < amount) return 'insufficient_balance'
    if (amount > child.dailyLimit) return 'approval_required'
    if (amount > child.perTransactionLimit) return 'approval_required'
    if (child.paymentMode === 'approval_required') return 'approval_required'
    return 'approved'
  },

  addTransaction: (tx) =>
    set((s) => ({
      transactions: [tx, ...s.transactions],
      child: tx.amount < 0
        ? { ...s.child, balance: s.child.balance + tx.amount, spent: s.child.spent + Math.abs(tx.amount) }
        : s.child,
    })),

  sendRequest: (request) =>
    set((s) => ({ requests: [request, ...s.requests] })),
}))
