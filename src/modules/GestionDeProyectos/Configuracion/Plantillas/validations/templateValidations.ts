import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'

export const templateSchema = z.object({
  name: stringValidator(
    'El nombre es obligatorio',
    'El nombre debe tener al menos 3 caracteres',
    3
  ),
  objective: stringValidator(
    'El objetivo es obligatorio',
    'El objetivo debe tener al menos 3 caracteres',
    3
  ),
  scope: stringValidator(
    'El alcance es obligatorio',
    'El alcance debe tener al menos 3 caracteres',
    3
  ),
  active: z.boolean().default(true),
})

export const templateStageSchema = z.object({
  templateId: z.number({
    required_error: 'El ID de la plantilla es obligatorio',
  }),
  name: stringValidator(
    'El nombre es obligatorio',
    'El nombre debe tener al menos 3 caracteres',
    3
  ),
  active: z.boolean().default(true),
})

export const templateActivitySchema = z.object({
  stageId: z.number({
    required_error: 'El ID de la etapa es obligatorio',
  }),
  dependencyId: z.number({
    required_error: 'El ID de la dependencia es obligatorio',
  }),
  name: stringValidator(
    'El nombre es obligatorio',
    'El nombre debe tener al menos 3 caracteres',
    3
  ),
  duration: z
    .number({
      required_error: 'La duración es obligatoria',
    })
    .min(0, 'La duración debe ser mayor o igual a 0'),
  active: z.boolean().default(true),
})
