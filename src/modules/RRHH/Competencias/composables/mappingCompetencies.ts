import { Competency, CompetencyDTO } from '@/modules/RRHH/Competencias/types/competencyTypes'

// Map backend (español) to frontend (inglés)
export const mapCompetency = (competency: Competency): CompetencyDTO => {
    const categoryMap = {
        tecnica: 'technical' as const,
        conductual: 'behavioral' as const,
        liderazgo: 'leadership' as const
    }

    return {
        id: competency.id,
        name: competency.nombre,
        description: competency.descripcion,
        category: categoryMap[competency.categoria],
        active: competency.activo
    }
}

// Map frontend (inglés) to backend (español)
export const mapCompetencyToBackend = (dto: CompetencyDTO): Competency => {
    const categoryMap = {
        technical: 'tecnica' as const,
        behavioral: 'conductual' as const,
        leadership: 'liderazgo' as const
    }

    return {
        id: dto.id,
        nombre: dto.name,
        descripcion: dto.description,
        categoria: categoryMap[dto.category],
        activo: dto.active
    }
}
