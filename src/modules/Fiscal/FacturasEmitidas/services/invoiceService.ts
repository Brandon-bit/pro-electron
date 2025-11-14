import axios from 'axios'
import type { InvoiceFilterType } from '@/modules/Fiscal/FacturasEmitidas/types/invoiceTypes'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const getInvoicesService = async (page: number, pageSize: number, filters?: InvoiceFilterType) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued`, {
        params: { page, pageSize, ...filters }
    })
    return response.data
}

export const getInvoiceKPIsService = async () => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued/kpis`)
    return response.data
}

export const getInvoiceByIdService = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued/${id}`)
    return response.data
}

export const createInvoiceService = async (data: any) => {
    const response = await axios.post(`${API_BASE_URL}/invoices/issued`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const updateInvoiceService = async (id: number, data: any) => {
    const response = await axios.put(`${API_BASE_URL}/invoices/issued/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const stampInvoiceService = async (id: number) => {
    const response = await axios.post(`${API_BASE_URL}/invoices/issued/${id}/stamp`)
    return response.data
}

export const cancelInvoiceService = async (id: number, reason: string) => {
    const response = await axios.post(`${API_BASE_URL}/invoices/issued/${id}/cancel`, { reason })
    return response.data
}

export const downloadPdfService = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued/${id}/pdf`, {
        responseType: 'blob'
    })
    return response.data
}

export const downloadXmlService = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued/${id}/xml`, {
        responseType: 'blob'
    })
    return response.data
}

export const sendInvoiceByEmailService = async (id: number, email: string) => {
    const response = await axios.post(`${API_BASE_URL}/invoices/issued/${id}/send-email`, { email })
    return response.data
}

export const deleteInvoiceService = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/invoices/issued/${id}`)
    return response.data
}

export const exportInvoicesService = async (filters?: InvoiceFilterType) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/issued/export`, {
        params: filters,
        responseType: 'blob'
    })
    return response.data
}
