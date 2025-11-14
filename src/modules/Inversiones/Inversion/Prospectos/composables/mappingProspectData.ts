import type { ProspectType, ProspectResponseType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'

export const mapProspect = (response: ProspectResponseType): ProspectType => {
    return {
        id: response.id,
        firstName: response.nombre,
        lastName: response.apellido,
        email: response.email,
        company: response.empresa,
        phone: response.telefono,
        cellphone: response.celular,
        sector: response.sector as any,
        status: response.estatus as any,
        needs: response.necesidades,
        createdAt: response.fechaCreacion ? new Date(response.fechaCreacion) : undefined,
        updatedAt: response.fechaActualizacion ? new Date(response.fechaActualizacion) : undefined
    }
}
