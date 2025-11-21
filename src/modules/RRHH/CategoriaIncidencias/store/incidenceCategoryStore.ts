import { defineStore } from 'pinia'
import type { IncidenceCategoryType } from '@/modules/RRHH/CategoriaIncidencias/types/incidenceCategoryTypes'

const initialCategory: IncidenceCategoryType = {
    id: undefined,
    name: '',
    status: true,
    creationDate: new Date(),
    description: ''
}

export const useIncidenceCategoryStore = defineStore('incidenceCategory', {
    state: () => ({
        selectedIncidenceCategory: initialCategory as IncidenceCategoryType,
        modalId: 'INCIDENCE_CATEGORY_MODAL'
    }),
    actions: {
        setData(incidenceCategory: IncidenceCategoryType = initialCategory) {
            this.selectedIncidenceCategory = incidenceCategory
        }
    }
})

export default useIncidenceCategoryStore
