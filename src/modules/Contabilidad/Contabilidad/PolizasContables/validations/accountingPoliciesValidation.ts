/**
 * Validaciones para Pólizas Contables
 * Siguiendo patrón de RRHH con Zod
 * Incluye validación de negocio: póliza cuadrada (Debe = Haber)
 */
import { selectValidator, numberValidator, stringValidator, optionalStringValidator, dateValidator } from '@/shared/validations/globalValidation'
import { z } from 'zod'

/**
 * Schema para una partida contable individual
 */
const accountingEntrySchema = z.object({
    id: stringValidator('El ID de la partida es requerido', 'El ID debe tener al menos 1 carácter', 1),
    account: stringValidator('La cuenta es requerida', 'La cuenta debe tener al menos 1 carácter', 1),
    description: stringValidator('La descripción es requerida', 'La descripción debe tener al menos 1 carácter', 1),
    debit: numberValidator('El debe es requerido', true, 'El debe debe ser mayor o igual a 0'),
    credit: numberValidator('El haber es requerido', true, 'El haber debe ser mayor o igual a 0'),
    reference: optionalStringValidator('La referencia debe tener al menos 3 caracteres si se proporciona', 3)
}).refine(
    (data) => data.debit > 0 || data.credit > 0,
    {
        message: 'Cada partida debe tener un valor mayor a 0 en debe o haber',
        path: ['debit']
    }
).refine(
    (data) => !(data.debit > 0 && data.credit > 0),
    {
        message: 'Una partida no puede tener valores en ambos campos (debe y haber)',
        path: ['credit']
    }
)

/**
 * Schema principal para crear/actualizar una póliza contable
 * Valida tanto estructura como reglas de negocio
 */
export const accountingPolicySchema = z.object({
    folio: stringValidator('El folio es requerido', 'El folio debe tener al menos 1 carácter', 1),
    date: dateValidator('La fecha es requerida y debe tener formato YYYY-MM-DD', true),
    typeId: selectValidator('El tipo es requerido'),
    concept: stringValidator('El concepto es requerido', 'El concepto debe tener al menos 10 caracteres', 10),
    entries: z
        .array(accountingEntrySchema)
        .min(2, 'Debe agregar al menos 2 partidas')
        .refine(
            (entries) => {
                const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0)
                const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0)
                return Math.abs(totalDebit - totalCredit) < 0.01
            },
            {
                message: 'La póliza debe estar cuadrada (Debe = Haber)'
            }
        )
        .refine(
            (entries) => {
                const hasDebitEntries = entries.some(e => e.debit > 0)
                const hasCreditEntries = entries.some(e => e.credit > 0)
                return hasDebitEntries && hasCreditEntries
            },
            {
                message: 'La póliza debe tener al menos una partida de debe y una de haber'
            }
        )
})

/**
 * Schema para filtros de búsqueda
 */
export const accountingPolicyFilterSchema = z.object({
    folio: optionalStringValidator('El folio debe tener al menos 1 carácter si se proporciona', 1),
    dateFrom: dateValidator('La fecha inicial debe tener formato YYYY-MM-DD'),
    dateTo: dateValidator('La fecha final debe tener formato YYYY-MM-DD'),
    typeId: selectValidator('El tipo es requerido', true),
    status: z.string().optional(),
    concept: optionalStringValidator('El concepto debe tener al menos 3 caracteres si se proporciona', 3)
}).refine(
    (data) => {
        if (data.dateFrom && data.dateTo) {
            return data.dateFrom <= data.dateTo
        }
        return true
    },
    {
        message: 'La fecha inicial no puede ser mayor a la fecha final',
        path: ['dateFrom']
    }
)

/**
 * Schema para actualización parcial (patch)
 */
export const accountingPolicyPatchSchema = z.object({
    folio: stringValidator('El folio es requerido', 'El folio debe tener al menos 1 carácter', 1).optional(),
    date: dateValidator('La fecha debe tener formato YYYY-MM-DD').optional(),
    typeId: selectValidator('El tipo es requerido', true).optional(),
    concept: stringValidator('El concepto es requerido', 'El concepto debe tener al menos 10 caracteres', 10).optional(),
    entries: z.array(accountingEntrySchema).optional()
}).refine(
    (data) => {
        // Al menos un campo debe ser proporcionado para la actualización
        return Object.keys(data).some(key => data[key as keyof typeof data] !== undefined)
    },
    {
        message: 'Debe proporcionar al menos un campo para actualizar'
    }
)

/**
 * Tipos exportados para uso en componentes
 */
export type AccountingPolicyValidation = z.infer<typeof accountingPolicySchema>
export type AccountingPolicyFilterValidation = z.infer<typeof accountingPolicyFilterSchema>
export type AccountingPolicyPatchValidation = z.infer<typeof accountingPolicyPatchSchema>
