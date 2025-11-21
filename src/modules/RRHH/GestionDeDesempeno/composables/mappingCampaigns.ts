import { Campaign, CampaignDTO } from '@/modules/RRHH/GestionDeDesempeno/types/campaignTypes'

// Map backend (español) to frontend (inglés)
export const mapCampaignToDTO = (campaign: Campaign): CampaignDTO => {
    const evaluationTypeMap = {
        '360': '360' as const,
        'desempeno': 'performance' as const,
        'competencias': 'competencies' as const
    }

    return {
        id: campaign.id,
        name: campaign.nombre,
        description: campaign.descripcion,
        evaluationType: evaluationTypeMap[campaign.tipoEvaluacion],
        startDate: campaign.fechaInicio,
        endDate: campaign.fechaFin,
        departments: campaign.departamentos,
        employees: campaign.empleados,
        competencies: campaign.competencias,
        includeAllEmployees: campaign.incluirTodosEmpleados,
        active: campaign.activo
    }
}

// Map frontend (inglés) to backend (español)
export const mapDTOToCampaign = (dto: CampaignDTO): Campaign => {
    const evaluationTypeMap = {
        '360': '360' as const,
        'performance': 'desempeno' as const,
        'competencies': 'competencias' as const
    }

    return {
        id: dto.id,
        nombre: dto.name,
        descripcion: dto.description,
        tipoEvaluacion: evaluationTypeMap[dto.evaluationType],
        fechaInicio: dto.startDate,
        fechaFin: dto.endDate,
        departamentos: dto.departments || [],
        empleados: dto.employees || [],
        competencias: dto.competencies,
        incluirTodosEmpleados: dto.includeAllEmployees,
        activo: dto.active
    }
}
