import { defineStore } from 'pinia'
import type { 
  Survey, 
  Template, 
  Execution, 
  PublicResponse,
  CreateSurveyRequest,
  CreateTemplateRequest,
  CreateExecutionRequest,
  UpdateExecutionRequest,
  SurveyStatistics 
} from '@/modules/Marketing/Benchmarking/types/benchmarkingTypes'
import type { Brand as DashboardBrand } from '@/modules/Marketing/Dashboard/types/marketingTypes'
import type { Brand as GestionBrand } from '@/modules/Marketing/GestionMarcas/types/brandTypes'
import * as benchmarkingService from '@/modules/Marketing/Benchmarking/services/benchmarkingService'
import { getBrandsByAccountService } from '@/modules/Marketing/GestionMarcas/services/brandServices'

// Función adaptadora para convertir marcas de Gestión a formato Dashboard
const adaptBrandToSelector = (gestionBrand: GestionBrand): DashboardBrand => ({
  id: gestionBrand.id.toString(), // Convertir number a string
  name: gestionBrand.nombreMarca   // Mapear nombreMarca a name
});

export const useBenchmarkingStore = defineStore('benchmarking', {
  state: () => ({
    // Selected brand for filtering
    selectedBrandId: null as string | null,
    
    // Brands for dynamic selection
    brands: [] as DashboardBrand[],
    isLoadingBrands: false,
    
    // Data entities - CRÍTICO: Inicializar como arrays vacíos
    templates: [] as Template[],
    currentTemplate: null as Template | null,
    
    surveys: [] as Survey[],
    currentSurvey: null as Survey | null,
    
    executions: [] as Execution[], // Para OperacionTab (paginado)
    currentExecution: null as Execution | null,
    
    allSurveyResponses: [] as (Execution[] | PublicResponse[]), // Para ResultadosTab (todas las respuestas)
    
    publicResponses: [] as PublicResponse[],
    statistics: null as SurveyStatistics | null,
    
    // UI state
    isLoading: false,
    currentError: null as string | null,
    
    // Modal state
    isStudyModalOpen: false,
    isTemplateModalOpen: false,
    isEditSurveyModalOpen: false,
    isEditTemplateModalOpen: false,
    surveyToEdit: null as Survey | null,
    templateToEdit: null as Template | null,
  }),

  getters: {
    // Templates
    publicTemplates: (state) => state.templates.filter(t => t.isPublic),
    privateTemplates: (state) => state.templates.filter(t => !t.isPublic),
    
    // Surveys
    activeSurveys: (state) => state.surveys.filter(s => s.status === 'active'),
    draftSurveys: (state) => state.surveys.filter(s => s.status === 'draft'),
    closedSurveys: (state) => state.surveys.filter(s => s.status === 'closed'),
    
    benchmarkingSurveys: (state) => state.surveys.filter(s => s.type === 'benchmarking'),
    mysterySurveys: (state) => state.surveys.filter(s => s.type === 'mystery'),
    
    // Executions
    pendingExecutions: (state) => state.executions.filter(e => e.status === 'pending'),
    completedExecutions: (state) => state.executions.filter(e => e.status === 'completed'),
    
    // Helpers
    hasError: (state) => !!state.currentError
  },

  actions: {
    // ============================================
    // BRANDS MANAGEMENT
    // ============================================
    clearResultsState() {
      this.allSurveyResponses = [];
    },
    async fetchBrands() {
      try {
        this.isLoadingBrands = true
        this.currentError = null
        
        // El backend obtiene el ID de cuenta desde los claims del token
        const response = await getBrandsByAccountService()
        
        if (response.success && response.data?.items) {
          // Convertir las marcas de Gestión al formato esperado
          this.brands = response.data.items.map(adaptBrandToSelector)
          
          // Auto-select first brand if none selected
          if (this.brands.length > 0 && !this.selectedBrandId) {
            this.selectedBrandId = this.brands[0].id
          }
        } else {
          this.brands = []
          this.currentError = response.message || 'No se pudieron cargar las marcas'
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching brands'
        this.brands = []
        throw err
      } finally {
        this.isLoadingBrands = false
      }
    },

    // ============================================
    // BRAND SELECTION
    // ============================================
    setSelectedBrand(brandId: string) {
      this.selectedBrandId = brandId
    },

    // ============================================
    // TEMPLATES
    // ============================================
    async fetchTemplates() {
      if (!this.selectedBrandId) {
        this.currentError = 'No brand selected'
        return
      }
      
      try {
        this.isLoading = true
        this.currentError = null
        const response = await benchmarkingService.getTemplatesByAccountService(this.selectedBrandId)
  
        if (response && response.success && Array.isArray(response.data.items)) {
          this.templates = response.data.items
        } else {
          this.templates = [] // Asegurar que sea un array
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching templates'
  this.templates = [] // Asegurar que sea un array en caso de error
  throw err
      } finally {
        this.isLoading = false
      }
    },

    async fetchTemplateById(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        this.currentTemplate = await benchmarkingService.getTemplateByIdService(id)
        return this.currentTemplate
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching template'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async createTemplate(data: CreateTemplateRequest) {
      try {
        this.isLoading = true
        this.currentError = null
        const newTemplate = await benchmarkingService.createTemplateService(data)
        
        if (!Array.isArray(this.templates)) {
          this.templates = []
        }
        
        // Crear nuevo array para forzar reactividad
        this.templates = [...this.templates, newTemplate]
        return newTemplate
      } catch (err: any) {
        this.currentError = err.message || 'Error creating template'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async updateTemplate(id: string, data: Partial<Template>) {
      try {
        this.isLoading = true
        this.currentError = null
        const updated = await benchmarkingService.updateTemplateService(id, data)
        const index = this.templates.findIndex(t => t.id === id)
        if (index !== -1) {
          // Crear nuevo array para forzar reactividad
          this.templates = [
            ...this.templates.slice(0, index),
            updated,
            ...this.templates.slice(index + 1)
          ]
        }
        return updated
      } catch (err: any) {
        this.currentError = err.message || 'Error updating template'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteTemplate(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        await benchmarkingService.deleteTemplateService(id)
        this.templates = this.templates.filter(t => t.id !== id)
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting template'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async fetchPublicTemplates() {
      try {
        this.isLoading = true
        this.currentError = null
        const publicTemplates = await benchmarkingService.getPublicTemplatesService()
        // Merge with existing templates
        publicTemplates.forEach(pt => {
          if (!this.templates.find(t => t.id === pt.id)) {
            this.templates.push(pt)
          }
        })
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching public templates'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // ============================================
    // SURVEYS
    // ============================================
    async fetchSurveys() {
      if (!this.selectedBrandId) {
        this.currentError = 'No brand selected'
        return
      }
      
      try {
        this.isLoading = true
        this.currentError = null
        const response = await benchmarkingService.getSurveysByAccountService(this.selectedBrandId)
  
        if (response && response.success && Array.isArray(response.data.items)) {
          this.surveys = response.data.items
        } else {
          this.surveys = [] // Asegurar que sea un array
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching surveys'
        this.surveys = [] // Asegurar que sea un array en caso de error
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async fetchSurveyById(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        this.currentSurvey = await benchmarkingService.getSurveyByIdService(id)
        return this.currentSurvey
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching survey'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async createSurvey(data: CreateSurveyRequest) {
      try {
        this.isLoading = true
        this.currentError = null
        const newSurvey = await benchmarkingService.createSurveyService(data)
        
        // Asegurar que surveys es un array
        if (!Array.isArray(this.surveys)) {
          this.surveys = []
        }
        
        // Crear nuevo array para forzar reactividad
        this.surveys = [...this.surveys, newSurvey]
        return newSurvey
      } catch (err: any) {
        this.currentError = err.message || 'Error creating survey'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async updateSurvey(id: string, data: Partial<Survey>) {
      try {
        this.isLoading = true
        this.currentError = null
        const updated = await benchmarkingService.updateSurveyService(id, data)
        const index = this.surveys.findIndex(s => s.id === id)
        if (index !== -1) {
          // Crear nuevo array para forzar reactividad
          this.surveys = [
            ...this.surveys.slice(0, index),
            updated,
            ...this.surveys.slice(index + 1)
          ]
        }
        return updated
      } catch (err: any) {
        this.currentError = err.message || 'Error updating survey'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteSurvey(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        await benchmarkingService.deleteSurveyService(id)
        this.surveys = this.surveys.filter(s => s.id !== id)
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting survey'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async changeSurveyStatus(id: string, status: string) {
      try {
        this.isLoading = true
        this.currentError = null
        const updated = await benchmarkingService.changeSurveyStatusService(id, status)
        const index = this.surveys.findIndex(s => s.id === id)
        if (index !== -1) {
          // Crear nuevo array para forzar reactividad
          this.surveys = [
            ...this.surveys.slice(0, index),
            updated,
            ...this.surveys.slice(index + 1)
          ]
        }
        return updated
      } catch (err: any) {
        this.currentError = err.message || 'Error changing survey status'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async generatePublicUrl(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        const result = await benchmarkingService.generatePublicUrlService(id)
        
        // Construir URL del frontend en lugar de usar la del backend
        const frontendUrl = window.location.origin // http://localhost:5173
        const publicToken = result.publicUrl.split('/').pop() // Extraer token de la URL del backend
        const frontendPublicUrl = `${frontendUrl}/survey/${publicToken}`
        
        const index = this.surveys.findIndex(s => s.id === id)
        if (index !== -1) {
          this.surveys[index].publicUrl = frontendPublicUrl
        }
        return frontendPublicUrl
      } catch (err: any) {
        this.currentError = err.message || 'Error generating public URL'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // ============================================
    // EXECUTIONS
    // ============================================
    async fetchExecutionsBySurvey(surveyId: string, page: number = 1, pageSize: number = 10) {
      try {
        this.isLoading = true
        this.currentError = null
        const result = await benchmarkingService.getExecutionsBySurveyService(surveyId, page, pageSize)
        this.executions = result.items
        return result
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching executions'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Obtiene TODAS las respuestas (ejecuciones completadas) de un survey
     * para la pestaña de Resultados.
     */
    async fetchAllSurveyResponses(surveyId: string) {
  if (!surveyId) {
    this.currentError = 'No survey ID provided'
    return
  }
  
  try {
    this.isLoading = true
    this.currentError = null
    
    // 1. El servicio (getSurveyResponsesService) devuelve el array [...]
    const responsesArray = await benchmarkingService.getSurveyResponsesService(surveyId)
    
    // 2. Asigna el array a allSurveyResponses (NO a executions)
    this.allSurveyResponses = responsesArray // <-- CORRECTO: Para ResultadosTab
    
  } catch (err: any) {
    this.currentError = err.message || 'Error fetching all survey responses'
    this.allSurveyResponses = [] // Asegurar que sea un array en caso de error
    throw err
  } finally {
    this.isLoading = false
  }
},

    async fetchExecutionById(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        this.currentExecution = await benchmarkingService.getExecutionByIdService(id)
        return this.currentExecution
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching execution'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async createExecution(data: CreateExecutionRequest) {
      try {
        this.isLoading = true
        this.currentError = null
        const newExecution = await benchmarkingService.createExecutionService(data)
        this.executions.push(newExecution)
        return newExecution
      } catch (err: any) {
        this.currentError = err.message || 'Error creating execution'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async updateExecution(id: string, data: any) {
      try {
        this.isLoading = true
        this.currentError = null
        const updated = await benchmarkingService.updateExecutionService(id, data)
        const index = this.executions.findIndex(e => e.id === id)
        if (index !== -1) {
          this.executions[index] = updated
        }
        return updated
      } catch (err: any) {
        this.currentError = err.message || 'Error updating execution'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async deleteExecution(id: string) {
      try {
        this.isLoading = true
        this.currentError = null
        await benchmarkingService.deleteExecutionService(id)
        this.executions = this.executions.filter(e => e.id !== id)
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting execution'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async completeExecution(id: string, responses: Record<string, any>) {
      try {
        this.isLoading = true
        this.currentError = null
        const completed = await benchmarkingService.completeExecutionService(id, responses)
        const index = this.executions.findIndex(e => e.id === id)
        if (index !== -1) {
          this.executions[index] = completed
        }
        return completed
      } catch (err: any) {
        this.currentError = err.message || 'Error completing execution'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // ============================================
    // STATISTICS
    // ============================================
    async fetchStatistics() {
      if (!this.selectedBrandId) {
        this.currentError = 'No brand selected'
        return
      }

      try {
        this.isLoading = true
        this.currentError = null
        this.statistics = await benchmarkingService.getAccountStatisticsService(this.selectedBrandId)
        return this.statistics
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching statistics'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async exportSurveyResults(surveyId: string, format: 'excel' | 'csv' = 'excel') {
      try {
        this.isLoading = true
        this.currentError = null
        const blob = await benchmarkingService.exportSurveyResultsService(surveyId, format)
        
        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `survey-${surveyId}-results.${format === 'excel' ? 'xlsx' : 'csv'}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (err: any) {
        this.currentError = err.message || 'Error exporting results'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // ============================================
    // UTILITY
    // ============================================
    clearError() {
      this.currentError = null
    },

    clearCurrentTemplate() {
      this.currentTemplate = null
    },

    clearCurrentSurvey() {
      this.currentSurvey = null
    },

    clearCurrentExecution() {
      this.currentExecution = null
    },

    resetStore() {
      this.templates = []
      this.surveys = []
      this.executions = []
      this.currentTemplate = null
      this.currentSurvey = null
      this.currentExecution = null
      this.statistics = null
      this.isLoading = false
      this.currentError = null
    },

    // ============================================
    // MODAL MANAGEMENT
    // ============================================
    openCreateStudyModal() {
      this.surveyToEdit = null
      this.isStudyModalOpen = true
    },

    openEditSurveyModal(survey: Survey) {
      this.surveyToEdit = survey
      this.isEditSurveyModalOpen = true
    },

    closeStudyModal() {
      this.isStudyModalOpen = false
      this.isEditSurveyModalOpen = false
      this.surveyToEdit = null
    },

    openCreateTemplateModal() {
      this.templateToEdit = null
      this.isTemplateModalOpen = true
    },

    openEditTemplateModal(template: Template) {
      this.templateToEdit = template
      this.isEditTemplateModalOpen = true
    },

    closeTemplateModal() {
      this.isTemplateModalOpen = false
      this.isEditTemplateModalOpen = false
      this.templateToEdit = null
    }
  }
})
