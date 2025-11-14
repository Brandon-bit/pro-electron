import { z } from 'zod'

export const generateDeclarationSchema = z.object({
    declarationType: z.enum(['isr', 'iva'], {
        required_error: 'Debe seleccionar el tipo de declaración'
    }),
    period: z.string()
        .min(1, 'El periodo es requerido'),
    year: z.string()
        .min(4, 'El año es requerido')
        .max(4, 'El año debe tener 4 dígitos'),
    income: z.number()
        .min(0, 'Los ingresos no pueden ser negativos')
        .optional(),
    deductions: z.number()
        .min(0, 'Las deducciones no pueden ser negativas')
        .optional(),
    collectedVAT: z.number()
        .min(0, 'El IVA cobrado no puede ser negativo')
        .optional(),
    creditableVAT: z.number()
        .min(0, 'El IVA acreditable no puede ser negativo')
        .optional(),
    previousBalance: z.number()
        .optional(),
    notes: z.string()
        .max(500, 'Las notas no pueden exceder 500 caracteres')
        .optional()
})

export type GenerateDeclarationSchemaType = z.infer<typeof generateDeclarationSchema>
