import { z } from 'zod'

export const sowSchema = z.object({
    projectName: z.string()
        .min(1, 'El nombre del proyecto es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    
    projectCode: z.string()
        .min(1, 'El código del proyecto es requerido')
        .max(50, 'El código no puede exceder 50 caracteres'),
    
    client: z.string()
        .min(1, 'El cliente es requerido')
        .max(100, 'El cliente no puede exceder 100 caracteres'),
    
    startDate: z.date({
        required_error: 'La fecha de inicio es requerida'
    }).nullable(),
    
    endDate: z.date({
        required_error: 'La fecha de fin es requerida'
    }).nullable(),
    
    executiveSummary: z.string()
        .min(1, 'El resumen ejecutivo es requerido')
        .min(10, 'El resumen debe tener al menos 10 caracteres'),
    
    objectives: z.string()
        .min(1, 'Los objetivos son requeridos')
        .min(10, 'Los objetivos deben tener al menos 10 caracteres'),
    
    scope: z.string()
        .min(1, 'El alcance es requerido')
        .min(10, 'El alcance debe tener al menos 10 caracteres'),
    
    deliverables: z.string()
        .min(1, 'Los entregables son requeridos'),
    
    timeline: z.string()
        .min(1, 'El cronograma es requerido'),
    
    resources: z.string()
        .min(1, 'Los recursos son requeridos'),
    
    assumptions: z.string(),
    
    constraints: z.string(),
    
    acceptanceCriteria: z.string()
        .min(1, 'Los criterios de aceptación son requeridos'),
    
    paymentTerms: z.string()
        .min(1, 'Los términos de pago son requeridos'),
    
    status: z.enum(['draft', 'review', 'approved', 'rejected']),
    
    version: z.string()
        .min(1, 'La versión es requerida'),
    
    createdBy: z.string()
        .min(1, 'El creador es requerido'),
    
    active: z.boolean()
})
