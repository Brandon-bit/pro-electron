import {
    Client,
    ClientDTO,
    ClientRequest,
    ClientRequestPayload,
    SelectOptionDTO
} from '@/modules/Tesoreria/Clientes/types/clientTypes'

// Map from backend (Spanish) to DTO (English)
export const mapClient = (data: Client): ClientDTO => ({
    id: data.id,
    name: data.nombre,
    rfc: data.rfc,
    email: data.email,
    phone: data.telefono,
    street: data.calle,
    city: data.ciudad,
    state: data.estado,
    postalCode: data.codigoPostal,
    creditLimit: data.limiteCredito,
    creditDays: data.diasCredito,
    active: data.activo,
    notes: data.notas
})

// Map from DTO (English) to backend payload (Spanish)
export const mapClientRequest = (data: ClientRequest): ClientRequestPayload => ({
    nombre: data.name,
    rfc: data.rfc,
    email: data.email,
    telefono: data.phone,
    calle: data.street,
    ciudad: data.city,
    estado: data.state,
    codigoPostal: data.postalCode,
    limiteCredito: data.creditLimit,
    diasCredito: data.creditDays,
    activo: data.active,
    notas: data.notes
})

export const mapClientToSelectOption = (client: ClientDTO): SelectOptionDTO => {
    return {
        id: client.id!,
        label: `${client.name} - ${client.rfc}`
    }
}
