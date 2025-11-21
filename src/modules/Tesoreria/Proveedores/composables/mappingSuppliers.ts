import {
    Supplier,
    SupplierDTO,
    SupplierRequest,
    SupplierRequestPayload,
    SelectOptionDTO
} from '@/modules/Tesoreria/Proveedores/types/supplierTypes'

// Map from backend (Spanish) to DTO (English)
export const mapSupplier = (data: Supplier): SupplierDTO => ({
    id: data.id,
    name: data.nombre,
    rfc: data.rfc,
    email: data.email,
    phone: data.telefono,
    street: data.calle,
    city: data.ciudad,
    state: data.estado,
    postalCode: data.codigoPostal,
    creditDays: data.diasCredito,
    active: data.activo,
    notes: data.notas
})

// Map from DTO (English) to backend payload (Spanish)
export const mapSupplierRequest = (data: SupplierRequest): SupplierRequestPayload => ({
    nombre: data.name,
    rfc: data.rfc,
    email: data.email,
    telefono: data.phone,
    calle: data.street,
    ciudad: data.city,
    estado: data.state,
    codigoPostal: data.postalCode,
    diasCredito: data.creditDays,
    activo: data.active,
    notas: data.notes
})

export const mapSupplierToSelectOption = (supplier: SupplierDTO): SelectOptionDTO => {
    return {
        id: supplier.id!,
        label: `${supplier.name} - ${supplier.rfc}`
    }
}
