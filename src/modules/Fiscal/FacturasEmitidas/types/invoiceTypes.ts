export type InvoiceType = {
    id?: number
    folio: string
    serie: string
    uuid: string
    clientName: string
    clientRfc: string
    issueDate: Date
    paymentDate?: Date
    subtotal: number
    tax: number
    total: number
    currency: string
    paymentMethod: string
    paymentForm: string
    status: InvoiceStatusType
    cfdiUse: string
    items: InvoiceItemType[]
    pdfUrl?: string
    xmlUrl?: string
    cancelationDate?: Date
    cancelationReason?: string
}

export type InvoiceItemType = {
    id?: number
    quantity: number
    unit: string
    productCode: string
    description: string
    unitPrice: number
    subtotal: number
    tax: number
    total: number
    discount?: number
}

export type InvoiceStatusType = 
    | "Borrador"
    | "Timbrada" 
    | "Cancelada" 
    | "Pagada"
    | "Vencida"

export type InvoiceKPIType = {
    title: string
    value: string
    subtitle: string
    icon: string
    color: string
}

export type InvoiceResponseType = {
    id: number
    folio: string
    serie: string
    uuid: string
    nombreCliente: string
    rfcCliente: string
    fechaEmision: Date
    fechaPago?: Date
    subtotal: number
    impuestos: number
    total: number
    moneda: string
    metodoPago: string
    formaPago: string
    estatus: string
    usoCfdi: string
    conceptos: any[]
    urlPdf?: string
    urlXml?: string
    fechaCancelacion?: Date
    motivoCancelacion?: string
}

export type InvoiceFormType = {
    serie: string
    clientName: string
    clientRfc: string
    issueDate: string
    paymentDate?: string
    currency: string
    paymentMethod: string
    paymentForm: string
    cfdiUse: string
    items: InvoiceItemFormType[]
}

export type InvoiceItemFormType = {
    quantity: number
    unit: string
    productCode: string
    description: string
    unitPrice: number
    discount?: number
}

export type InvoiceFilterType = {
    status?: InvoiceStatusType
    dateFrom?: string
    dateTo?: string
    search?: string
    minAmount?: number
    maxAmount?: number
}
