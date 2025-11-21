import type {
    NineBoxGrid,
    SuccessionPlan,
    CareerPath,
    SkillGap,
    PDI,
    PDIFormDTO,
    TalentStats,
    SelectOptionDTO
} from '@/modules/RRHH/GestionTalentos/types/talentTypes'

export function useTalentActions() {
    // Mock data para Matriz 9-Box
    const getNineBoxData = async (): Promise<NineBoxGrid> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return {
            highPotential: {
                low: [
                    {
                        id: 1,
                        name: 'Ana Martínez',
                        position: 'Desarrolladora',
                        department: 'TI',
                        score: 3.2,
                        potential: 'high',
                        performance: 'low'
                    },
                    {
                        id: 2,
                        name: 'Pedro Sánchez',
                        position: 'Analista',
                        department: 'Finanzas',
                        score: 3.1,
                        potential: 'high',
                        performance: 'low'
                    }
                ],
                medium: [
                    {
                        id: 11,
                        name: 'Laura Gómez',
                        position: 'Tech Lead',
                        department: 'TI',
                        score: 4.0,
                        potential: 'high',
                        performance: 'medium'
                    },
                    {
                        id: 12,
                        name: 'Carlos Ruiz',
                        position: 'Product Manager',
                        department: 'Producto',
                        score: 4.1,
                        potential: 'high',
                        performance: 'medium'
                    },
                    {
                        id: 13,
                        name: 'Sofia Torres',
                        position: 'UX Designer',
                        department: 'Diseño',
                        score: 3.9,
                        potential: 'high',
                        performance: 'medium'
                    }
                ],
                high: [
                    {
                        id: 21,
                        name: 'Juan Pérez',
                        position: 'Senior Developer',
                        department: 'TI',
                        score: 4.8,
                        potential: 'high',
                        performance: 'high'
                    },
                    {
                        id: 22,
                        name: 'María García',
                        position: 'Engineering Manager',
                        department: 'TI',
                        score: 4.7,
                        potential: 'high',
                        performance: 'high'
                    },
                    {
                        id: 23,
                        name: 'Roberto López',
                        position: 'VP de Ventas',
                        department: 'Ventas',
                        score: 4.9,
                        potential: 'high',
                        performance: 'high'
                    },
                    {
                        id: 24,
                        name: 'Elena Fernández',
                        position: 'CFO',
                        department: 'Finanzas',
                        score: 4.6,
                        potential: 'high',
                        performance: 'high'
                    }
                ]
            },
            mediumPotential: {
                low: [
                    {
                        id: 31,
                        name: 'Diego Morales',
                        position: 'Junior Dev',
                        department: 'TI',
                        score: 3.0,
                        potential: 'medium',
                        performance: 'low'
                    }
                ],
                medium: [
                    {
                        id: 41,
                        name: 'Patricia Ramírez',
                        position: 'Contador',
                        department: 'Finanzas',
                        score: 3.8,
                        potential: 'medium',
                        performance: 'medium'
                    },
                    {
                        id: 42,
                        name: 'Luis Hernández',
                        position: 'Vendedor',
                        department: 'Ventas',
                        score: 3.7,
                        potential: 'medium',
                        performance: 'medium'
                    },
                    {
                        id: 43,
                        name: 'Carmen Díaz',
                        position: 'HR Specialist',
                        department: 'RRHH',
                        score: 3.9,
                        potential: 'medium',
                        performance: 'medium'
                    },
                    {
                        id: 44,
                        name: 'Miguel Ángel',
                        position: 'Marketing',
                        department: 'Marketing',
                        score: 3.6,
                        potential: 'medium',
                        performance: 'medium'
                    },
                    {
                        id: 45,
                        name: 'Isabel Castro',
                        position: 'Soporte',
                        department: 'TI',
                        score: 3.8,
                        potential: 'medium',
                        performance: 'medium'
                    }
                ],
                high: [
                    {
                        id: 51,
                        name: 'Fernando Silva',
                        position: 'Senior Analyst',
                        department: 'Finanzas',
                        score: 4.5,
                        potential: 'medium',
                        performance: 'high'
                    },
                    {
                        id: 52,
                        name: 'Gabriela Ortiz',
                        position: 'Team Lead',
                        department: 'Ventas',
                        score: 4.4,
                        potential: 'medium',
                        performance: 'high'
                    },
                    {
                        id: 53,
                        name: 'Andrés Vargas',
                        position: 'QA Lead',
                        department: 'TI',
                        score: 4.3,
                        potential: 'medium',
                        performance: 'high'
                    }
                ]
            },
            lowPotential: {
                low: [
                    {
                        id: 61,
                        name: 'Ricardo Mendoza',
                        position: 'Operador',
                        department: 'Operaciones',
                        score: 2.8,
                        potential: 'low',
                        performance: 'low'
                    }
                ],
                medium: [
                    {
                        id: 71,
                        name: 'Verónica Reyes',
                        position: 'Asistente',
                        department: 'Administración',
                        score: 3.5,
                        potential: 'low',
                        performance: 'medium'
                    },
                    {
                        id: 72,
                        name: 'Javier Campos',
                        position: 'Coordinador',
                        department: 'Logística',
                        score: 3.4,
                        potential: 'low',
                        performance: 'medium'
                    }
                ],
                high: [
                    {
                        id: 81,
                        name: 'Mónica Paredes',
                        position: 'Especialista',
                        department: 'Operaciones',
                        score: 4.2,
                        potential: 'low',
                        performance: 'high'
                    },
                    {
                        id: 82,
                        name: 'Raúl Jiménez',
                        position: 'Supervisor',
                        department: 'Producción',
                        score: 4.1,
                        potential: 'low',
                        performance: 'high'
                    }
                ]
            }
        }
    }

    // Mock data para Planes de Sucesión
    const getSuccessionPlans = async (): Promise<SuccessionPlan[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                role: 'Director de Tecnología (CTO)',
                currentHolder: 'Juan Pérez',
                isCritical: true,
                readyNow: [
                    {
                        id: 22,
                        name: 'María García',
                        position: 'Engineering Manager',
                        score: 4.7,
                        readiness: 'ready',
                        isHighPotential: true
                    },
                    {
                        id: 21,
                        name: 'Juan Pérez',
                        position: 'Senior Developer',
                        score: 4.8,
                        readiness: 'ready',
                        isHighPotential: true
                    }
                ],
                inDevelopment: [
                    {
                        id: 11,
                        name: 'Laura Gómez',
                        position: 'Tech Lead',
                        score: 4.0,
                        readiness: 'development',
                        isHighPotential: true
                    },
                    {
                        id: 12,
                        name: 'Carlos Ruiz',
                        position: 'Product Manager',
                        score: 4.1,
                        readiness: 'development',
                        isHighPotential: true
                    },
                    {
                        id: 51,
                        name: 'Fernando Silva',
                        position: 'Senior Analyst',
                        score: 4.5,
                        readiness: 'development',
                        isHighPotential: false
                    }
                ]
            },
            {
                id: 2,
                role: 'CFO (Director Financiero)',
                currentHolder: 'Elena Fernández',
                isCritical: true,
                readyNow: [
                    {
                        id: 51,
                        name: 'Fernando Silva',
                        position: 'Senior Analyst',
                        score: 4.5,
                        readiness: 'ready',
                        isHighPotential: false
                    }
                ],
                inDevelopment: [
                    {
                        id: 41,
                        name: 'Patricia Ramírez',
                        position: 'Contador',
                        score: 3.8,
                        readiness: 'development',
                        isHighPotential: false
                    },
                    {
                        id: 2,
                        name: 'Pedro Sánchez',
                        position: 'Analista',
                        score: 3.1,
                        readiness: 'development',
                        isHighPotential: true
                    }
                ]
            },
            {
                id: 3,
                role: 'VP de Ventas',
                currentHolder: 'Roberto López',
                isCritical: true,
                readyNow: [
                    {
                        id: 52,
                        name: 'Gabriela Ortiz',
                        position: 'Team Lead',
                        score: 4.4,
                        readiness: 'ready',
                        isHighPotential: false
                    },
                    {
                        id: 42,
                        name: 'Luis Hernández',
                        position: 'Vendedor',
                        score: 3.7,
                        readiness: 'ready',
                        isHighPotential: false
                    },
                    {
                        id: 23,
                        name: 'Roberto López',
                        position: 'VP de Ventas',
                        score: 4.9,
                        readiness: 'ready',
                        isHighPotential: true
                    }
                ],
                inDevelopment: [
                    {
                        id: 44,
                        name: 'Miguel Ángel',
                        position: 'Marketing',
                        score: 3.6,
                        readiness: 'development',
                        isHighPotential: false
                    },
                    {
                        id: 43,
                        name: 'Carmen Díaz',
                        position: 'HR Specialist',
                        score: 3.9,
                        readiness: 'development',
                        isHighPotential: false
                    },
                    {
                        id: 45,
                        name: 'Isabel Castro',
                        position: 'Soporte',
                        score: 3.8,
                        readiness: 'development',
                        isHighPotential: false
                    },
                    {
                        id: 13,
                        name: 'Sofia Torres',
                        position: 'UX Designer',
                        score: 3.9,
                        readiness: 'development',
                        isHighPotential: true
                    }
                ]
            }
        ]
    }

    // Mock data para Mapas de Carrera
    const getCareerPaths = async (): Promise<CareerPath[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                currentRole: 'Desarrollador Senior',
                currentDepartment: 'Tecnología',
                nextRoles: [
                    {
                        id: 1,
                        name: 'Tech Lead',
                        type: 'vertical',
                        skillGaps: ['Arquitectura de Software', 'Mentoría', 'Gestión de Proyectos'],
                        estimatedTime: '6-12 meses'
                    },
                    {
                        id: 2,
                        name: 'Product Manager',
                        type: 'lateral',
                        skillGaps: [
                            'Product Strategy',
                            'Stakeholder Management',
                            'Roadmapping',
                            'User Research'
                        ],
                        estimatedTime: '12-18 meses'
                    },
                    {
                        id: 3,
                        name: 'Engineering Manager',
                        type: 'vertical',
                        skillGaps: ['Liderazgo de Equipos', 'People Management', 'Presupuestos'],
                        estimatedTime: '18-24 meses'
                    }
                ]
            }
        ]
    }

    // Mock data para Brechas de Habilidades
    const getSkillGaps = async (): Promise<SkillGap[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                skill: 'Liderazgo',
                coverage: 85,
                level: 'excellent',
                employeesWithSkill: 127,
                totalEmployees: 150
            },
            {
                id: 2,
                skill: 'Innovación',
                coverage: 72,
                level: 'good',
                employeesWithSkill: 108,
                totalEmployees: 150
            },
            {
                id: 3,
                skill: 'Data Analytics',
                coverage: 58,
                level: 'warning',
                employeesWithSkill: 87,
                totalEmployees: 150
            },
            {
                id: 4,
                skill: 'IA/ML',
                coverage: 42,
                level: 'critical',
                employeesWithSkill: 63,
                totalEmployees: 150
            },
            {
                id: 5,
                skill: 'Cloud Computing',
                coverage: 68,
                level: 'good',
                employeesWithSkill: 102,
                totalEmployees: 150
            },
            {
                id: 6,
                skill: 'Ciberseguridad',
                coverage: 51,
                level: 'warning',
                employeesWithSkill: 77,
                totalEmployees: 150
            },
            {
                id: 7,
                skill: 'Metodologías Ágiles',
                coverage: 78,
                level: 'good',
                employeesWithSkill: 117,
                totalEmployees: 150
            },
            {
                id: 8,
                skill: 'Customer Experience',
                coverage: 64,
                level: 'good',
                employeesWithSkill: 96,
                totalEmployees: 150
            }
        ]
    }

    // Mock data para PDIs
    const getPDIs = async (): Promise<PDI[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: 1,
                employeeId: 22,
                employeeName: 'María García',
                employeePosition: 'Engineering Manager',
                competency: 'Liderazgo Estratégico',
                action: 'MBA Ejecutivo en ITESM',
                startDate: '2024-01-15',
                endDate: '2025-06-30',
                progress: 45,
                status: 'active'
            },
            {
                id: 2,
                employeeId: 12,
                employeeName: 'Carlos Ruiz',
                employeePosition: 'Product Manager',
                competency: 'Innovación y Creatividad',
                action: 'Liderar proyecto piloto de IA',
                startDate: '2024-03-01',
                endDate: '2024-12-31',
                progress: 72,
                status: 'active'
            },
            {
                id: 3,
                employeeId: 1,
                employeeName: 'Ana Martínez',
                employeePosition: 'Desarrolladora',
                competency: 'Comunicación Efectiva',
                action: 'Taller de oratoria y presentaciones',
                startDate: '2024-05-01',
                endDate: '2024-08-31',
                progress: 30,
                status: 'active'
            },
            {
                id: 4,
                employeeId: 11,
                employeeName: 'Laura Gómez',
                employeePosition: 'Tech Lead',
                competency: 'Arquitectura de Software',
                action: 'Certificación AWS Solutions Architect',
                startDate: '2024-02-01',
                endDate: '2024-07-31',
                progress: 88,
                status: 'active'
            },
            {
                id: 5,
                employeeId: 51,
                employeeName: 'Fernando Silva',
                employeePosition: 'Senior Analyst',
                competency: 'Análisis Financiero Avanzado',
                action: 'Curso CFA Level 1',
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                progress: 55,
                status: 'active'
            }
        ]
    }

    // Crear PDI
    const createPDI = async (
        data: PDIFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log('Crear PDI - Datos:', data)

        return {
            message: 'Plan de Desarrollo creado exitosamente',
            status: 'success',
            data: data
        }
    }

    // Actualizar PDI
    const updatePDI = async (
        id: number,
        data: PDIFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log('Actualizar PDI - ID:', id, 'Datos:', data)

        return {
            message: 'Plan de Desarrollo actualizado exitosamente',
            status: 'success',
            data: data
        }
    }

    // Eliminar PDI
    const deletePDI = async (id: number): Promise<{ message: string; status: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log('Eliminar PDI - ID:', id)

        return {
            message: 'Plan de Desarrollo eliminado exitosamente',
            status: 'success'
        }
    }

    // Estadísticas del dashboard
    const getTalentStats = async (): Promise<TalentStats> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return {
            highPotentials: 127,
            inDevelopment: 384,
            criticalRoles: 42,
            criticalSkillGaps: 18
        }
    }

    // Obtener empleados para select
    const getEmployeesForSelect = async (): Promise<SelectOptionDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            { id: 1, label: 'Ana Martínez - Desarrolladora' },
            { id: 2, label: 'Pedro Sánchez - Analista' },
            { id: 11, label: 'Laura Gómez - Tech Lead' },
            { id: 12, label: 'Carlos Ruiz - Product Manager' },
            { id: 21, label: 'Juan Pérez - Senior Developer' },
            { id: 22, label: 'María García - Engineering Manager' },
            { id: 23, label: 'Roberto López - VP de Ventas' },
            { id: 24, label: 'Elena Fernández - CFO' }
        ]
    }

    // Búsqueda de empleados (similar a Vacaciones)
    const getEmployeesBySearch = async (
        query: string,
        limit: number = 10,
        page: number = 1
    ): Promise<{ employees: Array<{ id: number; title: string }> }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const allEmployees = [
            { id: 1, title: 'Ana Martínez - Desarrolladora' },
            { id: 2, title: 'Pedro Sánchez - Analista' },
            { id: 11, title: 'Laura Gómez - Tech Lead' },
            { id: 12, title: 'Carlos Ruiz - Product Manager' },
            { id: 13, title: 'Sofia Torres - UX Designer' },
            { id: 21, title: 'Juan Pérez - Senior Developer' },
            { id: 22, title: 'María García - Engineering Manager' },
            { id: 23, title: 'Roberto López - VP de Ventas' },
            { id: 24, title: 'Elena Fernández - CFO' },
            { id: 31, title: 'Diego Morales - Junior Dev' },
            { id: 41, title: 'Patricia Ramírez - Contador' },
            { id: 42, title: 'Luis Hernández - Vendedor' },
            { id: 43, title: 'Carmen Díaz - HR Specialist' },
            { id: 44, title: 'Miguel Ángel - Marketing' },
            { id: 45, title: 'Isabel Castro - Soporte' },
            { id: 51, title: 'Fernando Silva - Senior Analyst' },
            { id: 52, title: 'Gabriela Ortiz - Team Lead' },
            { id: 53, title: 'Andrés Vargas - QA Lead' },
            { id: 61, title: 'Ricardo Mendoza - Operador' },
            { id: 71, title: 'Verónica Reyes - Asistente' },
            { id: 72, title: 'Javier Campos - Coordinador' },
            { id: 81, title: 'Mónica Paredes - Especialista' },
            { id: 82, title: 'Raúl Jiménez - Supervisor' }
        ]

        // Filtrar por query
        const filtered = allEmployees.filter((emp) =>
            emp.title.toLowerCase().includes(query.toLowerCase())
        )

        // Paginación
        const start = (page - 1) * limit
        const end = start + limit
        const paginated = filtered.slice(start, end)

        return {
            employees: paginated
        }
    }

    return {
        getNineBoxData,
        getSuccessionPlans,
        getCareerPaths,
        getSkillGaps,
        getPDIs,
        createPDI,
        updatePDI,
        deletePDI,
        getTalentStats,
        getEmployeesForSelect,
        getEmployeesBySearch
    }
}
