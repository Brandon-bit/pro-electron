import { z } from 'zod'

export const createProcessDiagramSchema = z.object({
    code: z
        .string({ required_error: 'El código es requerido' })
        .min(2, 'El código debe tener al menos 2 caracteres')
        .max(50, 'El código no puede exceder 50 caracteres')
        .regex(/^[A-Z0-9-]+$/, 'El código solo puede contener letras mayúsculas, números y guiones'),
    name: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(200, 'El nombre no puede exceder 200 caracteres'),
    description: z
        .string()
        .max(500, 'La descripción no puede exceder 500 caracteres')
        .optional()
        .default(''),
    version: z
        .string({ required_error: 'La versión es requerida' })
        .regex(/^\d+\.\d+(\.\d+)?$/, 'El formato de versión debe ser X.Y o X.Y.Z (ej: 1.0, 1.2.3)'),
    active: z.boolean().default(true)
})
