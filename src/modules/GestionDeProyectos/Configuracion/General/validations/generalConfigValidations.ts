import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'

export const areaSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .max(150, 'Máximo 150 caracteres'),
  description: stringValidator(
    'La descripción es obligatoria',
    'La descripción debe tener al menos 3 caracteres',
    3
  ),
  active: z.boolean().default(true),
})

export const categorySchema = z.object({
  areaId: z.coerce
    .number({ required_error: 'El área es obligatoria' })
    .min(1, 'Selecciona un área'),
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .max(150, 'Máximo 150 caracteres'),
  active: z.boolean().default(true),
})

export const classificationSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .max(150, 'Máximo 150 caracteres'),
  description: stringValidator(
    'La descripción es obligatoria',
    'La descripción debe tener al menos 3 caracteres',
    3
  ),
  active: z.boolean().default(true),
})

export const lessonLearnedCategorySchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .max(150, 'Máximo 150 caracteres'),
  description: stringValidator(
    'La descripción es obligatoria',
    'La descripción debe tener al menos 3 caracteres',
    3
  ),
  active: z.boolean().default(true),
})
