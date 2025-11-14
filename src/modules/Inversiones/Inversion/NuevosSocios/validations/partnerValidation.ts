import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Validación para CURP (formato mexicano)
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/

// Validación para INE (10-13 dígitos)
const ineRegex = /^\d{10,13}$/

// Paso 1: Datos personales
export const step1ValidationSchema = toTypedSchema(
    z.object({
        nombre: z.string({ required_error: 'El nombre es obligatorio' })
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(100, 'El nombre no puede exceder 100 caracteres'),
        
        apellidos: z.string({ required_error: 'Los apellidos son obligatorios' })
            .min(2, 'Los apellidos deben tener al menos 2 caracteres')
            .max(100, 'Los apellidos no pueden exceder 100 caracteres'),
        
        fechaNacimiento: z.string({ required_error: 'La fecha de nacimiento es obligatoria' })
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
        
        edad: z.number({ required_error: 'La edad es obligatoria' })
            .min(18, 'Debe ser mayor de edad')
            .max(120, 'Edad inválida'),
        
        sexo: z.enum(['M', 'F'], { required_error: 'El sexo es obligatorio' }),
        
        estadoCivil: z.enum(['soltero', 'casado', 'divorciado', 'viudo', 'union_libre'], 
            { required_error: 'El estado civil es obligatorio' }),
        
        curp: z.string({ required_error: 'El CURP es obligatorio' })
            .regex(curpRegex, 'Formato de CURP inválido')
            .length(18, 'El CURP debe tener 18 caracteres'),
        
        lugarNacimiento: z.string()
            .max(200, 'El lugar de nacimiento no puede exceder 200 caracteres')
            .optional(),
        
        nacionalidad: z.string({ required_error: 'La nacionalidad es obligatoria' })
            .max(100, 'La nacionalidad no puede exceder 100 caracteres'),
        
        ine: z.string({ required_error: 'El INE es obligatorio' })
            .regex(ineRegex, 'El INE debe contener entre 10 y 13 dígitos')
    })
)

// Paso 2: Contacto
export const step2ValidationSchema = toTypedSchema(
    z.object({
        telefonoCasa: z.union([
            z.string().regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
            z.literal('')
        ]).optional(),
        
        telefonoCasaPais: z.string().default('+52'),
        
        telefonoCelular: z.string({ required_error: 'El teléfono celular es obligatorio' })
            .regex(/^\d{10}$/, 'El teléfono celular debe tener 10 dígitos'),
        
        telefonoCelularPais: z.string({ required_error: 'El código de país es obligatorio' })
            .default('+52'),
        
        correoElectronico: z.string({ required_error: 'El correo electrónico es obligatorio' })
            .email('Formato de correo electrónico inválido')
            .max(100, 'El correo no puede exceder 100 caracteres')
    })
)

// Paso 3: Domicilio
export const step3ValidationSchema = toTypedSchema(
    z.object({
        calle: z.string({ required_error: 'La calle es obligatoria' })
            .min(3, 'La calle debe tener al menos 3 caracteres')
            .max(200, 'La calle no puede exceder 200 caracteres'),
        
        numeroExterior: z.string({ required_error: 'El número exterior es obligatorio' })
            .max(20, 'El número exterior no puede exceder 20 caracteres'),
        
        numeroInterior: z.union([
            z.string().max(20, 'El número interior no puede exceder 20 caracteres'),
            z.literal('')
        ]).optional(),
        
        colonia: z.string({ required_error: 'La colonia es obligatoria' })
            .min(3, 'La colonia debe tener al menos 3 caracteres')
            .max(200, 'La colonia no puede exceder 200 caracteres'),
        
        codigoPostal: z.string({ required_error: 'El código postal es obligatorio' })
            .regex(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
        
        ciudad: z.string({ required_error: 'La ciudad es obligatoria' })
            .min(2, 'La ciudad debe tener al menos 2 caracteres')
            .max(100, 'La ciudad no puede exceder 100 caracteres'),
        
        estado: z.string({ required_error: 'El estado es obligatorio' })
            .min(2, 'El estado debe tener al menos 2 caracteres')
            .max(100, 'El estado no puede exceder 100 caracteres'),
        
        pais: z.string({ required_error: 'El país es obligatorio' })
            .min(2, 'El país debe tener al menos 2 caracteres')
            .max(100, 'El país no puede exceder 100 caracteres')
    })
)

// Validación para RFC (formato mexicano)
const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/

// Validación para CLABE (18 dígitos)
const clabeRegex = /^\d{18}$/

// Paso 4: Datos financieros
export const step4ValidationSchema = toTypedSchema(
    z.object({
        tipoPersona: z.enum(['fisica', 'moral'], 
            { required_error: 'El tipo de persona es obligatorio' }),
        
        regimenFiscal: z.union([
            z.string().max(200, 'El régimen fiscal no puede exceder 200 caracteres'),
            z.literal('')
        ]).optional(),
        
        razonSocial: z.union([
            z.string().max(200, 'La razón social no puede exceder 200 caracteres'),
            z.literal('')
        ]).optional(),
        
        banco: z.union([
            z.string().max(100, 'El banco no puede exceder 100 caracteres'),
            z.literal('')
        ]).optional(),
        
        rfc: z.string({ required_error: 'El RFC es obligatorio' })
            .regex(rfcRegex, 'Formato de RFC inválido')
            .min(12, 'El RFC debe tener al menos 12 caracteres')
            .max(13, 'El RFC no puede exceder 13 caracteres'),
        
        clabe: z.union([
            z.string().regex(clabeRegex, 'La CLABE debe tener 18 dígitos'),
            z.literal('')
        ]).optional(),
        
        cuenta: z.union([
            z.string().max(20, 'La cuenta no puede exceder 20 caracteres'),
            z.literal('')
        ]).optional(),
        
        codigoSwift: z.union([
            z.string()
                .regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Formato de código SWIFT inválido')
                .min(8, 'El código SWIFT debe tener al menos 8 caracteres')
                .max(11, 'El código SWIFT no puede exceder 11 caracteres'),
            z.literal('')
        ]).optional()
    })
)

// Validación para beneficiario individual
export const beneficiaryValidationSchema = toTypedSchema(
    z.object({
        nombre: z.string({ required_error: 'El nombre es obligatorio' })
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(100, 'El nombre no puede exceder 100 caracteres'),
        
        apellidos: z.string({ required_error: 'Los apellidos son obligatorios' })
            .min(2, 'Los apellidos deben tener al menos 2 caracteres')
            .max(100, 'Los apellidos no pueden exceder 100 caracteres'),
        
        fechaNacimiento: z.string({ required_error: 'La fecha de nacimiento es obligatoria' })
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
        
        curp: z.union([
            z.string().regex(curpRegex, 'Formato de CURP inválido').length(18, 'El CURP debe tener 18 caracteres'),
            z.literal('')
        ]).optional(),
        
        rfc: z.string({ required_error: 'El RFC es obligatorio' })
            .regex(rfcRegex, 'Formato de RFC inválido')
            .min(12, 'El RFC debe tener al menos 12 caracteres')
            .max(13, 'El RFC no puede exceder 13 caracteres'),
        
        parentesco: z.union([
            z.string().max(50, 'El parentesco no puede exceder 50 caracteres'),
            z.literal('')
        ]).optional(),
        
        porcentaje: z.number({ required_error: 'El porcentaje es obligatorio' })
            .min(0, 'El porcentaje no puede ser negativo')
            .max(100, 'El porcentaje no puede exceder 100')
    })
)

// Paso 5: Beneficiarios
export const step5ValidationSchema = toTypedSchema(
    z.object({
        beneficiarios: z.array(z.any()).min(0)
    })
)
