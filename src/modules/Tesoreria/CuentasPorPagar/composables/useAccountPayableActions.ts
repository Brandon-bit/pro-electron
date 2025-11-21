import {
    AccountPayable,
    AccountPayableDTO,
    AccountPayableRequest,
    PaymentRequest,
    Payment,
    PaymentDTO
} from '@/modules/Tesoreria/CuentasPorPagar/types/accountPayableTypes'
import useAccountPayableStore from '@/modules/Tesoreria/CuentasPorPagar/store/accountPayableStore'
import { mapAccountPayable, mapAccountPayableRequest, mapPaymentRequest, mapPayment } from '@/modules/Tesoreria/CuentasPorPagar/composables/mappingAccountPayables'

export const useAccountPayableActions = () => {
    const accountPayableStore = useAccountPayableStore()

    // Mock data from backend (en español)
    const mockAccountsPayableBackend: AccountPayable[] = [
        {
            id: 1,
            proveedorId: 1,
            proveedorNombre: 'Distribuidora Nacional S.A. de C.V.',
            numeroDocumento: 'FAC-2024-001',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-01-15',
            fechaVencimiento: '2024-02-14',
            monto: 45000.00,
            saldoPendiente: 45000.00,
            estado: 'PENDIENTE',
            notas: 'Compra de materia prima'
        },
        {
            id: 2,
            proveedorId: 2,
            proveedorNombre: 'Importaciones del Pacífico S.A.',
            numeroDocumento: 'FAC-2024-002',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-01-20',
            fechaVencimiento: '2024-03-06',
            monto: 78500.00,
            saldoPendiente: 40000.00,
            estado: 'PARCIAL',
            notas: 'Productos importados - Pago parcial realizado'
        },
        {
            id: 3,
            proveedorId: 3,
            proveedorNombre: 'Suministros Industriales del Norte',
            numeroDocumento: 'FAC-2024-003',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-02-01',
            fechaVencimiento: '2024-02-16',
            monto: 25000.00,
            saldoPendiente: 0,
            estado: 'PAGADO',
            notas: 'Suministros varios - Pagado en su totalidad'
        },
        {
            id: 4,
            proveedorId: 1,
            proveedorNombre: 'Distribuidora Nacional S.A. de C.V.',
            numeroDocumento: 'FAC-2024-004',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2023-12-10',
            fechaVencimiento: '2024-01-09',
            monto: 32000.00,
            saldoPendiente: 32000.00,
            estado: 'VENCIDO',
            notas: 'Factura vencida - Requiere atención urgente'
        },
        {
            id: 5,
            proveedorId: 5,
            proveedorNombre: 'Tecnología y Equipos del Sureste',
            numeroDocumento: 'FAC-2024-005',
            tipoDocumento: 'FACTURA',
            fechaEmision: '2024-02-10',
            fechaVencimiento: '2024-04-11',
            monto: 125000.00,
            saldoPendiente: 125000.00,
            estado: 'PENDIENTE',
            notas: 'Equipo especializado - 60 días de crédito'
        }
    ]

    // Mock payments data (en español) - relacionados con las cuentas por pagar
    const mockPaymentsBackend: Payment[] = [
        // Pagos para cuenta ID 2 (PARCIAL - monto 78500, pendiente 40000)
        {
            id: 1,
            cuentaPorPagarId: 2,
            fechaPago: '2024-02-05',
            monto: 20000.00,
            metodoPago: 'TRANSFERENCIA',
            referencia: 'TRANS-20240205-001',
            notas: 'Primer pago parcial'
        },
        {
            id: 2,
            cuentaPorPagarId: 2,
            fechaPago: '2024-02-20',
            monto: 18500.00,
            metodoPago: 'TRANSFERENCIA',
            referencia: 'TRANS-20240220-002',
            notas: 'Segundo pago parcial'
        },
        // Pagos para cuenta ID 3 (PAGADO - monto 25000, pendiente 0)
        {
            id: 3,
            cuentaPorPagarId: 3,
            fechaPago: '2024-02-10',
            monto: 15000.00,
            metodoPago: 'CHEQUE',
            referencia: 'CHQ-5678',
            notas: 'Pago parcial con cheque'
        },
        {
            id: 4,
            cuentaPorPagarId: 3,
            fechaPago: '2024-02-15',
            monto: 10000.00,
            metodoPago: 'EFECTIVO',
            referencia: '',
            notas: 'Pago final en efectivo'
        }
    ]

    // Map to DTO (English)
    const mockAccountsPayable: AccountPayableDTO[] = mockAccountsPayableBackend.map(mapAccountPayable)
    const mockPayments: PaymentDTO[] = mockPaymentsBackend.map(mapPayment)

    const getAccountsPayable = async (
        page: number,
        pageSize: number
    ): Promise<{ items: AccountPayableDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockAccountsPayable.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockAccountsPayable.length
        }
    }

    const createAccountPayable = async (
        data: AccountPayableRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapAccountPayableRequest(data)
        console.log('📤 CREATE Account Payable - Payload:', payload)

        return {
            message: 'Cuenta por pagar creada exitosamente',
            status: 'success',
            data: null
        }
    }

    const updateAccountPayable = async (
        data: AccountPayableRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        const payload = mapAccountPayableRequest(data)
        console.log('📤 UPDATE Account Payable - Payload:', payload)

        return {
            message: 'Cuenta por pagar actualizada exitosamente',
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

    const getAccountPayableById = async (id: number): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Buscar la cuenta por pagar
        const accountPayable = mockAccountsPayable.find((account) => account.id === id)
        
        if (accountPayable) {
            // Setear la cuenta en el store
            accountPayableStore.setData(accountPayable)
            
            // Buscar los pagos relacionados
            const relatedPayments = mockPayments.filter(
                (payment) => payment.accountPayableId === id
            )
            
            // Limpiar pagos anteriores y cargar los nuevos
            accountPayableStore.clearPayments()
            relatedPayments.forEach((payment) => {
                accountPayableStore.addPayment(payment)
            })
            
            console.log('📥 Cuenta por pagar cargada:', accountPayable)
            console.log('📥 Pagos relacionados:', relatedPayments)
        }
    }

    return {
        getAccountsPayable,
        getAccountPayableById,
        createAccountPayable,
        updateAccountPayable,
        registerPayment
    }
}
