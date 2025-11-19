import { z } from 'zod'
import { selectValidator, dateValidator, stringValidator, booleanValidator } from '@/shared/validations/globalValidation';

/**
 * Validation schema for project registration form
 * Based on the backend model: AltaDeProyectoRequest
 */
export const projectSchema = z
  .object({
    // Required fields
    name: stringValidator('El nombre es obligatorio', 'El nombre debe tener al menos 3 caracteres', 3),

    customId: z.string(), // dniPersonalizado - optional in backend

    startDate: dateValidator('La fecha de inicio es obligatoria', true),

    endDate: dateValidator('La fecha de fin es obligatoria', true),

    estimatedBudget: z
      .union([z.number(), z.string()])
      .transform((val) => (typeof val === 'string' ? parseFloat(val) || 0 : val))
      .pipe(z.number().min(0, 'El presupuesto estimado debe ser mayor o igual a 0.')),

    classificationId: selectValidator('Asegúrate de elegir una clasificación'), // Clasificación es opcional

    objective: stringValidator('El objetivo es obligatorio', 'El objetivo debe tener al menos 3 caracteres', 3),

    scope: stringValidator('El alcance es obligatorio', 'El alcance debe tener al menos 3 caracteres', 3),

    leaderId: z.string().refine((val) => val !== '0' && val !== '', {
      message: 'Asegúrate de elegir un líder',
    }),

    sponsorId: z.string().refine((val) => val !== '0' && val !== '', {
      message: 'Asegúrate de elegir un sponsor',
    }),

    projectManagerId: z.string().refine((val) => val !== '0' && val !== '', {
      message: 'Asegúrate de elegir un gestor de proyecto',
    }),

    processManagerId: z.string().refine((val) => val !== '0' && val !== '', {
      message: 'Asegúrate de elegir un gestor de procesos',
    }),

    areaId: selectValidator('Asegúrate de elegir un área'),

    categoryId: selectValidator('Asegúrate de elegir una categoría'),

    adminIds: z.array(z.string()),

    isSubproject: booleanValidator('El campo es obligatorio'),

    parentProjectId: z
      .union([z.number(), z.string(), z.null()])
      .transform((val) => {
        if (val === null || val === '') return null
        return typeof val === 'string' ? parseInt(val) || null : val
      })
      .nullable(),

    includeSaturday:booleanValidator('El campo es obligatorio'),

    includeSunday: booleanValidator('El campo es obligatorio'),

    isInvestmentType: booleanValidator('El campo es obligatorio'),

    useTemplate: booleanValidator('El campo es obligatorio'),

    templateId: z.number().nullable(),

    useInitiative: booleanValidator('El campo es obligatorio'),

    initiativeId: z.number().nullable(),
  })
  .refine(
    (data) => {
      // Validate that end date is after start date
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate
      }
      return true
    },
    {
      message: 'La fecha de fin debe ser posterior o igual a la fecha de inicio',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      // Validate that if it's a subproject, a parent project must be selected
      if (data.isSubproject && !data.parentProjectId) {
        return false
      }
      return true
    },
    {
      message: 'Debe seleccionar un proyecto padre si es un subproyecto',
      path: ['parentProjectId'],
    }
  )
  .refine(
    (data) => {
      // Validate that if useTemplate is true, a template must be selected
      if (data.useTemplate && !data.templateId) {
        return false
      }
      return true
    },
    {
      message: 'Debe seleccionar una plantilla si desea usar una',
      path: ['templateId'],
    }
  )
  .refine(
    (data) => {
      // Validate that if useInitiative is true, an initiative must be selected
      if (data.useInitiative && !data.initiativeId) {
        return false
      }
      return true
    },
    {
      message: 'Debe seleccionar una iniciativa si desea usar una',
      path: ['initiativeId'],
    }
  )
