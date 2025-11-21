import { z } from 'zod'

/**
 * Esquema de validación para Character Type
 * NO incluye campo codigo (regla especial)
 */
export const characterTypeSchema = z.object({
    name: z.string()
        .min(1, 'El nombre es obligatorio')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .trim(),
    description: z.string()
        .max(255, 'La descripción no puede exceder 255 caracteres')
        .trim()
        .optional()
        .or(z.literal('')),
    active: z.boolean().default(true)
})

export type CharacterTypeFormData = z.infer<typeof characterTypeSchema>
