import { z } from 'zod'

export const accountClasificationSchema = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, 'El nombre es requerido')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no debe exceder 100 caracteres'),
    description: z
        .string()
        .max(500, 'La descripción no debe exceder 500 caracteres')
        .optional()
        .default(''),
    active: z
        .boolean()
        .default(true)
})

export type AccountClasificationValidation = z.infer<typeof accountClasificationSchema>
