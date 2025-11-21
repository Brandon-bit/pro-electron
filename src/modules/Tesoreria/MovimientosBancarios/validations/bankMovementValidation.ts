import { z } from 'zod'
import { 
    selectValidator, 
    optionalStringValidator, 
    stringValidator, 
    dateValidator, 
    numberValidator 
} from '@/shared/validations/globalValidation'

export const createUpdateBankMovementSchema = z.object({
    id: z.number().optional(),
    date: dateValidator('La fecha es requerida', true),
    bankAccountId: selectValidator('La cuenta bancaria es requerida'),
    movementTypeId: selectValidator('El tipo de movimiento es requerido'),
    amount: numberValidator('El monto es requerido', false, 'El monto debe ser mayor a 0'),
    concept: stringValidator(
        'El concepto es requerido',
        'El concepto debe tener al menos 3 caracteres',
        3
    ),
    reference: optionalStringValidator('La referencia debe tener al menos 2 caracteres', 2),
    active: z.boolean().default(true)
})
