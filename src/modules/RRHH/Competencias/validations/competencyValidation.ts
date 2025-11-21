import { z } from 'zod'
import { stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdateCompetencySchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 3 caracteres', 3),
    description: optionalStringValidator('Mínimo 10 caracteres', 10),
    category: z.enum(['technical', 'behavioral', 'leadership'], {
        required_error: 'La categoría es requerida'
    }),
    active: z.boolean()
})
