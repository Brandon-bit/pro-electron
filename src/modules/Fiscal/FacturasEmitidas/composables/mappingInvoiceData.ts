import type { InvoiceType, InvoiceResponseType, InvoiceFormType } from '@/modules/Fiscal/FacturasEmitidas/types/invoiceTypes'

export const mapInvoice = (response: InvoiceResponseType): InvoiceType => {
    return {
        id: response.id,
        folio: response.folio,
        serie: response.serie,
        uuid: response.uuid,
        clientName: response.nombreCliente,
        clientRfc: response.rfcCliente,
        issueDate: new Date(response.fechaEmision),
        paymentDate: response.fechaPago ? new Date(response.fechaPago) : undefined,
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
        cancelationDate: response.fechaCancelacion ? new Date(response.fechaCancelacion) : undefined,
        cancelationReason: response.motivoCancelacion
    }
}

export const mapInvoiceRequest = (data: InvoiceFormType) => {
    const items = data.items.map(item => {
        const subtotal = item.quantity * item.unitPrice - (item.discount || 0)
        const tax = subtotal * 0.16 // IVA 16%
        
        return {
            cantidad: item.quantity,
            unidad: item.unit,
            claveProdServ: item.productCode,
            descripcion: item.description,
            precioUnitario: item.unitPrice,
            descuento: item.discount || 0,
            subtotal: subtotal,
            impuestos: tax,
            total: subtotal + tax
        }
    })

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = items.reduce((sum, item) => sum + item.impuestos, 0)

    return {
        serie: data.serie,
        nombreCliente: data.clientName,
        rfcCliente: data.clientRfc,
        fechaEmision: data.issueDate,
        fechaPago: data.paymentDate,
        moneda: data.currency,
        metodoPago: data.paymentMethod,
        formaPago: data.paymentForm,
        usoCfdi: data.cfdiUse,
        subtotal: subtotal,
        impuestos: tax,
        total: subtotal + tax,
        conceptos: items
    }
}
