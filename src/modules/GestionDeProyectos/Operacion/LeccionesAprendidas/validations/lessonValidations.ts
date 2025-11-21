import { z } from 'zod'

export const lessonSchema = z.object({
    dniCategoria: z.coerce
        .number({ required_error: 'La categoría es obligatoria' })
        .min(1, 'Selecciona una categoría'),
    faseProyecto: z
        .string({ required_error: 'La fase del proyecto es obligatoria' })
        .min(1, 'La fase del proyecto es obligatoria'),
    descripcion: z
        .string({ required_error: 'La descripción es obligatoria' })
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción no puede exceder 1000 caracteres'),
    causas: z
        .string()
        .max(500, 'Las causas no pueden exceder 500 caracteres')
        .optional()
        .default(''),
    impacto: z
        .string()
        .max(500, 'El impacto no puede exceder 500 caracteres')
        .optional()
        .default(''),
    leccionAprendida: z
        .string()
        .max(1000, 'La lección aprendida no puede exceder 1000 caracteres')
        .optional()
        .default(''),
    recomendacion: z
        .string()
        .max(1000, 'La recomendación no puede exceder 1000 caracteres')
        .optional()
        .default(''),
    tipo: z
        .string({ required_error: 'El tipo de lección es obligatorio' })
        .min(1, 'El tipo de lección es obligatorio'),
    etiquetas: z
        .array(z.string())
        .default([]),
    autor: z
        .string({ required_error: 'El autor es obligatorio' })
        .min(1, 'El autor es obligatorio')
        .max(150, 'El autor no puede exceder 150 caracteres')
})
