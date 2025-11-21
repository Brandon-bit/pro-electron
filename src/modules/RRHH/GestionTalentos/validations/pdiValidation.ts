import { z } from 'zod'
import { selectValidator, stringValidator, dateValidator } from '@/shared/validations/globalValidation'

export const pdiSchema = z.object({
    employeeId: selectValidator('Selecciona un empleado'),
    competency: stringValidator('La competencia es requerida', 'La competencia debe tener al menos 3 caracteres', 3),
    action: stringValidator('La acción es requerida', 'La acción debe tener al menos 10 caracteres', 10),
    startDate: dateValidator('La fecha de inicio es requerida', true),
    endDate: dateValidator('La fecha de fin es requerida', true)
})
