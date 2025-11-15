import { z } from 'zod'

export const prioritizedProjectSchema = z.object({
    name: z.string()
        .min(1, 'El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    
    classification: z.string()
        .min(1, 'La clasificación es requerida')
        .max(50, 'La clasificación no puede exceder 50 caracteres'),
    
    strategicAlignment: z.number()
        .min(0, 'La alineación estratégica debe ser entre 0 y 100')
        .max(100, 'La alineación estratégica debe ser entre 0 y 100')
        .or(z.string().transform(val => parseFloat(val))),
    
    roi: z.string()
        .max(50, 'El ROI no puede exceder 50 caracteres'),
    
    risks: z.string()
        .max(100, 'Los riesgos no pueden exceder 100 caracteres'),
    
    resources: z.string()
        .max(100, 'Los recursos no pueden exceder 100 caracteres'),
    
    priority: z.number()
        .min(1, 'La prioridad debe ser al menos 1')
        .or(z.string().transform(val => parseInt(val))),
    
    active: z.boolean()
})
