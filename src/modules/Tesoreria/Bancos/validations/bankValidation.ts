import { z } from 'zod'

export const createUpdateBankSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'El nombre es requerido'),
    code: z.string().optional(),
    active: z.boolean().default(true)
})
