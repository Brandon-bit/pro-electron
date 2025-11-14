import axiosApiInstance from '@/api/axiosApiInstance'

const BASE_URL = '/fiscal/anuales'

// Inflation Adjustment
export const getInflationAdjustmentService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/ajuste-inflacion/${year}`)
}

export const saveInflationAdjustmentService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/ajuste-inflacion`, data)
}

// Credit Balances
export const getCreditBalancesService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/creditos/${year}`)
}

export const saveCreditBalanceService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/creditos`, data)
}

// Debt Balances
export const getDebtBalancesService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/deudas/${year}`)
}

export const saveDebtBalanceService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/deudas`, data)
}

// Profit Coefficient
export const getProfitCoefficientService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/coeficiente/${year}`)
}

export const saveProfitCoefficientService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/coeficiente`, data)
}

// Accounting Reconciliation
export const getAccountingReconciliationService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/conciliacion/${year}`)
}

export const saveAccountingReconciliationService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/conciliacion`, data)
}

// Annual ISR
export const getAnnualISRService = async (year: number) => {
    return await axiosApiInstance.get(`${BASE_URL}/isr/${year}`)
}

export const saveAnnualISRService = async (data: any) => {
    return await axiosApiInstance.post(`${BASE_URL}/isr`, data)
}

export const submitAnnualISRService = async (id: number) => {
    return await axiosApiInstance.post(`${BASE_URL}/isr/${id}/presentar`)
}
