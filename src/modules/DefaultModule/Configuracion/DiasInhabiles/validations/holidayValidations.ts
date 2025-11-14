import { z } from 'zod'
import { selectValidator, dateValidator, stringValidator, booleanValidator } from '@/shared/validations/globalValidation';

export const holidaySchema = z.object({
    date: dateValidator('El campo fecha es requerido', true),
    description: stringValidator('El campo descripción es requerido', 'El campo descripción debe tener al menos 3 caracteres', 3),
    active: booleanValidator('El campo es obligatorio')
})

export const yearSchema = z.object({
    year: selectValidator('Asegúrate de elegir un año'),
})