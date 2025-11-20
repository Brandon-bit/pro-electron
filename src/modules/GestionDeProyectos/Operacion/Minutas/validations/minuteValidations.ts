import { z } from 'zod'

export const minuteSchema = z.object({
    title: z.string().min(1, 'El título es requerido'),
    date: z.string().min(1, 'La fecha es requerida'),
    time: z.string().min(1, 'La hora es requerida'),
    agenda: z.string().min(1, 'La agenda es requerida'),
    discussion: z.string().min(1, 'La discusión es requerida'),
    decisions: z.string().min(1, 'Las decisiones son requeridas')
})

export type MinuteFormType = z.infer<typeof minuteSchema>
