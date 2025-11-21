// Backend types (Spanish keys)
export type Employee = {
    id: number
    nombre: string
    apellidos: string
    email: string
    telefono: string
    fechaNacimiento: string
    rfc: string
    direccion: string
    numeroEmpleado: string
    fechaIngreso: string
    empresa: number
    departamento: number
    puesto: number
    sucursal: number
    salario: number
    tipoContrato: string
    reportaA: number | null
    activo: boolean
    banco?: number
    numeroCuenta?: string
    clabe?: string
    documentosEmpleado?: any
    pruebasPsicometricas?: any
}

// DTO types (English keys for form)
export type EmployeeDTO = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: string
    taxId: string
    address: string
    employeeNumber: string
    hireDate: string
    company: string
    department: string
    position: string
    branch: string
    salary: number
    contractType: string
    reportsTo: string | null
    active: boolean
    bank?: number
    accountNumber?: string
    clabeNumber?: string
    employeeDocuments?: any
    psychometricTests?: any
}

// Form types
export type EmployeeForm = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: string
    taxId: string
    address: string
    employeeNumber: string
    hireDate: string
    company: number
    department: number
    position: number
    branch: number
    salary: number
    contractType: number
    reportsTo: number | null
    bank?: number
    accountNumber?: string
    clabeNumber?: string
    employeeDocuments?: any
    psychometricTests?: any
}

// Select option types
export type SelectOptionDTO = {
    id: number | string
    label: string
}

// Request types
export type EmployeeRequest = {
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: string
    taxId: string
    address: string
    hireDate: string
    company: number
    department: number
    position: number
    branch: number
    salary: number
    contractType: number
    reportsTo?: number
    bank?: number
    accountNumber?: string
    clabeNumber?: string
    employeeDocuments?: any
    psychometricTests?: any
}

export type EmployeeRequestPayload = {
    nombre: string
    apellidos: string
    email: string
    telefono: string
    fechaNacimiento: string
    rfc: string
    direccion: string
    fechaIngreso: string
    empresa: number
    departamento: number
    puesto: number
    sucursal: number
    salario: number
    tipoContrato: number
    reportaA?: number
    banco?: number
    numeroCuenta?: string
    clabe?: string
    documentosEmpleado?: any
    pruebasPsicometricas?: any
}

export type EmployeeResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}
