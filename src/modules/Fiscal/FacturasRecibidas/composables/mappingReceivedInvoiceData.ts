import type { ReceivedInvoiceType, ReceivedInvoiceResponseType } from '@/modules/Fiscal/FacturasRecibidas/types/receivedInvoiceTypes'

export const mapReceivedInvoice = (response: ReceivedInvoiceResponseType): ReceivedInvoiceType => {
    return {
        id: response.id,
        folio: response.folio,
        uuid: response.uuid,
        supplierName: response.nombreProveedor,
        supplierRfc: response.rfcProveedor,
        issueDate: new Date(response.fechaEmision),
        receptionDate: response.fechaRecepcion ? new Date(response.fechaRecepcion) : undefined,
        subtotal: response.subtotal,
        tax: response.impuestos,
        total: response.total,
        currency: response.moneda,
        paymentMethod: response.metodoPago,
        paymentForm: response.formaPago,
        status: response.estatus as any,
        cfdiUse: response.usoCfdi,
        items: response.conceptos || [],
        pdfUrl: response.urlPdf,
        xmlUrl: response.urlXml,
        validationDate: response.fechaValidacion ? new Date(response.fechaValidacion) : undefined,
        rejectionReason: response.motivoRechazo
    }
}
