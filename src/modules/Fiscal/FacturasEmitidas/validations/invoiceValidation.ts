import { z } from 'zod'

export const invoiceItemSchema = z.object({
    quantity: z.number()
        .positive('La cantidad debe ser mayor a 0')
        .min(0.01, 'La cantidad mínima es 0.01'),
    unit: z.string()
        .min(1, 'La unidad es requerida')
        .max(20, 'La unidad no puede exceder 20 caracteres'),
    productCode: z.string()
        .min(1, 'La clave del producto/servicio es requerida')
        .max(10, 'La clave no puede exceder 10 caracteres'),
    description: z.string()
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .max(1000, 'La descripción no puede exceder 1000 caracteres'),
    unitPrice: z.number()
        .positive('El precio unitario debe ser mayor a 0')
        .min(0.01, 'El precio mínimo es 0.01'),
    discount: z.number()
        .min(0, 'El descuento no puede ser negativo')
        .optional()
})

export const invoiceSchema = z.object({
    serie: z.string()
        .min(1, 'La serie es requerida')
        .max(10, 'La serie no puede exceder 10 caracteres'),
    clientName: z.string()
        .min(3, 'El nombre del cliente debe tener al menos 3 caracteres')
        .max(254, 'El nombre del cliente no puede exceder 254 caracteres'),
    clientRfc: z.string()
        .min(12, 'El RFC debe tener al menos 12 caracteres')
        .max(13, 'El RFC no puede exceder 13 caracteres')
        .regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, 'El RFC no tiene un formato válido'),
    issueDate: z.string()
        .min(1, 'La fecha de emisión es requerida'),
    paymentDate: z.string().optional(),
    currency: z.string()
        .min(1, 'La moneda es requerida'),
    paymentMethod: z.string()
        .min(1, 'El método de pago es requerido'),
    paymentForm: z.string()
        .min(1, 'La forma de pago es requerida'),
    cfdiUse: z.string()
        .min(1, 'El uso de CFDI es requerido'),
    items: z.array(invoiceItemSchema)
        .min(1, 'Debe agregar al menos un concepto')
        .max(100, 'No puede agregar más de 100 conceptos')
})

export const cancelInvoiceSchema = z.object({
    reason: z.string()
        .min(10, 'El motivo debe tener al menos 10 caracteres')
        .max(500, 'El motivo no puede exceder 500 caracteres')
})

export const emailSchema = z.object({
    email: z.string()
        .email('El correo electrónico no es válido')
        .min(5, 'El correo debe tener al menos 5 caracteres')
        .max(100, 'El correo no puede exceder 100 caracteres')
})

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>
export type InvoiceItemSchemaType = z.infer<typeof invoiceItemSchema>
export type CancelInvoiceSchemaType = z.infer<typeof cancelInvoiceSchema>
export type EmailSchemaType = z.infer<typeof emailSchema>
