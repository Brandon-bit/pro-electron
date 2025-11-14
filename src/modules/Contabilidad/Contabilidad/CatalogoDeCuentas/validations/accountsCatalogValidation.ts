import { z } from 'zod'
import { 
    stringValidator,
    optionalStringValidator,
    selectValidator,
    booleanValidator,
    regexValidator
} from '@/shared/validations/globalValidation'

// Validador específico para códigos de cuenta (números y guiones)
const codeValidator = (requiredMessage: string, formatMessage: string) => {
    return regexValidator(requiredMessage, formatMessage, /^[0-9-]+$/)
}

// Validador específico para códigos SAT (formato XXX o XXX.XXX)
const satCodeValidator = (requiredMessage: string, formatMessage: string) => {
    return z.string({ required_error: requiredMessage })
        .min(1, requiredMessage)
        .transform((val) => val?.trim() || '')
        .refine((val) => /^[0-9]{3}(\.[0-9]{1,3})?$/.test(val), { message: formatMessage })
        .refine((val) => val.length >= 3, { message: 'El código SAT debe tener formato XXX o XXX.XXX (mínimo 3 caracteres)' })
}

// Validador para código SAT opcional
const optionalSatCodeValidator = (formatMessage: string) => {
    return z
        .string()
        .transform((val) => val?.trim() || '')
        .refine((val) => val.length === 0 || /^[0-9]{3}(\.[0-9]{1,3})?$/.test(val), {
            message: formatMessage
        })
        .refine((val) => val.length === 0 || val.length >= 3, {
            message: 'El código SAT debe tener formato XXX o XXX.XXX (mínimo 3 caracteres)'
        })
        .optional()
}

// Schema principal para cuentas (SATCode opcional)
export const accountSchema = z.object({
    code: codeValidator(
        'El código es requerido', 
        'El código debe contener solo números y guiones (ej: 1000-ota-ota)'
    ),
    name: stringValidator(
        'El nombre es requerido', 
        'El nombre debe tener al menos 3 caracteres', 
        3
    ),
    parentId: selectValidator('La cuenta padre es requerida', true).optional().default(0),
    typeId: selectValidator('El tipo es requerido'),
    natureId: selectValidator('La naturaleza es requerida'),
    levelId: selectValidator('El nivel es requerido'),
    currencyId: selectValidator('La moneda es requerida'),
    clasificationId: selectValidator('La clasificación es requerida'),
    SATCode: optionalSatCodeValidator(
        'El código SAT debe tener formato XXX o XXX.XXX (ej: 101 o 101.01)'
    ),
    acceptsMovements: booleanValidator('Este campo es obligatorio'),
    requiresAuxiliary: booleanValidator('Este campo es obligatorio'),
    active: booleanValidator('Este campo es obligatorio')
})

// Schema para cuentas que requieren SATCode obligatorio
export const accountSchemaWithRequiredSAT = z.object({
    code: codeValidator(
        'El código es requerido', 
        'El código debe contener solo números y guiones (ej: 1000-ota-ota)'
    ),
    name: stringValidator(
        'El nombre es requerido', 
        'El nombre debe tener al menos 3 caracteres', 
        3
    ),
    parentId: selectValidator('La cuenta padre es requerida', true).optional().default(0),
    typeId: selectValidator('El tipo es requerido'),
    natureId: selectValidator('La naturaleza es requerida'),
    levelId: selectValidator('El nivel es requerido'),
    currencyId: selectValidator('La moneda es requerida'),
    clasificationId: selectValidator('La clasificación es requerida'),
    SATCode: optionalSatCodeValidator(
        'El código SAT debe tener formato XXX o XXX.XXX (ej: 101 o 101.01)'
    ),
    acceptsMovements: booleanValidator('Este campo es obligatorio'),
    requiresAuxiliary: booleanValidator('Este campo es obligatorio'),
    active: booleanValidator('Este campo es obligatorio')
})

// Schema completo para validación con campos adicionales
export const accountValidationSchema = z.object({
    code: codeValidator(
        'El código es requerido', 
        'El código debe contener solo números y guiones (ej: 1000-ota-ota)'
    ),
    name: stringValidator(
        'El nombre es requerido', 
        'El nombre debe tener al menos 3 caracteres', 
        3
    ),
    parentId: selectValidator('La cuenta padre es requerida', true).optional().default(0),
    typeId: selectValidator('El tipo es requerido'),
    natureId: selectValidator('La naturaleza es requerida'),
    levelId: selectValidator('El nivel es requerido'),
    currencyId: selectValidator('La moneda es requerida'),
    clasificationId: selectValidator('La clasificación es requerida'),
    SATCode: optionalSatCodeValidator(
        'El código SAT debe tener formato XXX o XXX.XXX (ej: 101 o 101.01)'
    ),
    acceptsMovements: booleanValidator('Este campo es obligatorio'),
    requiresAuxiliary: booleanValidator('Este campo es obligatorio'),
    active: booleanValidator('Este campo es obligatorio')
})
