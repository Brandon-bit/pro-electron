import { z } from 'zod'
import {
    selectValidator,
    optionalStringValidator,
    dateValidator,
    numberValidator
} from '@/shared/validations/globalValidation'

export const createUpdateBankReconciliationSchema = z.object({
    id: z.number().optional(),
    bankAccountId: selectValidator('La cuenta bancaria es requerida'),
    startDate: dateValidator('La fecha de inicio es requerida', true),
    endDate: dateValidator('La fecha de fin es requerida', true),
    initialBankBalance: numberValidator('El saldo inicial del banco es requerido', true),
    finalBankBalance: numberValidator('El saldo final del banco es requerido', true),
    notes: optionalStringValidator('Las notas deben tener al menos 2 caracteres', 2),
    active: z.boolean().default(true)
}).refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
        message: 'La fecha de fin debe ser mayor o igual a la fecha de inicio',
        path: ['endDate']
    }
)
