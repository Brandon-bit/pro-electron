import { defineStore } from 'pinia'
import type { ProjectType, UserType, AreaType } from '@/modules/GestionDeProyectos\AltaDeProyectos\types\projectTypes'

const initialProject: ProjectType = {
    id: undefined,
    folio: undefined,
    name: '',
    startDate: null,
    endDate: null,
    budget: '',
    projectId: '',
    objective: '',
    scope: '',
    leader: '',
    sponsor: '',
    projectManager: '',
    processManager: '',
    area: '',
    category: '',
    additionalAdmins: [],
    isSubproject: false,
    parentProject: '',
    includeSaturday: false,
    includeSunday: false,
    projectType: '',
    classification: '',
    active: true
}

// Mock data
const mockUsers = {
    leaders: [
        { id: '1', name: 'Juan Pérez' },
        { id: '2', name: 'María García' }
    ],
    sponsors: [
        { id: '3', name: 'Carlos López' },
        { id: '4', name: 'Ana Martínez' }
    ],
    projectManagers: [
        { id: '5', name: 'Pedro Sánchez' },
        { id: '6', name: 'Laura Rodríguez' }
    ],
    processManagers: [
        { id: '7', name: 'Miguel Torres' },
        { id: '8', name: 'Isabel Fernández' }
    ],
    admins: [
        { id: '9', name: 'Roberto Gómez' },
        { id: '10', name: 'Carmen Ruiz' },
        { id: '11', name: 'Francisco Díaz' }
    ]
}

const mockAreas: AreaType[] = [
    { id: '1', name: 'Tecnología', categories: ['Desarrollo', 'Infraestructura', 'Seguridad'] },
    { id: '2', name: 'Marketing', categories: ['Digital', 'Tradicional', 'Eventos'] },
    { id: '3', name: 'Recursos Humanos', categories: ['Reclutamiento', 'Capacitación', 'Bienestar'] }
]

const mockClassifications = ['Estratégico', 'Operacional', 'Táctico']

const mockProjects = [
    { id: 'PRJ-001', name: 'Sistema CRM' },
    { id: 'PRJ-002', name: 'Portal Web' }
]

const useProjectStore = defineStore('project-store', {
    state: () => ({
        selectedProject: initialProject as ProjectType,
        projects: [] as ProjectType[],
        users: mockUsers,
        areas: mockAreas,
        classifications: mockClassifications,
        parentProjects: mockProjects,
        selectedCategories: [] as string[],
        showTemplateModal: false,
        showImportModal: false,
        modalId: 'project-modal'
    }),
    actions: {
        setData(data: ProjectType = initialProject) {
            this.selectedProject = data
        },
        setProjects(projects: ProjectType[]) {
            this.projects = projects
        },
        updateField(field: keyof ProjectType, value: any) {
            (this.selectedProject as any)[field] = value
        },
        toggleAdmin(adminId: string) {
            const index = this.selectedProject.additionalAdmins.indexOf(adminId)
            if (index > -1) {
                this.selectedProject.additionalAdmins.splice(index, 1)
            } else {
                this.selectedProject.additionalAdmins.push(adminId)
            }
        },
        updateCategoriesByArea(areaId: string) {
            const area = this.areas.find(a => a.id === areaId)
            this.selectedCategories = area?.categories || []
            this.selectedProject.category = ''
        },
        resetForm() {
            this.selectedProject = { ...initialProject }
            this.selectedCategories = []
        },
        setShowTemplateModal(show: boolean) {
            this.showTemplateModal = show
        },
        setShowImportModal(show: boolean) {
            this.showImportModal = show
        },
        loadFromSOW() {
            const savedSOWs = localStorage.getItem('sow_documents')
            if (savedSOWs) {
                const sows = JSON.parse(savedSOWs)
                if (sows.length > 0) {
                    const latestSOW = sows[sows.length - 1]
                    this.selectedProject.name = latestSOW.projectName || ''
                    this.selectedProject.budget = latestSOW.budget || ''
                    this.selectedProject.projectId = latestSOW.projectId || ''
                    this.selectedProject.objective = latestSOW.projectObjective || ''
                    this.selectedProject.scope = latestSOW.projectScope || ''
                }
            }
        }
    }
})

export default useProjectStore
