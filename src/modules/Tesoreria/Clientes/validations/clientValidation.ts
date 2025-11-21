import { z } from 'zod'
import { stringValidator, optionalStringValidator, numberValidator } from '@/shared/validations/globalValidation'

// Regex patterns for client validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\d{10}$/
const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
const postalCodeRegex = /^\d{5}$/

export const createUpdateClientSchema = z.object({
    id: z.number().optional(),
    name: stringValidator('El nombre es requerido', 'El nombre debe tener al menos 2 caracteres', 2),
    rfc: z
        .string()
        .min(1, 'El RFC es requerido')
        .regex(rfcRegex, 'El RFC debe tener un formato válido (ej: ABC123456XYZ)'),
    email: z
        .string()
        .min(1, 'El email es requerido')
        .regex(emailRegex, 'El email debe tener un formato válido'),
    phone: z
        .string()
        .min(1, 'El teléfono es requerido')
        .regex(phoneRegex, 'El teléfono debe tener 10 dígitos'),
    street: stringValidator('La calle es requerida', 'La calle debe tener al menos 3 caracteres', 3),
    city: stringValidator('La ciudad es requerida', 'La ciudad debe tener al menos 2 caracteres', 2),
    state: stringValidator('El estado es requerido', 'El estado debe tener al menos 2 caracteres', 2),
    postalCode: z
        .string()
        .min(1, 'El código postal es requerido')
        .regex(postalCodeRegex, 'El código postal debe tener 5 dígitos'),
    creditLimit: z.preprocess((val) => Number(val), z.number()),
    creditDays: z.preprocess((val) => Number(val), z.number()),
    active: z.boolean().default(true),
    notes: optionalStringValidator('Las notas deben tener al menos 2 caracteres', 2)
})
