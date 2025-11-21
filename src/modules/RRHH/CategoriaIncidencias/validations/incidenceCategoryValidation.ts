import { z } from 'zod'
import {
    stringValidator,
    optionalStringValidator,
    booleanValidator
} from '@/shared/validations/globalValidation'

export const incidenceCategorySchema = z.object({
    name: stringValidator('El nombre es requerido', 'Mínimo 3 caracteres', 3),
    status: booleanValidator(),
    description: optionalStringValidator('Mínimo 10 caracteres', 10)
})

export const deleteIncidenceCategorySchema = z.object({})
