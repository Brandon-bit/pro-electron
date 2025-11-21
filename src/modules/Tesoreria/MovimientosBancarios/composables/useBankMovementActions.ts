import {
    BankMovement,
    BankMovementDTO,
    BankMovementRequest
} from '@/modules/Tesoreria/MovimientosBancarios/types/bankMovementTypes'
import useBankMovementStore from '@/modules/Tesoreria/MovimientosBancarios/store/bankMovementStore'
import { mapBankMovement, mapBankMovementRequest } from '@/modules/Tesoreria/MovimientosBancarios/composables/mappingBankMovements'

export const useBankMovementActions = () => {
    const bankMovementStore = useBankMovementStore()

    // Mock data from backend (en español)
    const mockBankMovementsBackend: BankMovement[] = [
        {
            id: 1,
            fecha: '2024-10-15',
            cuentaBancariaId: 1,
            nombreCuentaBancaria: 'Cuenta Principal BBVA',
            tipoMovimientoId: 1,
            tipoMovimiento: 'Ingreso',
            monto: 50000,
            concepto: 'Pago de cliente - Factura #001',
            referencia: 'REF-2024-001',
            saldoAnterior: 125000,
            saldoNuevo: 175000,
            activo: true
        },
        {
            id: 2,
            fecha: '2024-10-16',
            cuentaBancariaId: 1,
            nombreCuentaBancaria: 'Cuenta Principal BBVA',
            tipoMovimientoId: 2,
            tipoMovimiento: 'Egreso',
            monto: 15000,
            concepto: 'Pago a proveedor - Compra de materiales',
            referencia: 'REF-2024-002',
            saldoAnterior: 175000,
            saldoNuevo: 160000,
            activo: true
        },
        {
            id: 3,
            fecha: '2024-10-17',
            cuentaBancariaId: 2,
            nombreCuentaBancaria: 'Cuenta Nómina Santander',
            tipoMovimientoId: 2,
            tipoMovimiento: 'Egreso',
            monto: 25000,
            concepto: 'Pago de nómina quincenal',
            referencia: 'NOM-2024-10-Q2',
            saldoAnterior: 48500,
            saldoNuevo: 23500,
            activo: true
        },
        {
            id: 4,
            fecha: '2024-10-18',
            cuentaBancariaId: 3,
            nombreCuentaBancaria: 'Cuenta Ahorro Banorte',
            tipoMovimientoId: 1,
            tipoMovimiento: 'Ingreso',
            monto: 100000,
            concepto: 'Transferencia de inversión',
            referencia: 'INV-2024-018',
            saldoAnterior: 215000,
            saldoNuevo: 315000,
            activo: true
        },
        {
            id: 5,
            fecha: '2024-10-19',
            cuentaBancariaId: 1,
            nombreCuentaBancaria: 'Cuenta Principal BBVA',
            tipoMovimientoId: 3,
            tipoMovimiento: 'Transferencia',
            monto: 30000,
            concepto: 'Transferencia a cuenta de ahorros',
            referencia: 'TRANS-2024-005',
            saldoAnterior: 160000,
            saldoNuevo: 130000,
            activo: true
        },
        {
            id: 6,
            fecha: '2024-10-20',
            cuentaBancariaId: 2,
            nombreCuentaBancaria: 'Cuenta Nómina Santander',
            tipoMovimientoId: 1,
            tipoMovimiento: 'Ingreso',
            monto: 75000,
            concepto: 'Depósito para nómina',
            referencia: 'DEP-2024-020',
            saldoAnterior: 23500,
            saldoNuevo: 98500,
            activo: true
        }
    ]

    // Map to DTO (English)
    const mockBankMovements: BankMovementDTO[] = mockBankMovementsBackend.map(mapBankMovement)

    const getBankMovements = async (
        page: number,
        pageSize: number
    ): Promise<{ items: BankMovementDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockBankMovements.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockBankMovements.length
        }
    }

    const createBankMovement = async (
        data: BankMovementRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankMovementRequest(data)
        console.log('📤 CREATE Bank Movement - Payload:', payload)

        return {
            message: 'Movimiento bancario creado exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateBankMovement = async (
        data: BankMovementRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapBankMovementRequest(data)
        console.log('📤 UPDATE Bank Movement - Payload:', payload)

        return {
            message: 'Movimiento bancario actualizado exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getBankMovements,
        createBankMovement,
        updateBankMovement
    }
}
