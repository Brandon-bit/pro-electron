import { z } from 'zod'
import { stringValidator, optionalStringValidator, dateValidator } from '@/shared/validations/globalValidation'

export const campaignSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 3 caracteres', 3),
    description: optionalStringValidator('Mínimo 10 caracteres', 10),
    evaluationType: z.enum(['360', 'performance', 'competencies'], {
        required_error: 'El tipo de evaluación es requerido'
    }),
    startDate: dateValidator('La fecha de inicio es requerida en formato YYYY-MM-DD', true),
    endDate: dateValidator('La fecha de fin es requerida en formato YYYY-MM-DD', true),
    departments: z.array(z.number()).optional(),
    employees: z.array(z.number()).optional(),
    competencies: z.array(z.number()).min(1, 'Debe seleccionar al menos una competencia'),
    includeAllEmployees: z.boolean(),
    active: z.boolean()
})
