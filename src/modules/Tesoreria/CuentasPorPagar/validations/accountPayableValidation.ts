import { z } from 'zod'
import { stringValidator, optionalStringValidator, dateValidator } from '@/shared/validations/globalValidation'

export const createUpdateAccountPayableSchema = z.object({
    id: z.number().optional(),
    supplierId: z.number().min(1, 'El proveedor es requerido'),
    documentNumber: stringValidator('El número de documento es requerido', 'El número de documento debe tener al menos 2 caracteres', 2),
    documentType: z.enum(['FACTURA', 'NOTA_VENTA', 'RECIBO', 'OTRO'], {
        errorMap: () => ({ message: 'El tipo de documento es requerido' })
    }),
    issueDate: dateValidator('La fecha de emisión es requerida', true),
    dueDate: dateValidator('La fecha de vencimiento es requerida', true),
    amount: z.preprocess((val) => Number(val), z.number().min(0.01, 'El monto debe ser mayor a 0')),
    pendingBalance: z.preprocess((val) => Number(val), z.number().min(0, 'El saldo pendiente debe ser mayor o igual a 0')),
    status: z.enum(['PENDIENTE', 'PARCIAL', 'PAGADO', 'VENCIDO'], {
        errorMap: () => ({ message: 'El estado es requerido' })
    }),
    notes: optionalStringValidator('Las notas deben tener al menos 2 caracteres', 2)
})

export const createPaymentSchema = z.object({
    id: z.number().optional(),
    accountPayableId: z.number(),
    paymentDate: dateValidator('La fecha de pago es requerida', true),
    amount: z.preprocess((val) => Number(val), z.number().min(0.01, 'El monto debe ser mayor a 0')),
    paymentMethod: z.enum(['EFECTIVO', 'TRANSFERENCIA', 'CHEQUE', 'TARJETA', 'OTRO'], {
        errorMap: () => ({ message: 'El método de pago es requerido' })
    }),
    reference: optionalStringValidator('La referencia debe tener al menos 2 caracteres', 2),
    notes: optionalStringValidator('Las notas deben tener al menos 2 caracteres', 2)
})

export const deletePaymentSchema = z.object({})
