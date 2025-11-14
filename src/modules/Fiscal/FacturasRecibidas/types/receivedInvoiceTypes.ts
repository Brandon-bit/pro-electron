// Received Invoice Types
export type ReceivedInvoiceStatusType = "Validada" | "Pendiente" | "Rechazada" | "Cancelada"

export interface ReceivedInvoiceType {
    id?: number
    folio: string
    uuid: string
    supplierName: string
    supplierRfc: string
    issueDate: Date
    receptionDate?: Date
    subtotal: number
    tax: number
    total: number
    currency: string
    paymentMethod: string
    paymentForm: string
    status: ReceivedInvoiceStatusType
    cfdiUse: string
    items: ReceivedInvoiceItemType[]
    pdfUrl?: string
    xmlUrl?: string
    validationDate?: Date
    rejectionReason?: string
}

export interface ReceivedInvoiceItemType {
    quantity: number
    unit: string
    productCode: string
    description: string
    unitPrice: number
    discount?: number
    subtotal: number
    tax: number
    total: number
}

export interface ReceivedInvoiceKPIType {
    title: string
    value: string
    subtitle: string
    icon: string
    color: string
}

// API Response Types
export interface ReceivedInvoiceResponseType {
    id: number
    folio: string
    uuid: string
    nombreProveedor: string
    rfcProveedor: string
    fechaEmision: string
    fechaRecepcion?: string
    subtotal: number
    impuestos: number
    total: number
    moneda: string
    metodoPago: string
    formaPago: string
    estatus: string
    usoCfdi: string
    conceptos: ReceivedInvoiceItemResponseType[]
    urlPdf?: string
    urlXml?: string
    fechaValidacion?: string
    motivoRechazo?: string
}

export interface ReceivedInvoiceItemResponseType {
    cantidad: number
    unidad: string
    claveProdServ: string
    descripcion: string
    precioUnitario: number
    descuento?: number
    subtotal: number
    impuestos: number
    total: number
}

// Form Types
export interface ReceivedInvoiceFormType {
    supplierName: string
    supplierRfc: string
    issueDate: string
    receptionDate?: string
    currency: string
    paymentMethod: string
    paymentForm: string
    cfdiUse: string
    xmlFile?: File
}

export interface ReceivedInvoiceFilterType {
    search?: string
    dateFrom?: string
    dateTo?: string
    status?: ReceivedInvoiceStatusType
    supplier?: string
}

export interface ReceivedInvoiceValidationType {
    invoiceId: number
    isValid: boolean
    reason?: string
}
