import { z } from 'zod'
import { selectValidator, optionalStringValidator, stringValidator } from '@/shared/validations/globalValidation'

// Regex para validar CLABE interbancaria mexicana (18 dígitos)
const clabeRegex = /^\d{18}$/

export const createUpdateBankAccountSchema = z.object({
    id: z.number().optional(),
    name: stringValidator('El nombre es requerido', 'El nombre es requerido', 1),
    bankId: selectValidator('El banco es requerido'),
    accountTypeId: selectValidator('El tipo de cuenta es requerido'),
    accountNumber: z
        .string()
        .min(1, 'El número de cuenta es requerido')
        .regex(clabeRegex, 'El número de cuenta debe ser una CLABE de 18 dígitos'),
    initialBalance: z.preprocess((val) => Number(val), z.number()),
    currentBalance: z.preprocess((val) => Number(val), z.number()),
    currency: z.string().default('MXN'),
    active: z.boolean().default(true),
    notes: optionalStringValidator('Asegúrate de ingresar mínimo 2 caracteres', 2)
})
