import { z } from 'zod'

export const initiativeSchema = z.object({
    classification: z.string()
        .min(1, 'La clasificación es requerida')
        .max(50, 'La clasificación no puede exceder 50 caracteres'),
    
    name: z.string()
        .min(1, 'El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    
    investment: z.enum(['Bajo', 'Medio', 'Alto'], {
        errorMap: () => ({ message: 'Seleccione un nivel de inversión válido' })
    }),
    
    scope: z.enum(['Bajo', 'Medio', 'Alto'], {
        errorMap: () => ({ message: 'Seleccione un alcance válido' })
    }),
    
    timeHorizon: z.enum(['Corto', 'Medio', 'Largo'], {
        errorMap: () => ({ message: 'Seleccione un horizonte de tiempo válido' })
    }),
    
    savings: z.enum(['Bajo', 'Medio', 'Alto'], {
        errorMap: () => ({ message: 'Seleccione un nivel de ahorro válido' })
    }),
    
    benefits: z.enum(['Bajo', 'Medio', 'Alto'], {
        errorMap: () => ({ message: 'Seleccione un nivel de beneficios válido' })
    }),
    
    satisfaction: z.enum(['Bajo', 'Medio', 'Alto'], {
        errorMap: () => ({ message: 'Seleccione un nivel de satisfacción válido' })
    }),
    
    active: z.boolean()
})
