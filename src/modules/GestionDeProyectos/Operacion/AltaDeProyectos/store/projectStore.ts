import { defineStore } from 'pinia'
import type {
  ProjectType,
  OptionType,
} from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/types/projectTypes'

const initialProject: ProjectType = {
  name: '',
  customId: '',
  startDate: '', // String vacío para input type="date"
  endDate: '', // String vacío para input type="date"
  estimatedBudget: 0,
  classificationId: 0, // 0 para mostrar "Elige una opción"
  objective: '',
  scope: '',
  leaderId: '0', // '0' para mostrar "Elige una opción"
  sponsorId: '0', // '0' para mostrar "Elige una opción"
  projectManagerId: '0', // '0' para mostrar "Elige una opción" (opcional)
  processManagerId: '0', // '0' para mostrar "Elige una opción" (opcional)
  areaId: 0, // 0 para mostrar "Elige una opción"
  categoryId: 0, // 0 para mostrar "Elige una opción"
  adminIds: [],
  isSubproject: false,
  parentProjectId: null,
  includeSaturday: false,
  includeSunday: false,
  isInvestmentType: false,
  useTemplate: false,
  templateId: null,
  useInitiative: false,
  initiativeId: null,
  active: true,
}

const useProjectStore = defineStore('project-store', {
  state: () => ({
    // Proyecto actual
    selectedProject: { ...initialProject } as ProjectType,

    // Opciones para los selects (cargadas desde el API)
    classifications: [] as OptionType[],
    areas: [] as OptionType[],
    leaders: [] as OptionType[],
    sponsors: [] as OptionType[],
    projectManagers: [] as OptionType[],
    processManagers: [] as OptionType[],
    admins: [] as OptionType[],
    categories: [] as OptionType[],
    parentProjects: [] as OptionType[],
    templates: [] as OptionType[],

    // Estado de carga
    isLoading: false,
    isLoadingCategories: false,
    isLoadingParentProjects: false,
    isLoadingTemplates: false,

    // Plantilla seleccionada
    selectedTemplate: null as { dni: number | string; label: string } | null,

    // Modales
    showTemplateModal: false,
    showImportModal: false,
    modalId: 'project-modal',
    templateModalId: 'template-modal',
  }),
  actions: {
    /**
     * Set the selected project data
     */
    setData(data: ProjectType = initialProject) {
      this.selectedProject = { ...data }
    },

    /**
     * Update a specific field of the selected project
     */
    updateField(field: keyof ProjectType, value: any) {
      ;(this.selectedProject as any)[field] = value
    },

    /**
     * Toggle an admin in the adminIds array
     */
    toggleAdmin(adminId: string) {
      const index = this.selectedProject.adminIds.indexOf(adminId)
      if (index > -1) {
        this.selectedProject.adminIds.splice(index, 1)
      } else {
        this.selectedProject.adminIds.push(adminId)
      }
    },

    /**
     * Reset the form to initial state
     */
    resetForm() {
      this.selectedProject = { ...initialProject }
      this.categories = []
    },

    /**
     * Set the form data options from API response
     */
    setFormDataOptions(data: {
      clasificaciones: OptionType[]
      areas: OptionType[]
      lideres: OptionType[]
      sponsors: OptionType[]
      projectManagers: OptionType[]
      procesos: OptionType[]
      administradores: OptionType[]
    }) {
      this.classifications = data.clasificaciones
      this.areas = data.areas
      this.leaders = data.lideres
      this.sponsors = data.sponsors
      this.projectManagers = data.projectManagers
      this.processManagers = data.procesos
      this.admins = data.administradores
    },

    /**
     * Set category options for the selected area
     */
    setCategories(categories: OptionType[]) {
      this.categories = categories
    },

    /**
     * Clear categories when area changes
     */
    clearCategories() {
      this.categories = []
      this.selectedProject.categoryId = 0
    },

    /**
     * Set parent project options
     */
    setParentProjects(projects: OptionType[]) {
      this.parentProjects = projects
    },

    /**
     * Clear parent projects
     */
    clearParentProjects() {
      this.parentProjects = []
      this.selectedProject.parentProjectId = null
    },

    /**
     * Set template options
     */
    setTemplates(templates: OptionType[]) {
      this.templates = templates
    },

    /**
     * Set selected template
     */
    setSelectedTemplate(template: { dni: number | string; label: string } | null) {
      this.selectedTemplate = template
    },

    /**
     * Clear selected template
     */
    clearSelectedTemplate() {
      this.selectedTemplate = null
      this.selectedProject.useTemplate = false
      this.selectedProject.templateId = null
    },

    /**
     * Set template modal visibility
     */
    setShowTemplateModal(show: boolean) {
      this.showTemplateModal = show
    },

    /**
     * Set import modal visibility
     */
    setShowImportModal(show: boolean) {
      this.showImportModal = show
    },

    /**
     * Load project data from SOW (Statement of Work) if available
     */
    loadFromSOW() {
      const savedSOWs = localStorage.getItem('sow_documents')
      if (savedSOWs) {
        const sows = JSON.parse(savedSOWs)
        if (sows.length > 0) {
          const latestSOW = sows[sows.length - 1]
          this.selectedProject.name = latestSOW.projectName || ''
          this.selectedProject.estimatedBudget = parseFloat(latestSOW.budget) || 0
          this.selectedProject.customId = latestSOW.projectId || ''
          this.selectedProject.objective = latestSOW.projectObjective || ''
          this.selectedProject.scope = latestSOW.projectScope || ''
        }
      }
    },
  },
})

export default useProjectStore
