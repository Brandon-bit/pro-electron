import { z } from 'zod'

/**
 * Esquema de validación para segmento de máscara
 */
export const maskSegmentSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre es requerido'),
    digits: z.number().min(1).max(10),
    minDigits: z.number().min(1).max(10),
    maxDigits: z.number().min(1).max(10),
    charType: z.enum(['numeric', 'alphanumeric', 'alpha']),
    required: z.boolean(),
    description: z.string(),
    placeholder: z.string()
})

/**
 * Esquema de validación para configuración de máscara
 */
export const maskConfigSchema = z.object({
    format: z.string().min(1, 'El formato es requerido'),
    separator: z.string(),
    maxDepth: z.number().min(1).max(10),
    allowFlexibleLength: z.boolean(),
    segments: z.array(maskSegmentSchema).min(1, 'Debe haber al menos un segmento')
})

export type MaskConfigFormData = z.infer<typeof maskConfigSchema>
export type MaskSegmentFormData = z.infer<typeof maskSegmentSchema>
