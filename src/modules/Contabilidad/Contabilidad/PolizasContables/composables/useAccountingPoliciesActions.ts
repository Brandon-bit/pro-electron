import type { AccountingPolicyDTO, AccountingPolicyFormDTO } from '@/modules/Contabilidad/Contabilidad/PolizasContables/types/accountingPoliciesTypes'
import useAccountingPoliciesStore from '@/modules/Contabilidad/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { SelectOptionDTO } from '../../CatalogoDeCuentas/types/accountsCatalogTypes'

// Mock data
const mockAccountingPolicies: AccountingPolicyDTO[] = [
    {
        id: 1,
        folio: 'D-001',
        date: '2025-01-15',
        typeId: 1,
        type: 'Diario',
        concept: 'Compra de mobiliario y equipo',
        total: 50000,
        status: 'Cuadrada',
        entries: [
            {
                id: '1-1',
                account: '1202 - Mobiliario y Equipo',
                description: 'Compra de escritorios',
                debit: 50000,
                credit: 0,
                reference: 'FAC-001'
            },
            {
                id: '1-2',
                account: '1102 - Bancos',
                description: 'Pago con transferencia',
                debit: 0,
                credit: 50000,
                reference: 'TRANSF-001'
            }
        ]
    },
    {
        id: 2,
        folio: 'I-001',
        date: '2025-01-14',
        typeId: 2,
        type: 'Ingreso',
        concept: 'Venta de servicios profesionales',
        total: 100000,
        status: 'Cuadrada',
        entries: [
            {
                id: '2-1',
                account: '1102 - Bancos',
                description: 'Cobro de servicios',
                debit: 100000,
                credit: 0,
                reference: 'DEP-001'
            },
            {
                id: '2-2',
                account: '4000 - Ingresos',
                description: 'Ingresos por servicios',
                debit: 0,
                credit: 100000,
                reference: 'FAC-002'
            }
        ]
    },
    {
        id: 3,
        folio: 'E-001',
        date: '2025-01-13',
        typeId: 3,
        type: 'Egreso',
        concept: 'Pago de renta de oficinas',
        total: 25000,
        status: 'Cuadrada',
        entries: [
            {
                id: '3-1',
                account: '5000 - Gastos',
                description: 'Renta de oficinas',
                debit: 25000,
                credit: 0,
                reference: 'REC-001'
            },
            {
                id: '3-2',
                account: '1102 - Bancos',
                description: 'Pago de renta',
                debit: 0,
                credit: 25000,
                reference: 'TRANSF-002'
            }
        ]
    },
    {
        id: 4,
        folio: 'D-002',
        date: '2025-01-12',
        typeId: 1,
        type: 'Diario',
        concept: 'Ajuste contable por depreciación',
        total: 5000,
        status: 'Cuadrada',
        entries: [
            {
                id: '4-1',
                account: '5201 - Depreciación',
                description: 'Depreciación mensual',
                debit: 5000,
                credit: 0,
                reference: 'DEP-001'
            },
            {
                id: '4-2',
                account: '1202-001 - Depreciación Acumulada',
                description: 'Acumulación de depreciación',
                debit: 0,
                credit: 5000,
                reference: 'DEP-001'
            }
        ]
    }
]

const mockAccountingPoliciesTypes: SelectOptionDTO[] = [
    {
        id: 1,
        label: 'Diario'
    },
    {
        id: 2,
        label: 'Ingreso'
    },
    {
        id: 3,
        label: 'Egreso'
    }
]

export const useAccountingPoliciesActions = () => {
    const policiesStore = useAccountingPoliciesStore()

    const getAccountingPolicies = async (
        page: number,
        pageSize: number
    ): Promise<{ items: AccountingPolicyDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockAccountingPolicies.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockAccountingPolicies.length
        }
    }

    const getAccountingPolicyById = async (id: number): Promise<AccountingPolicyDTO | null> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockAccountingPolicies.find((policy) => policy.id === id) || null
    }

    const getAccountingPolicyTypes = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        return mockAccountingPoliciesTypes
    }

    const createAccountingPolicy = async (
        data: AccountingPolicyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Log para mostrar qué se enviaría a la API
        console.log('🚀 API CREATE - Datos que se enviarían al backend:')
        console.log('Method: POST')
        console.log('Endpoint: /api/accounting-policies')
        console.log('Payload:', JSON.stringify({
            folio: data.folio,
            fecha: data.date,
            tipoId: data.typeId,
            concepto: data.concept,
            partidas: data.entries.map(entry => ({
                id: entry.id,
                cuenta: entry.account,
                descripcion: entry.description,
                debe: entry.debit,
                haber: entry.credit,
                referencia: entry.reference || ''
            }))
        }, null, 2))

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newPolicy: AccountingPolicyDTO = {
            id: mockAccountingPolicies.length + 1,
            ...data,
            total: data.entries.reduce((sum, entry) => sum + entry.debit, 0),
            status: 'Cuadrada'
        }

        mockAccountingPolicies.push(newPolicy)

        return {
            message: 'Póliza contable creada exitosamente',
            status: 'success',
            data: newPolicy
        }
    }

    const updateAccountingPolicy = async (
        data: AccountingPolicyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Log para mostrar qué se enviaría a la API
        console.log('🔄 API UPDATE - Datos que se enviarían al backend:')
        console.log('Method: PUT')
        console.log(`Endpoint: /api/accounting-policies/${data.id}`)
        console.log('Payload:', JSON.stringify({
            id: data.id,
            folio: data.folio,
            fecha: data.date,
            tipoId: data.typeId,
            concepto: data.concept,
            partidas: data.entries.map(entry => ({
                id: entry.id,
                cuenta: entry.account,
                descripcion: entry.description,
                debe: entry.debit,
                haber: entry.credit,
                referencia: entry.reference || ''
            }))
        }, null, 2))

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockAccountingPolicies.findIndex((policy) => policy.id === data.id)

        if (index !== -1) {
            mockAccountingPolicies[index] = {
                ...mockAccountingPolicies[index],
                ...data,
                total: data.entries.reduce((sum, entry) => sum + entry.debit, 0)
            }

            return {
                message: 'Póliza contable actualizada exitosamente',
                status: 'success',
                data: mockAccountingPolicies[index]
            }
        }

        return {
            message: 'Póliza contable no encontrada',
            status: 'error',
            data: null
        }
    }

    const deleteAccountingPolicy = async (): Promise<{ message: string; status: string; data: any }> => {
        const id = policiesStore.selectedPolicy?.id

        if (!id) {
            return {
                message: 'ID de póliza no válido',
                status: 'error',
                data: null
            }
        }

        // Log para mostrar qué se enviaría a la API
        console.log('🗑️ API DELETE - Datos que se enviarían al backend:')
        console.log('Method: DELETE')
        console.log(`Endpoint: /api/accounting-policies/${id}`)
        console.log('Payload: No body required for DELETE request')
        console.log('Params:', { id })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockAccountingPolicies.findIndex((policy) => policy.id === id)

        if (index !== -1) {
            const deleted = mockAccountingPolicies.splice(index, 1)
            return {
                message: 'Póliza contable eliminada exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Póliza contable no encontrada',
            status: 'error',
            data: null
        }
    }

    /**
     * Descarga el documento PDF de la póliza
     */
    const downloadPolicyDocument = async (id: number): Promise<void> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Downloading policy document for ID:', id)
        
        // En producción, aquí se haría la llamada al backend para generar y descargar el PDF
        // Ejemplo:
        // const response = await axiosApiInstance.get(`/api/polizas/${id}/documento`, {
        //     responseType: 'blob'
        // })
        // const url = window.URL.createObjectURL(new Blob([response.data]))
        // const link = document.createElement('a')
        // link.href = url
        // link.setAttribute('download', `poliza-${id}.pdf`)
        // document.body.appendChild(link)
        // link.click()
        // link.remove()
        // window.URL.revokeObjectURL(url)
    }

    return {
        getAccountingPolicies,
        getAccountingPolicyById,
        getAccountingPolicyTypes,
        createAccountingPolicy,
        updateAccountingPolicy,
        deleteAccountingPolicy,
        downloadPolicyDocument
    }
}
