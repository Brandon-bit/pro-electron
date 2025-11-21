import {
    TreasurySummary,
    AccountBalanceSummary,
    CashFlowData,
    RecentMovementSummary,
    TreasuryAlert,
    MovementByTypeSummary
} from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

export const useTreasuryDashboard = () => {
    // Mock data - En producción vendría del backend
    const getTreasurySummary = async (): Promise<TreasurySummary> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return {
            totalBalance: 388500,
            totalIncome: 225000,
            totalExpense: 40000,
            netCashFlow: 185000,
            accountsCount: 3,
            pendingReconciliations: 1
        }
    }

    const getAccountBalances = async (): Promise<AccountBalanceSummary[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                name: 'Cuenta Principal BBVA',
                bankName: 'BBVA',
                balance: 130000,
                lastMovementDate: '2024-10-19'
            },
            {
                id: 2,
                name: 'Cuenta Nómina Santander',
                bankName: 'Santander',
                balance: 98500,
                lastMovementDate: '2024-10-20'
            },
            {
                id: 3,
                name: 'Cuenta Ahorro Banorte',
                bankName: 'Banorte',
                balance: 160000,
                lastMovementDate: '2024-10-18'
            }
        ]
    }

    const getCashFlowData = async (): Promise<CashFlowData[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                period: 'Semana 1',
                income: 50000,
                expense: 15000,
                net: 35000
            },
            {
                period: 'Semana 2',
                income: 75000,
                expense: 25000,
                net: 50000
            },
            {
                period: 'Semana 3',
                income: 100000,
                expense: 0,
                net: 100000
            },
            {
                period: 'Semana 4',
                income: 0,
                expense: 0,
                net: 0
            }
        ]
    }

    const getRecentMovements = async (): Promise<RecentMovementSummary[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 6,
                date: '2024-10-20',
                bankAccountName: 'Cuenta Nómina Santander',
                movementType: 'Ingreso',
                concept: 'Depósito para nómina',
                amount: 75000
            },
            {
                id: 5,
                date: '2024-10-19',
                bankAccountName: 'Cuenta Principal BBVA',
                movementType: 'Transferencia',
                concept: 'Transferencia a cuenta de ahorros',
                amount: -30000
            },
            {
                id: 4,
                date: '2024-10-18',
                bankAccountName: 'Cuenta Ahorro Banorte',
                movementType: 'Ingreso',
                concept: 'Transferencia de inversión',
                amount: 100000
            },
            {
                id: 3,
                date: '2024-10-17',
                bankAccountName: 'Cuenta Nómina Santander',
                movementType: 'Egreso',
                concept: 'Pago de nómina quincenal',
                amount: -25000
            },
            {
                id: 2,
                date: '2024-10-16',
                bankAccountName: 'Cuenta Principal BBVA',
                movementType: 'Egreso',
                concept: 'Pago a proveedor - Compra de materiales',
                amount: -15000
            }
        ]
    }

    const getTreasuryAlerts = async (): Promise<TreasuryAlert[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                type: 'warning',
                title: 'Conciliación pendiente',
                message: 'Cuenta Ahorro Banorte tiene una conciliación pendiente del período 01-15 Nov',
                date: '2024-11-15'
            },
            {
                id: 2,
                type: 'error',
                title: 'Discrepancia detectada',
                message: 'Diferencia de $1,500 en Cuenta Principal BBVA - Revisar comisiones',
                date: '2024-10-31'
            },
            {
                id: 3,
                type: 'info',
                title: 'Saldo bajo',
                message: 'Cuenta Nómina Santander tiene un saldo menor a $100,000',
                date: '2024-10-20'
            }
        ]
    }

    const getMovementsByType = async (): Promise<MovementByTypeSummary[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const total = 265000
        return [
            {
                type: 'Ingreso',
                count: 3,
                total: 225000,
                percentage: (225000 / total) * 100
            },
            {
                type: 'Egreso',
                count: 2,
                total: 40000,
                percentage: (40000 / total) * 100
            },
            {
                type: 'Transferencia',
                count: 1,
                total: 30000,
                percentage: (30000 / total) * 100
            }
        ]
    }

    return {
        getTreasurySummary,
        getAccountBalances,
        getCashFlowData,
        getRecentMovements,
        getTreasuryAlerts,
        getMovementsByType
    }
}
