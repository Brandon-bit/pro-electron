import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'

// ============================================
// ETAPA SCHEMA
// ============================================
export const etapaSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(0, 'El PSN debe ser mayor o igual a 0'),
    activo: z.boolean().default(true),
})

// ============================================
// ACTIVIDAD SCHEMA
// ============================================
export const actividadSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    psn: z.number({ required_error: 'El PSN es obligatorio' })
        .min(0, 'El PSN debe ser mayor o igual a 0'),
    dias: z.number({ required_error: 'Los días son obligatorios' })
        .min(1, 'Los días deben ser mayor a 0'),
    activo: z.boolean().default(true),
})

// ============================================
// SUB-ACTIVIDAD SCHEMA
// ============================================
export const subActividadSchema = z.object({
    nombre: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),
    activo: z.boolean().default(true),
})
