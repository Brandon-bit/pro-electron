import useBenefitCatalogStore, { type BenefitCatalogDTO } from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'

export const useBenefitCatalogActions = () => {
    const benefitStore = useBenefitCatalogStore()

    // Mock data
    const mockBenefits = [
        {
            id: 1,
            name: 'Días libres extra',
            description: '2 días libres adicionales para disfrutar con tu familia',
            requiredScore: 4.5,
            availableStock: 10,
            active: true,
            createdAt: '2024-01-15T10:00:00Z'
        },
        {
            id: 2,
            name: 'Curso de idiomas',
            description: 'Acceso a plataforma de aprendizaje de idiomas por 6 meses',
            requiredScore: 4.0,
            availableStock: 5,
            active: true,
            createdAt: '2024-01-20T10:00:00Z'
        },
        {
            id: 3,
            name: 'Bono wellness',
            description: 'Membresía de gimnasio o spa por 3 meses',
            requiredScore: 4.0,
            availableStock: 15,
            active: true,
            createdAt: '2024-02-01T10:00:00Z'
        },
        {
            id: 4,
            name: 'Capacitación ejecutiva',
            description: 'Curso de liderazgo y gestión de equipos',
            requiredScore: 4.8,
            availableStock: 3,
            active: true,
            createdAt: '2024-02-10T10:00:00Z'
        },
        {
            id: 5,
            name: 'Gift card',
            description: 'Tarjeta de regalo de $500 para tiendas departamentales',
            requiredScore: 3.5,
            availableStock: 20,
            active: true,
            createdAt: '2024-02-15T10:00:00Z'
        }
    ]

    // Obtener todos los beneficios
    const getBenefitsCatalog = async (
        page: number = 1,
        pageSize: number = 10
    ): Promise<{ items: any[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockBenefits.slice(start, end)

        return {
            items: paginatedData,
            total: mockBenefits.length
        }
    }

    // Crear beneficio
    const createBenefit = async (benefit: Partial<BenefitCatalogDTO>): Promise<{ message: string; status: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log('🔄 Crear Beneficio:', benefit)

        return {
            message: 'Beneficio creado exitosamente',
            status: 'success'
        }
    }

    // Actualizar beneficio
    const updateBenefit = async (benefit: Partial<BenefitCatalogDTO>): Promise<{ message: string; status: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = benefitStore.selectedBenefit?.id

        if (!id) {
            return {
                message: 'ID de beneficio no válido',
                status: 'error'
            }
        }

        console.log('🔄 Actualizar Beneficio:', { id, ...benefit })

        return {
            message: 'Beneficio actualizado exitosamente',
            status: 'success'
        }
    }

    // Eliminar beneficio
    const deleteBenefit = async (): Promise<{ message: string; status: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = benefitStore.selectedBenefit?.id

        if (!id) {
            return {
                message: 'ID de beneficio no válido',
                status: 'error'
            }
        }

        console.log('🔄 Eliminar Beneficio:', { id })

        return {
            message: 'Beneficio eliminado exitosamente',
            status: 'success'
        }
    }

    return {
        getBenefitsCatalog,
        createBenefit,
        updateBenefit,
        deleteBenefit
    }
}
