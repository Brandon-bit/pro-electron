import type { ProjectEvidenceType, EvidenceType } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/types/evidenceTypes'
import useEvidenceStore from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/store/evidenceStore'
import { useRouter } from 'vue-router'

export const useEvidenceActions = () => {
    
    const evidenceStore = useEvidenceStore()
    const router = useRouter()

    const loadProjects = () => {
        const storedProjects = localStorage.getItem('projects')
        const storedEvidences = localStorage.getItem('projectEvidences')
        
        // Si no hay proyectos en localStorage, usar datos de ejemplo
        if (!storedProjects) {
            const mockProjects: ProjectEvidenceType[] = [
                {
                    id: 'proj-001',
                    name: 'Sistema CRM Empresarial',
                    folio: '00000001',
                    stage: 'Desarrollo',
                    startDate: '2024-01-15',
                    endDate: '2024-12-31',
                    status: 'En Tiempo',
                    evidenceCount: 12
                },
                {
                    id: 'proj-002',
                    name: 'Portal Web Corporativo',
                    folio: '00000002',
                    stage: 'Diseño',
                    startDate: '2024-02-01',
                    endDate: '2024-08-30',
                    status: 'Atrasado',
                    evidenceCount: 8
                },
                {
                    id: 'proj-003',
                    name: 'App Móvil de Ventas',
                    folio: '00000003',
                    stage: 'Desarrollo',
                    startDate: '2024-03-10',
                    endDate: '2024-10-15',
                    status: 'En Tiempo',
                    evidenceCount: 15
                },
                {
                    id: 'proj-004',
                    name: 'Migración a la Nube',
                    folio: '00000004',
                    stage: 'Implementación',
                    startDate: '2023-11-01',
                    endDate: '2024-05-31',
                    status: 'Crítico',
                    evidenceCount: 6
                },
                {
                    id: 'proj-005',
                    name: 'Campaña Marketing Digital',
                    folio: '00000005',
                    stage: 'Ejecución',
                    startDate: '2024-01-01',
                    endDate: '2024-06-30',
                    status: 'En Tiempo',
                    evidenceCount: 20
                },
                {
                    id: 'proj-006',
                    name: 'Sistema de Inventarios',
                    folio: '00000006',
                    stage: 'Análisis',
                    startDate: '2024-04-01',
                    endDate: '2024-11-30',
                    status: 'En Tiempo',
                    evidenceCount: 4
                },
                {
                    id: 'proj-007',
                    name: 'Plataforma E-Learning',
                    folio: '00000007',
                    stage: 'Desarrollo',
                    startDate: '2024-02-15',
                    endDate: '2024-09-30',
                    status: 'Atrasado',
                    evidenceCount: 10
                },
                {
                    id: 'proj-008',
                    name: 'Sistema de Facturación',
                    folio: '00000008',
                    stage: 'Pruebas',
                    startDate: '2024-01-20',
                    endDate: '2024-07-20',
                    status: 'En Tiempo',
                    evidenceCount: 18
                }
            ]
            evidenceStore.setProjects(mockProjects)
            return
        }
        
        const projectsData = JSON.parse(storedProjects)
        const evidencesData = storedEvidences ? JSON.parse(storedEvidences) : {}
        
        // Filter only ongoing projects and count evidences
        const projects: ProjectEvidenceType[] = projectsData
            .filter((p: any) => p.status !== 'Finalizado' && p.status !== 'Completado')
            .map((project: any) => {
                const projectEvidences = evidencesData[project.id] || []
                return {
                    id: project.id,
                    name: project.name,
                    folio: project.folio,
                    stage: project.currentStage || 'Iniciación',
                    startDate: project.startDate || '',
                    endDate: project.endDate || '',
                    status: project.status || 'En Tiempo',
                    evidenceCount: projectEvidences.length
                }
            })
        
        evidenceStore.setProjects(projects)
    }

    const getProjectEvidences = (projectId: string): EvidenceType[] => {
        const storedEvidences = localStorage.getItem('projectEvidences')
        
        // Si no hay evidencias en localStorage, usar datos de ejemplo
        if (!storedEvidences) {
            // Generar evidencias de ejemplo según el proyecto
            const mockEvidences: EvidenceType[] = [
                {
                    id: `ev-${projectId}-001`,
                    fileName: 'Acta_Inicio_Proyecto.pdf',
                    fileUrl: '#',
                    uploadDate: '2024-01-15',
                    activityId: 'act-001',
                    activityName: 'Kick-off Meeting',
                    stageName: 'Iniciación',
                    responsible: 'Juan Pérez'
                },
                {
                    id: `ev-${projectId}-002`,
                    fileName: 'Requerimientos_Funcionales.docx',
                    fileUrl: '#',
                    uploadDate: '2024-01-20',
                    activityId: 'act-002',
                    activityName: 'Levantamiento de Requerimientos',
                    stageName: 'Análisis',
                    responsible: 'María García'
                },
                {
                    id: `ev-${projectId}-003`,
                    fileName: 'Diseño_Arquitectura.pdf',
                    fileUrl: '#',
                    uploadDate: '2024-02-05',
                    activityId: 'act-003',
                    activityName: 'Diseño de Arquitectura',
                    stageName: 'Diseño',
                    responsible: 'Carlos López'
                },
                {
                    id: `ev-${projectId}-004`,
                    fileName: 'Mockups_UI.fig',
                    fileUrl: '#',
                    uploadDate: '2024-02-15',
                    activityId: 'act-004',
                    activityName: 'Diseño de Interfaces',
                    stageName: 'Diseño',
                    responsible: 'Ana Martínez'
                },
                {
                    id: `ev-${projectId}-005`,
                    fileName: 'Sprint_1_Review.pptx',
                    fileUrl: '#',
                    uploadDate: '2024-03-01',
                    activityId: 'act-005',
                    activityName: 'Sprint Review',
                    stageName: 'Desarrollo',
                    responsible: 'Juan Pérez'
                }
            ]
            return mockEvidences
        }
        
        const evidencesData = JSON.parse(storedEvidences)
        return evidencesData[projectId] || []
    }

    const handleGanttClick = (projectId: string) => {
        router.push(`/gestion-de-proyectos/gantt/${projectId}`)
    }

    const getProjects = async (page: number, pageSize: number): Promise<{ items: ProjectEvidenceType[]; total: number }> => {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const allProjects = evidenceStore.projects
        
        // Calcular paginación
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedProjects = allProjects.slice(start, end)
        
        return {
            items: paginatedProjects,
            total: allProjects.length
        }
    }

    return {
        loadProjects,
        getProjects,
        getProjectEvidences,
        handleGanttClick
    }
}
