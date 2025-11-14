import { z } from 'zod'

export const prospectSchema = z.object({
    firstName: z.string()
        .min(1, 'El nombre es requerido')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    lastName: z.string()
        .min(1, 'El apellido es requerido')
        .max(100, 'El apellido no puede exceder 100 caracteres'),
    email: z.string()
        .min(1, 'El correo es requerido')
        .email('Correo inválido'),
    company: z.string()
        .max(200, 'La empresa no puede exceder 200 caracteres')
        .optional(),
    phone: z.string()
        .max(20, 'El teléfono no puede exceder 20 caracteres')
        .optional(),
    cellphone: z.string()
        .max(20, 'El celular no puede exceder 20 caracteres')
        .optional(),
    sector: z.enum(['Tecnología', 'Finanzas', 'Salud', 'Educación', 'Retail', 'Manufactura', 'Servicios', 'Otro'], {
        required_error: 'El sector es requerido'
    }).optional(),
    status: z.enum(['Nuevo', 'Contactado', 'Calificado', 'Propuesta', 'Negociación', 'Ganado', 'Perdido'], {
        required_error: 'El estatus es requerido'
    }),
    needs: z.string()
        .max(1000, 'Las necesidades no pueden exceder 1000 caracteres')
        .optional()
})

export type ProspectSchemaType = z.infer<typeof prospectSchema>
