import axiosApiInstance from '@/api/axiosApiInstance'

const BASE_URL = '/fiscal/informativas'

// DIOT
export const getDIOTService = async (year: number, month: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/diot/${year}/${month}`)
}

export const generateDIOTService = async (year: number, month: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/diot/generar`, { year, month })
}

export const submitDIOTService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/diot/${id}/presentar`)
}

// Electronic Accounting
export const getElectronicAccountingService = async (year: number, month: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/contabilidad-electronica/${year}/${month}`)
}

export const generateElectronicAccountingService = async (year: number, month: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/contabilidad-electronica/generar`, { year, month })
}

export const sendElectronicAccountingService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/contabilidad-electronica/${id}/enviar`)
}

// Interest Declaration
export const getInterestDeclarationService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/interes/${year}`)
}

export const saveInterestDeclarationService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/interes`, data)
}

export const submitInterestDeclarationService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/interes/${id}/presentar`)
}

// Cash Deposits
export const getCashDepositsService = async (year: number, month: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/depositos-efectivo/${year}/${month}`)
}

export const saveCashDepositService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/depositos-efectivo`, data)
}

export const submitCashDepositsService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/depositos-efectivo/${id}/presentar`)
}

// Tax Loss
export const getTaxLossService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/quebranto/${year}`)
}

export const saveTaxLossService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/quebranto`, data)
}

export const submitTaxLossService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/quebranto/${id}/presentar`)
}
