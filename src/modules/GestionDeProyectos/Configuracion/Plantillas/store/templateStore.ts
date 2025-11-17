import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  TemplateType,
  TemplateOptionType,
  TemplateStageType,
  TemplateActivityType,
} from '../types/templateTypes'

export const useTemplateStore = defineStore('template', () => {
  // Estado
  const templates = ref<TemplateOptionType[]>([])
  const activeTemplate = ref<TemplateType | null>(null)
  const activeTemplateId = ref<number | null>(null)
  const isLoading = ref(false)

  // Elementos seleccionados para modales
  const selectedTemplate = ref<TemplateType | null>(null)
  const selectedStage = ref<TemplateStageType | null>(null)
  const selectedActivity = ref<TemplateActivityType | null>(null)

  // Modal IDs
  const templateModalId = 'template-modal'
  const deleteTemplateModalId = 'delete-template-modal'
  const stageModalId = 'template-stage-modal'
  const deleteStageModalId = 'delete-stage-modal'
  const activityModalId = 'template-activity-modal'
  const deleteActivityModalId = 'delete-activity-modal'

  // Setters
  const setTemplates = (newTemplates: TemplateOptionType[]) => {
    templates.value = newTemplates
  }

  const setActiveTemplate = (template: TemplateType | null) => {
    activeTemplate.value = template
    activeTemplateId.value = template?.id ?? null
  }

  const setActiveTemplateId = (id: number | null) => {
    activeTemplateId.value = id
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setSelectedTemplate = (template: TemplateType | null) => {
    selectedTemplate.value = template
  }

  const setSelectedStage = (stage: TemplateStageType | null) => {
    selectedStage.value = stage
  }

  const setSelectedActivity = (activity: TemplateActivityType | null) => {
    selectedActivity.value = activity
  }

  // Limpiar estado
  const clearTemplates = () => {
    templates.value = []
  }

  const clearActiveTemplate = () => {
    activeTemplate.value = null
    activeTemplateId.value = null
  }

  const clearSelectedTemplate = () => {
    selectedTemplate.value = null
  }

  const clearSelectedStage = () => {
    selectedStage.value = null
  }

  const clearSelectedActivity = () => {
    selectedActivity.value = null
  }

  return {
    // Estado
    templates,
    activeTemplate,
    activeTemplateId,
    isLoading,
    selectedTemplate,
    selectedStage,
    selectedActivity,
    
    // Modal IDs
    templateModalId,
    deleteTemplateModalId,
    stageModalId,
    deleteStageModalId,
    activityModalId,
    deleteActivityModalId,

    // Setters
    setTemplates,
    setActiveTemplate,
    setActiveTemplateId,
    setLoading,
    setSelectedTemplate,
    setSelectedStage,
    setSelectedActivity,

    // Limpiar
    clearTemplates,
    clearActiveTemplate,
    clearSelectedTemplate,
    clearSelectedStage,
    clearSelectedActivity,
  }
})
