import { z } from 'zod'

export const projectSchema = z.object({
    name: z.string()
        .min(1, 'El nombre del proyecto es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(200, 'El nombre no puede exceder 200 caracteres'),
    
    startDate: z.date({
        required_error: 'La fecha de inicio es requerida'
    }).nullable(),
    
    endDate: z.date({
        required_error: 'La fecha de fin es requerida'
    }).nullable(),
    
    budget: z.string(),
    
    projectId: z.string(),
    
    objective: z.string(),
    
    scope: z.string(),
    
    leader: z.string(),
    
    sponsor: z.string(),
    
    projectManager: z.string(),
    
    processManager: z.string(),
    
    area: z.string(),
    
    category: z.string(),
    
    additionalAdmins: z.array(z.string()),
    
    isSubproject: z.boolean(),
    
    parentProject: z.string(),
    
    includeSaturday: z.boolean(),
    
    includeSunday: z.boolean(),
    
    projectType: z.enum(['expense', 'investment', '']),
    
    classification: z.string(),
    
    active: z.boolean()
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate
    }
    return true
}, {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate']
})
