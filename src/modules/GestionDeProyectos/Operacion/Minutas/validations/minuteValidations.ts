import { z } from 'zod'

export const minuteSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(256, 'El nombre no puede exceder los 256 caracteres'),
    fecha: z.string().min(1, 'La fecha es requerida'),
    agenda: z.string().min(1, 'La agenda es requerida').max(5000, 'La agenda no puede exceder los 5000 caracteres'),
    puntosDiscutidos: z.string().min(1, 'Los puntos discutidos son requeridos').max(10000, 'Los puntos discutidos no pueden exceder los 10000 caracteres'),
    decisionesTomadas: z.string().min(1, 'Las decisiones tomadas son requeridas').max(10000, 'Las decisiones tomadas no pueden exceder los 10000 caracteres')
})

export const agreedActionSchema = z.object({
    descripcion: z.string().min(1, 'La descripción es requerida'),
    dniResponsable: z.string().min(1, 'El responsable es requerido'),
    fechaLimite: z.string().min(1, 'La fecha límite es requerida').refine((date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
    }, {
        message: 'La fecha límite no puede ser anterior al día de hoy'
    })
})

export type MinuteFormType = z.infer<typeof minuteSchema>
