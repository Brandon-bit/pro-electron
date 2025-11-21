import { z } from 'zod'
import { stringValidator, optionalStringValidator, numberValidator, dateValidator } from '@/shared/validations/globalValidation'

export const fixedAssetSchema = z.object({
    description: stringValidator('La descripción es requerida', 'La descripción debe tener al menos 3 caracteres', 3),
    brand: stringValidator('La marca es requerida', 'La marca debe tener al menos 2 caracteres', 2),
    model: stringValidator('El modelo es requerido', 'El modelo debe tener al menos 2 caracteres', 2),
    serialNumber: stringValidator('El número de serie es requerido', 'El número de serie debe tener al menos 3 caracteres', 3),
    acquisitionDate: dateValidator('La fecha de adquisición es requerida y debe tener formato YYYY-MM-DD', true),
    supplier: stringValidator('El proveedor es requerido', 'El proveedor debe tener al menos 3 caracteres', 3),
    invoice: stringValidator('La factura es requerida', 'La factura debe tener al menos 3 caracteres', 3),
    originalValue: numberValidator('El valor original es requerido', false, 'El valor original debe ser mayor a 0'),
    usefulLife: numberValidator('La vida útil es requerida', false, 'La vida útil debe ser al menos 1 mes'),
    accountingAccount: stringValidator('La cuenta contable es requerida', 'La cuenta contable debe tener al menos 4 caracteres', 4),
    physicalLocation: stringValidator('La ubicación física es requerida', 'La ubicación física debe tener al menos 5 caracteres', 5),
    area: stringValidator('El área es requerida', 'El área debe tener al menos 3 caracteres', 3),
    responsible: stringValidator('El responsable es requerido', 'El responsable debe tener al menos 3 caracteres', 3),
    notes: optionalStringValidator('Las notas deben tener al menos 5 caracteres si se proporcionan', 5),
    status: z.enum(['Activo', 'Dado de baja'], { 
        required_error: 'El estatus es requerido',
        invalid_type_error: 'El estatus debe ser Activo o Dado de baja'
    })
})
