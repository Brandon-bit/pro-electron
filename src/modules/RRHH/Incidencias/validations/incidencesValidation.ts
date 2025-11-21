import { z } from 'zod'
import {
    numberValidator,
    stringValidator,
    optionalStringValidator,
    dateValidator,
    selectStringValidator
} from '@/shared/validations/globalValidation'

// Schema para crear incidencia
export const createIncidenceSchema = z.object({
    employeeId: numberValidator('El empleado es requerido', false, 'Debe seleccionar un empleado'),
    employeeName: stringValidator('El nombre del empleado es requerido', 'Mínimo 1 caracter', 1),
    category: selectStringValidator('La categoría es requerida'),
    type: selectStringValidator('El tipo de incidencia es requerido'),
    startDate: dateValidator('La fecha es requerida', true),
    endDate: dateValidator('La fecha de fin debe ser válida', false).optional(),
    hours: z.preprocess(
        (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
        z
            .number()
            .min(0.1, 'Las horas deben ser mayor a 0')
            .max(24, 'Las horas no pueden exceder 24')
            .optional()
    ),
    justified: z.boolean().optional(),
    comments: optionalStringValidator('Mínimo 10 caracteres', 10),
    evidence: z.any().optional()
})

// Schema para actualizar incidencia (incluye estado)
export const updateIncidenceSchema = z.object({
    employeeId: numberValidator('El empleado es requerido', false, 'Debe seleccionar un empleado'),
    employeeName: stringValidator('El nombre del empleado es requerido', 'Mínimo 1 caracter', 1),
    category: selectStringValidator('La categoría es requerida'),
    type: selectStringValidator('El tipo de incidencia es requerido'),
    startDate: dateValidator('La fecha es requerida', true),
    endDate: dateValidator('La fecha de fin debe ser válida', false).optional(),
    hours: z.preprocess(
        (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
        z
            .number()
            .min(0.1, 'Las horas deben ser mayor a 0')
            .max(24, 'Las horas no pueden exceder 24')
            .optional()
    ),
    justified: z.boolean().optional(),
    comments: optionalStringValidator('Mínimo 10 caracteres', 10),
    evidence: z.any().optional(),
    status: selectStringValidator('El estado es requerido')
})

// Schema para eliminar incidencia
export const deleteIncidenceSchema = z.object({})
