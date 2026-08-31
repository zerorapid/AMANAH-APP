// Global app types shared between Parent and Child stores
export type Role = 'parent' | 'child'
export type AccountStatus = 'active' | 'pending' | 'restricted' | 'suspended'
export type PaymentMode = 'auto' | 'approval_required'
export type TransactionStatus = 'completed' | 'pending' | 'declined' | 'blocked' | 'failed' | 'reversed'
export type RequestStatus = 'pending' | 'approved' | 'declined' | 'expired'

export interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  status: TransactionStatus
  category: string
  childId?: string
  icon?: string
}

export interface Child {
  id: string
  name: string
  avatar: string
  balance: number
  monthlyLimit: number
  dailyLimit: number
  perTransactionLimit: number
  spent: number
  paymentMode: PaymentMode
  status: AccountStatus
  restrictedCategories: string[]
}

export interface Parent {
  id: string
  name: string
  avatar: string
  balance: number
  email: string
  isVerified: boolean
}

export interface ApprovalRequest {
  id: string
  childId: string
  childName: string
  merchant: string
  amount: number
  reason: string
  status: RequestStatus
  createdAt: string
}
