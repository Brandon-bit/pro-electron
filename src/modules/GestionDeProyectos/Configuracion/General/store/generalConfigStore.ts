import { defineStore } from 'pinia'
import type {
  ProjectAreaType,
  ProjectCategoryType,
  ProjectClassificationType,
} from '@/modules/GestionDeProyectos/Configuracion/General/types/generalConfigTypes'

const initialArea: ProjectAreaType = {
  id: 0,
  name: '',
  description: '',
  active: true,
  categories: [],
}

const initialCategory: ProjectCategoryType = {
  id: 0,
  areaId: 0,
  name: '',
  active: true,
}

const initialClassification: ProjectClassificationType = {
  id: 0,
  name: '',
  description: '',
  active: true,
}

const useGeneralConfigStore = defineStore('general-config-store', {
  state: () => ({
    areas: [] as ProjectAreaType[],
    classifications: [] as ProjectClassificationType[],
    isLoading: false,

    // selección para modales
    selectedArea: null as ProjectAreaType | null,
    selectedCategory: null as ProjectCategoryType | null,
    selectedClassification: null as ProjectClassificationType | null,

    areaModalId: 'project-area-modal',
    categoryModalId: 'project-category-modal',
    classificationModalId: 'project-classification-modal',
  }),
  actions: {
    setArea(area: ProjectAreaType = initialArea) {
      this.selectedArea = area
    },
    clearArea() {
      this.selectedArea = null
    },
    setCategory(category: ProjectCategoryType = initialCategory) {
      this.selectedCategory = category
    },
    clearCategory() {
      this.selectedCategory = null
    },
    setClassification(classification: ProjectClassificationType = initialClassification) {
      this.selectedClassification = classification
    },
    clearClassification() {
      this.selectedClassification = null
    },
  },
})

export default useGeneralConfigStore
