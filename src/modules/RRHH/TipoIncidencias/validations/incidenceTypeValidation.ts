import { z } from 'zod'
import {
    stringValidator,
    optionalStringValidator,
    numberValidator
} from '@/shared/validations/globalValidation'

export const incidenceTypeSchema = z.object({
    name: stringValidator('El nombre es requerido', 'Mínimo 3 caracteres', 3),
    parentCategoryId: numberValidator(
        'La categoría padre es requerida',
        false,
        'Debe seleccionar una categoría'
    ),
    requiresDateRange: z.boolean(),
    requiresHours: z.boolean(),
    requiresJustification: z.boolean(),
    status: z.boolean(),
    description: optionalStringValidator('Mínimo 10 caracteres', 10)
})

export const deleteIncidenceTypeSchema = z.object({})
