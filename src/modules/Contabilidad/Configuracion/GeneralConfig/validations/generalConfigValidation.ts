import { z } from 'zod'

/**
 * Esquema de validación para configuración general
 */
export const generalConfigSchema = z.object({
    companyType: z.enum(['tradicional', 'financiera'], {
        required_error: 'El tipo de empresa es requerido',
        invalid_type_error: 'El tipo de empresa debe ser tradicional o financiera'
    }),
    description: z.string().optional(),
    active: z.boolean().default(true)
})

export type GeneralConfigFormData = z.infer<typeof generalConfigSchema>
