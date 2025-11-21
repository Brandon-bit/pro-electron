import axiosApiInstance from '@/api/axiosApiInstance'
// import axiosApiInstance from '@/api/axiosApiInstance'
// import axiosApiInstanceTwo from '@/api/axiosApiInstanceTwo'
import {
    InventoryAuditSummary,
    InventoryAudit,
    InventoryAuditor,
    InventoryAuditRequestPayload
    // InventoryAuditorsType,
    // InventoryAuditRecordPayload
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

export const getInventoryAuditSummaryService = async (): Promise<InventoryAuditSummary[]> => {
    const response = await axiosApiInstance.get('/auditGeneralData')
    return response.data
}

export const getInventoryAuditRecordsService = async (
    page: number,
    pageSize: number
): Promise<InventoryAudit[]> => {
    console.log(page, pageSize)
    const response = await axiosApiInstance.get('/inventoryAudit')
    return response.data
}

export const getInventoryAuditByIdService = async (): Promise<InventoryAudit> => {
    const response = await axiosApiInstance.get('/inventoryAuditId')
    return response.data
}

export const getAuditorsService = async (): Promise<InventoryAuditor[]> => {
    const response = await axiosApiInstance.get('/inventoryAuditors')
    return response.data
}

export const getProductsBySearchService = async (
    query: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosApiInstance.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}

export const createInventoryAuditService = async (
    data: InventoryAuditRequestPayload
): Promise<any> => {
    console.log(data)
    // const response = await axiosApiInstance.post('/inventoryAudit', data)
    // return response.data
}

export const updateInventoryAuditService = async (
    data: InventoryAuditRequestPayload,
    id: number
): Promise<any> => {
    console.log(data, id)
    // const response = await axiosApiInstance.put(`/inventoryAudit/${data.id}`, data)
    // return response.data
}
