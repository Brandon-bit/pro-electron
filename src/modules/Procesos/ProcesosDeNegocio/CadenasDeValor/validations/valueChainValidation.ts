import { z } from 'zod'

// ============================================
// VALIDACIÓN DE CADENA DE VALOR
// ============================================
export const createValueChainSchema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(100, 'El título no puede exceder 100 caracteres')
})

// ============================================
// VALIDACIÓN DE ÁREA
// ============================================
export const createAreaSchema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(150, 'El título no puede exceder 150 caracteres')
})

// ============================================
// VALIDACIÓN DE PROCESO NIVEL 1
// ============================================
export const createProcessLevel1Schema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres')
})

// ============================================
// VALIDACIÓN DE PROCESO NIVEL 2
// ============================================
export const createProcessLevel2Schema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres')
})

// ============================================
// VALIDACIÓN DE PROCESO NIVEL 3
// ============================================
export const createProcessLevel3Schema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    description: z
        .string()
        .max(1000, 'La descripción no puede exceder 1000 caracteres')
        .optional()
        .default('')
})
