// Tipos para el formulario de Alta de Nuevos Socios

// Paso 1: Datos personales
export interface PersonalDataStep {
    nombre: string
    apellidos: string
    fechaNacimiento: string
    edad: number
    sexo: 'M' | 'F'
    estadoCivil: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'union_libre'
    curp: string
    lugarNacimiento?: string
    nacionalidad: string
    ine: string
}

// Paso 2: Contacto
export interface ContactStep {
    telefonoCasa?: string
    telefonoCasaPais: string
    telefonoCelular: string
    telefonoCelularPais: string
    correoElectronico: string
}

// Paso 3: Domicilio
export interface AddressStep {
    calle: string
    numeroExterior: string
    numeroInterior?: string
    colonia: string
    codigoPostal: string
    ciudad: string
    estado: string
    pais: string
}

// Paso 4: Datos financieros
export interface FinancialDataStep {
    tipoPersona: 'fisica' | 'moral'
    regimenFiscal?: string
    razonSocial?: string
    banco?: string
    rfc: string
    clabe?: string
    cuenta?: string
    codigoSwift?: string
}

// Beneficiario
export interface Beneficiary {
    nombre: string
    apellidos: string
    fechaNacimiento: string
    curp?: string
    rfc: string
    parentesco?: string
    porcentaje: number
}

// Paso 5: Beneficiarios
export interface BeneficiariesStep {
    beneficiarios: Beneficiary[]
}

export interface NewPartnerFormData {
    step1?: PersonalDataStep
    step2?: ContactStep
    step3?: AddressStep
    step4?: FinancialDataStep
    step5?: BeneficiariesStep
}
