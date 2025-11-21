import {
    AccountReceivable,
    AccountReceivableDTO,
    AccountReceivableRequest,
    PaymentRequest,
    SelectOptionDTO
} from '@/modules/Tesoreria/CuentasPorCobrar/types/accountReceivableTypes'
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import { mapAccountReceivable, mapAccountReceivableRequest, mapAccountReceivableToSelectOption, mapPaymentRequest } from '@/modules/Tesoreria/CuentasPorCobrar/composables/mappingAccountReceivables'

export const useAccountReceivableActions = () => {
    const accountReceivableStore = useAccountReceivableStore()

    // Mock data from backend (en español)
    const mockAccountsReceivableBackend: AccountReceivable[] = [
        {
            id: 1,
            clienteId: 1,
            nombreCliente: 'Comercializadora del Norte S.A. de C.V.',
            numeroDocumento: 'FAC-2024-001',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-10-01',
            fechaVencimiento: '2024-10-31',
            monto: 125000,
            saldoPendiente: 125000,
            estado: 'VENCIDO',
            notas: 'Factura por servicios de consultoría'
        },
        {
            id: 2,
            clienteId: 2,
            nombreCliente: 'Distribuidora del Pacífico S.A.',
            numeroDocumento: 'FAC-2024-002',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-10-15',
            fechaVencimiento: '2024-10-30',
            monto: 85000,
            saldoPendiente: 35000,
            estado: 'PARCIAL',
            notas: 'Pago parcial de $50,000 recibido'
        },
        {
            id: 3,
            clienteId: 3,
            nombreCliente: 'Importadora Central S.C.',
            numeroDocumento: 'FAC-2024-003',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-10-20',
            fechaVencimiento: '2024-12-04',
            monto: 250000,
            saldoPendiente: 250000,
            estado: 'PENDIENTE',
            notas: 'Venta de equipo industrial'
        },
        {
            id: 4,
            clienteId: 5,
            nombreCliente: 'Tecnología y Sistemas del Sureste',
            numeroDocumento: 'NV-2024-015',
            tipoDocumento: 'NOTA_VENTA',
            fechaEmision: '2024-10-18',
            fechaVencimiento: '2024-11-02',
            monto: 45000,
            saldoPendiente: 45000,
            estado: 'PENDIENTE'
        },
        {
            id: 5,
            clienteId: 1,
            nombreCliente: 'Comercializadora del Norte S.A. de C.V.',
            numeroDocumento: 'FAC-2024-004',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-09-15',
            fechaVencimiento: '2024-10-15',
            monto: 95000,
            saldoPendiente: 0,
            estado: 'PAGADO',
            notas: 'Pagado en su totalidad el 10/10/2024'
        }
    ]

    // Map to DTO (English)
    const mockAccountsReceivable: AccountReceivableDTO[] = mockAccountsReceivableBackend.map(mapAccountReceivable)

    const getAccountsReceivable = async (
        page: number,
        pageSize: number
    ): Promise<{ items: AccountReceivableDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockAccountsReceivable.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockAccountsReceivable.length
        }
    }

    const getAccountsReceivableForSelect = async (): Promise<SelectOptionDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockAccountsReceivable
            .filter((ar) => ar.status !== 'PAGADO')
            .map(mapAccountReceivableToSelectOption)
    }

    const createAccountReceivable = async (
        data: AccountReceivableRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapAccountReceivableRequest(data)
        console.log('📤 CREATE Account Receivable - Payload:', payload)

        return {
            message: 'Cuenta por cobrar creada exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateAccountReceivable = async (
        data: AccountReceivableRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapAccountReceivableRequest(data)
        console.log('📤 UPDATE Account Receivable - Payload:', payload)

        return {
            message: 'Cuenta por cobrar actualizada exitosamente',
            status: 'success',
            data: null
        }
    }

    const deleteAccountReceivable = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = accountReceivableStore.selectedAccountReceivable?.id
        console.log('📤 DELETE Account Receivable - ID:', id)

        return {
            message: 'Cuenta por cobrar eliminada exitosamente',
            status: 'success',
            data: null
        }
    }

    const registerPayment = async (
        data: PaymentRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapPaymentRequest(data)
        console.log('📤 REGISTER Payment - Payload:', payload)

        return {
            message: 'Pago registrado exitosamente',
            status: 'success',
            data: null
        }
    }

    return {
        getAccountsReceivable,
        getAccountsReceivableForSelect,
        createAccountReceivable,
        updateAccountReceivable,
        deleteAccountReceivable,
        registerPayment
    }
}
