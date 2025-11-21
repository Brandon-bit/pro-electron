import { z } from 'zod'
import { selectValidator, stringValidator, numberValidator } from '@/shared/validations/globalValidation'

// Validación para reconocimiento
export const recognitionSchema = z.object({
    toEmployeeId: selectValidator('Selecciona un empleado'),
    category: z.enum(['teamwork', 'innovation', 'leadership', 'excellence', 'values'], {
        errorMap: () => ({ message: 'Selecciona una categoría válida' })
    }),
    message: stringValidator('El mensaje es requerido', 'El mensaje debe tener al menos 10 caracteres', 10),
    points: numberValidator('Los puntos son requeridos', false, 'Los puntos deben ser al menos 10')
})

// Validación para crear/editar beneficio
export const benefitSchema = z.object({
    name: stringValidator('El nombre es requerido', 'El nombre debe tener al menos 3 caracteres', 3),
    description: stringValidator('La descripción es requerida', 'La descripción debe tener al menos 10 caracteres', 10),
    type: z.enum(['vacation', 'training', 'health', 'wellness', 'financial', 'other'], {
        errorMap: () => ({ message: 'Selecciona un tipo válido' })
    }),
    points: numberValidator('Los puntos son requeridos', false, 'Los puntos deben ser al menos 1'),
    availableQuantity: z.number().min(0, 'La cantidad debe ser positiva').optional(),
    eligibilityRules: z.array(z.string()).optional()
})

// Validación para configurar beneficio
export const benefitConfigSchema = z.object({
    name: stringValidator('El nombre es requerido', 'El nombre debe tener al menos 3 caracteres', 3),
    description: stringValidator('La descripción es requerida', 'La descripción debe tener al menos 10 caracteres', 10),
    availableQuantity: numberValidator('El stock es requerido', false, 'El stock debe ser al menos 0'),
    minScore: numberValidator('El score mínimo es requerido', false, 'El score debe estar entre 0 y 5')
        .refine(val => val >= 0 && val <= 5, 'El score debe estar entre 0 y 5')
})

// Validación para matriz de beneficios
export const benefitMatrixSchema = z.object({
    threshold: stringValidator('El umbral es requerido', 'El umbral debe tener al menos 3 caracteres', 3),
    minScore: numberValidator('El score mínimo es requerido', false, 'El score debe ser al menos 0'),
    benefits: z.array(z.string()).min(1, 'Debe seleccionar al menos un beneficio'),
    autoPoints: numberValidator('Los puntos automáticos son requeridos', true, 'Los puntos deben ser al menos 0')
})
