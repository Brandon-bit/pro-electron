import type {
    BenefitsStats,
    Benefit,
    Recognition,
    EmployeeEligibility,
    BenefitMatrix,
    RecognitionFormDTO,
    BenefitConfigFormDTO,
    BenefitMatrixFormDTO,
    SelectOptionDTO
} from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

export function useBenefitsActions() {
    // Obtener estadísticas del dashboard
    const getBenefitsStats = async (): Promise<BenefitsStats> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return {
            availablePoints: 2450,
            activeBenefits: 18,
            participatingEmployees: 1623,
            monthlyRecognitions: 387
        }
    }

    // Obtener beneficios del marketplace
    const getMarketplaceBenefits = async (): Promise<Benefit[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                name: 'Días Libres Extra',
                description: '2 días adicionales de vacaciones',
                type: 'vacation',
                points: 500,
                icon: 'flight',
                color: 'primary',
                status: 'active',
                availableQuantity: 50
            },
            {
                id: 2,
                name: 'Curso de Idiomas',
                description: 'Suscripción anual a plataforma',
                type: 'training',
                points: 800,
                icon: 'school',
                color: 'secondary',
                status: 'active',
                availableQuantity: 30
            },
            {
                id: 3,
                name: 'Seguro Médico Plus',
                description: 'Cobertura familiar extendida',
                type: 'health',
                points: 1200,
                icon: 'favorite',
                color: 'success',
                status: 'active',
                availableQuantity: 20
            },
            {
                id: 4,
                name: 'Bono Wellness',
                description: 'Gimnasio o actividades deportivas',
                type: 'wellness',
                points: 400,
                icon: 'fitness_center',
                color: 'warning',
                status: 'active',
                availableQuantity: 100
            },
            {
                id: 5,
                name: 'Capacitación Ejecutiva',
                description: 'MBA o diplomado',
                type: 'training',
                points: 1500,
                icon: 'workspace_premium',
                color: 'primary',
                status: 'active',
                availableQuantity: 10
            },
            {
                id: 6,
                name: 'Vale de Despensa',
                description: '$500 en supermercados',
                type: 'financial',
                points: 300,
                icon: 'shopping_cart',
                color: 'secondary',
                status: 'active',
                availableQuantity: 200
            }
        ]
    }

    // Obtener reconocimientos peer-to-peer
    const getRecognitions = async (): Promise<Recognition[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                fromEmployeeId: 101,
                fromEmployeeName: 'María García',
                toEmployeeId: 102,
                toEmployeeName: 'Juan Pérez',
                category: 'teamwork',
                message: 'Increíble colaboración en el proyecto Q4. Tu apoyo fue fundamental.',
                points: 50,
                createdAt: '2024-10-30T10:00:00'
            },
            {
                id: 2,
                fromEmployeeId: 103,
                fromEmployeeName: 'Carlos López',
                toEmployeeId: 104,
                toEmployeeName: 'Ana Martínez',
                category: 'innovation',
                message: 'Tu propuesta revolucionó nuestro proceso. ¡Excelente trabajo!',
                points: 75,
                createdAt: '2024-10-30T07:00:00'
            },
            {
                id: 3,
                fromEmployeeId: 105,
                fromEmployeeName: 'Laura Sánchez',
                toEmployeeId: 106,
                toEmployeeName: 'Pedro González',
                category: 'leadership',
                message: 'Gracias por guiar al equipo con tanta dedicación y empatía.',
                points: 100,
                createdAt: '2024-10-29T15:00:00'
            },
            {
                id: 4,
                fromEmployeeId: 107,
                fromEmployeeName: 'Roberto Díaz',
                toEmployeeId: 108,
                toEmployeeName: 'Sofia Torres',
                category: 'excellence',
                message: 'Tu atención al detalle es excepcional. El cliente quedó encantado.',
                points: 60,
                createdAt: '2024-10-29T12:00:00'
            }
        ]
    }

    // Obtener empleados elegibles
    const getEligibleEmployees = async (): Promise<EmployeeEligibility[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                employeeId: 201,
                employeeName: 'Elena Fernández',
                employeePosition: 'CFO',
                score: 4.9,
                performanceRank: 'top10',
                eligibleBenefits: ['Capacitación Ejecutiva', 'Días Libres Extra', 'Seguro Médico Plus'],
                totalPoints: 3200
            },
            {
                id: 2,
                employeeId: 202,
                employeeName: 'Roberto López',
                employeePosition: 'VP de Ventas',
                score: 4.8,
                performanceRank: 'top10',
                eligibleBenefits: ['Capacitación Ejecutiva', 'Días Libres Extra', 'Bono Wellness'],
                totalPoints: 2950
            },
            {
                id: 3,
                employeeId: 203,
                employeeName: 'María García',
                employeePosition: 'Engineering Manager',
                score: 4.7,
                performanceRank: 'top10',
                eligibleBenefits: ['Días Libres Extra', 'Curso de Idiomas', 'Bono Wellness'],
                totalPoints: 2750
            },
            {
                id: 4,
                employeeId: 204,
                employeeName: 'Juan Pérez',
                employeePosition: 'Senior Developer',
                score: 4.6,
                performanceRank: 'above4.5',
                eligibleBenefits: ['Días Libres Extra', 'Vale de Despensa'],
                totalPoints: 2450
            }
        ]
    }

    // Obtener matriz de beneficios
    const getBenefitMatrix = async (): Promise<BenefitMatrix[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                threshold: 'Top 10% (Score ≥ 4.8)',
                minScore: 4.8,
                benefits: ['Capacitación Ejecutiva', '3 días libres'],
                autoPoints: 1500,
                color: 'success'
            },
            {
                id: 2,
                threshold: 'Score ≥ 4.5',
                minScore: 4.5,
                benefits: ['2 días libres extra', 'Vale despensa'],
                autoPoints: 800,
                color: 'primary'
            },
            {
                id: 3,
                threshold: 'Score ≥ 4.0',
                minScore: 4.0,
                benefits: ['Bono wellness', 'Curso online'],
                autoPoints: 500,
                color: 'secondary'
            },
            {
                id: 4,
                threshold: 'Score ≥ 3.5',
                minScore: 3.5,
                benefits: ['Reconocimiento público'],
                autoPoints: 200,
                color: 'warning'
            }
        ]
    }

    // Obtener historial de canjes
    const getRedemptions = async (): Promise<BenefitRedemption[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                employeeId: 201,
                employeeName: 'Elena Fernández',
                employeePosition: 'CFO',
                benefitId: 5,
                benefitName: 'Capacitación Ejecutiva',
                pointsUsed: 1500,
                status: 'approved',
                requestDate: '2024-10-28',
                approvalDate: '2024-10-29'
            },
            {
                id: 2,
                employeeId: 204,
                employeeName: 'Juan Pérez',
                employeePosition: 'Senior Developer',
                benefitId: 1,
                benefitName: 'Días Libres Extra',
                pointsUsed: 500,
                status: 'completed',
                requestDate: '2024-10-25',
                approvalDate: '2024-10-26',
                completionDate: '2024-10-27'
            },
            {
                id: 3,
                employeeId: 203,
                employeeName: 'María García',
                employeePosition: 'Engineering Manager',
                benefitId: 4,
                benefitName: 'Bono Wellness',
                pointsUsed: 400,
                status: 'pending',
                requestDate: '2024-10-30'
            }
        ]
    }

    // Canjear beneficio
    const redeemBenefit = async (benefitId: number, employeeId: number): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Canjear Beneficio:', {
            beneficio_id: benefitId,
            empleado_id: employeeId,
            fecha_solicitud: new Date().toISOString()
        })
        
        return {
            message: 'Beneficio canjeado exitosamente. Pendiente de aprobación.',
            status: 'success'
        }
    }

    // Crear reconocimiento
    const createRecognition = async (data: RecognitionFormDTO): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Crear Reconocimiento:', {
            empleado_destino_id: data.toEmployeeId,
            categoria: data.category,
            mensaje: data.message,
            puntos: data.points,
            fecha_creacion: new Date().toISOString()
        })
        
        return {
            message: 'Reconocimiento enviado exitosamente',
            status: 'success'
        }
    }

    // Crear beneficio
    const createBenefit = async (data: BenefitFormDTO): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Crear Beneficio:', {
            nombre: data.name,
            descripcion: data.description,
            tipo: data.type,
            puntos: data.points,
            cantidad_disponible: data.availableQuantity,
            reglas_elegibilidad: data.eligibilityRules
        })
        
        return {
            message: 'Beneficio creado exitosamente',
            status: 'success'
        }
    }

    // Actualizar beneficio
    const updateBenefit = async (id: number, data: BenefitFormDTO): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Actualizar Beneficio:', {
            beneficio_id: id,
            nombre: data.name,
            descripcion: data.description,
            tipo: data.type,
            puntos: data.points,
            cantidad_disponible: data.availableQuantity,
            reglas_elegibilidad: data.eligibilityRules
        })
        
        return {
            message: 'Beneficio actualizado exitosamente',
            status: 'success'
        }
    }

    // Eliminar beneficio
    const deleteBenefit = async (id: number): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Eliminar Beneficio:', {
            beneficio_id: id
        })
        
        return {
            message: 'Beneficio eliminado exitosamente',
            status: 'success'
        }
    }

    // Configurar beneficio
    const configureBenefit = async (data: BenefitConfigFormDTO): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Configurar Beneficio:', {
            nombre: data.name,
            descripcion: data.description,
            stock_disponible: data.availableQuantity,
            score_minimo: data.minScore
        })
        
        return {
            message: 'Beneficio configurado exitosamente',
            status: 'success'
        }
    }

    // Actualizar matriz de beneficios
    const updateBenefitMatrix = async (id: number, data: BenefitMatrixFormDTO): Promise<{ message: string; status: 'success' | 'error' }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        console.log('🔄 Datos enviados al backend - Actualizar Matriz de Beneficios:', {
            matriz_id: id,
            umbral: data.threshold,
            score_minimo: data.minScore,
            beneficios: data.benefits,
            puntos_automaticos: data.autoPoints
        })
        
        return {
            message: 'Matriz actualizada exitosamente',
            status: 'success'
        }
    }

    // Obtener empleados para select (con búsqueda)
    const getEmployeesBySearch = async (query: string, limit: number = 10, page: number = 1): Promise<{ employees: SelectOptionDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        const allEmployees = [
            { id: 101, label: 'María García - Engineering Manager' },
            { id: 102, label: 'Juan Pérez - Senior Developer' },
            { id: 103, label: 'Carlos López - Product Manager' },
            { id: 104, label: 'Ana Martínez - UX Designer' },
            { id: 105, label: 'Laura Sánchez - Tech Lead' },
            { id: 106, label: 'Pedro González - Data Analyst' },
            { id: 107, label: 'Roberto Díaz - Sales Manager' },
            { id: 108, label: 'Sofia Torres - Marketing Manager' },
            { id: 109, label: 'Elena Fernández - CFO' },
            { id: 110, label: 'Diego Ramírez - HR Manager' }
        ]
        
        const filtered = allEmployees.filter(emp => 
            emp.label.toLowerCase().includes(query.toLowerCase())
        )
        
        const start = (page - 1) * limit
        const end = start + limit
        
        return {
            employees: filtered.slice(start, end),
            total: filtered.length
        }
    }

    // Obtener categorías de reconocimiento
    const getRecognitionCategories = (): SelectOptionDTO[] => {
        return [
            { id: 1, label: 'Trabajo en Equipo' },
            { id: 2, label: 'Innovación' },
            { id: 3, label: 'Liderazgo' },
            { id: 4, label: 'Excelencia' },
            { id: 5, label: 'Valores' }
        ]
    }

    // Obtener tipos de beneficio
    const getBenefitTypes = (): SelectOptionDTO[] => {
        return [
            { id: 1, label: 'Vacaciones' },
            { id: 2, label: 'Capacitación' },
            { id: 3, label: 'Salud' },
            { id: 4, label: 'Bienestar' },
            { id: 5, label: 'Financiero' },
            { id: 6, label: 'Otro' }
        ]
    }

    // Obtener historial de puntos
    const getPointsHistory = async (employeeId: number): Promise<PointsHistory[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        return [
            {
                id: 1,
                employeeId,
                employeeName: 'Juan Pérez',
                type: 'earned',
                points: 500,
                reason: 'Evaluación de desempeño Q3 2024',
                date: '2024-10-01'
            },
            {
                id: 2,
                employeeId,
                employeeName: 'Juan Pérez',
                type: 'earned',
                points: 50,
                reason: 'Reconocimiento de María García',
                date: '2024-10-15'
            },
            {
                id: 3,
                employeeId,
                employeeName: 'Juan Pérez',
                type: 'spent',
                points: -500,
                reason: 'Canje: Días Libres Extra',
                date: '2024-10-25'
            },
            {
                id: 4,
                employeeId,
                employeeName: 'Juan Pérez',
                type: 'bonus',
                points: 200,
                reason: 'Bono por proyecto exitoso',
                date: '2024-10-28'
            }
        ]
    }

    return {
        getBenefitsStats,
        getMarketplaceBenefits,
        getRecognitions,
        getEligibleEmployees,
        getBenefitMatrix,
        getRedemptions,
        redeemBenefit,
        createRecognition,
        createBenefit,
        updateBenefit,
        deleteBenefit,
        configureBenefit,
        updateBenefitMatrix,
        getEmployeesBySearch,
        getRecognitionCategories,
        getBenefitTypes,
        getPointsHistory
    }
}
