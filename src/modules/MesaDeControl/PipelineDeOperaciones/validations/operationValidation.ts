import { z } from 'zod'

export const operationSchema = z.object({
    clientName: z.string()
        .min(3, 'El nombre del cliente debe tener al menos 3 caracteres')
        .max(100, 'El nombre del cliente no puede exceder 100 caracteres'),
    type: z.enum(['Inversión', 'Crédito'], {
        errorMap: () => ({ message: 'Selecciona un tipo de operación válido' })
    }),
    amount: z.number()
        .positive('El monto debe ser mayor a 0')
        .min(1000, 'El monto mínimo es $1,000')
        .max(10000000, 'El monto máximo es $10,000,000'),
    priority: z.enum(['Alta', 'Media', 'Baja'], {
        errorMap: () => ({ message: 'Selecciona una prioridad válida' })
    }),
    stage: z.string().optional()
})


export const commentSchema = z.object({
    text: z.string()
        .min(5, 'El comentario debe tener al menos 5 caracteres')
        .max(500, 'El comentario no puede exceder 500 caracteres')
})

export type OperationSchemaType = z.infer<typeof operationSchema>
export type CommentSchemaType = z.infer<typeof commentSchema>
