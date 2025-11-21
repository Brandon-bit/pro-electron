import {
    BankReconciliation,
    BankReconciliationDTO,
    BankReconciliationRequest
} from '@/modules/Tesoreria/ConciliacionBancaria/types/bankReconciliationTypes'
import useBankReconciliationStore from '@/modules/Tesoreria/ConciliacionBancaria/store/bankReconciliationStore'
import {
    mapBankReconciliation,
    mapBankReconciliationRequest
} from '@/modules/Tesoreria/ConciliacionBancaria/composables/mappingBankReconciliations'

export const useBankReconciliationActions = () => {
    const bankReconciliationStore = useBankReconciliationStore()

    // Mock data from backend (en español)
    const mockBankReconciliationsBackend: BankReconciliation[] = [
        {
            id: 1,
            cuentaBancariaId: 1,
            nombreCuentaBancaria: 'Cuenta Principal BBVA',
            fechaInicio: '2024-10-01',
            fechaFin: '2024-10-15',
            saldoInicialLibros: 125000,
            saldoFinalLibros: 160000,
            saldoInicialBanco: 125000,
            saldoFinalBanco: 160000,
            diferencia: 0,
            estado: 2,
            estadoTexto: 'Conciliado',
            notas: 'Conciliación quincenal - Todo correcto',
            fechaConciliacion: '2024-10-16',
            activo: true
        },
        {
            id: 2,
            cuentaBancariaId: 1,
            nombreCuentaBancaria: 'Cuenta Principal BBVA',
            fechaInicio: '2024-10-16',
            fechaFin: '2024-10-31',
            saldoInicialLibros: 160000,
            saldoFinalLibros: 130000,
            saldoInicialBanco: 160000,
            saldoFinalBanco: 128500,
            diferencia: -1500,
            estado: 3,
            estadoTexto: 'Discrepancia',
            notas: 'Diferencia de $1,500 - Revisar comisiones bancarias',
            fechaConciliacion: '2024-11-01',
            activo: true
        },
        {
            id: 3,
            cuentaBancariaId: 2,
            nombreCuentaBancaria: 'Cuenta Nómina Santander',
            fechaInicio: '2024-10-01',
            fechaFin: '2024-10-31',
            saldoInicialLibros: 48500,
            saldoFinalLibros: 98500,
            saldoInicialBanco: 48500,
            saldoFinalBanco: 98500,
            diferencia: 0,
            estado: 2,
            estadoTexto: 'Conciliado',
            notas: 'Conciliación mensual de nómina',
            fechaConciliacion: '2024-11-01',
            activo: true
        },
        {
            id: 4,
            cuentaBancariaId: 3,
            nombreCuentaBancaria: 'Cuenta Ahorro Banorte',
            fechaInicio: '2024-11-01',
            fechaFin: '2024-11-15',
            saldoInicialLibros: 315000,
            saldoFinalLibros: 315000,
            saldoInicialBanco: 315000,
            saldoFinalBanco: 0,
            diferencia: 0,
            estado: 1,
            estadoTexto: 'Pendiente',
            notas: 'Pendiente de conciliar',
            activo: true
        }
    ]

    // Map to DTO (English)
    const mockBankReconciliations: BankReconciliationDTO[] =
        mockBankReconciliationsBackend.map(mapBankReconciliation)

    const getBankReconciliations = async (
        page: number,
        pageSize: number
    ): Promise<{ items: BankReconciliationDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockBankReconciliations.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockBankReconciliations.length
        }
    }

    const createBankReconciliation = async (
        data: BankReconciliationRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankReconciliationRequest(data)
        console.log('📤 CREATE Bank Reconciliation - Payload:', payload)

        return {
            message: 'Conciliación bancaria creada exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateBankReconciliation = async (
        data: BankReconciliationRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankReconciliationRequest(data)
        console.log('📤 UPDATE Bank Reconciliation - Payload:', payload)

        return {
            message: 'Conciliación bancaria actualizada exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getBankReconciliations,
        createBankReconciliation,
        updateBankReconciliation
    }
}
