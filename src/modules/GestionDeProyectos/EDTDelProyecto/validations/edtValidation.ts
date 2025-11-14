import { z } from 'zod'

export const edtNodeSchema = z.object({
    name: z.string()
        .min(1, 'El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    
    level: z.number()
        .min(0, 'El nivel debe ser al menos 0')
        .max(3, 'El nivel máximo es 3'),
    
    parentId: z.string().nullable(),
    
    projectId: z.number()
        .min(1, 'El ID del proyecto es requerido')
})
