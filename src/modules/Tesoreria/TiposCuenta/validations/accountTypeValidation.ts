import { z } from 'zod'

export const createUpdateAccountTypeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().optional(),
    active: z.boolean().default(true)
})
