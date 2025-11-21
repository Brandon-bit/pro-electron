// Dashboard summary types
export type TreasurySummary = {
    totalBalance: number
    totalIncome: number
    totalExpense: number
    netCashFlow: number
    accountsCount: number
    pendingReconciliations: number
}

// Account balance summary
export type AccountBalanceSummary = {
    id: number
    name: string
    bankName: string
    balance: number
    lastMovementDate: string
}

// Cash flow by period
export type CashFlowData = {
    period: string
    income: number
    expense: number
    net: number
}

// Recent movements summary
export type RecentMovementSummary = {
    id: number
    date: string
    bankAccountName: string
    movementType: string
    concept: string
    amount: number
}

// Alert types
export type TreasuryAlert = {
    id: number
    type: 'warning' | 'error' | 'info'
    title: string
    message: string
    date?: string
}

// Movement by type summary
export type MovementByTypeSummary = {
    type: string
    count: number
    total: number
    percentage: number
}
