import { z } from 'zod'
import { stringValidator, numberValidator, dateValidator } from '@/shared/validations/globalValidation'

export const vacancySchema = z.object({
    title: stringValidator('El campo título es requerido', 'Mínimo 3 caracteres', 3),
    description: stringValidator('El campo descripción es requerido', 'Mínimo 10 caracteres', 10),
    requirements: stringValidator('El campo requisitos es requerido', 'Mínimo 10 caracteres', 10),
    offeredSalary: numberValidator('El salario ofrecido es requerido', false),
    status: z.string().min(1, 'El estado es requerido'),
    publicationDate: dateValidator('La fecha de publicación es requerida', true),
    closingDate: dateValidator('La fecha de cierre es requerida', true)
})
