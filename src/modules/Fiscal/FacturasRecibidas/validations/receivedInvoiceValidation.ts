import { z } from 'zod'

export const uploadXmlSchema = z.object({
    xmlFile: z.instanceof(File)
        .refine((file) => file.size > 0, 'Debe seleccionar un archivo')
        .refine((file) => file.size <= 5 * 1024 * 1024, 'El archivo no debe exceder 5MB')
        .refine((file) => file.name.endsWith('.xml'), 'El archivo debe ser un XML')
})

export const rejectInvoiceSchema = z.object({
    reason: z.string()
        .min(10, 'El motivo debe tener al menos 10 caracteres')
        .max(500, 'El motivo no puede exceder 500 caracteres')
})

export type UploadXmlSchemaType = z.infer<typeof uploadXmlSchema>
export type RejectInvoiceSchemaType = z.infer<typeof rejectInvoiceSchema>
